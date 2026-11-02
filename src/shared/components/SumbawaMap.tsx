"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import type { Feature, FeatureCollection, Geometry, Position } from "geojson";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { getAdminJobSeekerMap } from "@/features/dashboard-admin/services/job-seeker.service";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

export interface KecamatanProps {
  kecamatan: string;
  district_code: string;
  latitude: number;
  longitude: number;
  jumlah_job_seekers: number;
  jumlah_job_seekers_wilayah_diminati: number;
}

type KecFeature = Feature<Geometry, KecamatanProps>;

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const SRC_KEC = "kecamatan";
const SRC_KAB = "kabupaten";

const colorFor = (i: number, total: number) =>
  `hsl(${Math.round((i * 360) / total)}, 55%, 55%)`;

function bboxOf(geom: Geometry): mapboxgl.LngLatBoundsLike {
  const b = new mapboxgl.LngLatBounds();
  const walk = (c: unknown): void => {
    const a = c as Position | unknown[];
    if (typeof a[0] === "number") b.extend(a as [number, number]);
    else (a as unknown[]).forEach(walk);
  };
  if ("coordinates" in geom) walk(geom.coordinates);
  return b;
}

export default function SumbawaMap() {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const [features, setFeatures] = useState<KecFeature[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [token] = useLocalStorage("access-token", null);

  const colors = useMemo(
    () =>
      Object.fromEntries(
        features.map((f, i) => [
          f.properties.district_code,
          colorFor(i, features.length),
        ]),
      ),
    [features],
  );

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      const result = await getAdminJobSeekerMap(token);
      console.log(result);
      if (result.status !== 200) return;
      setFeatures(result.data.data.features);
    };
    fetch();
  }, [token]);

  // Inisialisasi peta
  useEffect(() => {
    if (!TOKEN || !container.current || !features.length || mapRef.current)
      return;
    mapboxgl.accessToken = TOKEN;
    const map = new mapboxgl.Map({
      container: container.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [117.6, -8.6],
      zoom: 8.5,
    });
    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.addControl(new mapboxgl.FullscreenControl(), "top-right");

    map.on("load", () => {
      const fc: FeatureCollection = { type: "FeatureCollection", features };
      const matchColor: unknown[] = ["match", ["get", "district_code"]];
      features.forEach((f) =>
        matchColor.push(
          f.properties.district_code,
          colors[f.properties.district_code],
        ),
      );
      matchColor.push("#999");

      map.addSource(SRC_KEC, {
        type: "geojson",
        data: fc,
        promoteId: "district_code",
      });
      map.addSource(SRC_KAB, {
        type: "geojson",
        data: fc,
      });

      map.addLayer({
        id: "kec-fill",
        type: "fill",
        source: SRC_KEC,
        paint: {
          "fill-color": matchColor as mapboxgl.ExpressionSpecification,
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "selected"], false],
            0.85,
            ["boolean", ["feature-state", "hover"], false],
            0.7,
            0.45,
          ],
        },
      });
      map.addLayer({
        id: "kec-line",
        type: "line",
        source: SRC_KEC,
        paint: { "line-color": "#ffffff", "line-width": 1 },
      });
      map.addLayer({
        id: "kec-selected-line",
        type: "line",
        source: SRC_KEC,
        paint: {
          "line-color": "#0b3d36",
          "line-width": [
            "case",
            ["boolean", ["feature-state", "selected"], false],
            3,
            0,
          ],
        },
      });
      map.addLayer({
        id: "kab-outline",
        type: "line",
        source: SRC_KAB,
        paint: { "line-color": "#0b3d36", "line-width": 2.5 },
      });
      map.addLayer({
        id: "kec-label",
        type: "symbol",
        source: SRC_KEC,
        minzoom: 8.5,
        layout: {
          "text-field": ["get", "kecamatan"],
          "text-size": 11,
          "text-font": ["DIN Pro Medium", "Arial Unicode MS Regular"],
        },
        paint: {
          "text-color": "#1c2b2a",
          "text-halo-color": "#fff",
          "text-halo-width": 1.5,
        },
      });

      const all = new mapboxgl.LngLatBounds();
      features.forEach((f) =>
        all.extend(bboxOf(f.geometry) as mapboxgl.LngLatBounds),
      );
      map.fitBounds(all, { padding: 40, duration: 0 });

      let hoverId: string | null = null;
      map.on("mousemove", "kec-fill", (e) => {
        map.getCanvas().style.cursor = "pointer";
        const id = e.features?.[0]?.id as string | undefined;
        if (!id || id === hoverId) return;
        if (hoverId)
          map.setFeatureState(
            { source: SRC_KEC, id: hoverId },
            { hover: false },
          );
        hoverId = id;
        map.setFeatureState({ source: SRC_KEC, id }, { hover: true });
      });
      map.on("mouseleave", "kec-fill", () => {
        map.getCanvas().style.cursor = "";
        if (hoverId)
          map.setFeatureState(
            { source: SRC_KEC, id: hoverId },
            { hover: false },
          );
        hoverId = null;
      });
      map.on("click", "kec-fill", (e) => {
        const id = e.features?.[0]?.id as string | undefined;
        if (id) setSelected(id);
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [features, colors]);

  const popupContent = (f: KecFeature) => `
      <div style="font-family: 'Poppins', sans-serif; padding: 4px; min-width: 200px; color: #1e293b;">
        <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #0d9488; margin-bottom: 2px;">
          Kecamatan
        </div>
        <div style="font-size: 15px; font-weight: 800; color: #0f172a; margin-bottom: 8px; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px;">
          ${f.properties.kecamatan}
        </div>
        <div style="display: flex; flex-direction: column; gap: 4px; font-size: 12px;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #64748b;">Kode Wilayah:</span>
            <strong style="color: #334155;">${f.properties.district_code}</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #64748b;">Jumlah Pencari Kerja:</span>
            <strong style="color: #0d9488; background: #f0fdfa; padding: 1px 6px; border-radius: 6px;">${f.properties.jumlah_job_seekers}  Orang</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #64748b;">Jumlah Peminat:</span>
            <strong style="color: #0d9488; background: #f0fdfa; padding: 1px 6px; border-radius: 6px;">${f.properties.jumlah_job_seekers_wilayah_diminati}  Orang</strong>
          </div>
        </div>
      </div>
    `;

  // Sinkronkan pilihan -> feature-state, zoom, popup
  const prevSel = useRef<string | null>(null);
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.getSource(SRC_KEC)) return;
    if (prevSel.current)
      map.setFeatureState(
        { source: SRC_KEC, id: prevSel.current },
        { selected: false },
      );
    prevSel.current = selected;
    popupRef.current?.remove();
    if (!selected) return;
    const f = features.find((x) => x.properties.district_code === selected);
    if (!f) return;
    map.setFeatureState({ source: SRC_KEC, id: selected }, { selected: true });
    map.fitBounds(bboxOf(f.geometry), {
      padding: 60,
      maxZoom: 11.5,
      duration: 800,
    });
    popupRef.current = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat([f.properties.longitude, f.properties.latitude])
      .setHTML(popupContent(f))
      .addTo(map);
    popupRef.current.on("close", () =>
      setSelected((s) => (s === selected ? null : s)),
    );
  }, [selected, features]);

  if (!TOKEN) {
    return (
      <div className="mx-auto my-[20vh] max-w-[520px] p-6 leading-normal">
        <h2 className="mb-2 text-xl font-bold">Token Mapbox belum diatur</h2>
        <p>
          Salin{" "}
          <code className="rounded bg-[#eef3f2] px-[5px] py-0.5">
            .env.local.example
          </code>{" "}
          menjadi{" "}
          <code className="rounded bg-[#eef3f2] px-[5px] py-0.5">
            .env.local
          </code>
          , isi{" "}
          <code className="rounded bg-[#eef3f2] px-[5px] py-0.5">
            NEXT_PUBLIC_MAPBOX_TOKEN
          </code>
          , lalu jalankan ulang{" "}
          <code className="rounded bg-[#eef3f2] px-[5px] py-0.5">
            npm run dev
          </code>
          .
        </p>
      </div>
    );
  }

  const shown = features.filter((f) =>
    f.properties.kecamatan.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 text-slate-800">
      {/* SIDEBAR PANEL */}
      <aside className="w-[320px] flex-none flex flex-col bg-white border-r border-slate-200/80 z-10 shadow-sm">
        <header className="p-4 sm:p-5 border-b border-slate-200/80 space-y-4">
          <Link
            href="/dashboard/admin"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-semibold rounded-xl shadow-2xs transition-all w-fit group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-500 group-hover:-translate-x-0.5 transition-transform" />
            <span>Kembali ke Dashboard</span>
          </Link>

          <div className="space-y-0.5">
            <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Kabupaten Sumbawa
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>Nusa Tenggara Barat</span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 font-bold text-[10px]">
                {features.length} Kecamatan
              </span>
            </div>
          </div>
        </header>

        {/* SEARCH INPUT */}
        <div className="px-4 py-3 border-b border-slate-100">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition-all"
              placeholder="Cari kecamatan…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* LIST KECAMATAN */}
        <ul className="flex-1 overflow-y-auto m-0 p-2 space-y-1 list-none">
          {shown.map((f) => {
            const isSelected = selected === f.properties.district_code;
            return (
              <li key={f.properties.district_code}>
                <button
                  type="button"
                  className={`w-full flex items-center gap-2.5 text-left p-2.5 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-teal-50 text-teal-900 font-bold shadow-2xs border border-teal-200/60"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                  onClick={() => setSelected(f.properties.district_code)}
                >
                  <span
                    className="w-3 h-3 rounded-md shrink-0 shadow-2xs"
                    style={{ background: colors[f.properties.district_code] }}
                  />
                  <span className="truncate">{f.properties.kecamatan}</span>
                  <span className="ml-auto text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md">
                    {f.properties.district_code}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* MAP WRAPPER */}
      <div className="relative flex-1 h-full">
        <div ref={container} className="absolute inset-0 w-full h-full" />
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

// Mapping kamus opsional untuk mengubah slug URL menjadi label yang lebih rapi
const ROUTE_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  admin: "Dashboard",
  perusahaan: "Dashboard",
  pencaker: "Dashboard",
  pelamar: "Manajemen Pelamar",
  preferensi: "Preferensi Pekerjaan",
  export: "Export Data Pelamar",
  profil: "Profil Saya",
  lowongan: "Lowongan Pekerjaan",
  dokumen: "Dokumen & Verifikasi",
};

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Pisahkan path berdasarkan garis miring '/' dan buang string kosong
  const segments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-xs text-slate-500 py-2"
    >
      {/* Home / Root Dashboard */}
      <Link
        href="/dashboard"
        className="flex items-center gap-1 hover:text-teal-600 transition-colors font-medium"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      {segments.length > 0 && (
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
      )}

      {/* Dynamic Segments */}
      {segments.map((segment, index) => {
        // Susun kembali URL secara kumulatif untuk setiap level breadcrumb
        const url = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;

        // Cari label kustom dari kamus, atau ubah format slug (huruf kapital & hapus tanda hubung)
        const formattedLabel =
          ROUTE_LABELS[segment] ||
          segment.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());

        if (segment === "dashboard") return null;

        return (
          <React.Fragment key={url}>
            {isLast ? (
              <span
                className="font-bold text-slate-800 truncate max-w-[200px]"
                aria-current="page"
              >
                {formattedLabel}
              </span>
            ) : (
              <Link
                href={url}
                className="hover:text-teal-600 transition-colors font-medium truncate max-w-[150px]"
              >
                {formattedLabel}
              </Link>
            )}

            {!isLast && (
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

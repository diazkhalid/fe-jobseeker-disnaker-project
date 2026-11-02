"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useAdminJobSeeker } from "@/features/dashboard-admin/hooks/useAdminJobSeeker.hook";
import {
  Users,
  MapPin,
  Briefcase,
  Building,
  Navigation,
  Calendar,
  Activity,
  UserCheck,
} from "lucide-react";
import { ApexOptions } from "apexcharts";

// Import ApexCharts secara dinamis untuk mencegah error SSR (Server-Side Rendering) di Next.js
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DashboardAdminPage() {
  const { adminJobSeekerDashboard } = useAdminJobSeeker();

  // Helper jika data belum termuat / loading state
  if (!adminJobSeekerDashboard) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
          <Activity className="w-5 h-5 animate-spin text-teal-600" />
          <span>Memuat data dashboard pencari kerja...</span>
        </div>
      </div>
    );
  }

  const {
    total_job_seekers = 0,
    kecamatan = [],
    wilayah_diminati = [],
    posisi_diminati = [],
    job_fields = [],
    industri = [],
  } = adminJobSeekerDashboard;

  // Filter item yang memiliki nilai > 0 untuk visualisasi chart yang lebih bersih,
  // namun tetap menyisakan fallback jika semua bernilai 0.
  const filterActive = <T extends { jumlah_job_seekers: number }>(
    items: T[],
  ) => {
    const active = items.filter((item) => item.jumlah_job_seekers > 0);
    return active.length > 0 ? active : items.slice(0, 5);
  };

  const activeKecamatan = filterActive(kecamatan);
  const activeWilayahDiminati = filterActive(wilayah_diminati);
  const activePosisi = filterActive(posisi_diminati);
  const activeJobFields = filterActive(job_fields);
  const activeIndustri = filterActive(industri);

  // ==========================================
  // 1. CHART: Distribusi Asal Kecamatan (Bar Horizontal Chart)
  // ==========================================
  const kecamatanChartOptions: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      fontFamily: "Poppins, sans-serif",
    },
    colors: ["#0d9488"], // Teal-600
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 5,
        barHeight: "50%",
      },
    },
    dataLabels: {
      enabled: true,
      style: { fontSize: "11px", colors: ["#fff"] },
    },
    xaxis: {
      categories: activeKecamatan.map((item) => item.kecamatan),
      labels: { style: { colors: "#64748b", fontSize: "11px" } },
    },
    yaxis: {
      labels: {
        style: { colors: "#334155", fontSize: "11px", fontWeight: 500 },
      },
    },
    grid: { borderColor: "#f1f5f9", strokeDashArray: 4 },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => `${val} Pelamar` },
    },
  };
  const kecamatanChartSeries = [
    {
      name: "Pencari Kerja",
      data: activeKecamatan.map((item) => item.jumlah_job_seekers),
    },
  ];

  // ==========================================
  // 2. CHART: Preferensi Bidang Pekerjaan (Donut Chart)
  // ==========================================
  const jobFieldsChartOptions: ApexOptions = {
    chart: {
      type: "donut",
      fontFamily: "Poppins, sans-serif",
    },
    labels: activeJobFields.map((item) => item.nama),
    colors: ["#0d9488", "#6366f1", "#f59e0b", "#ec4899", "#10b981", "#8b5cf6"],
    legend: {
      position: "bottom",
      fontSize: "11px",
      labels: { colors: "#475569" },
    },
    dataLabels: { enabled: true },
    stroke: { width: 2, colors: ["#ffffff"] },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => `${val} Pelamar` },
    },
  };
  const jobFieldsChartSeries = activeJobFields.map(
    (item) => item.jumlah_job_seekers,
  );

  // ==========================================
  // 3. CHART: Posisi Paling Diminati (Column Chart / Vertical Bar)
  // ==========================================
  const posisiChartOptions: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      fontFamily: "Poppins, sans-serif",
    },
    colors: ["#6366f1"], // Indigo-500
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "40%",
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: activePosisi.map((item) => item.nama),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: "#64748b", fontSize: "11px" } },
    },
    yaxis: {
      labels: { style: { colors: "#64748b", fontSize: "11px" } },
    },
    grid: { borderColor: "#f1f5f9", strokeDashArray: 4 },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => `${val} Pelamar` },
    },
  };
  const posisiChartSeries = [
    {
      name: "Minat Posisi",
      data: activePosisi.map((item) => item.jumlah_job_seekers),
    },
  ];

  // ==========================================
  // 4. CHART: Preferensi Industri (Radar Chart)
  // ==========================================
  const industriChartOptions: ApexOptions = {
    chart: {
      type: "radar",
      toolbar: { show: false },
      fontFamily: "Poppins, sans-serif",
    },
    colors: ["#ec4899"], // Pink-500
    stroke: { width: 2 },
    fill: { opacity: 0.2 },
    markers: { size: 4 },
    xaxis: {
      categories: activeIndustri.map((item) => item.nama),
      labels: { style: { colors: "#64748b", fontSize: "10px" } },
    },
    yaxis: { show: false },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => `${val} Pelamar` },
    },
  };
  const industriChartSeries = [
    {
      name: "Minat Industri",
      data: activeIndustri.map((item) => item.jumlah_job_seekers),
    },
  ];

  // Statistics Summary Cards
  const statsCards = [
    {
      title: "Total Pencari Kerja",
      value: total_job_seekers.toLocaleString("id-ID"),
      subtext: "Terdaftar di sistem",
      icon: Users,
      color: "bg-teal-50 text-teal-600 border-teal-200",
    },
    {
      title: "Total Wilayah Terjangkau",
      value: kecamatan.length.toString(),
      subtext: "Kecamatan terdata",
      icon: MapPin,
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      title: "Kategori Bidang Kerja",
      value: job_fields.length.toString(),
      subtext: "Bidang keahlian tersedia",
      icon: Briefcase,
      color: "bg-indigo-50 text-indigo-600 border-indigo-200",
    },
    {
      title: "Sektor Industri",
      value: industri.length.toString(),
      subtext: "Pilihan industri pencari kerja",
      icon: Building,
      color: "bg-amber-50 text-amber-600 border-amber-200",
    },
  ];

  return (
    <div className="space-y-6 bg-slate-50/50 min-h-screen">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Dashboard Pencari Kerja
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Analisis preferensi, domisili, dan statistik demografi pencari kerja
            di Kabupaten Sumbawa.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-600 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>
              {new Date().toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* STATISTIK TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between hover:border-teal-500/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">
                  {item.title}
                </span>
                <div className={`p-2 rounded-xl border ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-3">
                <span className="text-2xl font-bold text-slate-900 block leading-none">
                  {item.value}
                </span>
                <span className="text-[0.65rem] font-medium text-slate-400 mt-1 inline-block">
                  {item.subtext}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* SEKSI GRAFIK UTAMA (BAR HORIZ & DONUT CHART) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafik Asal Kecamatan */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-600" />
                Domisili Pencari Kerja
              </h2>
              <p className="text-[0.65rem] text-slate-400">
                Sebaran pencari kerja berdasarkan kecamatan asal
              </p>
            </div>
          </div>

          <div className="w-full mt-2">
            <Chart
              options={kecamatanChartOptions}
              series={kecamatanChartSeries}
              type="bar"
              height={280}
            />
          </div>
        </div>

        {/* Grafik Bidang Pekerjaan (Donut Chart) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                Bidang Pekerjaan Minati
              </h2>
              <p className="text-[0.65rem] text-slate-400">
                Proporsi minat pencari kerja berdasarkan bidang pekerjaan
              </p>
            </div>
          </div>

          <div className="w-full mt-2 flex justify-center">
            <Chart
              options={jobFieldsChartOptions}
              series={jobFieldsChartSeries}
              type="donut"
              height={280}
            />
          </div>
        </div>
      </div>

      {/* SEKSI GRAFIK SEKUNDER (POSISI & RADAR INDUSTRI) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column Chart - Posisi Diminati */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-indigo-600" />
                Posisi Pekerjaan Diminati
              </h2>
              <p className="text-[0.65rem] text-slate-400">
                Pilihan jabatan/posisi populer yang diminati pelamar
              </p>
            </div>
          </div>

          <div className="w-full mt-2">
            <Chart
              options={posisiChartOptions}
              series={posisiChartSeries}
              type="bar"
              height={260}
            />
          </div>
        </div>

        {/* Radar Chart - Industri */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Building className="w-4 h-4 text-pink-600" />
                Sebaran Minat Industri
              </h2>
              <p className="text-[0.65rem] text-slate-400">
                Pemetaan minat terhadap sektor industri
              </p>
            </div>
          </div>

          <div className="w-full mt-2">
            <Chart
              options={industriChartOptions}
              series={industriChartSeries}
              type="radar"
              height={260}
            />
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: RINGKASAN WILAYAH DIMINATI */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-teal-600" />
            <h2 className="text-sm font-bold text-slate-800">
              Kecamatan Tujuan Favorit (Preferensi Lokasi Kerja)
            </h2>
          </div>
          <span className="text-[0.65rem] text-slate-400">Top 5 Lokasi</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mt-4">
          {activeWilayahDiminati.slice(0, 5).map((w, idx) => (
            <div
              key={w.district_code || idx}
              className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-semibold text-slate-800 block">
                  {w.kecamatan}
                </span>
                <span className="text-[0.65rem] text-slate-400">
                  Kode: {w.district_code}
                </span>
              </div>
              <span className="text-xs font-bold px-2 py-1 bg-teal-50 text-teal-700 rounded-lg">
                {w.jumlah_job_seekers} Pelamar
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

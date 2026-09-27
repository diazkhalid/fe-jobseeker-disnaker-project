"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Building2,
  Users,
  Briefcase,
  FileCheck2,
  ShieldCheck,
  ChevronRight,
  Calendar,
  Activity,
} from "lucide-react";
import { ApexOptions } from "apexcharts";

// Import ApexCharts secara dinamis untuk mencegah error SSR (Server-Side Rendering) di Next.js
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DashboardDisnakertransPage() {
  // Mock Data Ringkasan Stat
  const stats = [
    {
      title: "Total Perusahaan",
      value: "248",
      change: "+12 bulan ini",
      isPositive: true,
      icon: Building2,
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      title: "Total Pelamar",
      value: "5,420",
      change: "+18% dari bulan lalu",
      isPositive: true,
      icon: Users,
      color: "bg-teal-50 text-teal-600 border-teal-200",
    },
    {
      title: "Total Lowongan",
      value: "1,120",
      change: "+8% dari bulan lalu",
      isPositive: true,
      icon: Briefcase,
      color: "bg-indigo-50 text-indigo-600 border-indigo-200",
    },
    {
      title: "Lowongan Perlu Verifikasi",
      value: "15",
      change: "Membutuhkan tindakan",
      isWarning: true,
      icon: FileCheck2,
      color: "bg-amber-50 text-amber-600 border-amber-200",
    },
    {
      title: "Perusahaan Perlu Verifikasi",
      value: "7",
      change: "Membutuhkan tindakan",
      isWarning: true,
      icon: ShieldCheck,
      color: "bg-rose-50 text-rose-600 border-rose-200",
    },
  ];

  // Konfigurasi ApexCharts untuk Lowongan Kerja (Bar Chart)
  const jobChartOptions: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      fontFamily: "Poppins, sans-serif",
    },
    colors: ["#0d9488"], // Teal-600
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "45%",
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: "#64748b", fontSize: "11px" } },
    },
    yaxis: {
      labels: { style: { colors: "#64748b", fontSize: "11px" } },
    },
    grid: {
      borderColor: "#f1f5f9",
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => `${val} Lowongan` },
    },
  };

  const jobChartSeries = [
    {
      name: "Lowongan Diterbitkan",
      data: [45, 60, 52, 80, 95, 70, 88, 110, 125, 0, 0, 0],
    },
  ];

  // Konfigurasi ApexCharts untuk Registrasi Pelamar (Area/Line Chart)
  const applicantChartOptions: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      fontFamily: "Poppins, sans-serif",
    },
    colors: ["#6366f1"], // Indigo-500
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2.5 },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: "#64748b", fontSize: "11px" } },
    },
    yaxis: {
      labels: { style: { colors: "#64748b", fontSize: "11px" } },
    },
    grid: {
      borderColor: "#f1f5f9",
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => `${val} Pelamar Baru` },
    },
  };

  const applicantChartSeries = [
    {
      name: "Pelamar Terdaftar",
      data: [120, 210, 340, 430, 520, 680, 810, 950, 1100, 0, 0, 0],
    },
  ];

  // Mock Data Lowongan Menunggu Verifikasi
  const pendingJobs = [
    {
      id: "1",
      title: "Frontend Developer",
      company: "PT Samawa Teknologi",
      date: "27 Sep 2026",
      category: "Teknologi Informasi",
    },
    {
      id: "2",
      title: "Staff Akuntansi & Keuangan",
      company: "CV Sumbawa Makmur",
      date: "26 Sep 2026",
      category: "Keuangan",
    },
    {
      id: "3",
      title: "Operator Alat Berat",
      company: "PT Tambang West Nusa",
      date: "25 Sep 2026",
      category: "Pertambangan",
    },
  ];

  // Mock Data Perusahaan Menunggu Verifikasi
  const pendingCompanies = [
    {
      id: "1",
      name: "PT Amanah Nusantara",
      nib: "1234567890123",
      date: "27 Sep 2026",
      location: "Sumbawa Besar",
    },
    {
      id: "2",
      name: "CV Lombok Agro Industri",
      nib: "9876543210987",
      date: "26 Sep 2026",
      location: "Badas",
    },
  ];

  // Mock Data Aktivitas Terbaru
  const recentActivities = [
    {
      id: "1",
      text: "Admin menyetujui lowongan 'UI/UX Designer' dari PT Samawa Digital.",
      time: "10 menit yang lalu",
    },
    {
      id: "2",
      text: "Perusahaan baru 'PT Amanah Nusantara' mendaftar ke sistem.",
      time: "30 menit yang lalu",
    },
    {
      id: "3",
      text: "Verifikasi akun perusahaan 'CV Berkah Teknik' disetujui.",
      time: "2 jam yang lalu",
    },
    {
      id: "4",
      text: "12 pelamar baru mendaftar pada Job Fair Online Disnakertrans.",
      time: "5 jam yang lalu",
    },
  ];

  return (
    <div className="space-y-6 bg-slate-50/50">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Dashboard Disnakertrans
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Ringkasan data rekrutmen, verifikasi akun, dan aktivitas tenaga
            kerja.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-600 shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>27 September 2026</span>
          </div>
        </div>
      </div>

      {/* STATISTIK TOP CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between hover:border-teal-500/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[0.7rem] font-semibold text-slate-500">
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
                <span
                  className={`text-[0.65rem] font-medium mt-1 inline-block ${
                    item.isWarning
                      ? "text-amber-600 font-semibold"
                      : item.isPositive
                        ? "text-emerald-600"
                        : "text-slate-500"
                  }`}
                >
                  {item.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* VERIFIKASI SECTION (LOWONGAN & PERUSAHAAN MENUNGGU) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lowongan Menunggu Verifikasi */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-amber-500" />
                <h2 className="text-sm font-bold text-slate-800">
                  Lowongan Menunggu Verifikasi
                </h2>
              </div>
              <Link
                href="/dashboard/disnakertrans/lowongan/verifikasi"
                className="text-[0.7rem] font-medium text-teal-600 hover:text-teal-700 flex items-center gap-1"
              >
                Lihat Semua <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              {pendingJobs.map((job) => (
                <div
                  key={job.id}
                  className="py-3 flex items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-semibold text-slate-900">
                      {job.title}
                    </h3>
                    <p className="text-[0.65rem] text-slate-500">
                      {job.company} •{" "}
                      <span className="text-slate-400">{job.category}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[0.6rem] text-slate-400 hidden sm:inline">
                      {job.date}
                    </span>
                    <button className="px-2.5 py-1 text-[0.65rem] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors">
                      Setujui
                    </button>
                    <button className="px-2.5 py-1 text-[0.65rem] font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors">
                      Tolak
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Perusahaan Menunggu Verifikasi */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-rose-500" />
                <h2 className="text-sm font-bold text-slate-800">
                  Perusahaan Menunggu Verifikasi
                </h2>
              </div>
              <Link
                href="/dashboard/disnakertrans/perusahaan/verifikasi"
                className="text-[0.7rem] font-medium text-teal-600 hover:text-teal-700 flex items-center gap-1"
              >
                Lihat Semua <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              {pendingCompanies.map((comp) => (
                <div
                  key={comp.id}
                  className="py-3 flex items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-semibold text-slate-900">
                      {comp.name}
                    </h3>
                    <p className="text-[0.65rem] text-slate-500">
                      NIB: {comp.nib} • {comp.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[0.6rem] text-slate-400 hidden sm:inline">
                      {comp.date}
                    </span>
                    <button className="px-2.5 py-1 text-[0.65rem] font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors">
                      Verifikasi
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* GRAFIK APEXCHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafik Lowongan Per Bulan */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm font-bold text-slate-800">
                Grafik Lowongan Kerja
              </h2>
              <p className="text-[0.65rem] text-slate-400">
                Jumlah lowongan diterbitkan per bulan (2026)
              </p>
            </div>
            <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-lg">
              +14% Tren
            </span>
          </div>

          <div className="w-full">
            <Chart
              options={jobChartOptions}
              series={jobChartSeries}
              type="bar"
              height={260}
            />
          </div>
        </div>

        {/* Grafik Pelamar Per Bulan */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm font-bold text-slate-800">
                Grafik Registrasi Pelamar
              </h2>
              <p className="text-[0.65rem] text-slate-400">
                Pertumbuhan pencari kerja terdaftar (2026)
              </p>
            </div>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
              +22% Tren
            </span>
          </div>

          <div className="w-full">
            <Chart
              options={applicantChartOptions}
              series={applicantChartSeries}
              type="area"
              height={260}
            />
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: AKTIVITAS TERBARU & RINGKASAN PROSES REKRUTMEN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Aktivitas Terbaru */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-teal-600" />
              <h2 className="text-sm font-bold text-slate-800">
                Aktivitas Terbaru Sistem
              </h2>
            </div>
            <span className="text-[0.65rem] text-slate-400">Realtime Feed</span>
          </div>

          <div className="mt-3 space-y-3">
            {recentActivities.map((act) => (
              <div
                key={act.id}
                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                <div className="flex-1 space-y-0.5">
                  <p className="text-xs text-slate-700 font-medium">
                    {act.text}
                  </p>
                  <span className="text-[0.625rem] text-slate-400 block">
                    {act.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ringkasan Proses Rekrutmen */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-800">
              Ringkasan Rekrutmen
            </h2>
            <p className="text-[0.65rem] text-slate-400">
              Status proses seleksi aktif di seluruh wilayah
            </p>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <span className="text-xs font-medium text-slate-600">
                Tahap Seleksi Berkas
              </span>
              <span className="text-xs font-bold text-slate-900">
                1,240 Pelamar
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <span className="text-xs font-medium text-slate-600">
                Tahap Ujian & Wawancara
              </span>
              <span className="text-xs font-bold text-slate-900">
                380 Pelamar
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-emerald-50 text-emerald-900 rounded-xl">
              <span className="text-xs font-medium">
                Lolos & Diterima Kerja
              </span>
              <span className="text-xs font-bold">154 Pelamar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

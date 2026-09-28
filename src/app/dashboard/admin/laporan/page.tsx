"use client";

import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Briefcase,
  Building2,
  Users,
  FileSpreadsheet,
  PieChart,
  MapPin,
  GraduationCap,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  Filter,
} from "lucide-react";

export default function AnalyticsReportsPage() {
  const [period, setPeriod] = useState("2026-Q3");
  const [exportFormat, setExportFormat] = useState("pdf");

  const handleExport = () => {
    alert(
      `Mengekspor Laporan & Statistik periode (${period}) format ${exportFormat.toUpperCase()}...`,
    );
  };

  return (
    <div className="space-y-6 bg-slate-50/50">
      {/* HEADER & TOP BAR */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-teal-600" />
            Laporan & Statistik Ketenagakerjaan
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Analisis komprehensif lowongan, perusahaan, pelamar, dan efektivitas
            rekrutmen di Kabupaten Sumbawa.
          </p>
        </div>

        {/* FILTER PERIODE & EXPORT */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="text-xs font-semibold text-slate-700 bg-transparent focus:outline-none"
            >
              <option value="2026-ALL">Semua Periode (2026)</option>
              <option value="2026-Q3">Triwulan III 2026</option>
              <option value="2026-Q2">Triwulan II 2026</option>
              <option value="2026-09">September 2026</option>
            </select>
          </div>

          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              className="text-xs font-medium text-slate-600 bg-transparent px-2 focus:outline-none"
            >
              <option value="pdf font-semibold">PDF Report</option>
              <option value="excel">Excel (.xlsx)</option>
              <option value="csv">CSV Data</option>
            </select>
            <button
              type="button"
              onClick={handleExport}
              className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* METRIK IKHTISAR UTAMA (SUMMARY CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* STATISTIK LOWONGAN */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[0.7rem] font-bold text-slate-500 uppercase tracking-wider">
              Statistik Lowongan
            </span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-slate-900">142</span>
              <span className="text-[0.65rem] font-bold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +12.4%
              </span>
            </div>
            <p className="text-[0.65rem] text-slate-400 mt-0.5">
              <strong className="text-slate-700 font-semibold">
                98 Active
              </strong>{" "}
              • 44 Closed
            </p>
          </div>
        </div>

        {/* STATISTIK PERUSAHAAN */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[0.7rem] font-bold text-slate-500 uppercase tracking-wider">
              Statistik Perusahaan
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-slate-900">86</span>
              <span className="text-[0.65rem] font-bold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +5 Baru
              </span>
            </div>
            <p className="text-[0.65rem] text-slate-400 mt-0.5">
              <strong className="text-slate-700 font-semibold">
                79 Terverifikasi
              </strong>{" "}
              • 7 Pending
            </p>
          </div>
        </div>

        {/* STATISTIK PELAMAR */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[0.7rem] font-bold text-slate-500 uppercase tracking-wider">
              Statistik Pelamar
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-slate-900">
                2,840
              </span>
              <span className="text-[0.65rem] font-bold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +18.2%
              </span>
            </div>
            <p className="text-[0.65rem] text-slate-400 mt-0.5">
              Pencari Kerja Aktif Terdaftar
            </p>
          </div>
        </div>

        {/* STATISTIK LAMARAN & REKRUTMEN */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[0.7rem] font-bold text-slate-500 uppercase tracking-wider">
              Total Lamaran Masuk
            </span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-slate-900">
                6,120
              </span>
              <span className="text-[0.65rem] font-bold text-slate-500">
                Berkas Lamaran
              </span>
            </div>
            <p className="text-[0.65rem] text-slate-400 mt-0.5">
              Avg.{" "}
              <strong className="text-slate-700 font-semibold">
                43 Lamaran
              </strong>{" "}
              / Lowongan
            </p>
          </div>
        </div>
      </div>

      {/* GRAFIK PERKEMBANGAN & TINGKAT KELULUSAN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* GRAFIK TREN PERKEMBANGAN (2 SPAN) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-teal-600" />
                Grafik Perkembangan Rekrutmen & Lowongan (2026)
              </h2>
              <p className="text-[0.65rem] text-slate-400 mt-0.5">
                Perbandingan tren pembuatan lowongan baru vs lamaran masuk
                bulanan.
              </p>
            </div>
            <span className="text-[0.65rem] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-lg">
              Data Real-time
            </span>
          </div>

          {/* Bar Chart Visualizer Placeholder */}
          <div className="h-64 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-100">
            {[
              { month: "Jan", lowongan: 40, lamaran: 65 },
              { month: "Feb", lowongan: 55, lamaran: 80 },
              { month: "Mar", lowongan: 35, lamaran: 50 },
              { month: "Apr", lowongan: 70, lamaran: 90 },
              { month: "Mei", lowongan: 60, lamaran: 75 },
              { month: "Jun", lowongan: 85, lamaran: 100 },
              { month: "Jul", lowongan: 95, lamaran: 110 },
              { month: "Agu", lowongan: 75, lamaran: 85 },
              { month: "Sep", lowongan: 90, lamaran: 120 },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group"
              >
                <div className="w-full flex items-end justify-center gap-1 h-full">
                  {/* Bar Lowongan */}
                  <div
                    style={{ height: `${item.lowongan}%` }}
                    className="w-1/2 bg-teal-500 rounded-t-md group-hover:bg-teal-600 transition-all relative"
                  >
                    <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 text-[0.6rem] font-bold bg-slate-900 text-white px-1 rounded transition-opacity">
                      {item.lowongan}
                    </span>
                  </div>
                  {/* Bar Lamaran */}
                  <div
                    style={{ height: `${item.lamaran}%` }}
                    className="w-1/2 bg-slate-300 rounded-t-md group-hover:bg-slate-400 transition-all relative"
                  >
                    <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 text-[0.6rem] font-bold bg-slate-900 text-white px-1 rounded transition-opacity">
                      {item.lamaran * 10}
                    </span>
                  </div>
                </div>
                <span className="text-[0.65rem] font-semibold text-slate-500">
                  {item.month}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-600 pt-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-xs bg-teal-500 inline-block" />
              <span>Lowongan Baru Diterbitkan</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-xs bg-slate-300 inline-block" />
              <span>Volume Lamaran (x10)</span>
            </div>
          </div>
        </div>

        {/* TINGKAT KELULUSAN REKRUTMEN (FUNNEL/STATS) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <PieChart className="w-4 h-4 text-teal-600" />
              Tingkat Kelulusan Rekrutmen
            </h2>
            <p className="text-[0.65rem] text-slate-400 mt-0.5">
              Funnel efisiensi seleksi tenaga kerja.
            </p>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[0.7rem] font-medium">
                <span className="text-slate-600">Total Lamaran Masuk</span>
                <span className="font-bold text-slate-800">6,120 (100%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-slate-800 h-full w-full" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-[0.7rem] font-medium">
                <span className="text-slate-600">
                  Lolos Seleksi Administrasi
                </span>
                <span className="font-bold text-slate-800">3,420 (55.8%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full w-[55.8%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-[0.7rem] font-medium">
                <span className="text-slate-600">Lolos Tes & Wawancara</span>
                <span className="font-bold text-slate-800">890 (14.5%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[14.5%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-[0.7rem] font-medium">
                <span className="text-emerald-700 font-bold">
                  Diterima Kerja (Hired)
                </span>
                <span className="font-bold text-emerald-700">412 (6.7%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[6.7%]" />
              </div>
            </div>
          </div>

          <div className="p-3 bg-teal-50/60 border border-teal-100 rounded-xl text-[0.68rem] text-teal-800 space-y-1 mt-4">
            <span className="font-bold block">
              Rata-rata Durasi Proses Rekrutmen:
            </span>
            <p className="text-slate-600">
              Dibutuhkan rata-rata{" "}
              <strong className="text-slate-900">14 hari kerja</strong> dari
              pendaftaran hingga diterimanya kerja di wilayah Sumbawa.
            </p>
          </div>
        </div>
      </div>

      {/* GRID CATEGORIES, REGIONAL, & DEMOGRAPHICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* LOWONGAN BERDASARKAN KATEGORI */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2.5 flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-teal-600" /> Lowongan per
            Kategori
          </h2>

          <div className="space-y-2 text-xs">
            {[
              { label: "Teknologi Informasi", count: 38, pct: "26.7%" },
              { label: "Keuangan & Akuntansi", count: 28, pct: "19.7%" },
              { label: "Pertambangan & Energi", count: 24, pct: "16.9%" },
              { label: "Teknik & Konstruksi", count: 20, pct: "14.0%" },
              { label: "Pertanian & Perkebunan", count: 18, pct: "12.6%" },
              { label: "Lainnya", count: 14, pct: "9.8%" },
            ].map((cat, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100/80"
              >
                <span className="font-semibold text-slate-700 truncate">
                  {cat.label}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-bold text-slate-900">{cat.count}</span>
                  <span className="text-[0.65rem] text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                    {cat.pct}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LOWONGAN BERDASARKAN WILAYAH */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2.5 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-teal-600" /> Distribusi Lowongan per
            Wilayah
          </h2>

          <div className="space-y-2 text-xs">
            {[
              { label: "Sumbawa Besar", count: 62, pct: "43.6%" },
              { label: "Kecamatan Badas", count: 25, pct: "17.6%" },
              { label: "Kecamatan Sekongkang", count: 22, pct: "15.5%" },
              { label: "Kecamatan Plampang", count: 18, pct: "12.6%" },
              { label: "Kecamatan Alas", count: 15, pct: "10.5%" },
            ].map((reg, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100/80"
              >
                <span className="font-semibold text-slate-700 truncate">
                  {reg.label}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-bold text-slate-900">{reg.count}</span>
                  <span className="text-[0.65rem] text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                    {reg.pct}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PELAMAR BERDASARKAN PENDIDIKAN */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2.5 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-teal-600" /> Pelamar per
            Pendidikan
          </h2>

          <div className="space-y-2 text-xs">
            {[
              { label: "Sarjana (S1 / S2)", count: 1240, pct: "43.6%" },
              { label: "Diploma (D3 / D4)", count: 820, pct: "28.8%" },
              { label: "SMA / SMK Sederajat", count: 680, pct: "23.9%" },
              { label: "SMP & Dibawahnya", count: 100, pct: "3.5%" },
            ].map((edu, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100/80"
              >
                <span className="font-semibold text-slate-700 truncate">
                  {edu.label}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-bold text-slate-900">{edu.count}</span>
                  <span className="text-[0.65rem] text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                    {edu.pct}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PELAMAR BERDASARKAN KEAHLIAN & LOWONGAN TERBANYAK DILAMAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* TOP KEAHLIAN PELAMAR (1 SPAN) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2.5 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-teal-600" /> Top Keahlian Pelamar
          </h2>

          <div className="flex flex-wrap gap-2 text-xs pt-1">
            {[
              { skill: "React / Next.js", count: "412 Pelamar" },
              { skill: "Microsoft Excel / Office", count: "890 Pelamar" },
              { skill: "Manajemen Keuangan", count: "310 Pelamar" },
              { skill: "K3 Pertambangan", count: "245 Pelamar" },
              { skill: "Pengoperasian Alat Berat", count: "180 Pelamar" },
              { skill: "Digital Marketing", count: "210 Pelamar" },
              { skill: "Desain Grafis (UI/UX)", count: "150 Pelamar" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between w-full"
              >
                <span className="font-semibold text-slate-800 text-[0.7rem]">
                  {item.skill}
                </span>
                <span className="text-[0.65rem] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* LOWONGAN TERBANYAK DILAMAR (2 SPAN) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-teal-600" />
                Lowongan Paling Populer (Terbanyak Dilamar)
              </h2>
              <p className="text-[0.65rem] text-slate-400 mt-0.5">
                Daftar lowongan kerja yang mendapatkan minat pelamar tertinggi.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[0.65rem] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-2.5 px-3">Posisi Lowongan</th>
                  <th className="py-2.5 px-3">Perusahaan</th>
                  <th className="py-2.5 px-3 text-center">Jumlah Lamaran</th>
                  <th className="py-2.5 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {[
                  {
                    id: "JOB-001",
                    title: "Frontend Web Developer",
                    company: "PT Samawa Digital",
                    applicants: 240,
                    status: "Aktif",
                  },
                  {
                    id: "JOB-008",
                    title: "Staff Admin Operational",
                    company: "CV Sumbawa Makmur",
                    applicants: 198,
                    status: "Aktif",
                  },
                  {
                    id: "JOB-012",
                    title: "Operator Alat Berat (Excavator)",
                    company: "PT Tambang West Nusa",
                    applicants: 175,
                    status: "Aktif",
                  },
                  {
                    id: "JOB-015",
                    title: "Junior Accountant",
                    company: "CV Berkah Teknik",
                    applicants: 142,
                    status: "Tutup",
                  },
                ].map((job) => (
                  <tr
                    key={job.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3 px-3">
                      <p className="font-bold text-slate-900">{job.title}</p>
                      <span className="text-[0.65rem] text-slate-400">
                        ID: {job.id}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-800">
                      {job.company}
                    </td>
                    <td className="py-3 px-3 text-center">
                      {/* Modern Badge Count Cell */}
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.7rem] font-bold bg-teal-50 text-teal-700 border border-teal-200/80 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                        {job.applicants} Pelamar
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <a
                        href={`/dashboard/disnakertrans/lowongan/${job.id}`}
                        className="text-teal-600 hover:underline font-semibold text-[0.7rem] inline-flex items-center gap-0.5"
                      >
                        Detail <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

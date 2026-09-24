"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Clock,
  Power,
  Copy,
  Eye,
  Bookmark,
  Users,
  CheckCircle2,
  Hourglass,
  UserCheck,
  Calendar,
  Briefcase,
  MapPin,
  FileText,
  History,
  Search,
  Filter,
  ChevronRight,
} from "lucide-react";

export default function DetailLowonganPerusahaanPage() {
  // Dummy State untuk Status Lowongan
  const [status, setStatus] = useState<"Aktif" | "Nonaktif" | "Draft">("Aktif");

  return (
    <div className="bg-slate-50/50 text-slate-800 text-[13px]">
      <div className="mx-auto space-y-5">
        {/* Top Navigation / Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/perusahaan/lowongan"
            className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Kelola Lowongan
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
              ID Lowongan: #JOB-89201
            </span>
          </div>
        </div>

        {/* Header & Quick Action Card */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl md:text-2xl font-bold text-slate-900">
                  Senior Frontend Developer
                </h1>
                <span
                  className={`px-2.5 py-0.5 text-[10px] font-semibold rounded-full ${
                    status === "Aktif"
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                      : "bg-rose-50 text-rose-600 border border-rose-200"
                  }`}
                >
                  {status}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text.text-[11px] md:text-xs text-slate-500 mt-1.5">
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" /> Teknologi
                  Informasi
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> Sumbawa, NTB
                  (Hybrid)
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />{" "}
                  Dipublikasi: 12 Mei 2026
                </span>
                <span className="flex items-center gap-1 text-amber-600 font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-500" /> Batas: 30
                  Juni 2026
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button className="flex items-center gap-1 px-3 py-1.5 text-[11px] md:text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-all shadow-sm">
                <Edit className="w-3.5 h-3.5 text-slate-500" /> Edit
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 text-[11px] md:text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-all shadow-sm">
                <Clock className="w-3.5 h-3.5 text-amber-500" /> Perpanjang Masa
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 text-[11px] md:text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-all shadow-sm">
                <Copy className="w-3.5 h-3.5 text-blue-500" /> Duplikasi
              </button>
              <button
                onClick={() =>
                  setStatus(status === "Aktif" ? "Nonaktif" : "Aktif")
                }
                className={`flex items-center gap-1 px-3 py-1.5 text-[11px] md:text-xs font-medium rounded-lg transition-all shadow-sm ${
                  status === "Aktif"
                    ? "bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100"
                    : "bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100"
                }`}
              >
                <Power className="w-3.5 h-3.5" />{" "}
                {status === "Aktif" ? "Nonaktifkan" : "Aktifkan"}
              </button>
            </div>
          </div>

          {/* Key Metrics / Grid Statistik Khusus */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {[
              {
                label: "Total Dilihat",
                value: "1,240",
                icon: Eye,
                color: "text-slate-600",
                bg: "bg-slate-100",
              },
              {
                label: "Total Disimpan",
                value: "318",
                icon: Bookmark,
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                label: "Total Pelamar",
                value: "84",
                icon: Users,
                color: "text-indigo-600",
                bg: "bg-indigo-50",
              },
              {
                label: "Memenuhi Kualifikasi",
                value: "42",
                icon: CheckCircle2,
                color: "text-emerald-600",
                bg: "bg-emerald-50",
              },
              {
                label: "Proses Seleksi",
                value: "18",
                icon: Hourglass,
                color: "text-amber-600",
                bg: "bg-amber-50",
              },
              {
                label: "Kandidat Diterima",
                value: "2",
                icon: UserCheck,
                color: "text-teal-600",
                bg: "bg-teal-50",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-medium text-slate-500 leading-tight">
                    {stat.label}
                  </span>
                  <div className={`p-1 rounded-md ${stat.bg}`}>
                    <stat.icon className={`w-3 h-3 ${stat.color}`} />
                  </div>
                </div>
                <span className="text-base font-bold text-slate-900">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Grid Konten Utama: Detail Lowongan & Kandidat/Riwayat */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Kolom Kiri: Detail Deskripsi & Kualifikasi */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm space-y-5">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2.5">
                <FileText className="w-4 h-4 text-indigo-600" /> Detail &
                Spesifikasi Lowongan
              </h2>

              {/* Deskripsi Pekerjaan */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-semibold text-slate-900">
                  Deskripsi Pekerjaan
                </h3>
                <p className="text-[12px] text-slate-600 leading-relaxed">
                  Kami sedang mencari Senior Frontend Developer yang
                  berpengalaman untuk memimpin pengembangan platform digital
                  modern. Anda akan bertanggung jawab untuk merancang antarmuka
                  pengguna yang responsif, berkinerja tinggi, dan terintegrasi
                  dengan RESTful/GraphQL API.
                </p>
                <ul className="list-disc list-inside text-[12px] text-slate-600 space-y-1 pl-0.5">
                  <li>
                    Mengembangkan komponen UI re-usable berbasis React &
                    Next.js.
                  </li>
                  <li>
                    Bekerja sama dengan tim UX/UI designer untuk
                    mengimplementasikan design system.
                  </li>
                  <li>
                    Melakukan optimasi performa aplikasi web client-side dan
                    server-side.
                  </li>
                </ul>
              </div>

              {/* Kualifikasi */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <h3 className="text-xs font-semibold text-slate-900">
                  Kualifikasi
                </h3>
                <ul className="list-disc list-inside text-[12px] text-slate-600 space-y-1 pl-0.5">
                  <li>
                    Pengalaman minimal 3 tahun dengan Next.js, React, dan
                    TypeScript.
                  </li>
                  <li>
                    Mahir mengimplementasikan styling dengan Tailwind CSS dan
                    Framer Motion.
                  </li>
                  <li>
                    Memiliki pemahaman mendalam terkait State Management
                    (Zustand/Redux).
                  </li>
                  <li>
                    Terbiasa dengan Version Control (Git) dan workflow agile
                    development.
                  </li>
                </ul>
              </div>
            </div>

            {/* Daftar Kandidat Terbaru */}
            <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-600" />
                  <h2 className="text-sm font-bold text-slate-900">
                    Daftar Kandidat (84)
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari kandidat..."
                      className="pl-8 pr-2.5 py-1 text-[11px] bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                  <button className="p-1 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
                    <Filter className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Candidate Items */}
              <div className="divide-y divide-slate-100">
                {[
                  {
                    name: "Ahmad Rizky",
                    role: "Frontend Engineer",
                    exp: "4 Tahun",
                    status: "Seleksi Berkas",
                    match: "95%",
                  },
                  {
                    name: "Siti Nurhaliza",
                    role: "UI/UX Developer",
                    exp: "3 Tahun",
                    status: "Wawancara HR",
                    match: "88%",
                  },
                  {
                    name: "Budi Pratama",
                    role: "React Developer",
                    exp: "2 Tahun",
                    status: "Ditolak",
                    match: "60%",
                  },
                ].map((candidate, idx) => (
                  <div
                    key={idx}
                    className="py-2.5 flex items-center justify-between hover:bg-slate-50/80 px-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-[10px] flex items-center justify-center">
                        {candidate.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-[12px] font-semibold text-slate-900">
                          {candidate.name}
                        </h4>
                        <p className="text-[10px] text-slate-500">
                          {candidate.role} • Pengalaman {candidate.exp}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                        Match {candidate.match}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full py-1.5 text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50/50 hover:bg-indigo-50 rounded-lg transition-colors">
                Lihat Semua Kandidat
              </button>
            </div>
          </div>

          {/* Kolom Kanan: Riwayat Perubahan & Informasi Tambahan */}
          <div className="space-y-5">
            <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm space-y-3.5">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2.5">
                <History className="w-4 h-4 text-indigo-600" /> Riwayat
                Perubahan
              </h2>

              <div className="relative pl-3.5 border-l border-slate-200 space-y-3.5 text-[11px]">
                {[
                  {
                    title: "Masa aktif diperpanjang",
                    time: "18 Mei 2026, 14:30",
                    user: "Admin Perusahaan",
                  },
                  {
                    title: "Status diubah menjadi Aktif",
                    time: "12 Mei 2026, 09:15",
                    user: "HR Manager",
                  },
                  {
                    title: "Lowongan dibuat (Draft)",
                    time: "10 Mei 2026, 11:00",
                    user: "HR Manager",
                  },
                ].map((log, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-[19px] top-1 w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-white" />
                    <p className="font-semibold text-slate-800">{log.title}</p>
                    <p className="text-slate-400 text-[10px] mt-0.5">
                      {log.time} • oleh{" "}
                      <span className="text-slate-600">{log.user}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

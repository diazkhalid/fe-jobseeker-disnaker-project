"use client";

import React from "react";
import Link from "next/link";
import {
  Search,
  Building2,
  FileText,
  Calendar,
  ArrowRight,
  Sparkles,
  Users,
  CheckCircle2,
} from "lucide-react";

export default function QuickAccessSection() {
  return (
    <section className="relative bg-slate-50/70 py-16 border-y border-slate-200/80 font-['Poppins',sans-serif] overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-200/80 px-3 py-1 text-[10px] font-semibold text-teal-700 mb-3 shadow-sm">
            <Sparkles className="h-3 w-3 text-teal-600" />
            <span>Pintasan Fitur Utama</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Apa yang Ingin Anda Lakukan Hari Ini?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
            Akses langsung ke layanan prioritas Disnakertrans Sumbawa tanpa
            harus mencari manual.
          </p>
        </div>

        {/* Bento Grid Layout (1 Main Hero Card + 3 Secondary Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
          {/* 1. HERO FEATURE CARD (Span 6) - Cari Lowongan */}
          <Link
            href="/lowongan"
            className="group relative lg:col-span-6 flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-7 shadow-xl shadow-slate-950/10 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Background Accent Glow */}
            <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-teal-500/20 blur-2xl group-hover:bg-teal-500/30 transition-all pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-6">
                <div className="p-3 rounded-2xl bg-teal-500 text-slate-950 font-bold shadow-lg shadow-teal-500/30">
                  <Search className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 backdrop-blur-md">
                  Paling Populer • Pencaker
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-teal-300 transition-colors">
                Cari Lowongan Kerja Terverifikasi
              </h3>
              <p className="text-xs text-slate-300 mt-2 max-w-md leading-relaxed">
                Eksplor ratusan pekerjaan aktif di seluruh wilayah Kabupaten
                Sumbawa dari perusahaan resmi.
              </p>

              {/* Quick Tag Badges */}
              <div className="mt-4 flex flex-wrap items-center gap-1.5 text-[10px] text-slate-400">
                <span className="inline-flex items-center gap-1 bg-slate-800/80 border border-slate-700/60 px-2 py-0.5 rounded-md text-slate-300">
                  <CheckCircle2 className="h-3 w-3 text-teal-400" /> Filter
                  Kecamatan
                </span>
                <span className="inline-flex items-center gap-1 bg-slate-800/80 border border-slate-700/60 px-2 py-0.5 rounded-md text-slate-300">
                  <CheckCircle2 className="h-3 w-3 text-teal-400" /> Update
                  Harian
                </span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs font-semibold text-teal-300">
              <span>Mulai Cari Pekerjaan</span>
              <div className="p-1.5 rounded-full bg-teal-500/10 text-teal-300 group-hover:bg-teal-500 group-hover:text-slate-950 transition-all">
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>

          {/* RIGHT SIDE GRID (Span 6) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* 2. CARD: Pasang Lowongan (Span 2 / Full di right column) */}
            <Link
              href="/pasang-lowongan"
              className="group sm:col-span-2 flex flex-col justify-between rounded-3xl bg-white p-5 border border-slate-200/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/60 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700">
                    Untuk Perusahaan
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                  Pasang Lowongan Pekerjaan
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Rekrut kandidat berkualitas secara gratis dan publikasikan
                  loker perusahaan Anda.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-700 group-hover:text-amber-700">
                <span>Daftarkan Perusahaan</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>

            {/* 3. CARD: Buat Profil & CV */}
            <Link
              href="/buat-cv"
              className="group flex flex-col justify-between rounded-3xl bg-white p-5 border border-slate-200/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/60 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="p-2.5 rounded-2xl bg-teal-50 text-teal-600 border border-teal-100 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    <FileText className="h-4 w-4" />
                  </div>
                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700">
                    Pencaker
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  Buat Profil & CV
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Cetak Kartu Kuning (AK-1) & rapihkan profil lamaran.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-700 group-hover:text-teal-700">
                <span>Buat Sekarang</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>

            {/* 4. CARD: Agenda Job Fair */}
            <Link
              href="/job-fair"
              className="group flex flex-col justify-between rounded-3xl bg-white p-5 border border-slate-200/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/60 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="p-2.5 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700">
                    Umum
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                  Agenda Job Fair
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Jadwal bursa kerja offline & seminar karier Sumbawa.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-700 group-hover:text-sky-700">
                <span>Cek Jadwal</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

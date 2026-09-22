"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Briefcase,
  Building2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-20 pb-16 font-['Poppins',sans-serif]">
      {/* 1. BACKGROUND IMAGE WITH OVERLAY GRADIENT */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-0.jpg"
          alt="Samawa Karir Disnakertrans Sumbawa"
          fill
          priority
          className="object-cover object-center scale-105"
        />
        {/* Overlay Dark Navy Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/90 to-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
      </div>

      {/* Subtle Glow Backgrounds */}
      <div className="absolute top-1/4 left-10 -z-0 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 -z-0 h-80 w-80 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

      {/* 2. MAIN CONTAINER */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-12 lg:items-center">
          {/* LEFT COLUMN: Main Text & Search Widget */}
          <div className="lg:col-span-7">
            {/* Disnakertrans Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 border border-teal-500/20 px-3 py-1 text-[10px] font-semibold text-teal-300 backdrop-blur-md mb-5 shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-teal-400" />
              <span>Portal Resmi Disnakertrans Kabupaten Sumbawa</span>
              <span className="h-1 w-1 rounded-full bg-amber-400 ml-0.5" />
            </div>

            {/* Headline (Diturunkan 15%) */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              Satu Portal, Ribuan Peluang Karir{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-400 to-amber-300">
                Tanah Samawa
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-4 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Hubungkan potensi Anda dengan ratusan peluang kerja terverifikasi
              dari perusahaan terpercaya di Kabupaten Sumbawa dan sekitarnya.
            </p>

            {/* SEARCH WIDGET */}
            <div className="mt-6 rounded-2xl bg-white/95 backdrop-blur-md p-2 sm:p-2.5 shadow-2xl shadow-slate-950/60 border border-slate-200/80 max-w-2xl">
              <form className="flex flex-col sm:flex-row gap-2">
                {/* Input Kata Kunci */}
                <div className="flex flex-1 items-center gap-2 px-2.5 py-1.5 border-b sm:border-b-0 sm:border-r border-slate-200">
                  <Search className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Posisi, keahlian, atau perusahaan..."
                    className="w-full bg-transparent text-[11px] sm:text-xs text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
                  />
                </div>

                {/* Dropdown Kecamatan */}
                <div className="flex items-center gap-2 px-2.5 py-1.5 border-b sm:border-b-0 sm:border-r border-slate-200">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <select className="w-full bg-transparent text-[11px] sm:text-xs text-slate-700 focus:outline-none cursor-pointer font-medium">
                    <option value="">Semua Kecamatan</option>
                    <option value="sumbawa">Sumbawa</option>
                    <option value="unter-iwes">Unter Iwes</option>
                    <option value="labuhan-badas">Labuhan Badas</option>
                    <option value="lape">Lape</option>
                    <option value="plampang">Plampang</option>
                    <option value="alas">Alas</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-teal-700 text-teal-300 hover:text-white px-5 py-2.5 text-[11px] sm:text-xs font-semibold transition-all duration-300 shadow-md shadow-slate-900/20"
                >
                  <Search className="h-3.5 w-3.5" />
                  <span>Cari Loker</span>
                </button>
              </form>
            </div>

            {/* Kata Kunci Populer */}
            <div className="mt-3.5 flex flex-wrap items-center gap-1.5 text-[10px] text-slate-400">
              <span className="font-semibold text-slate-300">
                Pencarian Populer:
              </span>
              {[
                "Tambang",
                "Administrasi",
                "Pariwisata & Hotel",
                "BUMN",
                "PTPN",
              ].map((tag) => (
                <Link
                  key={tag}
                  href={`/lowongan?q=${encodeURIComponent(tag)}`}
                  className="rounded-lg bg-slate-900/80 hover:bg-slate-800 px-2 py-0.5 border border-slate-700/60 hover:border-teal-500/50 text-slate-300 hover:text-teal-300 transition-all"
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-slate-800/80 pt-5 max-w-xl">
              <div>
                <p className="text-lg sm:text-xl font-extrabold text-amber-400">
                  500+
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Lowongan Aktif
                </p>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-extrabold text-teal-400">
                  120+
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Mitra Perusahaan
                </p>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-extrabold text-white">
                  10.000+
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Pencari Kerja
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Dual CTA Cards (Pencaker & Perusahaan) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md rounded-3xl bg-slate-900/80 p-5 border border-slate-800/80 shadow-2xl backdrop-blur-xl">
              <div className="space-y-3.5">
                {/* 1. Card Pencari Kerja */}
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900 p-4 border border-slate-700/60 hover:border-teal-500/50 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 group-hover:bg-teal-600 group-hover:text-white transition-colors shrink-0">
                      <Briefcase className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xs font-bold text-white group-hover:text-teal-300 transition-colors">
                        Untuk Pencari Kerja
                      </h3>
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                        Buat profil profesional, cetak Kartu Kuning (AK-1)
                        online, dan lamar loker impian.
                      </p>
                      <Link
                        href="/daftar"
                        className="inline-flex items-center gap-1 mt-2.5 text-[11px] font-semibold text-teal-400 hover:text-teal-300"
                      >
                        <span>Daftar Pencaker</span>
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* 2. Card Perusahaan / Mitra */}
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900 p-4 border border-slate-700/60 hover:border-teal-500/50 transition-all duration-300">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-slate-700/50 text-slate-300 border border-slate-600/50 group-hover:bg-teal-600 group-hover:text-white transition-colors shrink-0">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xs font-bold text-white group-hover:text-teal-300 transition-colors">
                        Untuk Perusahaan & Mitra
                      </h3>
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                        Pasang loker gratis, verifikasi legalitas usaha, dan
                        rekrut talenta lokal berkualitas.
                      </p>
                      <Link
                        href="/pasang-lowongan"
                        className="inline-flex items-center gap-1 mt-2.5 text-[11px] font-semibold text-teal-400 hover:text-teal-300"
                      >
                        <span>Pasang Lowongan Kerja</span>
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Info Legalitas & Keamanan */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-[10px] text-slate-400">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>
                    Seluruh lowongan diawasi & diverifikasi oleh Disnakertrans
                    Sumbawa.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

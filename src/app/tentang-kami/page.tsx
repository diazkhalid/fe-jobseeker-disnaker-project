"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  Target,
  Users,
  Briefcase,
  Building2,
  ShieldCheck,
  Search,
  UserPlus,
  Send,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  HeartHandshake,
  CheckCircle2,
  GraduationCap,
  ArrowRight,
  FileBadge,
} from "lucide-react";

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 pt-8">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-app-navy-900 via-app-navy-800 to-slate-900 text-white p-8 sm:p-12 shadow-xl shadow-app-navy-950/10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-app-navy-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[0.675rem] font-medium text-app-navy-200">
              <Sparkles className="w-3.5 h-3.5 text-app-navy-300" />
              <span>Profil Platform Resmi</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold tracking-tight leading-tight text-white">
              Membangun Ekosistem Ketenagakerjaan Digital Sumbawa
            </h1>
            <p className="text-slate-300 text-[0.8rem] sm:text-[0.9rem] leading-relaxed font-normal">
              Samawa Karir hadir sebagai jembatan transformasi digital yang
              menghubungkan pencari kerja, penyedia kerja, dan pemerintah daerah
              untuk menciptakan lapangan kerja yang inklusif, transparan, dan
              berkelanjutan.
            </p>
          </div>
        </section>

        {/* OVERVIEW & LATAR BELAKANG GRID */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-app-navy-50 border border-app-navy-100 flex items-center justify-center text-app-navy-600">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Tentang Samawa Karir
              </h2>
              <p className="text-[0.8rem] text-slate-600 leading-relaxed">
                <strong className="text-slate-900 font-semibold">
                  Samawa Karir
                </strong>{" "}
                adalah portal resmi layanan informasi dan fasilitasi
                ketenagakerjaan terpadu di Kabupaten Sumbawa. Platform ini
                dikembangkan untuk memudahkan masyarakat Sumbawa dalam mengakses
                pasar kerja, program pelatihan keterampilan, serta agenda Bursa
                Kerja (Job Fair) secara online dan terintegrasi.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Latar Belakang
              </h2>
              <p className="text-[0.8rem] text-slate-600 leading-relaxed">
                Pertumbuhan angkatan kerja di Kabupaten Sumbawa memerlukan
                penyerapan tenaga kerja yang efektif. Sebelum hadirnya Samawa
                Karir, akses informasi lowongan kerja dan pelatihan tersebar
                secara terpisah. Platform ini hadir memangkas hambatan
                aksesibilitas serta mempercepat perjumpaan antara talenta lokal
                dan industri.
              </p>
            </div>
          </div>
        </section>

        {/* TUJUAN PLATFORM */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[0.675rem] font-bold uppercase tracking-wider text-app-navy-600 bg-app-navy-50 px-3 py-1 rounded-full border border-app-navy-100">
              Fokus Utama
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Tujuan Platform
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:-translate-y-1 transition-all duration-300 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-app-navy-50 flex items-center justify-center text-app-navy-700">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-[0.9rem]">
                Akses Database Akurat
              </h3>
              <p className="text-[0.675rem] text-slate-600 leading-relaxed">
                Menyediakan basis data lowongan kerja terverifikasi yang akurat
                dan mudah diakses bagi seluruh masyarakat Sumbawa.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:-translate-y-1 transition-all duration-300 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-[0.9rem]">
                Peningkatan SDM Lokal
              </h3>
              <p className="text-[0.675rem] text-slate-600 leading-relaxed">
                Meningkatkan kualitas SDM lokal melalui akses pelatihan
                sertifikasi dan program peningkatan keterampilan gratis.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:-translate-y-1 transition-all duration-300 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-app-navy-50 flex items-center justify-center text-app-navy-700">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-[0.9rem]">
                Transparansi Rekrutmen
              </h3>
              <p className="text-[0.675rem] text-slate-600 leading-relaxed">
                Mendorong transparansi proses rekrutmen perusahaan serta
                meminimalisir praktik penipuan lowongan kerja.
              </p>
            </div>
          </div>
        </section>

        {/* MANFAAT UNTUK PENGGUNA */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-10 text-white shadow-lg space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/80 pb-6">
            <div>
              <h2 className="text-xl font-bold">Manfaat Platform</h2>
              <p className="text-[0.675rem] text-slate-400 mt-1">
                Dirancang khusus untuk memenuhi kebutuhan dua entitas utama
              </p>
            </div>
            <Users className="w-8 h-8 text-app-navy-400 opacity-80" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-2xl space-y-3">
              <div className="inline-block p-2.5 bg-app-navy-500/10 text-app-navy-400 rounded-xl">
                <UserPlus className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">
                Untuk Pencari Kerja
              </h3>
              <ul className="space-y-2 text-[0.675rem] text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-app-navy-400 shrink-0" />
                  <span>Kemudahan membuat Resume Digital otomatis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-app-navy-400 shrink-0" />
                  <span>Melamar kerja cepat dalam satu klik</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-app-navy-400 shrink-0" />
                  <span>Notifikasi real-time status lamaran & pelatihan</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-2xl space-y-3">
              <div className="inline-block p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">
                Untuk Perusahaan / Pemberi Kerja
              </h3>
              <ul className="space-y-2 text-[0.675rem] text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Akses langsung ke talenta lokal berbakat</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sistem pengelolaan kandidat yang terstruktur</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Publikasi lowongan kerja resmi secara gratis</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* LAYANAN UTAMA */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-[0.675rem] font-bold uppercase tracking-wider text-app-navy-600">
              Fitur Utama
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              Layanan yang Tersedia
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2 hover:border-app-navy-500 transition-colors">
              <div className="p-2 w-fit rounded-lg bg-app-navy-50 text-app-navy-700">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-[0.8rem]">
                Lowongan Kerja
              </h3>
              <p className="text-[0.675rem] text-slate-500 leading-relaxed">
                Pencarian loker berdasarkan industri, sistem kerja, dan
                kualifikasi pendidikan.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2 hover:border-app-navy-500 transition-colors">
              <div className="p-2 w-fit rounded-lg bg-app-navy-50 text-app-navy-700">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-[0.8rem]">
                Direktori Perusahaan
              </h3>
              <p className="text-[0.675rem] text-slate-500 leading-relaxed">
                Profil lengkap mitra perusahaan terverifikasi di Kabupaten
                Sumbawa.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2 hover:border-app-navy-500 transition-colors">
              <div className="p-2 w-fit rounded-lg bg-app-navy-50 text-app-navy-700">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-[0.8rem]">
                Informasi Karir
              </h3>
              <p className="text-[0.675rem] text-slate-500 leading-relaxed">
                Jadwal Job Fair, pelatihan sertifikasi BLK, workshop, dan
                seminar.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2 hover:border-app-navy-500 transition-colors">
              <div className="p-2 w-fit rounded-lg bg-app-navy-50 text-app-navy-700">
                <FileBadge className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-[0.8rem]">
                Kartu AK/1
              </h3>
              <p className="text-[0.675rem] text-slate-500 leading-relaxed">
                Layanan pengajuan Kartu Kuning terintegrasi Dinas Tenaga Kerja.
              </p>
            </div>
          </div>
        </section>

        {/* CARA KERJA & PERAN GOVERNMENT */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-app-navy-600" />
              Cara Kerja Samawa Karir
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="text-[0.675rem] font-bold text-app-navy-700 bg-app-navy-100/60 px-2.5 py-1 rounded-full inline-block">
                  Langkah 1
                </span>
                <p className="text-[0.675rem] text-slate-700 font-medium leading-relaxed">
                  Buat akun dan lengkapi profil resume digital Anda secara
                  lengkap.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="text-[0.675rem] font-bold text-app-navy-700 bg-app-navy-100/60 px-2.5 py-1 rounded-full inline-block">
                  Langkah 2
                </span>
                <p className="text-[0.675rem] text-slate-700 font-medium leading-relaxed">
                  Cari lowongan kerja atau agenda pelatihan sesuai minat dan
                  kualifikasi.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <span className="text-[0.675rem] font-bold text-app-navy-700 bg-app-navy-100/60 px-2.5 py-1 rounded-full inline-block">
                  Langkah 3
                </span>
                <p className="text-[0.675rem] text-slate-700 font-medium leading-relaxed">
                  Kirim lamaran secara langsung dan pantau perkembangannya
                  realtime.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-app-navy-900 text-white p-8 rounded-3xl shadow-md space-y-4">
            <div className="w-10 h-10 rounded-xl bg-app-navy-800 flex items-center justify-center text-app-navy-300">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold">Peran Disnakertrans</h3>
            <p className="text-[0.675rem] text-app-navy-100/80 leading-relaxed">
              Dinas Tenaga Kerja dan Transmigrasi Kabupaten Sumbawa bertindak
              sebagai pembina, pengawas, serta verifikator utama. Disnakertrans
              memastikan setiap perusahaan terdaftar legal dan mengawasi
              pelaksanaan pelatihan.
            </p>
          </div>
        </section>

        {/* KOMITMEN & KONTAK */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl bg-app-navy-50/50 border border-app-navy-100 space-y-3">
            <div className="flex items-center gap-2 text-app-navy-800 font-bold text-base">
              <ShieldCheck className="w-5 h-5 text-app-navy-600" />
              Komitmen Kami
            </div>
            <p className="text-[0.675rem] sm:text-[0.8rem] text-slate-600 leading-relaxed">
              Kami berkomitmen menyajikan layanan ketenagakerjaan yang inklusif,
              aman, <strong>gratis bagi pencari kerja</strong>, serta menjunjung
              tinggi kerahasiaan data pribadi sesuai dengan peraturan
              perundang-undangan yang berlaku.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <Phone className="w-5 h-5 text-app-navy-600" />
              Kontak & Center Layanan
            </div>

            <div className="space-y-2 text-[0.675rem] text-slate-600">
              <p className="font-semibold text-slate-800">
                Dinas Tenaga Kerja & Transmigrasi Kabupaten Sumbawa
              </p>
              <div className="flex items-start gap-2 text-slate-500">
                <MapPin className="w-4 h-4 text-app-navy-600 shrink-0 mt-0.5" />
                <span>Jl. Lintas Sumbawa - Bima Km 3, Sumbawa Besar, NTB</span>
              </div>

              <div className="pt-2 flex flex-wrap gap-4 font-medium text-app-navy-700">
                <a
                  href="tel:+6281234567890"
                  className="hover:underline flex items-center gap-1.5 bg-app-navy-50 px-3 py-1.5 rounded-lg border border-app-navy-100"
                >
                  <Phone className="w-3.5 h-3.5" /> +62 812-3456-7890
                </a>
                <a
                  href="mailto:disnakertrans@sumbawakab.go.id"
                  className="hover:underline flex items-center gap-1.5 bg-app-navy-50 px-3 py-1.5 rounded-lg border border-app-navy-100"
                >
                  <Mail className="w-3.5 h-3.5" />{" "}
                  disnakertrans@sumbawakab.go.id
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

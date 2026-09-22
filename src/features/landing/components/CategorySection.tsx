"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Laptop,
  Calculator,
  TrendingUp,
  Hotel,
  Sprout,
  Fish,
  HardHat,
  Factory,
  GraduationCap,
  ArrowRight,
  Grid2X2,
  CheckCircle2,
  Check,
  Sparkles,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  count: number;
  icon: React.ElementType;
  href: string;
  desc: string;
  // Menambahkan properti aksen warna kustom untuk tiap kategori
  accentColor: "teal" | "amber";
}

const categories: Category[] = [
  {
    id: "admin",
    name: "Administrasi & Perkantoran",
    count: 42,
    icon: Briefcase,
    href: "/lowongan?kategori=administrasi",
    desc: "Sekretaris, HRD, Data Entry, dan Operasional Kantor.",
    accentColor: "teal",
  },
  {
    id: "it",
    name: "Teknologi Informasi",
    count: 18,
    icon: Laptop,
    href: "/lowongan?kategori=it",
    desc: "Web Developer, Network Engineer, dan IT Support.",
    accentColor: "amber",
  },
  {
    id: "finance",
    name: "Akuntansi & Keuangan",
    count: 29,
    icon: Calculator,
    href: "/lowongan?kategori=akuntansi",
    desc: "Auditor, Staff Akuntansi, Kasir, dan Finance Analyst.",
    accentColor: "teal",
  },
  {
    id: "marketing",
    name: "Penjualan & Pemasaran",
    count: 35,
    icon: TrendingUp,
    href: "/lowongan?kategori=pemasaran",
    desc: "Sales Executive, Digital Marketer, dan Social Media.",
    accentColor: "amber",
  },
  {
    id: "hospitality",
    name: "Pariwisata & Perhotelan",
    count: 24,
    icon: Hotel,
    href: "/lowongan?kategori=pariwisata",
    desc: "Front Office, Housekeeping, Chef, dan Tour Guide.",
    accentColor: "teal",
  },
  {
    id: "agriculture",
    name: "Pertanian & Perkebunan",
    count: 31,
    icon: Sprout,
    href: "/lowongan?kategori=pertanian",
    desc: "Agronomis, Agrispesialis, dan Pengawas Lapangan.",
    accentColor: "amber",
  },
  {
    id: "fishery",
    name: "Perikanan & Kelautan",
    count: 15,
    icon: Fish,
    href: "/lowongan?kategori=perikanan",
    desc: "Budidaya Perikanan, Logistik Hasil Laut, dan Teknisi.",
    accentColor: "teal",
  },
  {
    id: "construction",
    name: "Konstruksi & Teknik",
    count: 27,
    icon: HardHat,
    href: "/lowongan?kategori=konstruksi",
    desc: "Teknik Sipil, Surveyor, Drafter, dan Safety Officer.",
    accentColor: "amber",
  },
  {
    id: "manufacturing",
    name: "Manufaktur & Produksi",
    count: 20,
    icon: Factory,
    href: "/lowongan?kategori=manufaktur",
    desc: "Operator Mesin, QC, Staff Gudang, dan Supervisor.",
    accentColor: "teal",
  },
  {
    id: "education-health",
    name: "Pendidikan & Kesehatan",
    count: 19,
    icon: GraduationCap,
    href: "/lowongan?kategori=pendidikan-kesehatan",
    desc: "Guru, Dosen, Perawat, Apoteker, dan Tenaga Medis.",
    accentColor: "amber",
  },
];

export default function CategorySection() {
  const [activeCategory, setActiveCategory] = useState<Category>(categories[0]);

  return (
    <section className="relative bg-slate-800 py-16 border-t border-slate-700/80 font-['Poppins',sans-serif] overflow-hidden">
      {/* Background Subtle Gradient Blobs untuk menambah dimensi warna */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-[10px] font-semibold text-amber-400 mb-2">
              <Sparkles className="h-3 w-3 text-amber-400" />
              <span>Eksplor Sektor Kerja</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Pilih Bidang Pekerjaan Anda
            </h2>
            <p className="mt-1 text-xs text-slate-300 max-w-xl">
              Klik kategori di bawah untuk melihat ringkasan lowongan kerja
              aktif di Sumbawa.
            </p>
          </div>

          <Link
            href="/kategori"
            className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-teal-300 hover:text-teal-200 transition-colors group shrink-0"
          >
            <span>Lihat Semua Kategori</span>
            <div className="p-1 rounded-full bg-slate-900/60 border border-slate-700 group-hover:border-teal-400/50 group-hover:bg-teal-500/10 transition-all">
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: Structured Category List Grid (Span 7) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {categories.map((cat) => {
              const IconComponent = cat.icon;
              const isActive = activeCategory.id === cat.id;

              // Style dinamis berdasarkan warna aksen kategori (Teal / Amber)
              const activeBgClass =
                cat.accentColor === "amber"
                  ? "bg-amber-400 text-slate-950 border-amber-300 shadow-amber-500/20"
                  : "bg-teal-400 text-slate-950 border-teal-300 shadow-teal-500/20";

              const hoverBorderClass =
                cat.accentColor === "amber"
                  ? "hover:border-amber-500/40 hover:text-amber-300"
                  : "hover:border-teal-500/40 hover:text-teal-300";

              const iconActiveBg =
                cat.accentColor === "amber"
                  ? "bg-slate-950 text-amber-400"
                  : "bg-slate-950 text-teal-400";

              const badgeActiveStyle =
                cat.accentColor === "amber"
                  ? "bg-slate-950/20 text-slate-950 border-slate-950/30"
                  : "bg-slate-950/20 text-slate-950 border-slate-950/30";

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`group relative flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                    isActive
                      ? `${activeBgClass} shadow-md font-semibold`
                      : `bg-slate-900/60 ${hoverBorderClass} text-slate-200 border-slate-700/70 hover:bg-slate-900/90`
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    {/* Icon Container */}
                    <div
                      className={`p-2 rounded-xl shrink-0 transition-colors ${
                        isActive
                          ? iconActiveBg
                          : cat.accentColor === "amber"
                            ? "bg-slate-800 text-amber-400/80 border border-slate-700 group-hover:border-amber-400/40"
                            : "bg-slate-800 text-teal-400/80 border border-slate-700 group-hover:border-teal-400/40"
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                    </div>

                    {/* Category Name */}
                    <span
                      className={`text-xs truncate ${
                        isActive
                          ? "text-slate-950 font-bold"
                          : "text-slate-100 font-medium"
                      }`}
                    >
                      {cat.name}
                    </span>
                  </div>

                  {/* Right Side Badge & Active State Indicator */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                        isActive
                          ? badgeActiveStyle
                          : "bg-slate-800/80 text-slate-300 border border-slate-700"
                      }`}
                    >
                      {cat.count}
                    </span>

                    {/* Indicator Check Icon */}
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-slate-950 text-white opacity-100"
                          : "opacity-0 group-hover:opacity-30 text-slate-400"
                      }`}
                    >
                      <Check className="h-2.5 w-2.5 mt-[1px] stroke-[3]" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Live Preview Box Panel (Span 5) */}
          <div className="lg:col-span-5 sticky top-24">
            <div
              className={`rounded-3xl bg-slate-900/95 p-6 text-white shadow-xl border transition-all duration-300 ${
                activeCategory.accentColor === "amber"
                  ? "border-amber-500/30 shadow-amber-500/5"
                  : "border-teal-500/30 shadow-teal-500/5"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-2xl border ${
                    activeCategory.accentColor === "amber"
                      ? "bg-amber-500/10 text-amber-400 border-amber-400/20"
                      : "bg-teal-500/10 text-teal-300 border-teal-400/20"
                  }`}
                >
                  {React.createElement(activeCategory.icon, {
                    className: "h-6 w-6",
                  })}
                </div>
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    activeCategory.accentColor === "amber"
                      ? "bg-amber-400 text-slate-950"
                      : "bg-teal-400 text-slate-950"
                  }`}
                >
                  {activeCategory.count} Lowongan Tersedia
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-2">
                {activeCategory.name}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                {activeCategory.desc}
              </p>

              <div className="space-y-2 mb-6 text-[11px] text-slate-300 border-t border-slate-700/80 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className={`h-3.5 w-3.5 shrink-0 ${
                      activeCategory.accentColor === "amber"
                        ? "text-amber-400"
                        : "text-teal-400"
                    }`}
                  />
                  <span>Diverifikasi Disnakertrans Sumbawa</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className={`h-3.5 w-3.5 shrink-0 ${
                      activeCategory.accentColor === "amber"
                        ? "text-amber-400"
                        : "text-teal-400"
                    }`}
                  />
                  <span>Pembaruan informasi lowongan berkala</span>
                </div>
              </div>

              <Link
                href={activeCategory.href}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-xl text-slate-950 text-xs font-bold py-3 px-4 transition-all shadow-md ${
                  activeCategory.accentColor === "amber"
                    ? "bg-amber-400 hover:bg-amber-300 shadow-amber-500/20"
                    : "bg-teal-400 hover:bg-teal-300 shadow-teal-500/20"
                }`}
              >
                <span>Lihat Lowongan {activeCategory.name}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile View: See All Button */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/kategori"
            className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold py-3 px-4 shadow-sm hover:bg-slate-800 transition-colors"
          >
            <span>Lihat Semua Kategori</span>
            <ArrowRight className="h-3.5 w-3.5 text-amber-400" />
          </Link>
        </div>
      </div>
    </section>
  );
}

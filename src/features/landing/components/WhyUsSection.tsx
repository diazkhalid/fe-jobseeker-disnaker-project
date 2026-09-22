"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  SearchCheck,
  Building2,
  Send,
  Activity,
  HeartHandshake,
  GraduationCap,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const benefits = [
  {
    title: "Mudah Ditemukan",
    desc: "Filter presisi berbasis kecamatan dan bidang kerja.",
    icon: SearchCheck,
    accent: "teal",
  },
  {
    title: "Loker Terpercaya",
    desc: "Terverifikasi bebas penipuan dan informasi palsu.",
    icon: ShieldCheck,
    accent: "amber",
  },
  {
    title: "Perusahaan Resmi",
    desc: "Kemitraan langsung dengan Disnakertrans Sumbawa.",
    icon: Building2,
    accent: "teal",
  },
  {
    title: "Melamar 1-Klik",
    desc: "Proses cepat dengan CV digital tanpa berkas fisik.",
    icon: Send,
    accent: "amber",
  },
  {
    title: "Pantau Status",
    desc: "Notifikasi panggilan wawancara & rekrutmen real-time.",
    icon: Activity,
    accent: "teal",
  },
  {
    title: "Fokus Lokal",
    desc: "Mengutamakan penyerapan tenaga kerja warga Sumbawa.",
    icon: HeartHandshake,
    accent: "amber",
  },
  {
    title: "Info Pelatihan",
    desc: "Akses ke program sertifikasi keahlian & Job Fair.",
    icon: GraduationCap,
    accent: "teal",
  },
];

export default function WhyUsSection() {
  return (
    <section className="relative bg-slate-800 py-24 border-t border-slate-700/80 font-['Poppins',sans-serif]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header ringkas */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-0.5 text-[10px] font-semibold text-amber-400 mb-2">
              <Sparkles className="h-3 w-3" />
              <span>Keunggulan Platform</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Mengapa Menggunakan Samawa Karir?
            </h2>
          </div>

          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-300 hover:text-teal-200 transition-colors shrink-0"
          >
            <span>Daftar Sekarang</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Minimalist Grid (Tanpa Card) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-7 border-t border-slate-700/60 pt-8">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            const isAmber = item.accent === "amber";

            return (
              <div key={index} className="flex items-start gap-3.5 group">
                {/* Icon Circle */}
                <div
                  className={`p-2.5 rounded-xl border shrink-0 transition-all ${
                    isAmber
                      ? "bg-amber-500/10 border-amber-500/20 text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950"
                      : "bg-teal-500/10 border-teal-500/20 text-teal-300 group-hover:bg-teal-400 group-hover:text-slate-950"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-[11px] text-slate-300 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

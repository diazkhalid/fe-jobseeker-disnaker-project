"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home, HelpCircle } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm text-center space-y-6">
        {/* Ikon Peringatan dengan Efek Glow Halus */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center bg-amber-50 rounded-2xl border border-amber-200/60 shadow-inner">
          <div className="absolute inset-0 bg-amber-400/10 rounded-2xl blur-xl" />
          <ShieldAlert className="w-10 h-10 text-amber-600 relative z-10" />
        </div>

        {/* Kode & Judul Error */}
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase tracking-wider rounded-full">
            Error 403 • Akses Ditolak
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Anda Tidak Memiliki Akses
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Maaf, halaman atau fitur ini dibatasi hak aksesnya. Pastikan Anda
            masuk menggunakan akun dengan peran yang sesuai.
          </p>
        </div>

        {/* Tombol Aksi Navigasi */}
        <div className="pt-2 space-y-2.5">
          <Link
            href="/dashboard"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-app-navy-700 hover:bg-app-navy-900 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda / Dashboard</span>
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            <span>Halaman Sebelumnya</span>
          </button>
        </div>

        {/* Bantuan / Kontak Support */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>
            Butuh bantuan?{" "}
            <a
              href="/bantuan"
              className="text-app-navy-700 font-bold hover:underline"
            >
              Hubungi Tim Dukungan
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

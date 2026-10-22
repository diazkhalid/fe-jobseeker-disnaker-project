"use client";

import React, { useState } from "react";
import {
  Lock,
  ShieldCheck,
  Eye,
  Database,
  UserCheck,
  Share2,
  Bell,
  FileCheck2,
  Download,
  ArrowRight,
  Info,
} from "lucide-react";

interface PrivacyPolicyContentProps {
  hasAgreed: boolean;
  setHasAgreed: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseModal: () => void;
}

export default function PrivacyPolicyContent({
  hasAgreed,
  setHasAgreed,
  onCloseModal,
}: PrivacyPolicyContentProps) {
  return (
    <div className="space-y-6 text-xs text-slate-700">
      {/* HEADER SECTION */}
      <div className="border-b border-slate-100 pb-4 space-y-2">
        <div className="flex items-center gap-2 text-teal-600 font-bold uppercase tracking-wider text-[11px]">
          <Lock className="w-4 h-4" />
          <span>Perlindungan Data Pribadi</span>
        </div>
        <h2 className="text-xl font-extrabold text-slate-900">
          Kebijakan Privasi & Perlindungan Data
        </h2>
        <p className="text-slate-500 text-xs">
          Terakhir diperbarui:{" "}
          <span className="font-semibold text-slate-700">23 Oktober 2026</span>
        </p>
      </div>

      {/* BANNER RINGKAS PRIVASI */}
      <div className="p-4 bg-teal-50/60 border border-teal-100 rounded-xl flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
        <p className="text-slate-600 leading-relaxed text-[11px]">
          Privasi Anda sangat penting bagi kami. Kebijakan Privasi ini
          menjelaskan bagaimana platform kami mengumpulkan, menggunakan,
          menyimpan, dan melindungi informasi pribadi Anda sesuai dengan
          Undang-Undang Perlindungan Data Pribadi yang berlaku.
        </p>
      </div>

      {/* ISI PASAL KEBIJAKAN PRIVASI */}
      <div className="space-y-6">
        {/* Poin 1 */}
        <section className="space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs flex items-center justify-center shrink-0">
              1
            </span>
            <div className="flex items-center gap-1.5">
              <Database className="w-4 h-4 text-teal-600" />
              <h3>Informasi yang Kami Kumpulkan</h3>
            </div>
          </div>
          <div className="pl-8 space-y-1.5 text-slate-600 leading-relaxed">
            <p>
              • <strong>Data Identitas Diri:</strong> Nama lengkap, NIK/KTP,
              tanggal lahir, jenis kelamin, dan foto profil.
            </p>
            <p>
              • <strong>Informasi Kontak:</strong> Alamat email, nomor
              telepon/WhatsApp, dan domisili (provinsi, kabupaten/kota, hingga
              kecamatan).
            </p>
            <p>
              • <strong>Profil Profesional & Dokumen:</strong> Riwayat
              pendidikan, pengalaman kerja, keahlian (*skills*), berkas CV,
              ijazah, dan sertifikat pendukung.
            </p>
            <p>
              • <strong>Preferensi Karir:</strong> Posisi yang diinginkan,
              ekspektasi gaji, jenis/sistem kerja pilihan, dan status pencarian
              kerja.
            </p>
          </div>
        </section>

        {/* Poin 2 */}
        <section className="space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs flex items-center justify-center shrink-0">
              2
            </span>
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-teal-600" />
              <h3>Penggunaan Informasi Anda</h3>
            </div>
          </div>
          <div className="pl-8 space-y-1.5 text-slate-600 leading-relaxed">
            <p>
              • Memproses pendaftaran akun dan melakukan verifikasi keaslian
              dokumen kependudukan (KTP/NIK).
            </p>
            <p>
              • Mencocokkan profil dan preferensi pekerjaan Anda secara otomatis
              dengan lowongan yang sesuai (*Match Score*).
            </p>
            <p>
              • Mengirimkan notifikasi rekomendasi lowongan kerja terbaru via
              email atau pesan WhatsApp.
            </p>
            <p>
              • Menyusun statistik dan laporan agregat tenaga kerja untuk
              kebutuhan analisis Dinas Tenaga Kerja (tanpa mempublikasikan data
              spesifik secara terbuka).
            </p>
          </div>
        </section>

        {/* Poin 3 */}
        <section className="space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs flex items-center justify-center shrink-0">
              3
            </span>
            <div className="flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-teal-600" />
              <h3>Pembagian Data Kepada Pihak Ketiga</h3>
            </div>
          </div>
          <div className="pl-8 space-y-1.5 text-slate-600 leading-relaxed">
            <p>
              • <strong>Perusahaan / Perusahaan Pemberi Kerja:</strong> Profil,
              CV, dan berkas Anda hanya akan dibagikan kepada perusahaan saat
              Anda mengajukan lamaran atau saat perusahaan mencari kandidat yang
              cocok.
            </p>
            <p>
              • <strong>Pemerintah / Pengawas Admin:</strong> Akses data
              internal untuk keperluan verifikasi status ketenagakerjaan dan
              pengawasan program resmi.
            </p>
            <p>
              • Kami <strong>TIDAK AKAN PERNAH</strong> menjual, menyewakan,
              atau memperjualbelikan data pribadi Anda kepada pihak ketiga untuk
              keperluan komersial/pemasaran tanpa izin tertulis Anda.
            </p>
          </div>
        </section>

        {/* Poin 4 */}
        <section className="space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs flex items-center justify-center shrink-0">
              4
            </span>
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-teal-600" />
              <h3>Keamanan & Hak Pemilik Data</h3>
            </div>
          </div>
          <div className="pl-8 space-y-1.5 text-slate-600 leading-relaxed">
            <p>
              • Seluruh data disimpan dalam server aman yang dilindungi enkripsi
              standar industri.
            </p>
            <p>
              • Anda berhak memperbarui, mengubah, atau menghapus informasi
              profil dan berkas lamaran Anda kapan saja melalui menu{" "}
              <strong>Profil Saya</strong>.
            </p>
            <p>
              • Anda dapat mengajukan penutupan akun dan penghapusan data
              pribadi secara permanen melalui layanan bantuan atau admin
              platform.
            </p>
          </div>
        </section>
      </div>

      {/* CHECKBOX PERSETUJUAN */}
      <div className="pt-4 border-t border-slate-100 space-y-4">
        <label className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100/80 transition-all">
          <input
            type="checkbox"
            checked={hasAgreed}
            onChange={(e) => setHasAgreed(e.target.checked)}
            className="mt-0.5 w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500 cursor-pointer"
          />
          <span className="text-xs text-slate-700 leading-snug">
            Saya telah membaca, memahami, dan menyetujui seluruh ketentuan dalam{" "}
            <strong className="text-slate-900">
              Kebijakan Privasi & Perlindungan Data
            </strong>{" "}
            ini.
          </span>
        </label>

        {/* TOMBOL AKSI */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Kebijakan Privasi (PDF)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onCloseModal();
            }}
            disabled={!hasAgreed}
            className="w-full cursor-pointer sm:w-auto px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <span>Saya Mengerti & Setuju</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

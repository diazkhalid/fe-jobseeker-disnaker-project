"use client";

import React, { useState } from "react";
import {
  FileText,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Lock,
  UserCheck,
  HelpCircle,
  ArrowRight,
  Download,
} from "lucide-react";

interface TermsAndConditionsContentProps {
  hasAgreed: boolean;
  setHasAgreed: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseModal: () => void;
}

export default function TermsAndConditionsContent({
  hasAgreed,
  setHasAgreed,
  onCloseModal,
}: TermsAndConditionsContentProps) {
  return (
    <div className="space-y-6 text-xs text-slate-700">
      {/* HEADER SECTION */}
      <div className="border-b border-slate-100 pb-4 space-y-2">
        <div className="flex items-center gap-2 text-teal-600 font-bold uppercase tracking-wider text-[11px]">
          <ShieldCheck className="w-4 h-4" />
          <span>Aturan & Kebijakan Platform</span>
        </div>
        <h2 className="text-xl font-extrabold text-slate-900">
          Syarat & Ketentuan Penggunaan Layanan
        </h2>
        <p className="text-slate-500 text-xs">
          Terakhir diperbarui:{" "}
          <span className="font-semibold text-slate-700">23 Oktober 2026</span>
        </p>
      </div>

      {/* BANNER INFORMASI RINGKAS */}
      <div className="p-4 bg-teal-50/60 border border-teal-100 rounded-xl flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
        <p className="text-slate-600 leading-relaxed text-[11px]">
          Mohon luangkan waktu untuk membaca Syarat & Ketentuan ini dengan
          cermat. Dengan mendaftar, mengakses, atau menggunakan platform ini,
          Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui
          seluruh ketentuan yang berlaku.
        </p>
      </div>

      {/* ISI ISI ATURAN & KETENTUAN */}
      <div className="space-y-6">
        {/* Pasal 1 */}
        <section className="space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs flex items-center justify-center shrink-0">
              1
            </span>
            <h3>Ketentuan Umum & Pendaftaran Akun</h3>
          </div>
          <div className="pl-8 space-y-1.5 text-slate-600 leading-relaxed">
            <p>
              • Pelamar wajib memberikan data identitas diri yang valid dan
              benar sesuai dengan Dokumen Kependudukan (NIK/KTP) yang sah.
            </p>
            <p>
              • Setiap pengguna hanya diperbolehkan memiliki 1 (satu) akun
              terverifikasi dalam sistem portal lowongan kerja ini.
            </p>
            <p>
              • Anda bertanggung jawab penuh atas kerahasiaan kata sandi
              (*password*) dan seluruh aktivitas yang terjadi di bawah akun
              Anda.
            </p>
          </div>
        </section>

        {/* Pasal 2 */}
        <section className="space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs flex items-center justify-center shrink-0">
              2
            </span>
            <h3>Penggunaan Data Pribadi & Privasi</h3>
          </div>
          <div className="pl-8 space-y-1.5 text-slate-600 leading-relaxed">
            <p>
              • Data riwayat hidup (CV), dokumen kependudukan, serta preferensi
              pekerjaan yang Anda unggah akan digunakan oleh sistem untuk
              pencocokan lowongan secara otomatis.
            </p>
            <p>
              • Informasi profil Anda dapat diakses oleh perusahaan/instansi
              pemberi kerja yang terdaftar secara resmi serta tim pengawas admin
              Disnaker.
            </p>
            <p>
              • Kami berkomitmen melindungi kerahasiaan data pribadi Anda sesuai
              dengan peraturan perundang-undangan perlindungan data pribadi yang
              berlaku.
            </p>
          </div>
        </section>

        {/* Pasal 3 */}
        <section className="space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs flex items-center justify-center shrink-0">
              3
            </span>
            <h3>Integritas Berkas & Pengajuan Lamaran</h3>
          </div>
          <div className="pl-8 space-y-1.5 text-slate-600 leading-relaxed">
            <p>
              • Pelamar dilarang memberikan dokumen palsu, sertifikat rekayasa,
              atau riwayat kerja fiktif saat melamar pekerjaan.
            </p>
            <p>
              • Apabila ditemukan kecurangan atau manipulasi data, akun pelamar
              dapat dinonaktifkan secara permanen dan aplikasi lamaran dapat
              dibatalkan secara sepihak.
            </p>
          </div>
        </section>

        {/* Pasal 4 */}
        <section className="space-y-2">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs flex items-center justify-center shrink-0">
              4
            </span>
            <h3>Larangan Tambahan & Penutup</h3>
          </div>
          <div className="pl-8 space-y-1.5 text-slate-600 leading-relaxed">
            <p>
              • Seluruh proses rekrutmen dan pendaftaran di platform ini **tidak
              dipungut biaya apapun (GRATIS)**.
            </p>
            <p>
              • Harap waspada terhadap segala bentuk penipuan yang
              mengatasnamakan perusahaan atau pengelola platform.
            </p>
          </div>
        </section>
      </div>

      {/* CHECKBOX PERSETUJUAN (CONSENT BOX) */}
      <div className="pt-4 border-t border-slate-100 space-y-4">
        <label className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100/80 transition-all">
          <input
            type="checkbox"
            checked={hasAgreed}
            onChange={(e) => setHasAgreed(e.target.checked)}
            className="mt-0.5 w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
          />
          <span className="text-xs text-slate-700 leading-snug">
            Saya telah membaca, memahami, dan menyetujui seluruh{" "}
            <strong className="text-slate-900">Syarat & Ketentuan</strong> serta{" "}
            <strong className="text-slate-900">Kebijakan Privasi</strong> yang
            berlaku di platform ini.
          </span>
        </label>

        {/* TOMBOL AKSI / SUBMIT */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Dokumen (PDF)</span>
          </button>

          <button
            type="button"
            disabled={!hasAgreed}
            onClick={() => {
              onCloseModal();
            }}
            className="w-full cursor-pointer sm:w-auto px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>Setujui & Tutup</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

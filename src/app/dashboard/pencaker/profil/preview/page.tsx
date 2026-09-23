"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  GraduationCap,
  Briefcase,
  Wrench,
  SlidersHorizontal,
  FileText,
  Paperclip,
  Edit3,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ShieldCheck,
  Zap,
  ChevronRight,
  Sparkles,
  Check,
} from "lucide-react";

export default function ProfileReviewAlternativePage() {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isProfileActive, setIsProfileActive] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const profileSections = [
    { id: "personal", title: "Data Pribadi", isComplete: true },
    { id: "education", title: "Pendidikan", isComplete: true },
    { id: "experience", title: "Pengalaman Kerja", isComplete: true },
    { id: "skills", title: "Keahlian", isComplete: true },
    { id: "preferences", title: "Preferensi", isComplete: true },
    { id: "documents", title: "CV & Dokumen", isComplete: false },
  ];

  const completedCount = profileSections.filter((s) => s.isComplete).length;
  const progressPercentage = Math.round(
    (completedCount / profileSections.length) * 100,
  );

  const handleActivateProfile = () => {
    if (!isAgreed) return;
    setIsProfileActive(true);
    setShowSuccessModal(true);
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-16 space-y-6 text-slate-800">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="space-y-1">
          <Link
            href="/dashboard/pencaker/profil"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-app-navy-700 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Dashboard Profil
          </Link>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Peninjauan Berkas & Aktivasi Profil
          </h1>
          <p className="text-[11px] text-slate-500">
            Verifikasi seluruh ringkasan data lamaran Anda dalam satu lembar
            kerja terpadu.
          </p>
        </div>

        <div className="shrink-0">
          {isProfileActive ? (
            <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-[11px] rounded-full inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Profil Siap
              Melamar
            </span>
          ) : (
            <span className="px-3 py-1.5 bg-amber-100 text-amber-800 border border-amber-300 font-bold text-[11px] rounded-full inline-flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" /> Draf Belum
              Diaktifkan
            </span>
          )}
        </div>
      </div>

      {/* STRIP PROGRESS & BANNER PERINGATAN */}
      <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-300">
              Status Kelengkapan Profil ({progressPercentage}%)
            </h2>
          </div>
          <p className="text-[11px] text-teal-300 max-w-xl leading-relaxed">
            {progressPercentage === 100
              ? "Seluruh data profil sudah lengkap. Silakan lakukan aktivasi agar perekrut dapat melihat berkas Anda."
              : "Lengkapi berkas pendukung Anda untuk memaksimalkan peluang pemanggilan wawancara kerja."}
          </p>
        </div>

        {/* PROGRESS MINI */}
        <div className="w-full md:w-48 space-y-1.5 shrink-0">
          <div className="w-full bg-teal-800 h-2 rounded-full overflow-hidden border border-teal-700">
            <div
              className="bg-teal-400 h-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-[10px] text-teal-400 text-right">
            {completedCount} dari {profileSections.length} Bagian Terisi
          </p>
        </div>
      </div>

      {/* MAIN CONTAINER: SINGLE SHEET DOCUMENT VIEW */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* STICKY TAB NAVIGATOR */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-200 z-10 px-4 sm:px-6 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {profileSections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap inline-flex items-center gap-1.5 ${
                activeTab === sec.id
                  ? "bg-app-navy-50 text-app-navy-800 border border-app-navy-200"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  sec.isComplete ? "bg-emerald-500" : "bg-amber-500"
                }`}
              />
              {sec.title}
            </button>
          ))}
        </div>

        {/* DOCUMENT BODY - TIMELINE / SHEET LAYOUT */}
        <div className="p-5 sm:p-8 divide-y divide-slate-100">
          {/* 1. DATA PRIBADI */}
          <section id="personal" className="pb-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-app-navy-50 border border-app-navy-200 flex items-center justify-center text-app-navy-700">
                  <User className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  1. Ringkasan Data Diri
                </h3>
              </div>
              <Link
                href="/dashboard/pencaker/profil/edit"
                className="text-[10px] font-bold text-app-navy-700 hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" /> Edit Section
              </Link>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 text-[11px] bg-slate-50/50 p-4 rounded-lg border border-slate-100">
              <div>
                <dt className="text-slate-400 text-[10px]">Nama Lengkap</dt>
                <dd className="font-bold text-slate-800">
                  Fajar Ardiansyah, S.T.
                </dd>
              </div>
              <div>
                <dt className="text-slate-400 text-[10px]">Alamat Email</dt>
                <dd className="font-bold text-slate-800">
                  fajar.ardiansyah@example.com
                </dd>
              </div>
              <div>
                <dt className="text-slate-400 text-[10px]">
                  Kontak HP/WhatsApp
                </dt>
                <dd className="font-bold text-slate-800">+62 812-3456-7890</dd>
              </div>
              <div>
                <dt className="text-slate-400 text-[10px]">
                  Tempat, Tanggal Lahir
                </dt>
                <dd className="font-bold text-slate-800">
                  Sumbawa Besar, 14 Juli 1998
                </dd>
              </div>
              <div>
                <dt className="text-slate-400 text-[10px]">Jenis Kelamin</dt>
                <dd className="font-bold text-slate-800">Laki-laki</dd>
              </div>
              <div>
                <dt className="text-slate-400 text-[10px]">Domisili Utama</dt>
                <dd className="font-bold text-slate-800">
                  Kec. Unter Iwes, Kab. Sumbawa
                </dd>
              </div>
            </dl>
          </section>

          {/* 2. RIWAYAT PENDIDIKAN */}
          <section id="education" className="py-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-app-navy-50 border border-app-navy-200 flex items-center justify-center text-app-navy-700">
                  <GraduationCap className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  2. Pendidikan Terakhir
                </h3>
              </div>
              <Link
                href="/dashboard/pencaker/profil/edit"
                className="text-[10px] font-bold text-app-navy-700 hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" /> Edit Section
              </Link>
            </div>

            <div className="pl-3 border-l-2 border-app-navy-600 space-y-1 ml-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">
                  S1 Teknik Geologi
                </h4>
                <span className="text-[10px] text-slate-400 font-semibold">
                  2018 - 2022
                </span>
              </div>
              <p className="text-[11px] text-slate-700">
                {`Universitas Pembangunan Nasional "Veteran" •`}{" "}
                <span className="font-semibold text-app-navy-700">
                  IPK 3.65
                </span>
              </p>
            </div>
          </section>

          {/* 3. PENGALAMAN KERJA */}
          <section id="experience" className="py-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-app-navy-50 border border-app-navy-200 flex items-center justify-center text-app-navy-700">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  3. Pengalaman Kerja / Pemagangan
                </h3>
              </div>
              <Link
                href="/dashboard/pencaker/profil/edit"
                className="text-[10px] font-bold text-app-navy-700 hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" /> Edit Section
              </Link>
            </div>

            <div className="space-y-4 pl-3 border-l-2 border-slate-200 ml-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">
                    Junior Exploration Geologist
                  </h4>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    Jan 2023 - Sekarang
                  </span>
                </div>
                <p className="text-[11px] font-semibold text-slate-700">
                  PT Tambang Nusa Tenggara — Sumbawa Barat
                </p>
                <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                  • Mengoordinasikan tim pemetaan lapangan untuk area prospek
                  emas dan tembaga.
                  <br />• Bertanggung jawab atas pengelolaan data hasil core
                  drilling dan supervisi QA/QC sampel laboratorium.
                </p>
              </div>
            </div>
          </section>

          {/* 4. KEAHLIAN & KOMPETENSI */}
          <section id="skills" className="py-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-app-navy-50 border border-app-navy-200 flex items-center justify-center text-app-navy-700">
                  <Wrench className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  4. Keahlian Utama
                </h3>
              </div>
              <Link
                href="/dashboard/pencaker/profil/edit"
                className="text-[10px] font-bold text-app-navy-700 hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" /> Edit Section
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px]">
              {[
                "Geological Mapping",
                "ArcGIS / QGIS",
                "Core Sampling Analysis",
                "Frontend Development (React/Next.js)",
                "Tailwind CSS",
                "POP Mineral K3",
              ].map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-slate-100 text-slate-700 font-bold rounded-md border border-slate-200"
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
          </section>

          {/* 5. PREFERENSI PEKERJAAN */}
          <section id="preferences" className="py-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-app-navy-50 border border-app-navy-200 flex items-center justify-center text-app-navy-700">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  5. Preferensi Karier
                </h3>
              </div>
              <Link
                href="/dashboard/pencaker/preferensi"
                className="text-[10px] font-bold text-app-navy-700 hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" /> Edit Section
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px] bg-slate-50/50 p-4 rounded-lg border border-slate-100">
              <div>
                <span className="text-slate-400 text-[10px] block">
                  Peran / Jabatan Target
                </span>
                <p className="font-bold text-slate-800">
                  Geologist, Mining Staff, Frontend Developer
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">
                  Ekspektasi Remunerasi
                </span>
                <p className="font-bold text-slate-800">
                  Rp 8.000.000 - Rp 12.000.000 / Bulan
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">
                  Ketersediaan Bekerja
                </span>
                <p className="font-bold text-emerald-700">
                  Siap Kerja Segera (Notice Period: 2 Minggu)
                </p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">
                  Preferensi Lokasi
                </span>
                <p className="font-bold text-slate-800">
                  Sumbawa, NTB, DKI Jakarta (Bersedia Relokasi)
                </p>
              </div>
            </div>
          </section>

          {/* 6. CV UTAMA & DOKUMEN PENDUKUNG */}
          <section id="documents" className="pt-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-app-navy-50 border border-app-navy-200 flex items-center justify-center text-app-navy-700">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  6. File Lampiran & Berkas Pendukung
                </h3>
              </div>
              <Link
                href="/dashboard/pencaker/dokumen"
                className="text-[10px] font-bold text-app-navy-700 hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" /> Kelola Berkas
              </Link>
            </div>

            <div className="space-y-2">
              {/* CV TERLAMPIR */}
              <div className="flex items-center justify-between p-3 border border-emerald-200 bg-emerald-50/40 rounded-lg text-[11px]">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900">
                      CV_Fajar_Ardiansyah_2026.pdf
                    </p>
                    <p className="text-[10px] text-slate-500">
                      CV Utama • Terverifikasi ATS-Friendly
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[9px] rounded">
                  Diunggah
                </span>
              </div>

              {/* DOKUMEN BELUM LENGKAP */}
              <div className="flex items-center justify-between p-3 border border-amber-200 bg-amber-50/40 rounded-lg text-[11px]">
                <div className="flex items-center gap-3">
                  <Paperclip className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <p className="font-bold text-amber-900">
                      Ijazah Terakhir & SKCK
                    </p>
                    <p className="text-[10px] text-amber-700">
                      Dokumen pendukung opsional belum diunggah
                    </p>
                  </div>
                </div>
                <Link
                  href="/dashboard/pencaker/dokumen"
                  className="px-2.5 py-1 bg-amber-600 text-white font-bold text-[10px] rounded-md hover:bg-amber-700 transition"
                >
                  Unggah
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* FOOTER ACTION & PERSETUJUAN */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-sm">
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-app-navy-600 focus:ring-app-navy-500 cursor-pointer"
          />
          <span className="text-[11px] text-slate-600 leading-relaxed">
            Saya mengonfirmasi bahwa seluruh rincian di atas telah sesuai dengan
            dokumen asli saya. Saya menyetujui pemrosesan data profil ini untuk
            dipublikasikan kepada mitra rekrutmen.
          </span>
        </label>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-app-navy-600" /> Data
            dilindungi enkripsi SSL
          </div>

          <button
            type="button"
            disabled={!isAgreed}
            onClick={handleActivateProfile}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all inline-flex items-center gap-2 ${
              isAgreed
                ? "bg-app-navy-700 hover:bg-app-navy-800 text-white cursor-pointer shadow-sm"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>
              {isProfileActive
                ? "Perbarui Profil Aktif"
                : "Aktifkan Profil Pelamar"}
            </span>
          </button>
        </div>
      </div>

      {/* MODAL SUKSES */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <Check className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">
                Profil Berhasil Dikonfirmasi
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Profil Anda telah aktif dan dapat langsung digunakan untuk
                melamar semua lowongan kerja yang tersedia.
              </p>
            </div>
            <div className="pt-2 space-y-2">
              <Link
                href="/lowongan"
                className="w-full py-2.5 bg-app-navy-700 hover:bg-app-navy-800 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <span>Mulai Melamar Lowongan</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-2 text-slate-600 hover:bg-slate-100 font-bold text-xs rounded-xl transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

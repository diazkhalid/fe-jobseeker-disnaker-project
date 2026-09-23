"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  FolderKanban,
  FileText,
  Edit3,
  Eye,
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  Download,
  Building2,
  Sliders,
  Plus,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function CandidateProfilePage() {
  const [activeTab, setActiveTab] = useState<"detail" | "history">("detail");
  const router = useRouter();

  // Status kelengkapan profil (misal 85%)
  const profileCompleteness = 85;

  // Data ringkasan/alert yang belum diisi
  const missingDataAlerts = [
    {
      id: 1,
      label: "Sertifikasi K3LH belum diunggah",
      category: "Sertifikasi",
    },
    {
      id: 2,
      label: "Tautan Portofolio GitHub/LinkedIn belum ditambahkan",
      category: "Portofolio",
    },
  ];

  // Riwayat pembaruan profil
  const updateHistory = [
    {
      id: 1,
      action: "Memperbarui Pengalaman Kerja",
      detail: "Menambahkan pengalaman di PT AMNT sebagai Geologist",
      date: "20 September 2026",
    },
    {
      id: 2,
      action: "Mengunggah CV Terbaru",
      detail: "Mengunggah berkas CV_Fajar_Ardiansyah_2026.pdf",
      date: "15 September 2026",
    },
    {
      id: 3,
      action: "Pembaruan Data Pribadi",
      detail: "Memperbarui nomor telepon dan alamat domisili",
      date: "01 September 2026",
    },
  ];

  return (
    <div className="space-y-8">
      {/* BREADCRUMB & HEADER */}
      <div className="space-y-2">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link
            href="/dashboard"
            className="hover:text-app-navy-700 transition-colors"
          >
            Dashboard
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">Profil Saya</span>
        </nav>

        {/* Main Header Content */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <User className="w-7 h-7 text-app-navy-700" />
              <span>Profil Saya</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Kelola data diri, riwayat pendidikan, pengalaman, dan berkas
              lamaran Anda.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => router.push("profil/preview")}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              <Eye className="w-4 h-4 text-slate-500" />
              <span>Preview Profil</span>
            </button>

            <button
              type="button"
              onClick={() => router.push("profil/edit")}
              className="flex items-center gap-2 px-4 py-2.5 bg-app-navy-700 hover:bg-app-navy-900 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-app-navy-700/10 active:scale-[0.98] cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profil</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. INDIKATOR PROFIL LENGKAP & ALERTS DATA BELUM DIISI */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-app-navy-600" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Kelengkapan Profil Pencaker
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Profil yang lengkap meningkatkan peluang dilirik oleh HRD hingga
              2x lipat.
            </p>
          </div>
          <span className="text-xl font-black text-app-navy-700">
            {profileCompleteness}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-red-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${profileCompleteness}%` }}
          />
        </div>

        {/* Alert Data Yang Belum Diisi */}
        {missingDataAlerts.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Perhatian: Data Anda Belum Lengkap</span>
            </div>
            <ul className="space-y-1 pl-6 list-disc text-xs text-amber-900">
              {missingDataAlerts.map((alert) => (
                <li key={alert.id}>
                  <span className="font-semibold">{alert.category}:</span>{" "}
                  {alert.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* TAB NAVIGATION: DETAIL PROFIL VS RIWAYAT PEMBARUAN */}
      <div className="border-b border-slate-200 flex gap-6 text-xs font-bold">
        <button
          onClick={() => setActiveTab("detail")}
          className={`pb-3 transition-colors relative ${
            activeTab === "detail"
              ? "text-app-navy-700 border-b-2 border-app-navy-700"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Detail Profil
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`pb-3 transition-colors relative flex items-center gap-1.5 ${
            activeTab === "history"
              ? "text-app-navy-700 border-b-2 border-app-navy-700"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Riwayat Pembaruan</span>
        </button>
      </div>

      {/* ISINYA BERDASARKAN TAB */}
      {activeTab === "detail" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* KOLOM KIRI (1/3): FOTO, NAMA, RINGKASAN & DATA PRIBADI */}
          <div className="space-y-6">
            {/* CARD PROFIL & DATA PRIBADI */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-sm">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-slate-100 bg-slate-100 shadow-inner">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                    alt="Foto Fajar Ardiansyah"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Fajar Ardiansyah, S.T.
                  </h3>
                  <p className="text-xs font-semibold text-app-navy-700 mt-0.5">
                    Geologist / Mining Specialist
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3" /> Sumbawa Barat, NTB
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5 space-y-3 text-xs">
                <h4 className="font-bold uppercase tracking-wider text-[10px] text-slate-400">
                  Data Pribadi
                </h4>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 text-slate-600">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="truncate">fajar.dev@sumbawa.go.id</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>+62 812-3456-7890</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>14 Mei 1998 (28 Tahun)</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <User className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Laki-laki</span>
                  </div>
                </div>
              </div>

              {/* CV Utama */}
              <div className="border-t border-slate-100 pt-5 space-y-3">
                <h4 className="font-bold uppercase tracking-wider text-[10px] text-slate-400">
                  CV Utama
                </h4>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FileText className="w-5 h-5 text-rose-600 shrink-0" />
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-800 truncate">
                        CV_Fajar_2026.pdf
                      </p>
                      <p className="text-[10px] text-slate-400">1.2 MB</p>
                    </div>
                  </div>
                  <button className="p-1.5 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* PREFERENSI PEKERJAAN */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-app-navy-700" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Preferensi Kerja
                  </h3>
                </div>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold">
                    Jabatan Diharapkan
                  </p>
                  <p className="font-bold text-slate-800">
                    Geologist, Mining Engineer, HSE Officer
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold">
                    Lokasi Kerja
                  </p>
                  <p className="font-bold text-slate-800">
                    Kab. Sumbawa & Sumbawa Barat
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold">
                    Ekspektasi Gaji
                  </p>
                  <p className="font-bold text-app-navy-700">
                    Rp 8.000.000 - Rp 12.000.000
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold">
                    Status Pekerjaan
                  </p>
                  <p className="font-bold text-slate-800">
                    Penuh Waktu (Full-time)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN (2/3): DETAIL SECTION LENGKAP */}
          <div className="lg:col-span-2 space-y-6">
            {/* RINGKASAN PROFESIONAL */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-3">
                Ringkasan Profesional
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Geologist berpengalaman selama lebih dari 4 tahun di industri
                eksplorasi pertambangan emas dan tembaga. Memiliki keahlian kuat
                dalam pemetaan geologi, eksplorasi lapangan, analisis data
                geokimia, serta kepatuhan K3LH di lokasi tambang.
              </p>
            </div>

            {/* PENGALAMAN KERJA */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-app-navy-700" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Pengalaman Kerja
                  </h3>
                </div>
                <button className="text-xs font-bold text-app-navy-700 hover:underline flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Tambah
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-app-navy-50 text-app-navy-700 flex items-center justify-center font-bold text-xs shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 text-xs">
                    <h4 className="font-extrabold text-slate-900">
                      Junior Exploration Geologist
                    </h4>
                    <p className="font-semibold text-slate-600">
                      PT Amman Mineral Nusa Tenggara (AMNT)
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Januari 2023 - Sekarang • Sumbawa Barat
                    </p>
                    <p className="text-slate-600 mt-2 leading-relaxed">
                      • Memimpin pemetaan geologi permukaan di area eksplorasi
                      Blok Elang.
                      <br />• Menyusun laporan evaluasi sampel batuan dan inti
                      bor harian.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* PENDIDIKAN */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-app-navy-700" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Pendidikan
                  </h3>
                </div>
                <button className="text-xs font-bold text-app-navy-700 hover:underline flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Tambah
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-app-navy-50 text-app-navy-700 flex items-center justify-center font-bold text-xs shrink-0">
                    S1
                  </div>
                  <div className="space-y-1 text-xs">
                    <h4 className="font-extrabold text-slate-900">
                      S1 Teknik Geologi
                    </h4>
                    <p className="font-semibold text-slate-600">
                      Universitas Mataram
                    </p>
                    <p className="text-[10px] text-slate-400">
                      2018 - 2022 • IPK: 3.72
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* PENGALAMAN ORGANISASI ATAU MAGANG */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <FolderKanban className="w-4 h-4 text-app-navy-700" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Pengalaman Organisasi & Magang
                  </h3>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="font-extrabold text-slate-900">
                    Ketiga Himpunan Mahasiswa Teknik Geologi
                  </h4>
                  <p className="text-[10px] text-slate-400">2021 - 2022</p>
                  <p className="text-slate-600 mt-1">
                    Mengoordinasikan seminar nasional pertambangan bernilai
                    tinggi dan program bakti sosial mahasiswa.
                  </p>
                </div>
              </div>
            </div>

            {/* KEAHLIAN & SERTIFIKASI */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* KEAHLIAN */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-3">
                  Keahlian Utama
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Geological Mapping",
                    "ArcGIS / QGIS",
                    "Core Logging",
                    "Safety K3LH",
                    "Data Mining",
                    "Microstation",
                  ].map((skill, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-slate-100 text-slate-700 font-semibold text-[11px] rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* SERTIFIKASI */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-app-navy-700" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Sertifikasi
                    </h3>
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <p className="font-bold text-slate-800">
                      POP (Pengawas Operasional Pertama)
                    </p>
                    <p className="text-[10px] text-slate-400">
                      BNSP • Berlaku s.d 2028
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* PORTOFOLIO */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Portofolio Proyek
                </h3>
                <button className="text-xs font-bold text-app-navy-700 hover:underline flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Tambah
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 border border-slate-200 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-slate-900">
                    Pemetaan Geologi Daerah Batu Hijau
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    Laporan lengkap inventarisasi potensi mineral batuan
                    tembaga-emas porphyry.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-app-navy-700 hover:underline pt-1"
                  >
                    Lihat Proyek <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 2. RIWAYAT PEMBARUAN PROFIL */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm max-w-3xl">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-3">
            Aktivitas Pembaruan Profil
          </h3>
          <div className="relative border-l-2 border-slate-100 pl-4 space-y-6 ml-2 my-2">
            {updateHistory.map((item) => (
              <div key={item.id} className="relative group">
                <div className="absolute -left-[21px] top-0.5 w-3 h-3 rounded-full bg-app-navy-600 ring-4 ring-white" />
                <div className="space-y-1">
                  <p className="text-xs font-extrabold text-slate-900">
                    {item.action}
                  </p>
                  <p className="text-xs text-slate-600">{item.detail}</p>
                  <span className="text-[10px] font-medium text-slate-400 block pt-0.5">
                    {item.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
  FileText,
  Download,
  Calendar,
  Building,
  MessageSquare,
  ShieldAlert,
  UserCheck,
  Building2,
  FileCheck,
  Clock,
  ExternalLink,
  Plus,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  SlidersHorizontal,
  DollarSign,
  Compass,
} from "lucide-react";
import { motion } from "framer-motion";

// Tipe Data Lamaran yang Diajukan Pelamar ke Berbagai Perusahaan
interface AppliedJob {
  id: string;
  jobTitle: string;
  companyName: string;
  companyLogo?: string;
  appliedDate: string;
  expectedSalary: string;
  status:
    | "Lamaran Masuk"
    | "Seleksi Berkas"
    | "Interview HR"
    | "Interview User"
    | "Diterima (Hired)"
    | "Ditolak"
    | "Mengundurkan Diri";
  isCurrentJob?: boolean;
}

// Tipe Data Preferensi Pekerjaan Pelamar (Sesuai input page_3.tsx)
interface JobPreferences {
  categories: string[];
  desiredPositions: string[];
  industries: string[];
  jobTypes: string[];
  workSystems: string[];
  expectedSalaryMin: string;
  expectedSalaryMax: string;
  relocationStatus: string;
  jobStatus: string;
  selectedLocations: string[];
  selectedDistricts: string[];
}

// Tipe Data Detail Pelamar untuk Admin
interface AdminApplicantDetail {
  id: string;
  nik: string;
  name: string;
  avatar: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  registeredDate: string;
  accountStatus: "Aktif" | "Nonaktif" | "Ditangguhkan";
  summary: string;
  
  // Data Preferensi Pekerjaan Pelamar
  preferences: JobPreferences;

  // Riwayat Semua Lamaran yang Pernah Dimasukkan
  applicationsSubmitted: AppliedJob[];

  education: Array<{
    degree: string;
    institution: string;
    year: string;
    gpa: string;
  }>;
  experience: Array<{
    role: string;
    company: string;
    period: string;
    description: string;
  }>;
  skills: string[];
  certifications: Array<{
    name: string;
    issuer: string;
    year: string;
  }>;
  documents: Array<{
    name: string;
    type: string;
    size: string;
  }>;
  notes: Array<{
    author: string;
    date: string;
    text: string;
  }>;
}

const DUMMY_ADMIN_APPLICANT: AdminApplicantDetail = {
  id: "PLM-001",
  nik: "5204011203980001",
  name: "Ahmad Rizky",
  avatar: "AR",
  title: "Senior Frontend Developer",
  email: "ahmad.rizky@example.com",
  phone: "+62 812-3456-7890",
  location: "Sumbawa, Nusa Tenggara Barat",
  registeredDate: "10 Januari 2026",
  accountStatus: "Aktif",
  summary:
    "Frontend Developer dengan pengalaman lebih dari 4 tahun dalam membangun aplikasi web modern, responsif, dan scalable menggunakan React, Next.js, serta Tailwind CSS.",
  
  preferences: {
    categories: ["Teknologi Informasi", "Sistem Informasi & Data"],
    desiredPositions: ["Frontend Developer", "Full Stack Engineer", "UI/UX Designer"],
    industries: ["Teknologi / Perangkat Lunak", "Keuangan & Perbankan", "Pemerintahan"],
    jobTypes: ["Penuh Waktu (Full-time)", "Kontrak / Proyek"],
    workSystems: ["Hibrida (Hybrid)", "Kerja dari Rumah (Remote)"],
    expectedSalaryMin: "8.000.000",
    expectedSalaryMax: "12.000.000",
    relocationStatus: "Ya, siap ditempatkan di mana saja",
    jobStatus: "Aktif mencari pekerjaan (Open to Work)",
    selectedLocations: ["Kabupaten Sumbawa (NTB)", "Kota Mataram (NTB)", "DKI Jakarta"],
    selectedDistricts: ["Unter Iwes", "Sumbawa", "Labuhan Badas"],
  },

  applicationsSubmitted: [
    {
      id: "APP-101",
      jobTitle: "Senior Frontend Developer",
      companyName: "PT Sumbawa Teknologi Digital",
      appliedDate: "20 Mei 2026",
      expectedSalary: "Rp 12.000.000",
      status: "Interview HR",
    },
    {
      id: "APP-088",
      jobTitle: "Fullstack Developer",
      companyName: "CV Media Kreatif Mataram",
      appliedDate: "12 April 2026",
      expectedSalary: "Rp 10.000.000",
      status: "Diterima (Hired)",
      isCurrentJob: true,
    },
    {
      id: "APP-054",
      jobTitle: "UI/UX & Frontend Lead",
      companyName: "PT Tambang Nusantara",
      appliedDate: "01 Maret 2026",
      expectedSalary: "Rp 15.000.000",
      status: "Ditolak",
    },
    {
      id: "APP-012",
      jobTitle: "Web Developer",
      companyName: "Dinas Kominfo Sumbawa (Non-ASN)",
      appliedDate: "15 Januari 2026",
      expectedSalary: "Rp 8.000.000",
      status: "Mengundurkan Diri",
    },
  ],

  education: [
    {
      degree: "S1 Teknik Informatika",
      institution: "Universitas Teknologi Sumbawa",
      year: "2018 - 2022",
      gpa: "IPK 3.82 / 4.00",
    },
  ],
  experience: [
    {
      role: "Frontend Developer",
      company: "PT Digital Solusi Nusantara",
      period: "2023 - Sekarang",
      description:
        "Mengembangkan dashboard analytics enterprise, mengoptimalkan performa web hingga naik 40%.",
    },
    {
      role: "Junior Web Developer",
      company: "Sumbawa Tech Studio",
      period: "2022 - 2023",
      description:
        "Membangun landing page dan e-commerce landing site menggunakan React dan Tailwind CSS.",
    },
  ],
  skills: [
    "React.js",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "REST API & GraphQL",
  ],
  certifications: [
    {
      name: "AWS Certified Developer - Associate",
      issuer: "Amazon Web Services",
      year: "2025",
    },
  ],
  documents: [
    {
      name: "KTP_Ahmad_Rizky.pdf",
      type: "Identitas / KTP",
      size: "850 KB",
    },
    {
      name: "CV_Ahmad_Rizky_2026.pdf",
      type: "Curriculum Vitae",
      size: "1.2 MB",
    },
    {
      name: "Ijazah_S1_Teknik_Informatika.pdf",
      type: "Dokumen Pendidikan",
      size: "890 KB",
    },
    {
      name: "SKCK_Ahmad_Rizky.pdf",
      type: "Dokumen Pendukung",
      size: "620 KB",
    },
  ],
  notes: [
    {
      author: "Admin Disnaker",
      date: "11 Jan 2026",
      text: "Verifikasi berkas NIK dan ijazah telah sesuai dengan data kependudukan.",
    },
  ],
};

export default function AdminDetailPelamarPage() {
  const [applicant, setApplicant] = useState<AdminApplicantDetail>(
    DUMMY_ADMIN_APPLICANT,
  );
  const [activeTab, setActiveTab] = useState<"riwayat" | "preferensi" | "profil" | "dokumen">(
    "riwayat",
  );
  const [notes, setNotes] = useState(applicant.notes);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes([
      ...notes,
      {
        author: "Saya (Admin)",
        date: "Hari Ini",
        text: newNote,
      },
    ]);
    setNewNote("");
  };

  const handleToggleAccountStatus = () => {
    setApplicant((prev) => ({
      ...prev,
      accountStatus: prev.accountStatus === "Aktif" ? "Nonaktif" : "Aktif",
    }));
  };

  const getJobStatusBadge = (status: AppliedJob["status"]) => {
    switch (status) {
      case "Diterima (Hired)":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
      case "Ditolak":
        return "bg-rose-50 text-rose-700 border-rose-200/80";
      case "Mengundurkan Diri":
        return "bg-slate-100 text-slate-500 border-slate-200/80";
      case "Interview HR":
      case "Interview User":
        return "bg-amber-50 text-amber-700 border-amber-200/80";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200/80";
    }
  };

  return (
    <div className="bg-slate-50/50 text-slate-800 text-[13px] min-h-screen pb-12">
      <div className="mx-auto space-y-4">
        {/* Top Navigation & Back Button */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard/admin/pelamar"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-teal-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Database Pelamar
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">ID Pelamar:</span>
            <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              {applicant.id}
            </span>
          </div>
        </div>

        {/* Header Profile Card Admin */}
        <div className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start md:items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-xs">
                {applicant.avatar}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-lg md:text-xl font-bold text-slate-900">
                    {applicant.name}
                  </h1>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${
                      applicant.accountStatus === "Aktif"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    <ShieldCheck className="w-3 h-3" />
                    Status Akun: {applicant.accountStatus}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 font-mono">
                  <span>NIK: {applicant.nik}</span>
                  <span>•</span>
                  <span>{applicant.email}</span>
                  <span>•</span>
                  <span>{applicant.phone}</span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-500 pt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>{applicant.location}</span>
                  <span className="mx-1">•</span>
                  <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>Terdaftar sejak {applicant.registeredDate}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap md:flex-nowrap pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
              <button
                onClick={handleToggleAccountStatus}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-lg transition-all shadow-xs border ${
                  applicant.accountStatus === "Aktif"
                    ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                    : "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700"
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                {applicant.accountStatus === "Aktif"
                  ? "Nonaktifkan Akun"
                  : "Aktifkan Akun"}
              </button>

              <button
                className="p-1.5 text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all shadow-xs"
                title="Kirim Email / Notifikasi"
              >
                <Mail className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">
                Total Lowongan Dilamar
              </p>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                {applicant.applicationsSubmitted.length} Lamaran
              </h3>
            </div>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">
                Status Pencarian Kerja
              </p>
              <h3 className="text-base font-bold text-teal-600 mt-0.5 truncate max-w-[200px]">
                {applicant.preferences.jobStatus.split(" ")[0]} Kerja
              </h3>
            </div>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <Compass className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">
                Ekspektasi Gaji Pilihan
              </p>
              <h3 className="text-base font-bold text-emerald-600 mt-0.5">
                Rp {applicant.preferences.expectedSalaryMin} - {applicant.preferences.expectedSalaryMax}
              </h3>
            </div>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-white px-3 rounded-xl border overflow-x-auto">
          <button
            onClick={() => setActiveTab("riwayat")}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === "riwayat"
                ? "border-teal-600 text-teal-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Daftar Lowongan Dilamar ({applicant.applicationsSubmitted.length})
          </button>
          <button
            onClick={() => setActiveTab("preferensi")}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === "preferensi"
                ? "border-teal-600 text-teal-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Preferensi Pekerjaan
          </button>
          <button
            onClick={() => setActiveTab("profil")}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === "profil"
                ? "border-teal-600 text-teal-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Biodata & Riwayat Kerja
          </button>
          <button
            onClick={() => setActiveTab("dokumen")}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === "dokumen"
                ? "border-teal-600 text-teal-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Dokumen & Verifikasi KTP ({applicant.documents.length})
          </button>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Content Area (Left 2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            {/* TAB 1: DAFTAR LOWONGAN DILAMAR */}
            {activeTab === "riwayat" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Rekam Jejak Lamaran Pelamar
                    </h3>
                    <span className="text-[11px] text-slate-500">
                      Total: {applicant.applicationsSubmitted.length} Lamaran
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {applicant.applicationsSubmitted.map((job) => (
                      <div
                        key={job.id}
                        className="p-3.5 border border-slate-200/80 rounded-xl bg-white hover:border-teal-200 transition-all shadow-xs space-y-2"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-slate-900 text-xs md:text-sm">
                                {job.jobTitle}
                              </h4>
                              {job.isCurrentJob && (
                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[9px] font-bold">
                                  Pekerjaan Saat Ini
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-teal-600 font-semibold flex items-center gap-1 mt-0.5">
                              <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              {job.companyName}
                            </p>
                          </div>

                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border shrink-0 ${getJobStatusBadge(
                              job.status,
                            )}`}
                          >
                            {job.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              Dilamar: {job.appliedDate}
                            </span>
                            <span>•</span>
                            <span>Ekspektasi Gaji: {job.expectedSalary}</span>
                          </div>

                          <span className="text-[10px] font-mono text-slate-400">
                            ID: {job.id}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: PREFERENSI PEKERJAAN PELAMAR (BARU) */}
            {activeTab === "preferensi" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-teal-600" /> Preferensi Karir & Pekerjaan
                    </h3>
                    <span className="text-[10px] font-semibold bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full border border-teal-200">
                      {applicant.preferences.jobStatus}
                    </span>
                  </div>

                  {/* Posisi Diinginkan */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Posisi / Jabatan yang Diinginkan
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {applicant.preferences.desiredPositions.map((pos, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-teal-50 border border-teal-200 text-teal-800 font-bold text-xs rounded-xl"
                        >
                          {pos}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bidang & Industri */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bidang & Kategori</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {applicant.preferences.categories.map((cat, idx) => (
                          <span key={idx} className="text-xs font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Industri Pilihan</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {applicant.preferences.industries.map((ind, idx) => (
                          <span key={idx} className="text-xs font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                            {ind}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Lokasi & Wilayah Pilihan */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Lokasi & Wilayah / Kecamatan Pilihan
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {applicant.preferences.selectedLocations.map((loc, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs rounded-lg">
                          📍 {loc}
                        </span>
                      ))}
                      {applicant.preferences.selectedDistricts.map((dist, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs rounded-lg">
                          🏘️ Kec. {dist}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-500 pt-1">
                      <strong>Status Relokasi:</strong> {applicant.preferences.relocationStatus}
                    </p>
                  </div>

                  {/* Skema Kerja & Ekspektasi Gaji */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Jenis & Sistem Kerja</p>
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {applicant.preferences.jobTypes.map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] rounded font-medium">
                            {t}
                          </span>
                        ))}
                        {applicant.preferences.workSystems.map((w, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-teal-50 text-teal-700 text-[11px] rounded font-medium border border-teal-100">
                            {w}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ekspektasi Gaji Bulanan</p>
                      <p className="text-xs font-bold text-emerald-700 pt-1">
                        Rp {applicant.preferences.expectedSalaryMin} - Rp {applicant.preferences.expectedSalaryMax}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: PROFIL & BIODATA */}
            {activeTab === "profil" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Ringkasan Ringkas Pelamar
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    {applicant.summary}
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-teal-600" /> Riwayat Pengalaman Kerja
                  </h3>

                  <div className="space-y-3">
                    {applicant.experience.map((exp, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-lg space-y-1">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold text-slate-900 text-xs">{exp.role}</h4>
                          <span className="text-[10px] font-medium bg-white text-slate-600 border border-slate-200 px-2 py-0.5 rounded">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-xs text-teal-600 font-medium">{exp.company}</p>
                        <p className="text-slate-600 text-[11px] pt-1">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-teal-600" /> Riwayat Pendidikan
                  </h3>

                  <div className="space-y-2">
                    {applicant.education.map((edu, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-slate-900 text-xs">{edu.degree}</h4>
                          <p className="text-xs text-slate-600">{edu.institution}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-medium bg-white text-slate-600 border border-slate-200 px-2 py-0.5 rounded block mb-1">
                            {edu.year}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-700">{edu.gpa}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Keahlian Utama
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {applicant.skills.map((skill, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[11px] rounded-lg font-medium border border-slate-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4: DOKUMEN & KTP */}
            {activeTab === "dokumen" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Berkas Terverifikasi Pelamar
                    </h3>
                    <button className="flex items-center gap-1 text-[11px] font-medium text-teal-600 hover:underline">
                      <Download className="w-3.5 h-3.5" /> Unduh Arsip Berkas
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {applicant.documents.map((doc, idx) => (
                      <div key={idx} className="p-3 border border-slate-200 rounded-xl flex items-center justify-between hover:border-teal-200 bg-white transition-all shadow-xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="p-2 bg-teal-50 text-teal-600 rounded-lg shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="truncate">
                            <p className="font-semibold text-slate-800 truncate text-[11px]">{doc.name}</p>
                            <p className="text-[10px] text-slate-400">{doc.type} • {doc.size}</p>
                          </div>
                        </div>
                        <button className="p-1.5 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors" title="Unduh Berkas">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Sidebar Area */}
          <div className="space-y-4">
            <div className="bg-teal-900 text-white p-4 rounded-2xl shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-300" />
                <div>
                  <h4 className="font-semibold text-xs">Curriculum Vitae (CV)</h4>
                  <p className="text-[10px] text-teal-200">Berkas Utama Pelamar</p>
                </div>
              </div>
              <button className="w-full py-2 bg-white text-teal-900 font-semibold text-[11px] rounded-lg hover:bg-teal-50 transition-colors flex items-center justify-center gap-1.5 shadow-xs">
                <Download className="w-3.5 h-3.5" /> Unduh CV Pelamar
              </button>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Catatan Pengawas Admin</span>
                <span className="text-[10px] text-slate-400 font-normal">Internal Only</span>
              </h3>

              <form onSubmit={handleAddNote} className="space-y-2">
                <textarea
                  rows={3}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Tambahkan catatan verifikasi pelamar..."
                  className="w-full p-2.5 text-[11px] bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
                <button
                  type="submit"
                  className="w-full py-1.5 bg-slate-900 text-white font-medium text-[11px] rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Simpan Catatan
                </button>
              </form>

              <div className="space-y-2 pt-2 border-t border-slate-100 max-h-52 overflow-y-auto">
                {notes.map((note, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-semibold text-slate-800">{note.author}</span>
                      <span className="text-slate-400">{note.date}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{note.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
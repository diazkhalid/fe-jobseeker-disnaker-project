"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Send,
  Building2,
  Calendar,
  FileText,
  Clock,
  Search,
  Filter,
  ArrowUpDown,
  ChevronRight,
  Eye,
  CheckCircle2,
  XCircle,
  AlertCircle,
  UserCheck,
  Ban,
  FileSearch,
  Hourglass,
  Layers,
  MapPin,
  X,
  ExternalLink,
  Download,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Tipe Status Lamaran sesuai spesifikasi
type ApplicationStatus =
  | "terkirim"
  | "ditinjau"
  | "diproses"
  | "wawancara"
  | "diterima"
  | "ditolak"
  | "dibatalkan";

// Interface Data Lamaran
interface Application {
  id: string;
  positionName: string;
  companyName: string;
  companyLogo: string;
  location: string;
  appliedDate: string; // YYYY-MM-DD
  cvUsed: string; // Nama file CV
  cvUrl?: string;
  status: ApplicationStatus;
  recruitmentStage: string; // Tahap rekrutmen saat ini
  deadlineProcess?: string; // Batas waktu proses (jika ada)
  notes?: string; // Catatan tambahan dari perusahaan
}

// Mock Data Lamaran Saya
const initialApplications: Application[] = [
  {
    id: "APP-001",
    positionName: "Frontend Developer (React / Next.js)",
    companyName: "PT Technology Innovation Sumbawa",
    companyLogo: "/images/karir-logo-0.png",
    location: "Sumbawa Besar, NTB",
    appliedDate: "2026-09-15",
    cvUsed: "CV_Frontend_Developer_2026.pdf",
    status: "wawancara",
    recruitmentStage: "Wawancara User & HR",
    deadlineProcess: "2026-09-28",
    notes: "Jadwal wawancara dikirimkan via email & WhatsApp.",
  },
  {
    id: "APP-002",
    positionName: "UI/UX Designer",
    companyName: "CV Samawa Creative Studio",
    companyLogo: "/images/karir-logo-0.png",
    location: "Sumbawa Besar, NTB",
    appliedDate: "2026-09-18",
    cvUsed: "CV_UIUX_Designer_2026.pdf",
    status: "diproses",
    recruitmentStage: "Tes Praktik / Skill Test",
    deadlineProcess: "2026-09-25",
    notes: "Pengumpulan hasil tes sebelum tanggal 25 September.",
  },
  {
    id: "APP-003",
    positionName: "Staff Administrasi & Keuangan",
    companyName: "PT Samawa Utama Mandiri",
    companyLogo: "/images/karir-logo-0.png",
    location: "Sumbawa Besar, NTB",
    appliedDate: "2026-09-10",
    cvUsed: "CV_Umum_Terbaru.pdf",
    status: "ditinjau",
    recruitmentStage: "Screening Berkas HRD",
    deadlineProcess: "2026-09-30",
  },
  {
    id: "APP-004",
    positionName: "Digital Marketing Executive",
    companyName: "PT Lombok Sumbawa Tour",
    companyLogo: "/images/karir-logo-0.png",
    location: "Sumbawa / Remote",
    appliedDate: "2026-09-01",
    cvUsed: "CV_Marketing_2026.pdf",
    status: "diterima",
    recruitmentStage: "Offering Letter / Penawaran Kerja",
    notes: "Selamat! Silakan konfirmasi berkas penawaran kerja.",
  },
  {
    id: "APP-005",
    positionName: "Backend Engineer (Node.js)",
    companyName: "PT Nusantara Digital",
    companyLogo: "/images/karir-logo-0.png",
    location: "Remote",
    appliedDate: "2026-08-20",
    cvUsed: "CV_Software_Engineer.pdf",
    status: "ditolak",
    recruitmentStage: "Seleksi Berkas Selesai",
    notes: "Kualifikasi Anda belum sesuai dengan kebutuhan posisi saat ini.",
  },
  {
    id: "APP-006",
    positionName: "Data Entry Clerk",
    companyName: "CV Sumbawa Jaya",
    companyLogo: "/images/karir-logo-0.png",
    location: "Sumbawa Besar, NTB",
    appliedDate: "2026-09-21",
    cvUsed: "CV_Umum_Terbaru.pdf",
    status: "terkirim",
    recruitmentStage: "Lamaran Berhasil Diterima Sistem",
    deadlineProcess: "2026-10-05",
  },
  {
    id: "APP-007",
    positionName: "Supervisor Operasional",
    companyName: "PT Mineral Sumbawa",
    companyLogo: "/images/karir-logo-0.png",
    location: "Sumbawa Barat, NTB",
    appliedDate: "2026-08-10",
    cvUsed: "CV_Supervisor_2026.pdf",
    status: "dibatalkan",
    recruitmentStage: "Lamaran Dibatalkan oleh Pelamar",
  },
];

export default function MyApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] =
    useState<Application[]>(initialApplications);
  const [selectedStatus, setSelectedStatus] = useState<
    "semua" | ApplicationStatus
  >("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  // State Modal Detail
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  // Helper Configuration untuk Status Badge
  const getStatusConfig = (status: ApplicationStatus) => {
    switch (status) {
      case "terkirim":
        return {
          label: "Terkirim",
          bgColor: "bg-blue-50 text-blue-700 border-blue-200",
          icon: Send,
          dotColor: "bg-blue-500",
        };
      case "ditinjau":
        return {
          label: "Ditinjau",
          bgColor: "bg-amber-50 text-amber-700 border-amber-200",
          icon: FileSearch,
          dotColor: "bg-amber-500",
        };
      case "diproses":
        return {
          label: "Diproses",
          bgColor: "bg-purple-50 text-purple-700 border-purple-200",
          icon: Hourglass,
          dotColor: "bg-purple-500",
        };
      case "wawancara":
        return {
          label: "Wawancara",
          bgColor: "bg-app-navy-50 text-app-navy-700 border-app-navy-200",
          icon: UserCheck,
          dotColor: "bg-app-navy-500",
        };
      case "diterima":
        return {
          label: "Diterima",
          bgColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: CheckCircle2,
          dotColor: "bg-emerald-500",
        };
      case "ditolak":
        return {
          label: "Ditolak",
          bgColor: "bg-rose-50 text-rose-700 border-rose-200",
          icon: XCircle,
          dotColor: "bg-rose-500",
        };
      case "dibatalkan":
        return {
          label: "Dibatalkan",
          bgColor: "bg-slate-100 text-slate-600 border-slate-200",
          icon: Ban,
          dotColor: "bg-slate-400",
        };
    }
  };

  // Filter & Sorting Logic
  const filteredApplications = applications
    .filter((app) => {
      // Filter Status
      if (selectedStatus !== "semua" && app.status !== selectedStatus) {
        return false;
      }

      // Filter Search
      const matchesSearch =
        app.positionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.recruitmentStage.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
        );
      } else {
        return (
          new Date(a.appliedDate).getTime() - new Date(b.appliedDate).getTime()
        );
      }
    });

  // Hitung jumlah tiap status untuk tab badge
  const getCountByStatus = (status: "semua" | ApplicationStatus) => {
    if (status === "semua") return applications.length;
    return applications.filter((a) => a.status === status).length;
  };

  const statusCategories: { id: "semua" | ApplicationStatus; label: string }[] =
    [
      { id: "semua", label: "Semua" },
      { id: "terkirim", label: "Terkirim" },
      { id: "ditinjau", label: "Ditinjau" },
      { id: "diproses", label: "Diproses" },
      { id: "wawancara", label: "Wawancara" },
      { id: "diterima", label: "Diterima" },
      { id: "ditolak", label: "Ditolak" },
      { id: "dibatalkan", label: "Dibatalkan" },
    ];

  return (
    <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-0 text-slate-800">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* BREADCRUMB & HEADER */}
        <div className="space-y-2">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link
              href="/dashboard"
              className="hover:text-app-navy-700 transition-colors"
            >
              Dashboard
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-800">Lamaran Saya</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
                <Send className="w-7 h-7 text-app-navy-700" />
                <span>Lamaran Saya</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Pantau seluruh perkembangan status dan tahap rekrutmen lamaran
                Anda secara real-time.
              </p>
            </div>

            {/* Total Badge */}
            <div className="self-start sm:self-auto bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
              <div className="p-2 bg-app-navy-50 rounded-xl text-app-navy-700">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Total Melamar
                </span>
                <span className="text-sm font-extrabold text-slate-900">
                  {applications.length} Posisi
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* TAB FILTER STATUS KATEGORI (SCROLLABLE ON MOBILE) */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200/80 shadow-sm overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 min-w-max">
            {statusCategories.map((cat) => {
              const count = getCountByStatus(cat.id);
              const isActive = selectedStatus === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedStatus(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    isActive
                      ? "bg-app-navy-700 text-white shadow-md shadow-app-navy-700/20"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-extrabold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CONTROLS: SEARCH & SORT */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari posisi, perusahaan, atau tahap..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-app-navy-600 focus:bg-white transition-all"
            />
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap hidden sm:inline">
              Urutkan:
            </span>
            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "newest" | "oldest")
                }
                className="w-full sm:w-auto appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 pr-8 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-app-navy-600 cursor-pointer transition-all"
              >
                <option value="newest">Tanggal Melamar Terbaru</option>
                <option value="oldest">Tanggal Melamar Terlama</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* DAFTAR LAMARAN */}
        {filteredApplications.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredApplications.map((app) => {
              const statusConfig = getStatusConfig(app.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={app.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden group"
                >
                  {/* Left Accent Stripe */}
                  <div
                    className={`absolute top-0 left-0 bottom-0 w-1.5 ${statusConfig.dotColor}`}
                  />

                  {/* INFO LAMARAN */}
                  <div className="flex items-start gap-4 pl-2">
                    {/* Company Logo */}
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 p-2 overflow-hidden">
                      <Image
                        src={app.companyLogo}
                        alt={app.companyName}
                        width={48}
                        height={48}
                        className="object-contain max-h-full"
                      />
                    </div>

                    <div className="space-y-2">
                      {/* Status Badge & ID */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-extrabold border ${statusConfig.bgColor}`}
                        >
                          <StatusIcon className="w-3.5 h-3.5" />
                          {statusConfig.label}
                        </span>

                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                          {app.id}
                        </span>
                      </div>

                      {/* Nama Posisi */}
                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-app-navy-700 transition-colors line-clamp-1">
                        {app.positionName}
                      </h3>

                      {/* Nama Perusahaan & Lokasi */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1 font-semibold text-slate-700">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          {app.companyName}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {app.location}
                        </span>
                      </div>

                      {/* Detail Tahap & Berkas */}
                      <div className="pt-1 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Layers className="w-3.5 h-3.5 text-app-navy-600 shrink-0" />
                          <span>Tahap: </span>
                          <strong className="text-slate-900 font-bold">
                            {app.recruitmentStage}
                          </strong>
                        </div>

                        <div className="flex items-center gap-1.5 text-slate-600">
                          <FileText className="w-3.5 h-3.5 text-app-navy-600 shrink-0" />
                          <span>CV: </span>
                          <strong className="text-slate-800 font-medium truncate max-w-[180px]">
                            {app.cvUsed}
                          </strong>
                        </div>
                      </div>

                      {/* Meta Info: Tanggal Melamar & Deadline Proses */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 pt-0.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          Melamar:{" "}
                          <strong className="text-slate-700">
                            {app.appliedDate}
                          </strong>
                        </span>

                        {app.deadlineProcess && (
                          <span className="flex items-center gap-1 text-amber-700 font-medium">
                            <Clock className="w-3 h-3 text-amber-600" />
                            Batas Proses: <strong>{app.deadlineProcess}</strong>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ACTION BUTTON */}
                  <div className="flex items-center justify-end pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        router.push(`lamaran/${app.id}`);
                      }}
                      className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-app-navy-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat Detail</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-200">
              <Send className="w-7 h-7" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-lg font-bold text-slate-900">
                Tidak Ada Lamaran Ditemukan
              </h3>
              <p className="text-xs text-slate-500">
                {searchQuery || selectedStatus !== "semua"
                  ? "Tidak ada riwayat lamaran yang cocok dengan kriteria kata kunci atau status yang Anda pilih."
                  : "Anda belum pernah mengirimkan lamaran pekerjaan. Cari lowongan impian Anda dan mulai melamar!"}
              </p>
            </div>
            {searchQuery || selectedStatus !== "semua" ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedStatus("semua");
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
              >
                Reset Filter
              </button>
            ) : (
              <Link
                href="/lowongan"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-app-navy-700 hover:bg-app-navy-800 text-white text-xs font-bold rounded-xl shadow-md transition-all"
              >
                <span>Eksplor Lowongan Kerja</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        )}

        {/* MODAL DETAIL LAMARAN */}
        {selectedApp && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150 relative">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header Detail */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 p-2 overflow-hidden">
                  <Image
                    src={selectedApp.companyLogo}
                    alt={selectedApp.companyName}
                    width={56}
                    height={56}
                    className="object-contain max-h-full"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-app-navy-700">
                    ID Lamaran: {selectedApp.id}
                  </span>
                  <h2 className="text-xl font-extrabold text-slate-900 leading-snug">
                    {selectedApp.positionName}
                  </h2>
                  <p className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    {selectedApp.companyName} • {selectedApp.location}
                  </p>
                </div>
              </div>

              {/* Status & Progress Tracker Ringkasan */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">
                    Status Saat Ini:
                  </span>
                  {(() => {
                    const cfg = getStatusConfig(selectedApp.status);
                    const Icon = cfg.icon;
                    return (
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${cfg.bgColor}`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {cfg.label}
                      </span>
                    );
                  })()}
                </div>

                <div className="border-t border-slate-200 pt-3 space-y-1">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Tahap Rekrutmen Aktif
                  </p>
                  <p className="text-sm font-extrabold text-slate-900">
                    {selectedApp.recruitmentStage}
                  </p>
                </div>

                {selectedApp.notes && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
                    <p className="font-bold flex items-center gap-1 text-amber-800">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      Catatan dari Perusahaan:
                    </p>
                    <p className="text-[11px] leading-relaxed">
                      {selectedApp.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Metadata Informasi Pengajuan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Tanggal Pengajuan
                  </span>
                  <p className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-app-navy-600" />
                    {selectedApp.appliedDate}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Batas Estimasi Proses
                  </span>
                  <p className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-app-navy-600" />
                    {selectedApp.deadlineProcess || "Tidak Ditentukan"}
                  </p>
                </div>
              </div>

              {/* CV yang Digunakan */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Berkas CV Terlampir
                </label>
                <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-app-navy-50 text-app-navy-700 rounded-lg">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        {selectedApp.cvUsed}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Diunggah dari Profil
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="p-2 text-slate-500 hover:text-app-navy-700 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Unduh CV"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
                >
                  Tutup
                </button>

                <Link
                  href={`/lowongan/${selectedApp.id}`}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-app-navy-700 hover:bg-app-navy-800 text-white text-xs font-bold rounded-xl transition-all shadow-md"
                >
                  <span>Lihat Detail Lowongan</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bookmark,
  Building2,
  MapPin,
  Calendar,
  Clock,
  Trash2,
  ExternalLink,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BookmarkX,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";

// Tipe Data Lowongan Tersimpan
interface SavedJob {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string;
  location: string;
  jobType: string; // Full-time, Part-time, Remote, dll
  deadline: string; // YYYY-MM-DD
  savedAt: string; // YYYY-MM-DD
  status: "active" | "closed"; // Status lowongan
  salaryRange?: string;
}

// Mock Data Lowongan Tersimpan
const initialSavedJobs: SavedJob[] = [
  {
    id: "job-1",
    title: "Senior Frontend Developer (React / Next.js)",
    companyName: "PT Technology Innovation Sumbawa",
    companyLogo: "/images/karir-logo-0.png",
    location: "Sumbawa Besar, NTB (Hybrid)",
    jobType: "Full-Time",
    deadline: "2026-10-15",
    savedAt: "2026-09-20",
    status: "active",
    salaryRange: "Rp 7.000.000 - Rp 10.000.000",
  },
  {
    id: "job-2",
    title: "Staff Administrasi & Keuangan",
    companyName: "CV Samawa Berjaya",
    companyLogo: "/images/karir-logo-0.png",
    location: "Sumbawa Besar, NTB",
    jobType: "Full-Time",
    deadline: "2026-09-30",
    savedAt: "2026-09-18",
    status: "active",
    salaryRange: "Rp 3.500.000 - Rp 4.500.000",
  },
  {
    id: "job-3",
    title: "Digital Marketing Specialist",
    companyName: "PT Lombok Sumbawa Tour",
    companyLogo: "/images/karir-logo-0.png",
    location: "Sumbawa / Remote",
    jobType: "Contract",
    deadline: "2026-09-10",
    savedAt: "2026-09-01",
    status: "closed",
    salaryRange: "Rp 4.000.000 - Rp 6.000.000",
  },
  {
    id: "job-4",
    title: "Supervisor Operasional Tambang",
    companyName: "PT Mineral Sumbawa Energi",
    companyLogo: "/images/karir-logo-0.png",
    location: "Batu Hijau, Sumbawa Barat",
    jobType: "Full-Time",
    deadline: "2026-08-25",
    savedAt: "2026-08-10",
    status: "closed",
    salaryRange: "Rp 12.000.000 - Rp 18.000.000",
  },
];

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>(initialSavedJobs);
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "closed">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  // State Modal Konfirmasi Hapus
  const [jobToDelete, setJobToDelete] = useState<SavedJob | null>(null);

  // Fungsi Hapus dari Simpanan
  const handleRemoveSavedJob = () => {
    if (jobToDelete) {
      setSavedJobs((prev) => prev.filter((job) => job.id !== jobToDelete.id));
      setJobToDelete(null);
    }
  };

  // Filter & Search Logic
  const filteredJobs = savedJobs
    .filter((job) => {
      // Filter berdasarkan status
      if (filterStatus === "active" && job.status !== "active") return false;
      if (filterStatus === "closed" && job.status !== "closed") return false;

      // Filter berdasarkan pencarian
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
      } else {
        return new Date(a.savedAt).getTime() - new Date(b.savedAt).getTime();
      }
    });

  // Hitung jumlah berdasarkan status
  const activeCount = savedJobs.filter((j) => j.status === "active").length;
  const closedCount = savedJobs.filter((j) => j.status === "closed").length;

  return (
    <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-0 text-slate-800">
      <div className="mx-auto space-y-6">
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
            <span className="font-semibold text-slate-800">
              Lowongan Tersimpan
            </span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
                <Bookmark className="w-7 h-7 text-app-navy-700 fill-app-navy-700/20" />
                <span>Lowongan Tersimpan</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Kelola daftar lowongan kerja yang telah Anda simpan untuk
                dilamar nanti.
              </p>
            </div>

            {/* Total Count Badge */}
            <div className="self-start sm:self-auto bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
              <div className="p-2 bg-app-navy-50 rounded-xl text-app-navy-700">
                <Bookmark className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Total Tersimpan
                </span>
                <span className="text-sm font-extrabold text-slate-900">
                  {savedJobs.length} Lowongan
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CONTROLS: SEARCH, FILTER, & SORT */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
          {/* TAB FILTER STATUS */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setFilterStatus("all")}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterStatus === "all"
                  ? "bg-white text-app-navy-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Semua ({savedJobs.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus("active")}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterStatus === "active"
                  ? "bg-white text-emerald-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Aktif ({activeCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus("closed")}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterStatus === "closed"
                  ? "bg-white text-rose-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Sudah Ditutup ({closedCount})
            </button>
          </div>

          {/* SEARCH & SORT */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari posisi atau perusahaan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-app-navy-600 focus:bg-white transition-all"
              />
            </div>

            {/* Sort Select */}
            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "newest" | "oldest")
                }
                className="w-full sm:w-auto appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 pr-8 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-app-navy-600 transition-all cursor-pointer"
              >
                <option value="newest">Disimpan Terbaru</option>
                <option value="oldest">Disimpan Terlama</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* DAFTAR LOWONGAN TERSIMPAN */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden group"
              >
                {/* Aksen Warna Status Samping */}
                <div
                  className={`absolute top-0 left-0 bottom-0 w-1.5 ${
                    job.status === "active" ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                />

                {/* INFO LOWONGAN */}
                <div className="flex items-start gap-4 pl-2">
                  {/* Logo Perusahaan */}
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 p-2 overflow-hidden">
                    <Image
                      src={job.companyLogo}
                      alt={job.companyName}
                      width={48}
                      height={48}
                      className="object-contain max-h-full"
                    />
                  </div>

                  <div className="space-y-1.5">
                    {/* Status Badge & Job Type */}
                    <div className="flex flex-wrap items-center gap-2">
                      {job.status === "active" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          Lowongan Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          <XCircle className="w-3 h-3" />
                          Sudah Ditutup
                        </span>
                      )}

                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600">
                        {job.jobType}
                      </span>
                    </div>

                    {/* Nama Posisi */}
                    <Link
                      href={`/lowongan/${job.id}`}
                      className="text-base font-extrabold text-slate-900 hover:text-app-navy-700 transition-colors line-clamp-1"
                    >
                      {job.title}
                    </Link>

                    {/* Nama Perusahaan & Lokasi */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-semibold text-slate-700">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        {job.companyName}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {job.location}
                      </span>
                    </div>

                    {/* Meta Info Tambahan: Tanggal Simpan & Batas */}
                    <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Bookmark className="w-3 h-3 text-app-navy-600" />
                        Disimpan:{" "}
                        <strong className="text-slate-700">
                          {job.savedAt}
                        </strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        Batas Lamaran:{" "}
                        <strong className="text-slate-700">
                          {job.deadline}
                        </strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex items-center justify-end gap-2.5 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                  {/* Tombol Hapus */}
                  <button
                    type="button"
                    onClick={() => setJobToDelete(job)}
                    className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-xl transition-all"
                    title="Hapus dari simpanan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Tombol Detail */}
                  <Link
                    href={`/lowongan/${job.id}`}
                    className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                      job.status === "active"
                        ? "bg-app-navy-700 hover:bg-app-navy-800 text-white"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    <span>Lihat Detail</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-app-navy-50 text-app-navy-600 rounded-full flex items-center justify-center mx-auto border border-app-navy-100">
              <BookmarkX className="w-8 h-8" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-lg font-bold text-slate-900">
                Tidak Ada Lowongan Tersimpan
              </h3>
              <p className="text-xs text-slate-500">
                {searchQuery || filterStatus !== "all"
                  ? "Tidak ada lowongan yang sesuai dengan kriteria pencarian atau filter Anda."
                  : "Anda belum menyimpan lowongan kerja apa pun. Jelajahi lowongan dan bookmark pekerjaan yang Anda minati."}
              </p>
            </div>
            {searchQuery || filterStatus !== "all" ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setFilterStatus("all");
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
              >
                Reset Filter & Pencarian
              </button>
            ) : (
              <Link
                href="/lowongan"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-app-navy-700 hover:bg-app-navy-800 text-white text-xs font-bold rounded-xl shadow-md transition-all"
              >
                <span>Cari Lowongan Sekarang</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        )}

        {/* MODAL KONFIRMASI HAPUS */}
        {jobToDelete && (
          <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-rose-100 text-rose-600 rounded-xl shrink-0">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">
                    Hapus dari Simpanan?
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Apakah Anda yakin ingin menghapus{" "}
                    <strong className="text-slate-800">
                      {`"${jobToDelete.title}"`}
                    </strong>{" "}
                    dari daftar lowongan tersimpan Anda?
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setJobToDelete(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleRemoveSavedJob}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Ya, Hapus</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

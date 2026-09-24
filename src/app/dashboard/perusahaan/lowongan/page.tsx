/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/purity */
"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  PlusCircle,
  Eye,
  Edit3,
  Copy,
  Power,
  Archive,
  Trash2,
  MoreVertical,
  Briefcase,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

// Tipe Data Lowongan
type JobStatus =
  | "Draft"
  | "Menunggu verifikasi"
  | "Aktif"
  | "Ditolak"
  | "Ditangguhkan"
  | "Berakhir"
  | "Diarsipkan";

// 10 Tahap Rekrutmen
export type RecruitmentStage =
  | "Seleksi Administrasi"
  | "Tes Tertulis / Tes Kemampuan"
  | "Tes Praktik / Skill Test"
  | "Psikotes"
  | "Wawancara HRD"
  | "Wawancara User"
  | "Tes Kesehatan"
  | "Pemeriksaan Referensi"
  | "Penawaran Kerja"
  | "Penerimaan / Onboarding";

interface JobItem {
  id: string;
  position: string;
  jobType: string;
  location: string;
  applicantsCount: number;
  createdDate: string;
  deadlineDate: string;
  status: JobStatus;
  stage: RecruitmentStage;
}

const STAGE_OPTIONS: RecruitmentStage[] = [
  "Seleksi Administrasi",
  "Tes Tertulis / Tes Kemampuan",
  "Tes Praktik / Skill Test",
  "Psikotes",
  "Wawancara HRD",
  "Wawancara User",
  "Tes Kesehatan",
  "Pemeriksaan Referensi",
  "Penawaran Kerja",
  "Penerimaan / Onboarding",
];

export default function MyJobsPage() {
  // State Filter & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("Semua Status");
  const [selectedType, setSelectedType] = useState<string>("Semua Jenis");
  const [selectedStage, setSelectedStage] = useState<string>("Semua Tahap");
  const [selectedDate, setSelectedDate] = useState<string>("Semua Waktu");
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  // State Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Mock Data Lowongan
  const [jobs, setJobs] = useState<JobItem[]>([
    {
      id: "JOB-001",
      position: "Frontend Developer (React/Next.js)",
      jobType: "Full-time",
      location: "Sumbawa Besar (Onsite)",
      applicantsCount: 142,
      createdDate: "10 Sep 2026",
      deadlineDate: "30 Sep 2026",
      status: "Aktif",
      stage: "Tes Praktik / Skill Test",
    },
    {
      id: "JOB-002",
      position: "UI/UX Designer Specialist",
      jobType: "Full-time",
      location: "Hybrid (Sumbawa / Remote)",
      applicantsCount: 89,
      createdDate: "12 Sep 2026",
      deadlineDate: "05 Okt 2026",
      status: "Aktif",
      stage: "Wawancara User",
    },
    {
      id: "JOB-003",
      position: "Digital Marketing Executive",
      jobType: "Contract",
      location: "Sumbawa Besar (Onsite)",
      applicantsCount: 54,
      createdDate: "01 Sep 2026",
      deadlineDate: "20 Sep 2026",
      status: "Berakhir",
      stage: "Penawaran Kerja",
    },
    {
      id: "JOB-004",
      position: "Senior Backend Engineer (Golang)",
      jobType: "Remote",
      location: "Full Remote",
      applicantsCount: 0,
      createdDate: "22 Sep 2026",
      deadlineDate: "15 Okt 2026",
      status: "Menunggu verifikasi",
      stage: "Seleksi Administrasi",
    },
    {
      id: "JOB-005",
      position: "DevOps & Infrastructure Lead",
      jobType: "Full-time",
      location: "Sumbawa Besar (Onsite)",
      applicantsCount: 0,
      createdDate: "23 Sep 2026",
      deadlineDate: "20 Okt 2026",
      status: "Draft",
      stage: "Seleksi Administrasi",
    },
    {
      id: "JOB-006",
      position: "Copywriter & Content Creator",
      jobType: "Part-time",
      location: "Hybrid (Sumbawa)",
      applicantsCount: 12,
      createdDate: "15 Agu 2026",
      deadlineDate: "30 Agu 2026",
      status: "Diarsipkan",
      stage: "Penerimaan / Onboarding",
    },
    {
      id: "JOB-007",
      position: "Finance & Tax Officer",
      jobType: "Full-time",
      location: "Sumbawa Besar (Onsite)",
      applicantsCount: 0,
      createdDate: "05 Sep 2026",
      deadlineDate: "25 Sep 2026",
      status: "Ditolak",
      stage: "Seleksi Administrasi",
    },
    {
      id: "JOB-008",
      position: "HR Recruitment Specialist",
      jobType: "Contract",
      location: "Sumbawa Besar (Onsite)",
      applicantsCount: 23,
      createdDate: "02 Sep 2026",
      deadlineDate: "01 Okt 2026",
      status: "Ditangguhkan",
      stage: "Wawancara HRD",
    },
  ]);

  // Helper Warna Badge Status Lowongan
  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case "Aktif":
        return "bg-teal-50 text-teal-700 border-teal-200/80";
      case "Menunggu verifikasi":
        return "bg-amber-50 text-amber-700 border-amber-200/80";
      case "Draft":
        return "bg-slate-100 text-slate-600 border-slate-200";
      case "Ditolak":
        return "bg-rose-50 text-rose-700 border-rose-200/80";
      case "Ditangguhkan":
        return "bg-orange-50 text-orange-700 border-orange-200/80";
      case "Berakhir":
        return "bg-slate-100 text-slate-500 border-slate-200";
      case "Diarsipkan":
        return "bg-purple-50 text-purple-700 border-purple-200/80";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  // Helper Warna Badge Tahap Rekrutmen
  const getStageBadge = (stage: RecruitmentStage) => {
    switch (stage) {
      case "Seleksi Administrasi":
        return "bg-slate-100 text-slate-700 border-slate-200";
      case "Tes Tertulis / Tes Kemampuan":
        return "bg-blue-50 text-blue-700 border-blue-200/80";
      case "Tes Praktik / Skill Test":
        return "bg-indigo-50 text-indigo-700 border-indigo-200/80";
      case "Psikotes":
        return "bg-violet-50 text-violet-700 border-violet-200/80";
      case "Wawancara HRD":
        return "bg-sky-50 text-sky-700 border-sky-200/80";
      case "Wawancara User":
        return "bg-cyan-50 text-cyan-700 border-cyan-200/80";
      case "Tes Kesehatan":
        return "bg-rose-50 text-rose-700 border-rose-200/80";
      case "Pemeriksaan Referensi":
        return "bg-amber-50 text-amber-700 border-amber-200/80";
      case "Penawaran Kerja":
        return "bg-orange-50 text-orange-700 border-orange-200/80";
      case "Penerimaan / Onboarding":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  // Filter Logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchSearch =
        job.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus =
        selectedStatus === "Semua Status" || job.status === selectedStatus;

      const matchType =
        selectedType === "Semua Jenis" || job.jobType === selectedType;

      const matchStage =
        selectedStage === "Semua Tahap" || job.stage === selectedStage;

      return matchSearch && matchStatus && matchType && matchStage;
    });
  }, [jobs, searchQuery, selectedStatus, selectedType, selectedStage]);

  // Reset ke halaman 1 ketika pencarian/filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStatus, selectedType, selectedStage, selectedDate]);

  // Calculation untuk Pagination
  const totalItems = filteredJobs.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredJobs.slice(start, start + pageSize);
  }, [filteredJobs, currentPage, pageSize]);

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Actions Dropdown
  const handleAction = (id: string, actionType: string) => {
    setActiveDropdownId(null);
    switch (actionType) {
      case "Duplikasi": {
        const target = jobs.find((j) => j.id === id);
        if (target) {
          const duplicated: JobItem = {
            ...target,
            id: `JOB-${Math.floor(100 + Math.random() * 900)}`,
            position: `${target.position} (Salinan)`,
            status: "Draft",
            stage: "Seleksi Administrasi",
            applicantsCount: 0,
            createdDate: "24 Sep 2026",
          };
          setJobs([duplicated, ...jobs]);
          alert(`Lowongan "${target.position}" berhasil diduplikasi ke Draft!`);
        }
        break;
      }
      case "Nonaktifkan":
        setJobs(
          jobs.map((j) =>
            j.id === id ? { ...j, status: "Ditangguhkan" as JobStatus } : j,
          ),
        );
        break;
      case "Arsipkan":
        setJobs(
          jobs.map((j) =>
            j.id === id ? { ...j, status: "Diarsipkan" as JobStatus } : j,
          ),
        );
        break;
      case "Hapus":
        if (
          confirm(
            "Apakah Anda yakin ingin menghapus lowongan ini secara permanen?",
          )
        ) {
          setJobs(jobs.filter((j) => j.id !== id));
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* HEADER & QUICK STATS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900">
            Lowongan Saya
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Kelola seluruh posisi pekerjaan, pantau tahap rekrutmen aktif, dan
            publikasikan lowongan baru.
          </p>
        </div>

        <Link
          href="/dashboard/perusahaan/lowongan/buat"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors shadow-xs shadow-teal-600/20 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Buat Lowongan Baru</span>
        </Link>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="lg:col-span-3 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari posisi atau lokasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Filter Tahap Rekrutmen */}
          <div className="lg:col-span-3">
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-medium focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
            >
              <option value="Semua Tahap">Semua Tahap Rekrutmen</option>
              {STAGE_OPTIONS.map((stg) => (
                <option key={stg} value={stg}>
                  {stg}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Status */}
          <div className="lg:col-span-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-medium focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
            >
              <option value="Semua Status">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Menunggu verifikasi">Menunggu Verifikasi</option>
              <option value="Draft">Draft</option>
              <option value="Ditangguhkan">Ditangguhkan</option>
              <option value="Berakhir">Berakhir</option>
              <option value="Diarsipkan">Diarsipkan</option>
              <option value="Ditolak">Ditolak</option>
            </select>
          </div>

          {/* Filter Jenis Pekerjaan */}
          <div className="lg:col-span-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-medium focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
            >
              <option value="Semua Jenis">Semua Jenis</option>
              <option value="Full-time">Full-time</option>
              <option value="Contract">Contract</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          {/* Filter Tanggal Publikasi */}
          <div className="lg:col-span-2">
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-medium focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
            >
              <option value="Semua Waktu">Semua Waktu</option>
              <option value="7 Hari Terakhir">7 Hari Terakhir</option>
              <option value="30 Hari Terakhir">30 Hari Terakhir</option>
              <option value="Bulan Ini">Bulan Ini</option>
            </select>
          </div>
        </div>

        {/* Counter Results & Reset */}
        <div className="flex items-center justify-between text-[0.7rem] text-slate-500 pt-1 px-1">
          <span>
            Menampilkan{" "}
            <strong className="text-slate-800">{filteredJobs.length}</strong>{" "}
            dari {jobs.length} lowongan
          </span>
          {(searchQuery ||
            selectedStatus !== "Semua Status" ||
            selectedType !== "Semua Jenis" ||
            selectedStage !== "Semua Tahap") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedStatus("Semua Status");
                setSelectedType("Semua Jenis");
                setSelectedStage("Semua Tahap");
                setSelectedDate("Semua Waktu");
              }}
              className="text-teal-600 hover:text-teal-700 font-semibold"
            >
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {/* TABEL DAFTAR LOWONGAN */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4 min-w-[220px]">Posisi</th>
                <th className="py-3.5 px-3 min-w-[180px]">Tahap Rekrutmen</th>
                <th className="py-3.5 px-3">Jenis</th>
                <th className="py-3.5 px-3 min-w-[140px]">Lokasi</th>
                <th className="py-3.5 px-3 text-center">Pelamar</th>
                <th className="py-3.5 px-3">Tgl Dibuat</th>
                <th className="py-3.5 px-3">Batas Akhir</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs">
              {paginatedJobs.length > 0 ? (
                paginatedJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    {/* Posisi */}
                    <td className="py-3.5 px-4">
                      <div>
                        <Link
                          href={`/dashboard/perusahaan/lowongan/${job.id}`}
                          className="font-bold text-slate-900 hover:text-teal-600 transition-colors line-clamp-1"
                        >
                          {job.position}
                        </Link>
                        <span className="text-[0.625rem] text-slate-400 font-mono">
                          ID: {job.id}
                        </span>
                      </div>
                    </td>

                    {/* Tahap Rekrutmen Lowongan (Plain Badge, No Dropdown) */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[0.65rem] font-bold border ${getStageBadge(
                          job.stage,
                        )}`}
                      >
                        {job.stage}
                      </span>
                    </td>

                    {/* Jenis Pekerjaan */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[0.65rem] font-semibold border border-slate-200/60">
                        {job.jobType}
                      </span>
                    </td>

                    {/* Lokasi */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[130px] text-[0.7rem]">
                          {job.location}
                        </span>
                      </div>
                    </td>

                    {/* Jumlah Pelamar */}
                    <td className="py-3.5 px-3 text-center">
                      <Link
                        href={`/dashboard/perusahaan/pelamar?jobId=${job.id}`}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.7rem] font-bold transition-colors ${
                          job.applicantsCount > 0
                            ? "bg-teal-50 text-teal-700 hover:bg-teal-100"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        <Users className="w-3 h-3" />
                        <span>{job.applicantsCount}</span>
                      </Link>
                    </td>

                    {/* Tanggal Dibuat */}
                    <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap text-[0.7rem]">
                      {job.createdDate}
                    </td>

                    {/* Batas Pendaftaran */}
                    <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap text-[0.7rem]">
                      {job.deadlineDate}
                    </td>

                    {/* Status Lowongan */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold border ${getStatusBadge(
                          job.status,
                        )}`}
                      >
                        {job.status}
                      </span>
                    </td>

                    {/* Aksi Menu Dropdown */}
                    <td className="py-3.5 px-4 text-right relative">
                      <div className="inline-block text-left">
                        <button
                          onClick={() =>
                            setActiveDropdownId(
                              activeDropdownId === job.id ? null : job.id,
                            )
                          }
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {/* Dropdown Menu */}
                        {activeDropdownId === job.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setActiveDropdownId(null)}
                            />
                            <div className="absolute right-4 mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 text-left divide-y divide-slate-100">
                              <div className="py-1">
                                <Link
                                  href={`/dashboard/perusahaan/lowongan/${job.id}`}
                                  className="flex items-center gap-2 px-3 py-1.5 text-[0.7rem] font-semibold text-slate-700 hover:bg-slate-50 hover:text-teal-600"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>Lihat Detail</span>
                                </Link>

                                <Link
                                  href={`/dashboard/perusahaan/lowongan/${job.id}/edit`}
                                  className="flex items-center gap-2 px-3 py-1.5 text-[0.7rem] font-semibold text-slate-700 hover:bg-slate-50 hover:text-teal-600"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                  <span>Edit Lowongan</span>
                                </Link>

                                <button
                                  onClick={() =>
                                    handleAction(job.id, "Duplikasi")
                                  }
                                  className="w-full flex items-center gap-2 px-3 py-1.5 text-[0.7rem] font-semibold text-slate-700 hover:bg-slate-50 hover:text-teal-600"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Duplikasi</span>
                                </button>
                              </div>

                              <div className="py-1">
                                {job.status === "Aktif" && (
                                  <button
                                    onClick={() =>
                                      handleAction(job.id, "Nonaktifkan")
                                    }
                                    className="w-full flex items-center gap-2 px-3 py-1.5 text-[0.7rem] font-semibold text-amber-600 hover:bg-amber-50"
                                  >
                                    <Power className="w-3.5 h-3.5" />
                                    <span>Nonaktifkan</span>
                                  </button>
                                )}

                                <button
                                  onClick={() =>
                                    handleAction(job.id, "Arsipkan")
                                  }
                                  className="w-full flex items-center gap-2 px-3 py-1.5 text-[0.7rem] font-semibold text-purple-600 hover:bg-purple-50"
                                >
                                  <Archive className="w-3.5 h-3.5" />
                                  <span>Arsipkan</span>
                                </button>
                              </div>

                              <div className="py-1">
                                <button
                                  onClick={() => handleAction(job.id, "Hapus")}
                                  className="w-full flex items-center gap-2 px-3 py-1.5 text-[0.7rem] font-semibold text-rose-600 hover:bg-rose-50"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Hapus</span>
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    <Briefcase className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p className="text-xs font-semibold">
                      Tidak ada lowongan kerja yang ditemukan
                    </p>
                    <p className="text-[0.65rem] text-slate-400 mt-0.5">
                      Coba ubah kata kunci pencarian atau filter status/tahap
                      Anda.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER PAGINATION */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-slate-200 text-xs text-slate-600 bg-slate-50/50">
          <div>
            Menampilkan{" "}
            <span className="font-bold text-slate-900">{startItem}</span> -{" "}
            <span className="font-bold text-slate-900">{endItem}</span> dari{" "}
            <span className="font-bold text-slate-900">{totalItems}</span> data
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            {/* Rows Per Page */}
            <div className="flex items-center gap-2">
              <span className="text-[0.7rem] text-slate-500 font-medium">
                Tampilkan:
              </span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 border border-slate-200 rounded-lg bg-white text-xs font-medium text-slate-800 focus:outline-none focus:border-teal-500"
              >
                {[10, 20, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Navigasi Halaman */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-white text-slate-600"
                title="Halaman Pertama"
              >
                <ChevronsLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-white text-slate-600"
                title="Halaman Sebelumnya"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <span className="px-2.5 text-xs font-semibold text-slate-700">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages || totalItems === 0}
                className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-white text-slate-600"
                title="Halaman Selanjutnya"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages || totalItems === 0}
                className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors bg-white text-slate-600"
                title="Halaman Terakhir"
              >
                <ChevronsRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Users,
  ChevronDown,
  MoreVertical,
  Eye,
  Calendar,
  GraduationCap,
  Briefcase,
  MapPin,
  Sparkles,
  Download,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Edit3,
  Mail,
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Tipe data kandidat
interface Applicant {
  id: string;
  name: string;
  email: string;
  avatar: string;
  position: string;
  education: string;
  experience: string;
  location: string;
  appliedDate: string;
  matchScore: number;
  status:
    | "Lamaran Masuk"
    | "Sedang Ditinjau"
    | "Lolos Administrasi"
    | "Tidak Lolos Administrasi"
    | "Interview"
    | "Tes Lanjutan"
    | "Diterima"
    | "Ditolak"
    | "Mengundurkan Diri";
}

const APPLICANTS_DATA: Applicant[] = [
  {
    id: "APP-001",
    name: "Ahmad Rizky",
    email: "ahmad.rizky@example.com",
    avatar: "AR",
    position: "Senior Frontend Developer",
    education: "S1 Teknik Informatika",
    experience: "4 Tahun",
    location: "Sumbawa, NTB",
    appliedDate: "20 Mei 2026",
    matchScore: 95,
    status: "Lolos Administrasi",
  },
  {
    id: "APP-002",
    name: "Siti Nurhaliza",
    email: "siti.nurhaliza@example.com",
    avatar: "SN",
    position: "UI/UX Designer",
    education: "S1 Desain Komunikasi Visual",
    experience: "3 Tahun",
    location: "Mataram, NTB",
    appliedDate: "19 Mei 2026",
    matchScore: 88,
    status: "Interview",
  },
  {
    id: "APP-003",
    name: "Budi Pratama",
    email: "budi.pratama@example.com",
    avatar: "BP",
    position: "Backend Developer",
    education: "D3 Manajemen Informatika",
    experience: "2 Tahun",
    location: "Sumbawa Barat, NTB",
    appliedDate: "18 Mei 2026",
    matchScore: 72,
    status: "Sedang Ditinjau",
  },
  {
    id: "APP-004",
    name: "Dina Mariana",
    email: "dina.m@example.com",
    avatar: "DM",
    position: "Senior Frontend Developer",
    education: "S1 Sistem Informasi",
    experience: "5 Tahun",
    location: "Denpasar, Bali",
    appliedDate: "17 Mei 2026",
    matchScore: 91,
    status: "Tes Lanjutan",
  },
  {
    id: "APP-005",
    name: "Fajar Kurniawan",
    email: "fajar.k@example.com",
    avatar: "FK",
    position: "Data Analyst",
    education: "S1 Matematika",
    experience: "1 Tahun",
    location: "Sumbawa, NTB",
    appliedDate: "16 Mei 2026",
    matchScore: 65,
    status: "Tidak Lolos Administrasi",
  },
  {
    id: "APP-006",
    name: "Rina Astuti",
    email: "rina.astuti@example.com",
    avatar: "RA",
    position: "HR Specialist",
    education: "S1 Psikologi",
    experience: "3 Tahun",
    location: "Sumbawa, NTB",
    appliedDate: "15 Mei 2026",
    matchScore: 84,
    status: "Diterima",
  },
  {
    id: "APP-007",
    name: "Eko Prasetyo",
    email: "eko.p@example.com",
    avatar: "EP",
    position: "Backend Developer",
    education: "S1 Teknik Elektro",
    experience: "Freshgraduate",
    location: "Sumbawa, NTB",
    appliedDate: "14 Mei 2026",
    matchScore: 50,
    status: "Mengundurkan Diri",
  },
];

export default function PelamarPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("Semua Posisi");
  const [selectedStatus, setSelectedStatus] = useState("Semua Status");
  const [selectedEducation, setSelectedEducation] =
    useState("Semua Pendidikan");
  const [selectedExperience, setSelectedExperience] =
    useState("Semua Pengalaman");
  const [selectedLocation, setSelectedLocation] = useState("Semua Lokasi");
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  // Pagination & Dropdown State
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filter Data
  const filteredApplicants = APPLICANTS_DATA.filter((applicant) => {
    const matchesSearch =
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition =
      selectedPosition === "Semua Posisi" ||
      applicant.position === selectedPosition;
    const matchesStatus =
      selectedStatus === "Semua Status" || applicant.status === selectedStatus;

    return matchesSearch && matchesPosition && matchesStatus;
  });

  const totalItems = filteredApplicants.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const paginatedApplicants = filteredApplicants.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleAction = (id: string, actionName: string) => {
    setActiveDropdownId(null);
    console.log(`Aksi "${actionName}" untuk ID: ${id}`);
  };

  // Helper Badge Status
  const getStatusBadge = (status: Applicant["status"]) => {
    switch (status) {
      case "Lamaran Masuk":
        return "bg-slate-100 text-slate-700 border-slate-200/60";
      case "Sedang Ditinjau":
        return "bg-amber-50 text-amber-700 border-amber-200/60";
      case "Lolos Administrasi":
        return "bg-teal-50 text-teal-700 border-teal-200/60";
      case "Tidak Lolos Administrasi":
        return "bg-rose-50 text-rose-700 border-rose-200/60";
      case "Interview":
        return "bg-purple-50 text-purple-700 border-purple-200/60";
      case "Tes Lanjutan":
        return "bg-indigo-50 text-indigo-700 border-indigo-200/60";
      case "Diterima":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
      case "Ditolak":
        return "bg-rose-50 text-rose-700 border-rose-200/60";
      case "Mengundurkan Diri":
        return "bg-slate-100 text-slate-500 border-slate-200/60";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200/60";
    }
  };

  // Helper Badge Match Score
  const getMatchScoreBadge = (score: number) => {
    if (score >= 85) return "bg-teal-50 text-teal-700 hover:bg-teal-100";
    if (score >= 70) return "bg-amber-50 text-amber-700 hover:bg-amber-100";
    return "bg-slate-100 text-slate-500";
  };

  return (
    <div className="bg-slate-50/50 text-slate-800 text-xs">
      <div className="mx-auto space-y-4">
        {/* Page Title & Top Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-teal-600" /> Pusat Pengelolaan
              Pelamar
            </h1>
            <p className="text-[0.7rem] md:text-xs text-slate-500 mt-0.5">
              Kelola, tinjau, dan lacak status seluruh kandidat yang melamar di
              perusahaan Anda.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all shadow-xs">
              <Download className="w-3.5 h-3.5 text-slate-500" /> Export Data
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
          {/* Primary Search & Quick Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {/* Search Input */}
            <div className="relative sm:col-span-2">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama kandidat atau email..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 transition-all"
              />
            </div>

            {/* Filter Posisi */}
            <div>
              <select
                value={selectedPosition}
                onChange={(e) => {
                  setSelectedPosition(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 text-slate-700 transition-all"
              >
                <option>Semua Posisi</option>
                <option>Senior Frontend Developer</option>
                <option>UI/UX Designer</option>
                <option>Backend Developer</option>
                <option>Data Analyst</option>
                <option>HR Specialist</option>
              </select>
            </div>

            {/* Filter Status Lamaran */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 text-slate-700 transition-all"
              >
                <option>Semua Status</option>
                <option>Lamaran Masuk</option>
                <option>Sedang Ditinjau</option>
                <option>Lolos Administrasi</option>
                <option>Tidak Lolos Administrasi</option>
                <option>Interview</option>
                <option>Tes Lanjutan</option>
                <option>Diterima</option>
                <option>Ditolak</option>
                <option>Mengundurkan Diri</option>
              </select>
            </div>

            {/* Toggle Advanced Filter Button */}
            <div>
              <button
                onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
                className={`w-full flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                  showAdvancedFilter
                    ? "bg-teal-50 border-teal-200 text-teal-700"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filter Lanjutan</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${showAdvancedFilter ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          </div>

          {/* Advanced Filter Panel */}
          <AnimatePresence>
            {showAdvancedFilter && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden border-t border-slate-100 pt-3"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
                  <div>
                    <label className="block text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Tingkat Pendidikan
                    </label>
                    <select
                      value={selectedEducation}
                      onChange={(e) => setSelectedEducation(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 text-slate-700"
                    >
                      <option>Semua Pendidikan</option>
                      <option>SMA/SMK</option>
                      <option>D3 Informatika</option>
                      <option>S1 Teknik Informatika / Komputer</option>
                      <option>S1 Non-Teknis</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Pengalaman Kerja
                    </label>
                    <select
                      value={selectedExperience}
                      onChange={(e) => setSelectedExperience(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 text-slate-700"
                    >
                      <option>Semua Pengalaman</option>
                      <option>Freshgraduate</option>
                      <option>1 - 2 Tahun</option>
                      <option>3 - 5 Tahun</option>
                      <option>&gt; 5 Tahun</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Lokasi Domisili
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 text-slate-700"
                    >
                      <option>Semua Lokasi</option>
                      <option>Sumbawa, NTB</option>
                      <option>Sumbawa Barat, NTB</option>
                      <option>Mataram, NTB</option>
                      <option>Luar NTB</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Tanggal Melamar
                    </label>
                    <input
                      type="date"
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 text-slate-700"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tabel Pelamar UI baru */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4 min-w-[220px]">Nama Kandidat</th>
                  <th className="py-3.5 px-3 min-w-[180px]">Posisi</th>
                  <th className="py-3.5 px-3">Pendidikan</th>
                  <th className="py-3.5 px-3">Pengalaman</th>
                  <th className="py-3.5 px-3 min-w-[140px]">Lokasi</th>
                  <th className="py-3.5 px-3">Tgl Melamar</th>
                  <th className="py-3.5 px-3 text-center">Match Skor</th>
                  <th className="py-3.5 px-3">Status</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-xs">
                {paginatedApplicants.length > 0 ? (
                  paginatedApplicants.map((applicant) => (
                    <tr
                      key={applicant.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      {/* Nama Kandidat & Avatar */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 border border-teal-100 font-bold text-xs flex items-center justify-center shrink-0">
                            {applicant.avatar}
                          </div>
                          <div>
                            <Link
                              href={`/dashboard/perusahaan/pelamar/${applicant.id}`}
                              className="font-bold text-slate-900 hover:text-teal-600 transition-colors line-clamp-1"
                            >
                              {applicant.name}
                            </Link>
                            <span className="text-[0.625rem] text-slate-400 font-mono">
                              {applicant.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Posisi */}
                      <td className="py-3.5 px-3">
                        <span className="font-semibold text-slate-800 line-clamp-1">
                          {applicant.position}
                        </span>
                        <span className="text-[0.625rem] text-slate-400 font-mono">
                          ID: {applicant.id}
                        </span>
                      </td>

                      {/* Pendidikan */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="text-[0.7rem] font-medium">
                            {applicant.education}
                          </span>
                        </div>
                      </td>

                      {/* Pengalaman */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="text-[0.7rem] font-medium">
                            {applicant.experience}
                          </span>
                        </div>
                      </td>

                      {/* Lokasi */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate max-w-[130px] text-[0.7rem]">
                            {applicant.location}
                          </span>
                        </div>
                      </td>

                      {/* Tanggal Melamar */}
                      <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap text-[0.7rem]">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{applicant.appliedDate}</span>
                        </div>
                      </td>

                      {/* Match Skor */}
                      <td className="py-3.5 px-3 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.7rem] font-bold transition-colors ${getMatchScoreBadge(
                            applicant.matchScore,
                          )}`}
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>{applicant.matchScore}%</span>
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold border ${getStatusBadge(
                            applicant.status,
                          )}`}
                        >
                          {applicant.status}
                        </span>
                      </td>

                      {/* Aksi Menu Dropdown */}
                      <td className="py-3.5 px-4 text-right relative">
                        <div className="inline-block text-left">
                          <button
                            onClick={() =>
                              setActiveDropdownId(
                                activeDropdownId === applicant.id
                                  ? null
                                  : applicant.id,
                              )
                            }
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {/* Dropdown Menu */}
                          {activeDropdownId === applicant.id && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setActiveDropdownId(null)}
                              />
                              <div className="absolute right-4 mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 text-left divide-y divide-slate-100">
                                <div className="py-1">
                                  <Link
                                    href={`/dashboard/perusahaan/pelamar/${applicant.id}`}
                                    className="flex items-center gap-2 px-3 py-1.5 text-[0.7rem] font-semibold text-slate-700 hover:bg-slate-50 hover:text-teal-600"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>Lihat Detail</span>
                                  </Link>

                                  <button
                                    onClick={() =>
                                      handleAction(applicant.id, "Kirim Email")
                                    }
                                    className="w-full flex items-center gap-2 px-3 py-1.5 text-[0.7rem] font-semibold text-slate-700 hover:bg-slate-50 hover:text-teal-600"
                                  >
                                    <Mail className="w-3.5 h-3.5" />
                                    <span>Kirim Pesan</span>
                                  </button>
                                </div>

                                <div className="py-1">
                                  <button
                                    onClick={() =>
                                      handleAction(
                                        applicant.id,
                                        "Terima Pelamar",
                                      )
                                    }
                                    className="w-full flex items-center gap-2 px-3 py-1.5 text-[0.7rem] font-semibold text-emerald-600 hover:bg-emerald-50"
                                  >
                                    <UserCheck className="w-3.5 h-3.5" />
                                    <span>Loloskan</span>
                                  </button>

                                  <button
                                    onClick={() =>
                                      handleAction(
                                        applicant.id,
                                        "Tolak Pelamar",
                                      )
                                    }
                                    className="w-full flex items-center gap-2 px-3 py-1.5 text-[0.7rem] font-semibold text-rose-600 hover:bg-rose-50"
                                  >
                                    <UserX className="w-3.5 h-3.5" />
                                    <span>Tolak</span>
                                  </button>
                                </div>

                                <div className="py-1">
                                  <button
                                    onClick={() =>
                                      handleAction(applicant.id, "Hapus")
                                    }
                                    className="w-full flex items-center gap-2 px-3 py-1.5 text-[0.7rem] font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Hapus Data</span>
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
                    <td
                      colSpan={9}
                      className="py-12 text-center text-slate-400"
                    >
                      <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      <p className="text-xs font-semibold">
                        Tidak ada pelamar yang ditemukan
                      </p>
                      <p className="text-[0.65rem] text-slate-400 mt-0.5">
                        Coba ubah kata kunci pencarian atau filter Anda.
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
              <span className="font-bold text-slate-900">{totalItems}</span>{" "}
              data
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
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
    </div>
  );
}

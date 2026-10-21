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
  Download,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Mail,
  Trash2,
  X,
  CheckSquare,
  FileText,
  UserCheck,
  UserX,
  ShieldAlert,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

// Tipe data kandidat / pelamar untuk Admin System
interface Applicant {
  id: string;
  nik: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  education: string;
  experience: string;
  location: string;
  registeredDate: string;
  totalApplications: number; // Berapa kali dia pernah melamar
  activeApplications: number; // Berapa lamaran yang sedang berjalan
  lastAppliedCompany?: string; // Perusahaan terakhir yang dilamar
  accountStatus: "Aktif" | "Nonaktif" | "Ditangguhkan";
}

const INITIAL_APPLICANTS: Applicant[] = [
  {
    id: "PLM-001",
    nik: "5204011203980001",
    name: "Ahmad Rizky",
    email: "ahmad.rizky@example.com",
    phone: "081234567890",
    avatar: "AR",
    education: "S1 Teknik Informatika",
    experience: "4 Tahun",
    location: "Sumbawa, NTB",
    registeredDate: "10 Jan 2026",
    totalApplications: 5,
    activeApplications: 2,
    lastAppliedCompany: "PT Sumbawa Teknologi",
    accountStatus: "Aktif",
  },
  {
    id: "PLM-002",
    nik: "5204024508990002",
    name: "Siti Nurhaliza",
    email: "siti.nurhaliza@example.com",
    phone: "082345678901",
    avatar: "SN",
    education: "S1 Desain Komunikasi Visual",
    experience: "3 Tahun",
    location: "Mataram, NTB",
    registeredDate: "15 Feb 2026",
    totalApplications: 8,
    activeApplications: 3,
    lastAppliedCompany: "CV Digital Media",
    accountStatus: "Aktif",
  },
  {
    id: "PLM-003",
    nik: "5204012211000003",
    name: "Budi Pratama",
    email: "budi.pratama@example.com",
    phone: "083456789012",
    avatar: "BP",
    education: "D3 Manajemen Informatika",
    experience: "2 Tahun",
    location: "Sumbawa Barat, NTB",
    registeredDate: "01 Mar 2026",
    totalApplications: 2,
    activeApplications: 0,
    lastAppliedCompany: "PT Tambang Makmur",
    accountStatus: "Aktif",
  },
  {
    id: "PLM-004",
    nik: "5204036005970004",
    name: "Dina Mariana",
    email: "dina.m@example.com",
    phone: "084567890123",
    avatar: "DM",
    education: "S1 Sistem Informasi",
    experience: "5 Tahun",
    location: "Denpasar, Bali",
    registeredDate: "20 Mar 2026",
    totalApplications: 12,
    activeApplications: 4,
    lastAppliedCompany: "PT Bali Software House",
    accountStatus: "Aktif",
  },
  {
    id: "PLM-005",
    nik: "5204011809010005",
    name: "Fajar Kurniawan",
    email: "fajar.k@example.com",
    phone: "085678901234",
    avatar: "FK",
    education: "S1 Matematika",
    experience: "1 Tahun",
    location: "Sumbawa, NTB",
    registeredDate: "05 Apr 2026",
    totalApplications: 3,
    activeApplications: 1,
    lastAppliedCompany: "Bank NTB Syariah",
    accountStatus: "Aktif",
  },
  {
    id: "PLM-006",
    nik: "5204025112980006",
    name: "Rina Astuti",
    email: "rina.astuti@example.com",
    phone: "086789012345",
    avatar: "RA",
    education: "S1 Psikologi",
    experience: "3 Tahun",
    location: "Sumbawa, NTB",
    registeredDate: "12 Apr 2026",
    totalApplications: 4,
    activeApplications: 1,
    lastAppliedCompany: "PT Newmont / Amman",
    accountStatus: "Aktif",
  },
  {
    id: "PLM-007",
    nik: "5204010303020007",
    name: "Eko Prasetyo",
    email: "eko.p@example.com",
    phone: "087890123456",
    avatar: "EP",
    education: "S1 Teknik Elektro",
    experience: "Freshgraduate",
    location: "Sumbawa, NTB",
    registeredDate: "01 Mei 2026",
    totalApplications: 1,
    activeApplications: 0,
    lastAppliedCompany: "PT PLN (Persero)",
    accountStatus: "Nonaktif",
  },
];

export default function AdminPelamarPage() {
  const router = useRouter();
  const [applicants, setApplicants] = useState<Applicant[]>(INITIAL_APPLICANTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Semua Status Akun");
  const [selectedEducation, setSelectedEducation] = useState("Semua Pendidikan");
  const [selectedExperience, setSelectedExperience] = useState("Semua Pengalaman");
  const [selectedLocation, setSelectedLocation] = useState("Semua Lokasi");
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  // Multiple Selection State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Pagination & Dropdown State
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filter Data Pelamar
  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch =
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.nik.includes(searchTerm);

    const matchesStatus =
      selectedStatus === "Semua Status Akun" ||
      applicant.accountStatus === selectedStatus;

    const matchesEducation =
      selectedEducation === "Semua Pendidikan" ||
      applicant.education.toLowerCase().includes(selectedEducation.toLowerCase());

    const matchesLocation =
      selectedLocation === "Semua Lokasi" ||
      applicant.location.toLowerCase().includes(selectedLocation.toLowerCase());

    return matchesSearch && matchesStatus && matchesEducation && matchesLocation;
  });

  const totalItems = filteredApplicants.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const paginatedApplicants = filteredApplicants.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  // Total Keseluruhan Lamaran yang Dikirim oleh Semua Pelamar
  const totalApplicationsSubmitted = applicants.reduce(
    (acc, curr) => acc + curr.totalApplications,
    0,
  );

  // Handle Selection Logic
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allCurrentIds = paginatedApplicants.map((item) => item.id);
      setSelectedIds(Array.from(new Set([...selectedIds, ...allCurrentIds])));
    } else {
      const currentIds = paginatedApplicants.map((item) => item.id);
      setSelectedIds(selectedIds.filter((id) => !currentIds.includes(id)));
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const isAllPaginatedSelected =
    paginatedApplicants.length > 0 &&
    paginatedApplicants.every((item) => selectedIds.includes(item.id));

  // Batch Action Handlers
  const handleBulkDeactivate = () => {
    setApplicants((prev) =>
      prev.map((item) =>
        selectedIds.includes(item.id)
          ? { ...item, accountStatus: "Nonaktif" }
          : item,
      ),
    );
    setSelectedIds([]);
  };

  const handleBulkActivate = () => {
    setApplicants((prev) =>
      prev.map((item) =>
        selectedIds.includes(item.id)
          ? { ...item, accountStatus: "Aktif" }
          : item,
      ),
    );
    setSelectedIds([]);
  };

  const handleAction = (id: string, actionName: string) => {
    setActiveDropdownId(null);
    if (actionName === "Nonaktifkan") {
      setApplicants((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, accountStatus: "Nonaktif" } : item,
        ),
      );
    } else if (actionName === "Aktifkan") {
      setApplicants((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, accountStatus: "Aktif" } : item,
        ),
      );
    } else if (actionName === "Hapus") {
      setApplicants((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Helper Badge Status Akun
  const getAccountStatusBadge = (status: Applicant["accountStatus"]) => {
    switch (status) {
      case "Aktif":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
      case "Nonaktif":
        return "bg-slate-100 text-slate-600 border-slate-200/60";
      case "Ditangguhkan":
        return "bg-rose-50 text-rose-700 border-rose-200/60";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200/60";
    }
  };

  return (
    <div className="bg-slate-50/50 text-slate-800 text-xs relative pb-12">
      <div className="mx-auto space-y-4">
        {/* Page Title & Top Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-teal-600" /> Database Seluruh Pelamar
            </h1>
            <p className="text-[0.7rem] md:text-xs text-slate-500 mt-0.5">
              Kelola data pencari kerja terdaftar, pantau rekam jejak lamaran, serta status akun pelamar di sistem.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={()=>{
              router.push('pelamar/export')
            }} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all shadow-xs">
              <Download className="w-3.5 h-3.5 text-slate-500" /> Export
            </button>
          </div>
        </div>

        {/* Ringkasan Statistik untuk Admin */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">Total Pelamar</p>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">{applicants.length} Orang</h3>
            </div>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">Total Akumulasi Lamaran</p>
              <h3 className="text-lg font-bold text-teal-600 mt-0.5">{totalApplicationsSubmitted} Berkas</h3>
            </div>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">Pelamar Aktif Melamar</p>
              <h3 className="text-lg font-bold text-amber-600 mt-0.5">
                {applicants.filter((a) => a.activeApplications > 0).length} Orang
              </h3>
            </div>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">Akun Terverifikasi/Aktif</p>
              <h3 className="text-lg font-bold text-emerald-600 mt-0.5">
                {applicants.filter((a) => a.accountStatus === "Aktif").length} Akun
              </h3>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {/* Search Input */}
            <div className="relative sm:col-span-2">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama, NIK, atau email pelamar..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 transition-all"
              />
            </div>

            {/* Filter Status Akun */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 text-slate-700 transition-all"
              >
                <option>Semua Status Akun</option>
                <option>Aktif</option>
                <option>Nonaktif</option>
                <option>Ditangguhkan</option>
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
                <span>Filter Demografi</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${
                    showAdvancedFilter ? "rotate-180" : ""
                  }`}
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
                      <option>S1 Informatika</option>
                      <option>S1 Sistem Informasi</option>
                      <option>S1 Psikologi</option>
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
                      Domisili
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 text-slate-700"
                    >
                      <option>Semua Lokasi</option>
                      <option>Sumbawa</option>
                      <option>Sumbawa Barat</option>
                      <option>Mataram</option>
                      <option>Bali</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Tgl Pendaftaran Akun
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

        {/* Tabel Pelamar Admin */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 pl-4 pr-2 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={isAllPaginatedSelected}
                      onChange={handleSelectAll}
                      className="rounded border-slate-200 text-teal-600 focus:ring-teal-500 cursor-pointer"
                    />
                  </th>
                  <th className="py-3.5 px-3 min-w-[220px]">Data Pelamar</th>
                  <th className="py-3.5 px-3">Pendidikan</th>
                  <th className="py-3.5 px-3">Pengalaman</th>
                  <th className="py-3.5 px-3 min-w-[130px]">Domisili</th>
                  <th className="py-3.5 px-3 text-center">Total Lamaran</th>
                  <th className="py-3.5 px-3 text-center">Lamaran Aktif</th>
                  <th className="py-3.5 px-3">Tgl Daftar</th>
                  <th className="py-3.5 px-3">Status Akun</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-xs">
                {paginatedApplicants.length > 0 ? (
                  paginatedApplicants.map((applicant) => {
                    const isSelected = selectedIds.includes(applicant.id);
                    return (
                      <tr
                        key={applicant.id}
                        className={`transition-colors ${
                          isSelected ? "bg-teal-50/40" : "hover:bg-slate-50/80"
                        }`}
                      >
                        {/* Checkbox Individual */}
                        <td className="py-3.5 pl-4 pr-2 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectOne(applicant.id)}
                            className="rounded border-slate-200 text-teal-600 focus:ring-teal-500 cursor-pointer"
                          />
                        </td>

                        {/* Nama Pelamar, Email & NIK */}
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 border border-teal-100 font-bold text-xs flex items-center justify-center shrink-0">
                              {applicant.avatar}
                            </div>
                            <div>
                              <Link
                                href={`/dashboard/admin/pelamar/${applicant.id}`}
                                className="font-bold text-slate-900 hover:text-teal-600 transition-colors line-clamp-1"
                              >
                                {applicant.name}
                              </Link>
                              <div className="flex items-center gap-2 text-[0.625rem] text-slate-400 font-mono">
                                <span>NIK: {applicant.nik}</span>
                                <span>•</span>
                                <span>{applicant.email}</span>
                              </div>
                            </div>
                          </div>
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

                        {/* Domisili */}
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate max-w-[120px] text-[0.7rem]">
                              {applicant.location}
                            </span>
                          </div>
                        </td>

                        {/* Total Lamaran yang dimasukkan */}
                        <td className="py-3.5 px-3 text-center">
                          <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold text-[0.7rem]">
                            {applicant.totalApplications}x
                          </span>
                        </td>

                        {/* Lamaran Aktif */}
                        <td className="py-3.5 px-3 text-center">
                          <span
                            className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full font-bold text-[0.7rem] ${
                              applicant.activeApplications > 0
                                ? "bg-amber-50 text-amber-700 border border-amber-200/60"
                                : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            {applicant.activeApplications} Berkas
                          </span>
                        </td>

                        {/* Tanggal Terdaftar */}
                        <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap text-[0.7rem]">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{applicant.registeredDate}</span>
                          </div>
                        </td>

                        {/* Status Akun */}
                        <td className="py-3.5 px-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold border ${getAccountStatusBadge(
                              applicant.accountStatus,
                            )}`}
                          >
                            {applicant.accountStatus}
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
                                <div className="absolute right-4 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 text-left divide-y divide-slate-100">
                                  <div className="py-1">
                                    <Link
                                      href={`/dashboard/admin/pelamar/${applicant.id}`}
                                      className="flex items-center gap-2 px-3 py-1.5 text-[0.7rem] font-semibold text-slate-700 hover:bg-slate-50 hover:text-teal-600"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                      <span>Detail</span>
                                    </Link>

                                    <button
                                      onClick={() =>
                                        handleAction(
                                          applicant.id,
                                          "Kirim Email",
                                        )
                                      }
                                      className="w-full flex items-center gap-2 px-3 py-1.5 text-[0.7rem] font-semibold text-slate-700 hover:bg-slate-50 hover:text-teal-600"
                                    >
                                      <Mail className="w-3.5 h-3.5" />
                                      <span>Kirim Email / Notif</span>
                                    </button>
                                  </div>

                                  <div className="py-1">
                                    {applicant.accountStatus === "Aktif" ? (
                                      <button
                                        onClick={() =>
                                          handleAction(
                                            applicant.id,
                                            "Nonaktifkan",
                                          )
                                        }
                                        className="w-full flex items-center gap-2 px-3 py-1.5 text-[0.7rem] font-semibold text-amber-600 hover:bg-amber-50"
                                      >
                                        <ShieldAlert className="w-3.5 h-3.5" />
                                        <span>Nonaktifkan Akun</span>
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() =>
                                          handleAction(applicant.id, "Aktifkan")
                                        }
                                        className="w-full flex items-center gap-2 px-3 py-1.5 text-[0.7rem] font-semibold text-emerald-600 hover:bg-emerald-50"
                                      >
                                        <UserCheck className="w-3.5 h-3.5" />
                                        <span>Aktifkan Akun</span>
                                      </button>
                                    )}
                                  </div>

                                  <div className="py-1">
                                    <button
                                      onClick={() =>
                                        handleAction(applicant.id, "Hapus")
                                      }
                                      className="w-full flex items-center gap-2 px-3 py-1.5 text-[0.7rem] font-semibold text-rose-600 hover:bg-rose-50"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                      <span>Hapus Pelamar</span>
                                    </button>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={10}
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
              pelamar
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

      {/* FLOATING ACTION BAR FOR ADMIN */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700/60 flex items-center gap-4"
          >
            <div className="flex items-center gap-2 border-r border-slate-700 pr-4">
              <CheckSquare className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-medium">
                <strong className="text-teal-400">{selectedIds.length}</strong>{" "}
                pelamar dipilih
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkActivate}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold text-xs transition-colors shadow-xs"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Aktifkan Akun</span>
              </button>

              <button
                onClick={handleBulkDeactivate}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-semibold text-xs transition-colors shadow-xs"
              >
                <UserX className="w-3.5 h-3.5" />
                <span>Nonaktifkan Akun</span>
              </button>

              <button
                onClick={() => setSelectedIds([])}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors ml-1"
                title="Batal pilih"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Plus,
  Search,
  SlidersHorizontal,
  ChevronDown,
  Calendar,
  Eye,
  Layers,
  Briefcase,
  Users,
  CheckCircle2,
  AlertCircle,
  XCircle,
  FileText,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Send,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Tipe Data Riwayat Pesan
interface RecruitmentMessage {
  id: string;
  title: string;
  jobTitle: string;
  stage: string;
  templateType: string;
  recipientCount: number;
  sentDate: string;
  status: "Draft" | "Terkirim" | "Sebagian Gagal" | "Gagal";
}

// Data Dummy Awalan
const INITIAL_MESSAGES: RecruitmentMessage[] = [
  {
    id: "MSG-001",
    title: "Undangan Interview Tahap 1 HR",
    jobTitle: "Senior Frontend Developer",
    stage: "Interview HR",
    templateType: "Undangan Interview",
    recipientCount: 12,
    sentDate: "22 Mei 2026, 10:30 WITA",
    status: "Terkirim",
  },
  {
    id: "MSG-002",
    title: "Instruksi Technical Skill Test",
    jobTitle: "Senior Frontend Developer",
    stage: "Psikotes & Skill Test",
    templateType: "Tes Teknis",
    recipientCount: 8,
    sentDate: "20 Mei 2026, 14:15 WITA",
    status: "Terkirim",
  },
  {
    id: "MSG-003",
    title: "Pengumuman Hasil Seleksi Administrasi",
    jobTitle: "UI/UX Designer",
    stage: "Seleksi Berkas",
    templateType: "Pengumuman Kelulusan",
    recipientCount: 25,
    sentDate: "18 Mei 2026, 09:00 WITA",
    status: "Sebagian Gagal",
  },
  {
    id: "MSG-004",
    title: "Pemberitahuan Penolakan Kualifikasi",
    jobTitle: "Data Analyst",
    stage: "Administrasi",
    templateType: "Penolakan (Reject)",
    recipientCount: 40,
    sentDate: "15 Mei 2026, 16:45 WITA",
    status: "Terkirim",
  },
  {
    id: "MSG-005",
    title: "Draft Penawaran Kerja (Offering)",
    jobTitle: "HR Specialist",
    stage: "Offering Letter",
    templateType: "Offering Letter",
    recipientCount: 2,
    sentDate: "-",
    status: "Draft",
  },
  {
    id: "MSG-006",
    title: "Pengingat Jadwal Interview User",
    jobTitle: "Backend Developer",
    stage: "Interview User",
    templateType: "Pengingat (Reminder)",
    recipientCount: 5,
    sentDate: "10 Mei 2026, 08:00 WITA",
    status: "Gagal",
  },
];

export default function RiwayatPesanPage() {
  const [messages] = useState<RecruitmentMessage[]>(INITIAL_MESSAGES);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState("Semua Lowongan");
  const [selectedStage, setSelectedStage] = useState("Semua Tahapan");
  const [selectedTemplate, setSelectedTemplate] = useState("Semua Template");
  const [selectedStatus, setSelectedStatus] = useState("Semua Status");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filter Logic
  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.stage.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesJob =
      selectedJob === "Semua Lowongan" || msg.jobTitle === selectedJob;
    const matchesStage =
      selectedStage === "Semua Tahapan" || msg.stage === selectedStage;
    const matchesTemplate =
      selectedTemplate === "Semua Template" ||
      msg.templateType === selectedTemplate;
    const matchesStatus =
      selectedStatus === "Semua Status" || msg.status === selectedStatus;

    return (
      matchesSearch &&
      matchesJob &&
      matchesStage &&
      matchesTemplate &&
      matchesStatus
    );
  });

  // Pagination Calculation
  const totalItems = filteredMessages.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const paginatedMessages = filteredMessages.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  // Status Badge Helper
  const getStatusBadge = (status: RecruitmentMessage["status"]) => {
    switch (status) {
      case "Terkirim":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Terkirim
          </span>
        );
      case "Sebagian Gagal":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold bg-amber-50 text-amber-700 border border-amber-200/60">
            <AlertCircle className="w-3 h-3 text-amber-600" /> Sebagian Gagal
          </span>
        );
      case "Gagal":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold bg-rose-50 text-rose-700 border border-rose-200/60">
            <XCircle className="w-3 h-3 text-rose-600" /> Gagal
          </span>
        );
      case "Draft":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold bg-slate-100 text-slate-600 border border-slate-200">
            <FileText className="w-3 h-3 text-slate-500" /> Draft
          </span>
        );
      default:
        return null;
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedJob("Semua Lowongan");
    setSelectedStage("Semua Tahapan");
    setSelectedTemplate("Semua Template");
    setSelectedStatus("Semua Status");
    setDateRange({ start: "", end: "" });
    setCurrentPage(1);
  };

  return (
    <div className="bg-slate-50/50 text-slate-800 text-xs relative min-h-screen pb-16">
      <div className="mx-auto space-y-4">
        {/* A. HEADER PAGE */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-teal-600" /> Riwayat Pesan
            </h1>
            <p className="text-[0.7rem] md:text-xs text-slate-500 mt-0.5">
              Seluruh rekam jejak pesan rekrutmen yang pernah dibuat dan
              dikirimkan kepada pelamar.
            </p>
          </div>
          <Link
            href="/dashboard/perusahaan/pesan/buat"
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-xs transition-all shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Pesan Rekrutmen</span>
          </Link>
        </div>

        {/* B & C. SEARCH & FILTER SECTION */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {/* C. Search Input */}
            <div className="relative sm:col-span-2">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari judul pesan, lowongan, atau tahap..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 transition-all"
              />
            </div>

            {/* Filter Lowongan */}
            <div>
              <select
                value={selectedJob}
                onChange={(e) => {
                  setSelectedJob(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 text-slate-700 transition-all"
              >
                <option>Semua Lowongan</option>
                <option>Senior Frontend Developer</option>
                <option>UI/UX Designer</option>
                <option>Backend Developer</option>
                <option>Data Analyst</option>
                <option>HR Specialist</option>
              </select>
            </div>

            {/* Filter Status Pengiriman */}
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
                <option>Draft</option>
                <option>Terkirim</option>
                <option>Sebagian Gagal</option>
                <option>Gagal</option>
              </select>
            </div>

            {/* Toggle Advanced Filter */}
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
                  className={`w-3 h-3 transition-transform ${
                    showAdvancedFilter ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Panel Filter Lanjutan */}
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
                  {/* Tahapan Rekrutmen */}
                  <div>
                    <label className="block text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Tahapan Rekrutmen
                    </label>
                    <select
                      value={selectedStage}
                      onChange={(e) => setSelectedStage(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 text-slate-700"
                    >
                      <option>Semua Tahapan</option>
                      <option>Administrasi</option>
                      <option>Seleksi Berkas</option>
                      <option>Interview HR</option>
                      <option>Interview User</option>
                      <option>Psikotes & Skill Test</option>
                      <option>Offering Letter</option>
                    </select>
                  </div>

                  {/* Jenis Template Pesan */}
                  <div>
                    <label className="block text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Jenis Template Pesan
                    </label>
                    <select
                      value={selectedTemplate}
                      onChange={(e) => setSelectedTemplate(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 text-slate-700"
                    >
                      <option>Semua Template</option>
                      <option>Undangan Interview</option>
                      <option>Tes Teknis</option>
                      <option>Pengumuman Kelulusan</option>
                      <option>Penolakan (Reject)</option>
                      <option>Offering Letter</option>
                      <option>Pengingat (Reminder)</option>
                    </select>
                  </div>

                  {/* Rentang Tanggal Kirim */}
                  <div>
                    <label className="block text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Tanggal Mulai
                    </label>
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, start: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 text-slate-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Tanggal Sampai
                    </label>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, end: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 text-slate-700"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-3">
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-1 text-[0.7rem] font-semibold text-rose-600 hover:text-rose-700"
                  >
                    <X className="w-3.5 h-3.5" /> Reset Filter
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* D. TABEL RIWAYAT PESAN / E. EMPTY STATE */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto min-h-[350px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4 min-w-[220px]">Judul Pesan</th>
                  <th className="py-3.5 px-3 min-w-[180px]">Lowongan</th>
                  <th className="py-3.5 px-3 min-w-[140px]">Tahapan</th>
                  <th className="py-3.5 px-3 min-w-[150px]">Template</th>
                  <th className="py-3.5 px-3 text-center min-w-[90px]">
                    Penerima
                  </th>
                  <th className="py-3.5 px-3 min-w-[160px]">Tanggal Kirim</th>
                  <th className="py-3.5 px-3">Status</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-xs">
                {paginatedMessages.length > 0 ? (
                  paginatedMessages.map((msg) => (
                    <tr
                      key={msg.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      {/* Judul Pesan */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-start gap-2.5">
                          <div className="p-2 bg-teal-50 text-teal-700 rounded-lg shrink-0 mt-0.5">
                            <Send className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block line-clamp-1">
                              {msg.title}
                            </span>
                            <span className="text-[0.625rem] text-slate-400 font-mono">
                              ID: {msg.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Lowongan */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5 text-slate-700">
                          <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-semibold line-clamp-1">
                            {msg.jobTitle}
                          </span>
                        </div>
                      </td>

                      {/* Tahapan */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Layers className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-medium">{msg.stage}</span>
                        </div>
                      </td>

                      {/* Template */}
                      <td className="py-3.5 px-3">
                        <span className="inline-block bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded text-[0.7rem]">
                          {msg.templateType}
                        </span>
                      </td>

                      {/* Penerima */}
                      <td className="py-3.5 px-3 text-center">
                        <div className="inline-flex items-center gap-1 font-bold text-slate-800 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200">
                          <Users className="w-3 h-3 text-slate-500" />
                          <span>{msg.recipientCount}</span>
                        </div>
                      </td>

                      {/* Tanggal Kirim */}
                      <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap text-[0.7rem]">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{msg.sentDate}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        {getStatusBadge(msg.status)}
                      </td>

                      {/* Aksi */}
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/dashboard/perusahaan/pesan/${msg.id}`}
                          className="inline-flex items-center gap-1 text-[0.7rem] font-bold text-slate-400  hover:text-teal-700 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          {/* <span>Lihat Detail</span> */}
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  /* E. EMPTY STATE */
                  <tr>
                    <td colSpan={8} className="py-16 text-center">
                      <div className="max-w-sm mx-auto space-y-3">
                        <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                          <MessageSquare className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-700">
                            Belum ada pesan rekrutmen yang dikirim.
                          </p>
                          <p className="text-[0.7rem] text-slate-400 mt-0.5">
                            Buat pesan pertama Anda untuk menghubungi para
                            pelamar secara langsung.
                          </p>
                        </div>
                        <Link
                          href="/dashboard/perusahaan/pesan/buat"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-xs transition-all shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Buat Pesan Rekrutmen</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER PAGINATION */}
          {filteredMessages.length > 0 && (
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
          )}
        </div>
      </div>
    </div>
  );
}

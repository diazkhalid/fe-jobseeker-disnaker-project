"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Briefcase,
  Layers,
  FileText,
  Users,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Clock,
  Video,
  MapPin,
  Phone,
  Info,
  Send,
  Save,
  ChevronRight,
  UserCheck,
  Search,
  Filter,
  Eye,
  Building2,
  X,
  HelpCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- TYPES ---
interface Job {
  id: string;
  title: string;
  division: string;
  status: "Aktif" | "Draft" | "Tutup";
  applicantCount: number;
  stages: string[];
}

interface Applicant {
  id: string;
  name: string;
  avatar: string;
  email: string;
  currentStage: string;
  applicationStatus: "Seleksi" | "Ditolak" | "Diterima" | "Mundur";
  invitedStatus: "Belum diundang" | "Sudah diundang";
  applyDate: string;
  eligible: boolean;
  ineligibleReason?: string;
}

// --- DATA DUMMY LOWONGAN ---
const JOBS_DATA: Job[] = [
  {
    id: "JOB-01",
    title: "Senior Frontend Developer",
    division: "Engineering & IT",
    status: "Aktif",
    applicantCount: 42,
    stages: [
      "Seleksi Administrasi",
      "Tes Kemampuan (Skill Test)",
      "Wawancara HRD",
      "Wawancara User",
      "Offering Letter",
    ],
  },
  {
    id: "JOB-02",
    title: "UI/UX Designer",
    division: "Product & Design",
    status: "Aktif",
    applicantCount: 28,
    stages: [
      "Seleksi Administrasi",
      "Review Portfolio",
      "Wawancara HRD",
      "Wawancara User",
    ],
  },
  {
    id: "JOB-03",
    title: "Data Analyst",
    division: "Data & Analytics",
    status: "Aktif",
    applicantCount: 15,
    stages: ["Seleksi Administrasi", "Tes Kemampuan", "Wawancara User"],
  },
];

// --- DATA DUMMY PELAMAR ---
const INITIAL_APPLICANTS: Record<string, Applicant[]> = {
  "JOB-01": [
    {
      id: "APP-01",
      name: "Budi Santoso",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      email: "budi.santoso@gmail.com",
      currentStage: "Wawancara HRD",
      applicationStatus: "Seleksi",
      invitedStatus: "Belum diundang",
      applyDate: "10 Mei 2026",
      eligible: true,
    },
    {
      id: "APP-02",
      name: "Siti Rahmawati",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      email: "siti.rahma@gmail.com",
      currentStage: "Wawancara HRD",
      applicationStatus: "Seleksi",
      invitedStatus: "Belum diundang",
      applyDate: "12 Mei 2026",
      eligible: true,
    },
    {
      id: "APP-03",
      name: "Ahmad Rizky",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      email: "ahmad.rizky@gmail.com",
      currentStage: "Wawancara HRD",
      applicationStatus: "Seleksi",
      invitedStatus: "Sudah diundang",
      eligible: false,
      ineligibleReason: "Sudah pernah menerima pesan undangan tahap ini",
      applyDate: "08 Mei 2026",
    },
    {
      id: "APP-04",
      name: "Dewi Lestari",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80",
      email: "dewi.lestari@gmail.com",
      currentStage: "Seleksi Administrasi",
      applicationStatus: "Ditolak",
      invitedStatus: "Belum diundang",
      eligible: false,
      ineligibleReason: "Status pelamar ditolak",
      applyDate: "05 Mei 2026",
    },
    {
      id: "APP-05",
      name: "Fajar Pratama",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      email: "fajar.pratama@gmail.com",
      currentStage: "Wawancara HRD",
      applicationStatus: "Mundur",
      invitedStatus: "Belum diundang",
      eligible: false,
      ineligibleReason: "Pelamar telah mengundurkan diri",
      applyDate: "11 Mei 2026",
    },
  ],
  "JOB-02": [],
};

// --- LIST TEMPLATE ---
const TEMPLATE_OPTIONS = [
  "Undangan Tes Tertulis",
  "Undangan Tes Praktik",
  "Undangan Wawancara Daring",
  "Undangan Wawancara Luring",
  "Perubahan Jadwal",
  "Pengumuman Lolos Tahap",
  "Pengumuman Tidak Lolos",
  "Penawaran Kerja",
];

export default function BuatPesanRekrutmenPage() {
  // --- STATE UTAMA ---
  const [selectedJobId, setSelectedJobId] = useState<string>("JOB-01");
  const [selectedStage, setSelectedStage] = useState<string>("Wawancara HRD");
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    "Undangan Wawancara Daring",
  );

  // Filter Pelamar
  const [applicantSearch, setApplicantSearch] = useState("");
  const [filterStage, setFilterStage] = useState("Semua Tahap");
  const [filterStatus, setFilterStatus] = useState("Semua Status");
  const [filterInvited, setFilterInvited] = useState("Semua Status Undangan");

  // Selection Pelamar
  const [selectedApplicantIds, setSelectedApplicantIds] = useState<string[]>([
    "APP-01",
    "APP-02",
  ]);

  // Dynamic Form Field State
  const [formData, setFormData] = useState({
    date: "2026-09-25",
    startTime: "09:00",
    endTime: "10:00",
    meetingLink: "https://meet.google.com/xyz-abc-def",
    location: "Gedung Utama Lt. 3, Ruang Rapat A",
    fullAddress: "Jl. Lintas Sumbawa-Bima No. 45, Kabupaten Sumbawa",
    contactPerson: "HR Recruitment (+6281234567890)",
    prevSchedule: "Kamis, 24 September 2026 (09:00 WITA)",
    newSchedule: "Jumat, 25 September 2026 (10:00 WITA)",
    rescheduleReason: "Adanya penyesuaian agenda internal Tim Interviewer.",
    nextStageName: "Wawancara User & Skill Test",
    nextInfo: "Harap menyiapkan berkas portofolio terbaru Anda.",
    prevStageName: "Psikotes & Seleksi Berkas",
    rejectionClosing: "Terima kasih atas minat dan partisipasi Anda.",
    notes: "Harap hadir 10 menit sebelum jadwal dimulai.",
  });

  // Modal State
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  // --- DATA DERIVED ---
  const currentJob = useMemo(
    () => JOBS_DATA.find((j) => j.id === selectedJobId),
    [selectedJobId],
  );

  const rawApplicants = useMemo(
    () => INITIAL_APPLICANTS[selectedJobId] || [],
    [selectedJobId],
  );

  // Filter Applicants
  const filteredApplicants = useMemo(() => {
    return rawApplicants.filter((app) => {
      const matchSearch =
        app.name.toLowerCase().includes(applicantSearch.toLowerCase()) ||
        app.email.toLowerCase().includes(applicantSearch.toLowerCase());
      const matchStage =
        filterStage === "Semua Tahap" || app.currentStage === filterStage;
      const matchStatus =
        filterStatus === "Semua Status" ||
        app.applicationStatus === filterStatus;
      const matchInvited =
        filterInvited === "Semua Status Undangan" ||
        app.invitedStatus === filterInvited;

      return matchSearch && matchStage && matchStatus && matchInvited;
    });
  }, [
    rawApplicants,
    applicantSearch,
    filterStage,
    filterStatus,
    filterInvited,
  ]);

  // Applicant Summary
  const eligibleApplicants = useMemo(
    () => rawApplicants.filter((a) => a.eligible),
    [rawApplicants],
  );
  const ineligibleApplicants = useMemo(
    () => rawApplicants.filter((a) => !a.eligible),
    [rawApplicants],
  );

  // Handling Selection
  const handleSelectAllEligible = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const eligibleIds = filteredApplicants
        .filter((a) => a.eligible)
        .map((a) => a.id);
      setSelectedApplicantIds(
        Array.from(new Set([...selectedApplicantIds, ...eligibleIds])),
      );
    } else {
      const eligibleIds = filteredApplicants
        .filter((a) => a.eligible)
        .map((a) => a.id);
      setSelectedApplicantIds(
        selectedApplicantIds.filter((id) => !eligibleIds.includes(id)),
      );
    }
  };

  const handleToggleApplicant = (id: string, eligible: boolean) => {
    if (!eligible) return;
    if (selectedApplicantIds.includes(id)) {
      setSelectedApplicantIds(
        selectedApplicantIds.filter((item) => item !== id),
      );
    } else {
      setSelectedApplicantIds([...selectedApplicantIds, id]);
    }
  };

  // Sample Applicant untuk Preview
  const previewApplicant = useMemo(() => {
    const selected = rawApplicants.find((a) =>
      selectedApplicantIds.includes(a.id),
    );
    return selected || rawApplicants[0] || { name: "[Nama Pelamar]" };
  }, [rawApplicants, selectedApplicantIds]);

  // Handle Form Input Change
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Action Submit
  const handleSendSubmit = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsConfirmModalOpen(false);
      setSendSuccess(true);
    }, 1500);
  };

  return (
    <div className="bg-slate-50/50 text-slate-800 text-xs min-h-screen pb-20">
      <div className="mx-auto space-y-4">
        {/* TOP BAR / BACK ACTION */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard/perusahaan/pesan"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-teal-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Riwayat Pesan</span>
          </Link>
        </div>

        {/* PAGE HEADER */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Send className="w-6 h-6 text-teal-600" /> Buat Pesan Rekrutmen
          </h1>
          <p className="text-[0.7rem] md:text-xs text-slate-500 mt-0.5">
            Kirimkan informasi, undangan tes, wawancara, atau pengumuman seleksi
            secara langsung kepada para pelamar.
          </p>
        </div>

        {/* SUCCESS NOTIFICATION */}
        {sendSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-emerald-800"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-xs">Pesan Berhasil Dikirim!</p>
                <p className="text-[0.7rem] text-emerald-700">
                  Pesan telah antre dan dikirimkan kepada{" "}
                  {selectedApplicantIds.length} pelamar terdaftar.
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/perusahaan/pesan"
              className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-lg text-xs hover:bg-emerald-700 transition-all"
            >
              Lihat Riwayat Pesan
            </Link>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* LEFT COLUMN: A, B, C (FORM SETUP) */}
          <div className="lg:col-span-7 space-y-4">
            {/* A. INFORMASI PESAN */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs">
                  A
                </div>
                <h2 className="font-bold text-sm text-slate-900">
                  Informasi Pesan
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* 1. Pilih Lowongan */}
                <div className="md:col-span-2">
                  <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                    1. Pilih Lowongan Kerja{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={selectedJobId}
                    onChange={(e) => {
                      setSelectedJobId(e.target.value);
                      const newJob = JOBS_DATA.find(
                        (j) => j.id === e.target.value,
                      );
                      if (newJob && newJob.stages.length > 0) {
                        setSelectedStage(newJob.stages[0]);
                      } else {
                        setSelectedStage("");
                      }
                      setSelectedApplicantIds([]);
                    }}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-semibold text-slate-800"
                  >
                    {JOBS_DATA.map((job) => (
                      <option key={job.id} value={job.id}>
                        {job.title} — [{job.division}] ({job.applicantCount}{" "}
                        Pelamar)
                      </option>
                    ))}
                  </select>

                  {/* Info Lowongan Terpilih */}
                  {currentJob && (
                    <div className="mt-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between text-[0.7rem]">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        <span className="font-semibold text-slate-700">
                          Divisi: {currentJob.division}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500">
                          Pelamar:{" "}
                          <strong className="text-slate-800">
                            {currentJob.applicantCount}
                          </strong>
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[0.65rem]">
                          {currentJob.status}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Pilih Tahapan Rekrutmen */}
                <div>
                  <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                    2. Pilih Tahapan Rekrutmen{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  {currentJob && currentJob.stages.length > 0 ? (
                    <select
                      value={selectedStage}
                      onChange={(e) => setSelectedStage(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-semibold text-slate-800"
                    >
                      {currentJob.stages.map((stg, idx) => (
                        <option key={idx} value={stg}>
                          {stg}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-[0.7rem] flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>
                        Lowongan ini belum memiliki tahapan rekrutmen.
                      </span>
                    </div>
                  )}
                </div>

                {/* 3. Pilih Jenis Template */}
                <div>
                  <label className="block text-[0.7rem] font-bold text-slate-600 uppercase mb-1">
                    3. Jenis Template Pesan{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-semibold text-slate-800"
                  >
                    {TEMPLATE_OPTIONS.map((tmpl, idx) => (
                      <option key={idx} value={tmpl}>
                        {tmpl}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* B. PILIH PENERIMA PESAN */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs">
                    B
                  </div>
                  <h2 className="font-bold text-sm text-slate-900">
                    Pilih Penerima Pesan
                  </h2>
                </div>
                <span className="text-[0.7rem] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                  {selectedApplicantIds.length} Terpilih
                </span>
              </div>

              {/* B.5 Ringkasan Penerima Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 text-[0.7rem]">
                <div>
                  <span className="text-slate-400 block text-[0.65rem]">
                    Total Lowongan
                  </span>
                  <strong className="text-slate-800 font-bold">
                    {rawApplicants.length} Pelamar
                  </strong>
                </div>
                <div>
                  <span className="text-emerald-600 block text-[0.65rem]">
                    Memenuhi Syarat
                  </span>
                  <strong className="text-emerald-700 font-bold">
                    {eligibleApplicants.length} Pelamar
                  </strong>
                </div>
                <div>
                  <span className="text-teal-600 block text-[0.65rem]">
                    Pelamar Dipilih
                  </span>
                  <strong className="text-teal-700 font-bold">
                    {selectedApplicantIds.length} Pelamar
                  </strong>
                </div>
                <div>
                  <span className="text-rose-500 block text-[0.65rem]">
                    Tidak Memenuhi Syarat
                  </span>
                  <strong className="text-rose-600 font-bold">
                    {ineligibleApplicants.length} Pelamar
                  </strong>
                </div>
              </div>

              {/* B.2 Filter Pelamar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari pelamar..."
                    value={applicantSearch}
                    onChange={(e) => setApplicantSearch(e.target.value)}
                    className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                  />
                </div>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 text-slate-700"
                >
                  <option>Semua Status</option>
                  <option>Seleksi</option>
                  <option>Ditolak</option>
                  <option>Diterima</option>
                  <option>Mundur</option>
                </select>

                <select
                  value={filterInvited}
                  onChange={(e) => setFilterInvited(e.target.value)}
                  className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 text-slate-700"
                >
                  <option>Semua Status Undangan</option>
                  <option>Belum diundang</option>
                  <option>Sudah diundang</option>
                </select>
              </div>

              {/* B.4 Select All & Daftar Pelamar */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-100/70 p-2.5 border-b border-slate-200 flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700 text-[0.7rem]">
                    <input
                      type="checkbox"
                      onChange={handleSelectAllEligible}
                      checked={
                        filteredApplicants.filter((a) => a.eligible).length >
                          0 &&
                        filteredApplicants
                          .filter((a) => a.eligible)
                          .every((a) => selectedApplicantIds.includes(a.id))
                      }
                      className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span>Pilih Semua Pelamar Memenuhi Syarat</span>
                  </label>
                  <span className="text-[0.65rem] text-slate-500">
                    Sistem otomatis mengabaikan pelamar tidak memenuhi syarat
                  </span>
                </div>

                <div className="divide-y divide-slate-100 max-h-[280px] overflow-y-auto">
                  {filteredApplicants.length > 0 ? (
                    filteredApplicants.map((applicant) => {
                      const isSelected = selectedApplicantIds.includes(
                        applicant.id,
                      );
                      return (
                        <div
                          key={applicant.id}
                          className={`p-3 flex items-start gap-3 transition-colors ${
                            !applicant.eligible
                              ? "bg-slate-50/70 opacity-60 cursor-not-allowed"
                              : isSelected
                                ? "bg-teal-50/30"
                                : "hover:bg-slate-50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            disabled={!applicant.eligible}
                            checked={isSelected}
                            onChange={() =>
                              handleToggleApplicant(
                                applicant.id,
                                applicant.eligible,
                              )
                            }
                            className="mt-1 rounded border-slate-300 text-teal-600 focus:ring-teal-500 disabled:cursor-not-allowed"
                          />

                          <div className="w-8 h-8 rounded-full overflow-hidden relative shrink-0 border border-slate-200 mt-0.5">
                            <Image
                              src={applicant.avatar}
                              alt={applicant.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-slate-900 truncate">
                                {applicant.name}
                              </span>
                              <span
                                className={`text-[0.6rem] font-bold px-2 py-0.5 rounded-full ${
                                  applicant.applicationStatus === "Diterima"
                                    ? "bg-emerald-50 text-emerald-700"
                                    : applicant.applicationStatus === "Ditolak"
                                      ? "bg-rose-50 text-rose-700"
                                      : "bg-slate-100 text-cyan-600"
                                }`}
                              >
                                {applicant.applicationStatus}
                              </span>
                            </div>

                            <p className="text-[0.65rem] text-slate-500 truncate">
                              {applicant.email} • {applicant.currentStage}
                            </p>

                            {/* B.3 Aturan Pemilihan Warning */}
                            {!applicant.eligible && (
                              <p className="text-[0.625rem] text-rose-600 font-medium mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3 shrink-0" />
                                <span>{applicant.ineligibleReason}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-6 text-center text-slate-400">
                      Tidak ada pelamar yang cocok dengan filter.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* C. DETAIL PESAN BERDASARKAN TEMPLATE (DYNAMIC DYNAMIC FORM) */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs">
                  C
                </div>
                <h2 className="font-bold text-sm text-slate-900">
                  Detail Pesan Form:{" "}
                  <span className="text-teal-700">{selectedTemplate}</span>
                </h2>
              </div>

              {/* Dynamic Inputs berdasarkan selectedTemplate */}
              <div className="space-y-3">
                {/* TEMPLATE: Wawancara Daring */}
                {selectedTemplate === "Undangan Wawancara Daring" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div>
                        <label className="block text-[0.65rem] font-bold text-slate-500 uppercase mb-1">
                          Tanggal Wawancara
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleFormChange}
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[0.65rem] font-bold text-slate-500 uppercase mb-1">
                          Jam Mulai
                        </label>
                        <input
                          type="time"
                          name="startTime"
                          value={formData.startTime}
                          onChange={handleFormChange}
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[0.65rem] font-bold text-slate-500 uppercase mb-1">
                          Jam Selesai
                        </label>
                        <input
                          type="time"
                          name="endTime"
                          value={formData.endTime}
                          onChange={handleFormChange}
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[0.65rem] font-bold text-slate-500 uppercase mb-1">
                        Link Meeting (Google Meet / Zoom)
                      </label>
                      <input
                        type="url"
                        name="meetingLink"
                        value={formData.meetingLink}
                        onChange={handleFormChange}
                        placeholder="https://..."
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-500"
                      />
                    </div>
                  </>
                )}

                {/* TEMPLATE: Wawancara Luring */}
                {selectedTemplate === "Undangan Wawancara Luring" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div>
                        <label className="block text-[0.65rem] font-bold text-slate-500 uppercase mb-1">
                          Tanggal Wawancara
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleFormChange}
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[0.65rem] font-bold text-slate-500 uppercase mb-1">
                          Jam Mulai
                        </label>
                        <input
                          type="time"
                          name="startTime"
                          value={formData.startTime}
                          onChange={handleFormChange}
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[0.65rem] font-bold text-slate-500 uppercase mb-1">
                          Jam Selesai
                        </label>
                        <input
                          type="time"
                          name="endTime"
                          value={formData.endTime}
                          onChange={handleFormChange}
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[0.65rem] font-bold text-slate-500 uppercase mb-1">
                          Nama Lokasi / Gedung
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleFormChange}
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[0.65rem] font-bold text-slate-500 uppercase mb-1">
                          Kontak Narahubung
                        </label>
                        <input
                          type="text"
                          name="contactPerson"
                          value={formData.contactPerson}
                          onChange={handleFormChange}
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[0.65rem] font-bold text-slate-500 uppercase mb-1">
                        Alamat Lengkap
                      </label>
                      <input
                        type="text"
                        name="fullAddress"
                        value={formData.fullAddress}
                        onChange={handleFormChange}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-500"
                      />
                    </div>
                  </>
                )}

                {/* TEMPLATE: Perubahan Jadwal */}
                {selectedTemplate === "Perubahan Jadwal" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[0.65rem] font-bold text-slate-500 uppercase mb-1">
                          Jadwal Sebelumnya
                        </label>
                        <input
                          type="text"
                          name="prevSchedule"
                          value={formData.prevSchedule}
                          onChange={handleFormChange}
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[0.65rem] font-bold text-slate-500 uppercase mb-1">
                          Jadwal Baru
                        </label>
                        <input
                          type="text"
                          name="newSchedule"
                          value={formData.newSchedule}
                          onChange={handleFormChange}
                          className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[0.65rem] font-bold text-slate-500 uppercase mb-1">
                        Alasan Perubahan
                      </label>
                      <input
                        type="text"
                        name="rescheduleReason"
                        value={formData.rescheduleReason}
                        onChange={handleFormChange}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-500"
                      />
                    </div>
                  </>
                )}

                {/* TEMPLATE: Pengumuman Lolos Tahap */}
                {selectedTemplate === "Pengumuman Lolos Tahap" && (
                  <>
                    <div>
                      <label className="block text-[0.65rem] font-bold text-slate-500 uppercase mb-1">
                        Nama Tahap Berikutnya
                      </label>
                      <input
                        type="text"
                        name="nextStageName"
                        value={formData.nextStageName}
                        onChange={handleFormChange}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[0.65rem] font-bold text-slate-500 uppercase mb-1">
                        Informasi Lanjutan
                      </label>
                      <input
                        type="text"
                        name="nextInfo"
                        value={formData.nextInfo}
                        onChange={handleFormChange}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-500"
                      />
                    </div>
                  </>
                )}

                {/* TEMPLATE: Pengumuman Tidak Lolos */}
                {selectedTemplate === "Pengumuman Tidak Lolos" && (
                  <>
                    <div>
                      <label className="block text-[0.65rem] font-bold text-slate-500 uppercase mb-1">
                        Nama Tahap yang Telah Diikuti
                      </label>
                      <input
                        type="text"
                        name="prevStageName"
                        value={formData.prevStageName}
                        onChange={handleFormChange}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[0.65rem] font-bold text-slate-500 uppercase mb-1">
                        Pesan Penutup
                      </label>
                      <input
                        type="text"
                        name="rejectionClosing"
                        value={formData.rejectionClosing}
                        onChange={handleFormChange}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-500"
                      />
                    </div>
                  </>
                )}

                {/* GENERAL NOTES FIELD */}
                <div>
                  <label className="block text-[0.65rem] font-bold text-slate-500 uppercase mb-1">
                    Catatan Tambahan
                  </label>
                  <textarea
                    rows={2}
                    name="notes"
                    value={formData.notes}
                    onChange={handleFormChange}
                    placeholder="Instruksi tambahan bagi pelamar..."
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:border-teal-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: D & E (PREVIEW & RINGKASAN FINAL) */}
          <div className="lg:col-span-5 space-y-4">
            {/* D. PREVIEW PESAN REALTIME */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3 sticky top-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs">
                    D
                  </div>
                  <h2 className="font-bold text-sm text-slate-900">
                    Preview Pesan
                  </h2>
                </div>
                <span className="text-[0.65rem] text-slate-400 font-mono">
                  Real-time Data
                </span>
              </div>

              {/* CARD PREVIEW DENGAN GAYA PESAN DITERIMA */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 font-sans space-y-3 text-slate-700">
                <div className="flex items-center gap-2 border-b border-slate-200/60 pb-2">
                  <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                  <span className="text-[0.65rem] font-bold text-slate-500 uppercase">
                    Contoh tampilan untuk:{" "}
                    <strong className="text-slate-800">
                      {previewApplicant.name}
                    </strong>
                  </span>
                </div>

                <div className="space-y-2 text-xs leading-relaxed text-slate-800">
                  <p>
                    Halo <strong>{previewApplicant.name}</strong>,
                  </p>

                  {selectedTemplate === "Undangan Wawancara Daring" && (
                    <>
                      <p>
                        Selamat! Anda diundang untuk mengikuti tahap{" "}
                        <strong>{selectedStage}</strong> pada lowongan{" "}
                        <strong>{currentJob?.title || "Posisi"}</strong>.
                      </p>
                      <div className="bg-white p-3 rounded-lg border border-slate-200 text-[0.7rem] space-y-1 my-2">
                        <p className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-teal-600" />
                          <strong>Tanggal:</strong>{" "}
                          {formData.date || "[Tanggal]"}
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-teal-600" />
                          <strong>Waktu:</strong> {formData.startTime} –{" "}
                          {formData.endTime} WITA
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Video className="w-3.5 h-3.5 text-teal-600" />
                          <strong>Metode:</strong> Daring (Online Meeting)
                        </p>
                        <p className="flex items-center gap-1.5 text-teal-700 font-medium truncate">
                          <Info className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <strong>Link Meeting:</strong>{" "}
                          {formData.meetingLink || "[Link]"}
                        </p>
                      </div>
                    </>
                  )}

                  {selectedTemplate === "Undangan Wawancara Luring" && (
                    <>
                      <p>
                        Anda diundang untuk menghadiri tatap muka tahap{" "}
                        <strong>{selectedStage}</strong> pada posisi{" "}
                        <strong>{currentJob?.title}</strong>.
                      </p>
                      <div className="bg-white p-3 rounded-lg border border-slate-200 text-[0.7rem] space-y-1 my-2">
                        <p className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-teal-600" />
                          <strong>Tanggal:</strong> {formData.date}
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-teal-600" />
                          <strong>Waktu:</strong> {formData.startTime} –{" "}
                          {formData.endTime} WITA
                        </p>
                        <p className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-teal-600" />
                          <strong>Lokasi:</strong> {formData.location} (
                          {formData.fullAddress})
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-teal-600" />
                          <strong>Narahubung:</strong> {formData.contactPerson}
                        </p>
                      </div>
                    </>
                  )}

                  {selectedTemplate === "Perubahan Jadwal" && (
                    <>
                      <p>
                        Informasi penyesuaian jadwal untuk tahap{" "}
                        <strong>{selectedStage}</strong> posisi{" "}
                        <strong>{currentJob?.title}</strong>.
                      </p>
                      <div className="bg-white p-3 rounded-lg border border-slate-200 text-[0.7rem] space-y-1 my-2">
                        <p className="text-slate-400 line-through">
                          Jadwal Lama: {formData.prevSchedule}
                        </p>
                        <p className="text-emerald-700 font-bold">
                          Jadwal Baru: {formData.newSchedule}
                        </p>
                        <p className="text-slate-600">
                          Catatan: {formData.rescheduleReason}
                        </p>
                      </div>
                    </>
                  )}

                  {selectedTemplate === "Pengumuman Lolos Tahap" && (
                    <>
                      <p>
                        Selamat! Anda dinyatakan <strong>LOLOS</strong> tahap{" "}
                        <strong>{selectedStage}</strong> untuk posisi{" "}
                        <strong>{currentJob?.title}</strong>.
                      </p>
                      <p>
                        Tahap selanjutnya:{" "}
                        <strong>{formData.nextStageName}</strong>.
                      </p>
                      <p className="text-[0.7rem] text-slate-600">
                        {formData.nextInfo}
                      </p>
                    </>
                  )}

                  {selectedTemplate === "Pengumuman Tidak Lolos" && (
                    <>
                      <p>
                        Terima kasih telah mengikuti tahapan{" "}
                        <strong>{formData.prevStageName}</strong> untuk posisi{" "}
                        <strong>{currentJob?.title}</strong>.
                      </p>
                      <p>
                        Mohon maaf saat ini kualifikasi Anda belum sesuai dengan
                        kebutuhan kami.
                      </p>
                      <p className="text-[0.7rem] text-slate-600">
                        {formData.rejectionClosing}
                      </p>
                    </>
                  )}

                  {formData.notes && (
                    <p className="italic text-slate-600 border-t border-slate-200 pt-2 text-[0.7rem]">
                      &quot;{formData.notes}&quot;
                    </p>
                  )}

                  <p className="text-slate-500 pt-1">
                    Mohon hadir tepat waktu. Terima kasih.
                  </p>
                </div>
              </div>

              {/* E. RINGKASAN SEBELUM PENGIRIMAN */}
              <div className="bg-slate-900 text-white p-4 rounded-xl space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <div className="w-5 h-5 rounded bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xs">
                    E
                  </div>
                  <h3 className="font-bold text-xs text-slate-100">
                    Ringkasan Sebelum Pengiriman
                  </h3>
                </div>

                <div className="text-[0.7rem] space-y-1.5 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Lowongan:</span>
                    <strong className="text-white">{currentJob?.title}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tahapan:</span>
                    <strong className="text-teal-400">{selectedStage}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Template:</span>
                    <strong className="text-white">{selectedTemplate}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Jumlah Penerima:</span>
                    <strong className="text-amber-400 font-bold">
                      {selectedApplicantIds.length} Pelamar
                    </strong>
                  </div>
                </div>

                {/* TOMBOL AKSI FINAL */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-semibold text-[0.7rem] flex items-center justify-center gap-1 transition-all"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Draft</span>
                  </button>

                  <button
                    type="button"
                    disabled={selectedApplicantIds.length === 0}
                    onClick={() => setIsConfirmModalOpen(true)}
                    className="flex-1 py-2 px-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-bold text-[0.7rem] flex items-center justify-center gap-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Pesan</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* F. DIALOG KONFIRMASI PENGIRIMAN (MODAL) */}
      <AnimatePresence>
        {isConfirmModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-100 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl">
                    <Send className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">
                      Konfirmasi Pengiriman Pesan
                    </h3>
                    <p className="text-[0.65rem] text-slate-400">
                      Proses ini akan langsung mengirimkan email/notifikasi.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsConfirmModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-700 leading-relaxed">
                Anda akan mengirim pesan kepada{" "}
                <strong className="text-teal-700 font-bold">
                  {selectedApplicantIds.length} pelamar
                </strong>{" "}
                terpilih untuk tahap{" "}
                <strong className="text-slate-900">{selectedStage}</strong> pada
                lowongan{" "}
                <strong className="text-slate-900">{currentJob?.title}</strong>.
                Lanjutkan pengiriman?
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsConfirmModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl font-bold text-xs text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSendSubmit}
                  disabled={isSending}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                >
                  {isSending ? (
                    <span>Mengirim...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Ya, Kirim Pesan</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

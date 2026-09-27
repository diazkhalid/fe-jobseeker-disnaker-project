"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileCheck2,
  Clock,
  MapPin,
  Calendar,
  Briefcase,
  DollarSign,
  Users,
  Layers,
  History,
  Check,
  X,
  ListChecks,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

// Types
interface JobDetail {
  id: string;
  title: string;
  companyName: string;
  companyNIB: string;
  companyStatus: "Terverifikasi" | "Belum Verifikasi";
  companyAddress: string;
  category: string;
  location: string;
  type: "Full-Time" | "Part-Time" | "Kontrak" | "Magang";
  salaryRange: string;
  postedDate: string;
  deadline: string;
  applicantCount: number;
  status: "Menunggu Verifikasi" | "Aktif" | "Ditolak" | "Perlu Perbaikan";
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  recruitmentStages: string[];
  completenessCheck: {
    companyVerified: boolean;
    salaryProvided: boolean;
    jobDescClear: boolean;
    requirementsClear: boolean;
    deadlineValid: boolean;
  };
  verificationHistory: {
    id: string;
    action: "Disetujui" | "Perlu Perbaikan" | "Ditolak";
    notes: string;
    date: string;
    verifier: string;
  }[];
}

// Dummy Data Detail Lowongan
const MOCK_JOB_DETAIL: JobDetail = {
  id: "JOB-001",
  title: "Frontend Web Developer",
  companyName: "PT Samawa Digital",
  companyNIB: "9120102930129",
  companyStatus: "Terverifikasi",
  companyAddress: "Jl. Diponegoro No. 12, Sumbawa Besar, NTB",
  category: "Teknologi Informasi",
  location: "Sumbawa Besar",
  type: "Full-Time",
  salaryRange: "Rp 4.500.000 - Rp 6.500.000",
  postedDate: "2026-09-25",
  deadline: "2026-10-15",
  applicantCount: 24,
  status: "Menunggu Verifikasi",
  description:
    "Kami mencari Frontend Web Developer yang berpengalaman dalam membangun antarmuka web modern, responsif, dan interaktif. Posisi ini bertanggung jawab mengimplementasikan desain UI/UX ke dalam kode React/Next.js serta melakukan integrasi API backend.",
  requirements: [
    "Pendidikan min. D3/S1 Teknik Informatika, Sistem Informasi, atau bidang terkait",
    "Menguasai Next.js, React, TypeScript, dan Tailwind CSS",
    "Pengalaman minimal 1 tahun di bidang frontend development",
    "Memahami konsep RESTful API dan Version Control System (Git)",
    "Memiliki portofolio aplikasi web yang pernah dibuat",
  ],
  responsibilities: [
    "Mengembangkan antarmuka pengguna berbasis komponen modular",
    "Melakukan optimasi performa dan responsivitas aplikasi web",
    "Bekerjasama dengan UI/UX Designer dan Backend Developer",
  ],
  benefits: [
    "Gaji Pokok & Tunjangan Kesehatan (BPJS)",
    "Bonus Kinerja Bulanan",
    "Jam Kerja Fleksibel (Hybrid)",
  ],
  recruitmentStages: [
    "Seleksi Berkas / Administrasi",
    "Tes Koding & Portfolio Review",
    "Wawancara HR & User",
    "Penawaran Kerja (Offering Letter)",
  ],
  completenessCheck: {
    companyVerified: true,
    salaryProvided: true,
    jobDescClear: true,
    requirementsClear: true,
    deadlineValid: true,
  },
  verificationHistory: [
    {
      id: "HIST-01",
      action: "Perlu Perbaikan",
      notes: "Rincian rentang gaji belum dicantumkan secara rinci.",
      date: "2026-09-24 14:20",
      verifier: "Admin Disnakertrans",
    },
  ],
};

export default function JobDetailPage() {
  const [job, setJob] = useState<JobDetail>(MOCK_JOB_DETAIL);
  const [actionType, setActionType] = useState<
    "approve" | "revision" | "reject" | null
  >(null);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Perhitungan skor kelengkapan (%)
  const completenessValues = Object.values(job.completenessCheck);
  const completedCount = completenessValues.filter(Boolean).length;
  const completenessPercentage = Math.round(
    (completedCount / completenessValues.length) * 100,
  );

  const handleProcessVerification = () => {
    if (!actionType) return;

    if (
      (actionType === "revision" || actionType === "reject") &&
      !reason.trim()
    ) {
      alert("Harap masukkan alasan penolakan atau catatan perbaikan.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      let newStatus: JobDetail["status"] = "Aktif";
      let actionLabel: "Disetujui" | "Perlu Perbaikan" | "Ditolak" =
        "Disetujui";

      if (actionType === "revision") {
        newStatus = "Perlu Perbaikan";
        actionLabel = "Perlu Perbaikan";
      } else if (actionType === "reject") {
        newStatus = "Ditolak";
        actionLabel = "Ditolak";
      }

      const newHistoryItem = {
        id: `HIST-${Date.now()}`,
        action: actionLabel,
        notes:
          reason || "Lowongan telah memenuhi standar publikasi Disnakertrans.",
        date: new Date().toISOString().replace("T", " ").substring(0, 16),
        verifier: "Admin Disnakertrans",
      };

      setJob((prev) => ({
        ...prev,
        status: newStatus,
        verificationHistory: [newHistoryItem, ...prev.verificationHistory],
      }));

      setIsSubmitting(false);
      setActionType(null);
      setReason("");
      alert(
        `Status verifikasi lowongan berhasil diperbarui menjadi '${newStatus}'.`,
      );
    }, 600);
  };

  return (
    <div className="space-y-6 bg-slate-50/50">
      {/* HEADER & NAVIGASI KEMBALI */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/dashboard/admin/lowongan"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke Daftar Lowongan
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              {job.title}
            </h1>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold border ${
                job.status === "Aktif"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : job.status === "Menunggu Verifikasi"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : job.status === "Perlu Perbaikan"
                      ? "bg-orange-50 text-orange-700 border-orange-200"
                      : "bg-rose-50 text-rose-700 border-rose-200"
              }`}
            >
              {job.status}
            </span>
          </div>
        </div>

        <div className="text-xs text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-xl self-start sm:self-auto">
          ID Lowongan: <strong className="text-slate-900">{job.id}</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KOLOM KIRI (2 SPAN): DETAIL LENGKAP LOWONGAN & PERUSAHAAN */}
        <div className="lg:col-span-2 space-y-6">
          {/* DETAIL PERUSAHAAN */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-teal-600" />
                <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Detail Perusahaan Penyedia Lowongan
                </h2>
              </div>
              <Link
                href={`/dashboard/disnakertrans/perusahaan/${encodeURIComponent(
                  job.companyName,
                )}`}
                className="text-[0.7rem] font-semibold text-teal-600 hover:underline flex items-center gap-1"
              >
                Lihat Profil Perusahaan <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[0.65rem]">
                  Nama Perusahaan
                </span>
                <p className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                  {job.companyName}
                  {job.companyStatus === "Terverifikasi" && (
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  )}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block text-[0.65rem]">
                  Nomor Induk Berusaha (NIB)
                </span>
                <p className="font-medium text-slate-800 mt-0.5">
                  {job.companyNIB}
                </p>
              </div>

              <div className="sm:col-span-2">
                <span className="text-slate-400 block text-[0.65rem]">
                  Alamat Perusahaan
                </span>
                <p className="font-medium text-slate-700 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  {job.companyAddress}
                </p>
              </div>
            </div>
          </div>

          {/* INFORMASI UTAMA LOWONGAN */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Informasi & Spesifikasi Lowongan
              </h2>
            </div>

            {/* Quick Grid Info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400 block text-[0.65rem]">
                  Kategori
                </span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {job.category}
                </p>
              </div>
              <div>
                <span className="text-slate-400 block text-[0.65rem]">
                  Jenis Pekerjaan
                </span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {job.type}
                </p>
              </div>
              <div>
                <span className="text-slate-400 block text-[0.65rem]">
                  Lokasi Kerja
                </span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {job.location}
                </p>
              </div>
              <div>
                <span className="text-slate-400 block text-[0.65rem]">
                  Rentang Gaji
                </span>
                <p className="font-semibold text-emerald-700 mt-0.5">
                  {job.salaryRange}
                </p>
              </div>
            </div>

            {/* Deskripsi */}
            <div className="space-y-1.5 text-xs">
              <h3 className="font-bold text-slate-800">Deskripsi Pekerjaan</h3>
              <p className="text-slate-600 leading-relaxed bg-white border border-slate-100 p-3 rounded-xl">
                {job.description}
              </p>
            </div>

            {/* Persyaratan */}
            <div className="space-y-1.5 text-xs">
              <h3 className="font-bold text-slate-800">
                Kualifikasi & Persyaratan
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                {job.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>

            {/* Tanggung Jawab */}
            <div className="space-y-1.5 text-xs">
              <h3 className="font-bold text-slate-800">Tanggung Jawab Kerja</h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            </div>

            {/* Benefit */}
            <div className="space-y-1.5 text-xs">
              <h3 className="font-bold text-slate-800">Fasilitas & Benefit</h3>
              <div className="flex flex-wrap gap-2">
                {job.benefits.map((b, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-[0.7rem] font-medium"
                  >
                    ✓ {b}
                  </span>
                ))}
              </div>
            </div>

            {/* TAHAPAN REKRUTMEN */}
            <div className="border-t border-slate-100 pt-4 space-y-2">
              <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-600" /> Tahapan Seleksi
                Rekrutmen
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {job.recruitmentStages.map((stage, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-800 rounded-xl text-[0.7rem] font-semibold"
                  >
                    <span className="w-4 h-4 rounded-full bg-indigo-200 text-indigo-900 text-[0.6rem] flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span>{stage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN (1 SPAN): PANEL VERIFIKASI & RIWAYAT */}
        <div className="space-y-6">
          {/* PANEL KELENGKAPAN INFORMASI */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ListChecks className="w-4 h-4 text-teal-600" />
                <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Checklist Kelengkapan
                </h2>
              </div>
              <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-lg">
                {completenessPercentage}%
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-600">Perusahaan Terverifikasi</span>
                {job.completenessCheck.companyVerified ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500" />
                )}
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-600">
                  Gaji Dicantumkan Transparan
                </span>
                {job.completenessCheck.salaryProvided ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500" />
                )}
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-600">Deskripsi Kerja Jelas</span>
                {job.completenessCheck.jobDescClear ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500" />
                )}
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-600">
                  Persyaratan Wajar & Jelas
                </span>
                {job.completenessCheck.requirementsClear ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500" />
                )}
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-600">Batas Waktu Masuk Akal</span>
                {job.completenessCheck.deadlineValid ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500" />
                )}
              </div>
            </div>
          </div>

          {/* FORM FORMAL KEPUTUSAN VERIFIKASI */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-teal-600" />
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Aksi Keputusan Verifikasi
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setActionType("approve")}
                className={`py-2 px-1 rounded-xl text-[0.7rem] font-bold flex flex-col items-center justify-center gap-1 transition-all border ${
                  actionType === "approve"
                    ? "bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-600/20"
                    : "bg-emerald-50/50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                Setujui
              </button>

              <button
                type="button"
                onClick={() => setActionType("revision")}
                className={`py-2 px-1 rounded-xl text-[0.7rem] font-bold flex flex-col items-center justify-center gap-1 transition-all border ${
                  actionType === "revision"
                    ? "bg-amber-600 text-white border-amber-600 ring-2 ring-amber-600/20"
                    : "bg-amber-50/50 text-amber-700 border-amber-200 hover:bg-amber-100"
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                Perbaikan
              </button>

              <button
                type="button"
                onClick={() => setActionType("reject")}
                className={`py-2 px-1 rounded-xl text-[0.7rem] font-bold flex flex-col items-center justify-center gap-1 transition-all border ${
                  actionType === "reject"
                    ? "bg-rose-600 text-white border-rose-600 ring-2 ring-rose-600/20"
                    : "bg-rose-50/50 text-rose-700 border-rose-200 hover:bg-rose-100"
                }`}
              >
                <XCircle className="w-4 h-4" />
                Tolak
              </button>
            </div>

            {/* Textarea Catatan/Alasan jika bukan Approve */}
            {actionType && (
              <div className="space-y-2 pt-1">
                <label className="block text-[0.7rem] font-bold text-slate-700">
                  {actionType === "approve"
                    ? "Catatan Opsional Verifikator"
                    : actionType === "revision"
                      ? "Rincian Bagian yang Wajib Diperbaiki Perusahaan *"
                      : "Alasan Penolakan Publikasi Lowongan *"}
                </label>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder={
                    actionType === "approve"
                      ? "Tambahkan catatan jika diperlukan..."
                      : actionType === "revision"
                        ? "Tulis poin-poin revisi secara spesifik..."
                        : "Jelaskan pelanggaran atau alasan penolakan..."
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
                />

                <button
                  type="button"
                  onClick={handleProcessVerification}
                  disabled={isSubmitting}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Memproses..."
                    : "Simpan Keputusan Verifikasi"}
                </button>
              </div>
            )}
          </div>

          {/* RIWAYAT VERIFIKASI */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
              <History className="w-4 h-4 text-teal-600" />
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Riwayat Verifikasi Lowongan
              </h2>
            </div>

            <div className="space-y-3">
              {job.verificationHistory.length > 0 ? (
                job.verificationHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[0.65rem] font-bold px-2 py-0.5 rounded ${
                          item.action === "Disetujui"
                            ? "bg-emerald-100 text-emerald-800"
                            : item.action === "Perlu Perbaikan"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {item.action}
                      </span>
                      <span className="text-[0.65rem] text-slate-400">
                        {item.date}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[0.7rem] pt-1">
                      {item.notes}
                    </p>
                    <p className="text-[0.65rem] text-slate-400 font-medium">
                      Oleh: {item.verifier}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 text-center py-4">
                  Belum ada catatan riwayat verifikasi sebelumnya.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

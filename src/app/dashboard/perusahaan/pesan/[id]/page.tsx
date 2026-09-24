"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MessageSquare,
  Briefcase,
  Layers,
  FileText,
  User,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Eye,
  Video,
  MapPin,
  Copy,
  RotateCcw,
  Users,
  Search,
  Check,
  Building2,
  Mail,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- TYPES ---
interface Recipient {
  id: string;
  name: string;
  email: string;
  status: "Menunggu" | "Terkirim" | "Dibaca" | "Gagal";
  time: string;
  failureReason?: string;
}

interface MessageDetailData {
  id: string;
  title: string;
  templateType: string;
  jobTitle: string;
  division: string;
  stage: string;
  sender: string;
  createdAt: string;
  sentAt: string;
  overallStatus: "Terkirim" | "Sebagian Gagal" | "Draft";
  // Isi Pesan & Detail Pelaksanaan
  bodyText: string;
  executionDetail: {
    date: string;
    time: string;
    method: "Daring" | "Luring";
    locationOrLink: string;
    notes: string;
  };
  recipients: Recipient[];
}

// --- DATA DUMMY ---
const INITIAL_MESSAGE_DETAIL: MessageDetailData = {
  id: "MSG-001",
  title: "Undangan Interview Tahap 1 HR",
  templateType: "Undangan Wawancara Daring",
  jobTitle: "Senior Frontend Developer",
  division: "Engineering & IT",
  stage: "Interview HR",
  sender: "Siti Rahmah (HR Recruitment)",
  createdAt: "22 Mei 2026, 09:15 WITA",
  sentAt: "22 Mei 2026, 10:30 WITA",
  overallStatus: "Sebagian Gagal",
  bodyText: `Halo [Nama Pelamar],

Selamat! Anda diundang untuk mengikuti tahap Wawancara HRD pada lowongan Senior Frontend Developer di perusahaan kami.

Mohon untuk hadir tepat waktu melalui tautan Google Meet yang tertera di bawah. Persiapkan diri Anda dengan baik.

Terima kasih,
Tim Recruitment`,
  executionDetail: {
    date: "25 Mei 2026",
    time: "09:00 - 10:00 WITA",
    method: "Daring",
    locationOrLink: "https://meet.google.com/xyz-abc-def",
    notes:
      "Harap hadir 10 menit sebelum sesi dimulai dan pastikan kamera dalam kondisi aktif.",
  },
  recipients: [
    {
      id: "REC-01",
      name: "Ahmad Santoso",
      email: "ahmad.santoso@email.com",
      status: "Dibaca",
      time: "10:31 WITA",
    },
    {
      id: "REC-02",
      name: "Budi Pratama",
      email: "budi.pratama@email.com",
      status: "Terkirim",
      time: "10:30 WITA",
    },
    {
      id: "REC-03",
      name: "Citra Lestari",
      email: "citra.lestari@email.com",
      status: "Gagal",
      time: "10:30 WITA",
      failureReason: "Alamat email penerima tidak valid/full inbox",
    },
    {
      id: "REC-04",
      name: "Dewi Anggraini",
      email: "dewi.anggraini@email.com",
      status: "Dibaca",
      time: "10:35 WITA",
    },
    {
      id: "REC-05",
      name: "Eko Wijaya",
      email: "eko.wijaya@email.com",
      status: "Menunggu",
      time: "-",
    },
    {
      id: "REC-06",
      name: "Fajar Nugraha",
      email: "fajar.nugraha@email.com",
      status: "Gagal",
      time: "10:30 WITA",
      failureReason: "Koneksi mail server penerima timeout",
    },
  ],
};

export default function DetailPesanPage() {
  const [messageData, setMessageData] = useState<MessageDetailData>(
    INITIAL_MESSAGE_DETAIL,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("Semua Status");
  const [copied, setCopied] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [selectedRecipientModal, setSelectedRecipientModal] =
    useState<Recipient | null>(null);

  // --- E. STATISTIK PENGIRIMAN ---
  const totalRecipients = messageData.recipients.length;
  const sentCount = messageData.recipients.filter(
    (r) => r.status === "Terkirim",
  ).length;
  const readCount = messageData.recipients.filter(
    (r) => r.status === "Dibaca",
  ).length;
  const failedCount = messageData.recipients.filter(
    (r) => r.status === "Gagal",
  ).length;
  const pendingCount = messageData.recipients.filter(
    (r) => r.status === "Menunggu",
  ).length;

  // Filter List Penerima
  const filteredRecipients = messageData.recipients.filter((rec) => {
    const matchSearch =
      rec.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      statusFilter === "Semua Status" || rec.status === statusFilter;

    return matchSearch && matchStatus;
  });

  // Badge Status Helper
  const getStatusBadge = (status: Recipient["status"]) => {
    switch (status) {
      case "Dibaca":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Eye className="w-3 h-3 text-blue-600" /> Dibaca
          </span>
        );
      case "Terkirim":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Terkirim
          </span>
        );
      case "Gagal":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3 h-3 text-rose-600" /> Gagal
          </span>
        );
      case "Menunggu":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold bg-slate-100 text-slate-600 border border-slate-200">
            <Clock className="w-3 h-3 text-slate-400" /> Menunggu
          </span>
        );
    }
  };

  // F. Salin Informasi Pesan
  const handleCopyMessage = () => {
    const textToCopy = `[${messageData.title}]\n\n${messageData.bodyText}\n\nJadwal: ${messageData.executionDetail.date} (${messageData.executionDetail.time})\nMetode: ${messageData.executionDetail.method}\nLokasi/Link: ${messageData.executionDetail.locationOrLink}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // F. Kirim Ulang kepada Penerima yang Gagal
  const handleResendFailed = () => {
    setResending(true);
    setTimeout(() => {
      setMessageData((prev) => ({
        ...prev,
        recipients: prev.recipients.map((r) =>
          r.status === "Gagal"
            ? { ...r, status: "Terkirim", time: "Baru saja" }
            : r,
        ),
      }));
      setResending(false);
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 3000);
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

          {/* F. AKSI UTAMA TOP BAR */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMessage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-xs transition-all shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Salin Pesan</span>
                </>
              )}
            </button>

            {failedCount > 0 && (
              <button
                onClick={handleResendFailed}
                disabled={resending}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs transition-all shadow-2xs disabled:opacity-50"
              >
                <RotateCcw
                  className={`w-3.5 h-3.5 ${resending ? "animate-spin" : ""}`}
                />
                <span>
                  {resending
                    ? "Mengirim..."
                    : `Kirim Ulang (${failedCount} Gagal)`}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* NOTIFIKASI RESEND SUCCESS */}
        <AnimatePresence>
          {resendSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-emerald-800"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-xs">
                  Pesan berhasil dikirim ulang kepada penerima yang sebelumnya
                  gagal.
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HEADER TITLE */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[0.65rem] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                {messageData.id}
              </span>
              <span className="text-[0.65rem] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {messageData.overallStatus}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900">
              {messageData.title}
            </h1>
          </div>
        </div>

        {/* E. STATISTIK PENGIRIMAN */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
            <div className="p-2.5 bg-slate-100 text-slate-700 rounded-xl">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[0.65rem] text-slate-400 font-bold uppercase block">
                Total Penerima
              </span>
              <strong className="text-lg font-bold text-slate-900">
                {totalRecipients}
              </strong>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[0.65rem] text-emerald-600 font-bold uppercase block">
                Berhasil Dikirim
              </span>
              <strong className="text-lg font-bold text-emerald-700">
                {sentCount + readCount}
              </strong>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[0.65rem] text-blue-600 font-bold uppercase block">
                Sudah Dibaca
              </span>
              <strong className="text-lg font-bold text-blue-700">
                {readCount}
              </strong>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3">
            <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[0.65rem] text-rose-600 font-bold uppercase block">
                Gagal Dikirim
              </span>
              <strong className="text-lg font-bold text-rose-700">
                {failedCount}
              </strong>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* LEFT COLUMN: A, B, C */}
          <div className="lg:col-span-7 space-y-4">
            {/* A. INFORMASI UMUM */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs">
                  A
                </div>
                <h2 className="font-bold text-sm text-slate-900">
                  Informasi Umum
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[0.65rem] font-bold text-slate-400 uppercase block">
                    Judul Pesan
                  </span>
                  <span className="font-bold text-slate-800">
                    {messageData.title}
                  </span>
                </div>

                <div>
                  <span className="text-[0.65rem] font-bold text-slate-400 uppercase block">
                    Jenis Template
                  </span>
                  <span className="font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 text-[0.7rem] inline-block mt-0.5">
                    {messageData.templateType}
                  </span>
                </div>

                <div>
                  <span className="text-[0.65rem] font-bold text-slate-400 uppercase block">
                    Lowongan Terkait
                  </span>
                  <div className="flex items-center gap-1.5 font-semibold text-slate-700 mt-0.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>
                      {messageData.jobTitle} ({messageData.division})
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[0.65rem] font-bold text-slate-400 uppercase block">
                    Tahapan Rekrutmen
                  </span>
                  <div className="flex items-center gap-1.5 font-semibold text-slate-700 mt-0.5">
                    <Layers className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{messageData.stage}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[0.65rem] font-bold text-slate-400 uppercase block">
                    Pengirim
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-700 mt-0.5">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{messageData.sender}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[0.65rem] font-bold text-slate-400 uppercase block">
                    Waktu Pembuatan & Pengiriman
                  </span>
                  <div className="text-[0.7rem] text-slate-600 mt-0.5 space-y-0.5">
                    <p>Dibuat: {messageData.createdAt}</p>
                    <p>Dikirim: {messageData.sentAt}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* B. ISI PESAN */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs">
                  B
                </div>
                <h2 className="font-bold text-sm text-slate-900">Isi Pesan</h2>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-slate-800 font-sans whitespace-pre-line leading-relaxed text-xs">
                {messageData.bodyText}
              </div>
            </div>

            {/* C. DETAIL PELAKSANAAN */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs">
                  C
                </div>
                <h2 className="font-bold text-sm text-slate-900">
                  Detail Pelaksanaan Agenda
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-teal-50/30 p-3.5 rounded-xl border border-teal-100">
                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[0.65rem] font-bold text-slate-400 uppercase block">
                      Tanggal & Waktu
                    </span>
                    <strong className="text-slate-800">
                      {messageData.executionDetail.date}
                    </strong>
                    <p className="text-slate-600 text-[0.7rem]">
                      {messageData.executionDetail.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Video className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[0.65rem] font-bold text-slate-400 uppercase block">
                      Metode Pelaksanaan
                    </span>
                    <strong className="text-teal-700">
                      {messageData.executionDetail.method}
                    </strong>
                  </div>
                </div>

                <div className="sm:col-span-2 flex items-start gap-2.5 border-t border-teal-100/60 pt-2.5">
                  <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[0.65rem] font-bold text-slate-400 uppercase block">
                      Link Meeting / Lokasi
                    </span>
                    <a
                      href={messageData.executionDetail.locationOrLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-teal-600 underline font-semibold truncate block hover:text-teal-700"
                    >
                      {messageData.executionDetail.locationOrLink}
                    </a>
                  </div>
                </div>

                <div className="sm:col-span-2 border-t border-teal-100/60 pt-2.5 text-[0.7rem] text-slate-600">
                  <strong className="text-slate-800 block mb-0.5">
                    Catatan Tambahan:
                  </strong>
                  <p className="italic">
                    &quot;{messageData.executionDetail.notes}&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: D. DAFTAR PENERIMA */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs">
                    D
                  </div>
                  <h2 className="font-bold text-sm text-slate-900">
                    Daftar Penerima
                  </h2>
                </div>
                <span className="text-[0.7rem] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  {filteredRecipients.length} / {totalRecipients}
                </span>
              </div>

              {/* SEARCH & FILTER PENERIMA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari pelamar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 text-slate-700"
                >
                  <option>Semua Status</option>
                  <option>Dibaca</option>
                  <option>Terkirim</option>
                  <option>Gagal</option>
                  <option>Menunggu</option>
                </select>
              </div>

              {/* TABEL DAFTAR PENERIMA */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto max-h-[450px] overflow-y-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider sticky top-0 bg-slate-50 z-10">
                        <th className="py-2.5 px-3">Pelamar</th>
                        <th className="py-2.5 px-2">Status</th>
                        <th className="py-2.5 px-2 text-right">Waktu</th>
                        <th className="py-2.5 px-3 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredRecipients.length > 0 ? (
                        filteredRecipients.map((rec) => (
                          <tr
                            key={rec.id}
                            className="hover:bg-slate-50 transition-colors"
                          >
                            <td className="py-2.5 px-3">
                              <div>
                                <span className="font-bold text-slate-800 block truncate max-w-[120px]">
                                  {rec.name}
                                </span>
                                <span className="text-[0.65rem] text-slate-400 block truncate max-w-[120px]">
                                  {rec.email}
                                </span>
                              </div>
                            </td>
                            <td className="py-2.5 px-2">
                              {getStatusBadge(rec.status)}
                            </td>
                            <td className="py-2.5 px-2 text-right text-[0.7rem] text-slate-500 font-mono">
                              {rec.time}
                            </td>
                            <td className="py-2.5 px-3 text-center">
                              <button
                                onClick={() => setSelectedRecipientModal(rec)}
                                className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-teal-600 transition-colors"
                                title="Lihat Detail Penerima"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={4}
                            className="py-8 text-center text-slate-400"
                          >
                            Tidak ada penerima yang cocok.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DETAIL PENERIMA */}
      <AnimatePresence>
        {selectedRecipientModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-sm w-full p-4 shadow-2xl border border-slate-100 space-y-3 text-xs"
            >
              <div className="flex items-start justify-between border-b border-slate-100 pb-2">
                <h3 className="font-bold text-sm text-slate-900">
                  Detail Status Penerima
                </h3>
                <button
                  onClick={() => setSelectedRecipientModal(null)}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-[0.65rem] font-bold text-slate-400 uppercase block">
                    Nama Pelamar
                  </span>
                  <strong className="text-slate-800 text-sm">
                    {selectedRecipientModal.name}
                  </strong>
                </div>

                <div>
                  <span className="text-[0.65rem] font-bold text-slate-400 uppercase block">
                    Email
                  </span>
                  <span className="text-slate-700">
                    {selectedRecipientModal.email}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[0.65rem] font-bold text-slate-400 uppercase block">
                      Status Pengiriman
                    </span>
                    <div className="mt-0.5">
                      {getStatusBadge(selectedRecipientModal.status)}
                    </div>
                  </div>
                  <div>
                    <span className="text-[0.65rem] font-bold text-slate-400 uppercase block">
                      Waktu Terima
                    </span>
                    <span className="font-mono text-slate-700">
                      {selectedRecipientModal.time}
                    </span>
                  </div>
                </div>

                {selectedRecipientModal.failureReason && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-[0.7rem]">
                    <strong className="block font-bold">Penyebab Gagal:</strong>
                    <span>{selectedRecipientModal.failureReason}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedRecipientModal(null)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs transition-colors"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

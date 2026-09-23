"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Briefcase,
  Building2,
  Calendar,
  FileText,
  Paperclip,
  CheckCircle2,
  Clock,
  XCircle,
  HelpCircle,
  Mail,
  Phone,
  UserCheck,
  AlertTriangle,
  X,
  Download,
  ExternalLink,
  MapPin,
  CalendarCheck2,
  History,
  MessageSquareCode,
} from "lucide-react";

export default function DetailLamaranPage() {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState("Proses Seleksi");

  // Mock Data Detail Lamaran
  const applicationDetail = {
    id: "APP-2026-0982",
    jobTitle: "Senior Frontend Developer",
    companyName: "PT Technology Innovation Indonesia",
    companyLogo:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
    location: "Jakarta Selatan (Hybrid)",
    appliedDate: "18 September 2026",
    status: applicationStatus,
    canCancel:
      applicationStatus !== "Dibatalkan" && applicationStatus !== "Ditolak",

    submittedCv: {
      name: "CV_Frontend_Developer_2026.pdf",
      size: "2.4 MB",
      uploadedAt: "18 Sep 2026",
    },
    additionalDocs: [
      { id: 1, name: "Portofolio_Proyek_NextJS.pdf", size: "14.2 MB" },
      { id: 2, name: "Sertifikat_React_Expert.pdf", size: "1.1 MB" },
    ],

    screeningQuestions: [
      {
        question:
          "Berapa lama ekspektasi notice period Anda di perusahaan saat ini?",
        answer: "1 Bulan (30 Hari)",
      },
      {
        question: "Berapa ekspektasi gaji bulanan (Gross) yang Anda harapkan?",
        answer: "Rp 15.000.000 - Rp 18.000.000",
      },
      {
        question:
          "Apakah Anda bersedia bekerja secara Hybrid (3 hari WFO di Jakarta Selatan)?",
        answer: "Ya, saya sangat bersedia.",
      },
    ],

    activeSchedule: {
      title: "Wawancara User & Live Coding",
      date: "Kamis, 25 September 2026",
      time: "10:00 - 11:30 WIB",
      type: "Online (Google Meet)",
      link: "https://meet.google.com/abc-defg-hij",
      notes:
        "Harap menyiapkan environment pengembangan React/Next.js lokal sebelum sesi dimulai.",
    },

    companyNotes:
      "Profil dan portofolio Anda sangat mengesankan! Kami mengundang Anda untuk mengikuti sesi Wawancara User & Live Coding. Silakan konfirmasi kehadiran melalui tautan yang telah dikirimkan.",

    timeline: [
      {
        title: "Lamaran Terkirim",
        date: "18 Sep 2026, 09:30 WIB",
        description:
          "Berkas lamaran berhasil dikirimkan ke sistem rekrutmen perusahaan.",
        isCompleted: true,
      },
      {
        title: "Lolos Seleksi Berkas",
        date: "20 Sep 2026, 14:15 WIB",
        description:
          "Tim HRD telah meninjau dan menyetujui kualifikasi berkas Anda.",
        isCompleted: true,
      },
      {
        title: "Jadwal Wawancara User",
        date: "22 Sep 2026, 11:00 WIB",
        description: "Jadwal wawancara dan tes koding telah dikirimkan.",
        isCompleted: true,
        isCurrent: true,
      },
      {
        title: "Offering Letter",
        date: "-",
        description:
          "Penawaran resmi kerja akan diterbitkan jika lolos wawancara.",
        isCompleted: false,
      },
    ],

    statusHistory: [
      {
        date: "22 Sep 2026, 11:00",
        status: "Wawancara Dijadwalkan",
        by: "HR Recruiter",
      },
      {
        date: "20 Sep 2026, 14:15",
        status: "Lolos Screening",
        by: "HR Recruiter",
      },
      {
        date: "18 Sep 2026, 09:30",
        status: "Lamaran Terkirim",
        by: "Sistem (Anda)",
      },
    ],

    recruiterContact: {
      name: "Siti Rahmawati",
      role: "Talent Acquisition Specialist",
      email: "recruitment@techinnovate.co.id",
      phone: "+62 812-3456-7890",
    },
  };

  const handleCancelApplication = () => {
    setIsCancelling(true);
    setTimeout(() => {
      setApplicationStatus("Dibatalkan");
      setIsCancelling(false);
      setIsCancelModalOpen(false);
    }, 1200);
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-0 font-[Poppins] text-slate-800 space-y-8">
      {/* BREADCRUMB */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link
          href="/dashboard"
          className="hover:text-slate-900 transition-colors"
        >
          Dashboard
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link
          href="/dashboard/lamaran"
          className="hover:text-slate-900 transition-colors"
        >
          Riwayat Lamaran
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-slate-800">Detail Lamaran</span>
      </nav>

      {/* HEADER HERO SECTION (FLAT BANNER) */}
      <div className="pb-8 border-b border-slate-200 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>ID LAMARAN:</span>
            <span className="bg-slate-100 px-2.5 py-1 rounded-md text-slate-800 font-mono">
              {applicationDetail.id}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Status:</span>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                applicationDetail.status === "Dibatalkan"
                  ? "bg-rose-100 text-rose-700"
                  : "bg-emerald-100 text-emerald-800"
              }`}
            >
              {applicationDetail.status === "Dibatalkan" ? (
                <XCircle className="w-3.5 h-3.5" />
              ) : (
                <CheckCircle2 className="w-3.5 h-3.5" />
              )}
              {applicationDetail.status}
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={applicationDetail.companyLogo}
              alt={applicationDetail.companyName}
              className="w-16 h-16 rounded-2xl object-cover ring-1 ring-slate-200"
            />
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {applicationDetail.jobTitle}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-slate-600">
                <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  {applicationDetail.companyName}
                </span>
                <span className="flex items-center gap-1 text-slate-500">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {applicationDetail.location}
                </span>
                <span className="flex items-center gap-1 text-slate-500">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  Terkirim: {applicationDetail.appliedDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* JADWAL TES / WAWANCARA (INTEGRATED BANNER AREA) */}
      {applicationDetail.activeSchedule &&
        applicationDetail.status !== "Dibatalkan" && (
          <div className="bg-amber-50/70 border-l-4 border-amber-500 p-5 rounded-r-2xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <CalendarCheck2 className="w-5 h-5 text-amber-600" />
                <h2 className="text-sm font-bold text-slate-900">
                  Jadwal Wawancara / Tes Mendatang
                </h2>
              </div>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Konfirmasi Kehadiran
              </span>
            </div>
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              <p className="font-bold text-slate-900">
                {applicationDetail.activeSchedule.title}
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  {applicationDetail.activeSchedule.date} (
                  {applicationDetail.activeSchedule.time})
                </span>
                <a
                  href={applicationDetail.activeSchedule.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-slate-900 underline font-bold hover:text-amber-700"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-600" />
                  Buka Tautan Google Meet
                </a>
              </div>
              <p className="text-xs text-slate-500 pt-1 italic">
                Catatan: {applicationDetail.activeSchedule.notes}
              </p>
            </div>
          </div>
        )}

      {/* MAIN TWO-COLUMN LAYOUT WITHOUT CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-2">
        {/* LEFT COLUMN: TIMELINE, CATATAN, DOKUMEN, PERTANYAAN */}
        <div className="lg:col-span-2 space-y-10 divide-y divide-slate-100">
          {/* TIMELINE REKRUTMEN */}
          <section className="space-y-6">
            <div className="border-l-2 border-slate-900 pl-3">
              <h2 className="text-base font-bold text-slate-900">
                Timeline Rekrutmen
              </h2>
              <p className="text-xs text-slate-500">
                Proses rekrutmen berjalan secara bertahap
              </p>
            </div>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2 top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {applicationDetail.timeline.map((step, index) => (
                <div key={index} className="relative">
                  <span
                    className={`absolute -left-[22px] top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center text-[9px] ${
                      step.isCompleted
                        ? "bg-slate-900 border-slate-900 text-white"
                        : "bg-white border-slate-300 text-slate-400"
                    }`}
                  >
                    {step.isCompleted ? "✓" : index + 1}
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`text-sm font-bold ${
                          step.isCompleted ? "text-slate-900" : "text-slate-400"
                        }`}
                      >
                        {step.title}
                      </h3>
                      {step.isCurrent && (
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-800 text-[10px] font-bold rounded">
                          Saat Ini
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-medium text-slate-400 block">
                      {step.date}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CATATAN DARI PERUSAHAAN */}
          {applicationDetail.companyNotes && (
            <section className="pt-8 space-y-4">
              <div className="border-l-2 border-slate-900 pl-3">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquareCode className="w-4 h-4 text-slate-500" />
                  Catatan dari Perusahaan
                </h2>
              </div>
              <blockquote className="pl-4 border-l-2 border-slate-200 text-xs sm:text-sm text-slate-600 italic leading-relaxed py-1">
                {`"${applicationDetail.companyNotes}"`}
              </blockquote>
            </section>
          )}

          {/* DOKUMEN & BERKAS */}
          <section className="pt-8 space-y-6">
            <div className="border-l-2 border-slate-900 pl-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-slate-500" />
                Berkas & Dokumen Lamaran
              </h2>
            </div>

            <div className="space-y-4">
              {/* CV Utama */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-rose-600 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      {applicationDetail.submittedCv.name}
                    </p>
                    <span className="text-[11px] text-slate-400">
                      CV Utama • {applicationDetail.submittedCv.size} • Diunggah{" "}
                      {applicationDetail.submittedCv.uploadedAt}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 underline"
                >
                  <Download className="w-3.5 h-3.5" />
                  Unduh
                </button>
              </div>

              {/* Dokumen Pendukung */}
              {applicationDetail.additionalDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between py-2 border-b border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <Paperclip className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-slate-800">
                        {doc.name}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        Dokumen Pendukung • {doc.size}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 underline"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Unduh
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* JAWABAN PERTANYAAN */}
          {applicationDetail.screeningQuestions.length > 0 && (
            <section className="pt-8 space-y-6">
              <div className="border-l-2 border-slate-900 pl-3">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-slate-500" />
                  Jawaban Pertanyaan Perusahaan
                </h2>
              </div>

              <div className="space-y-4">
                {applicationDetail.screeningQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    className="space-y-1 pb-3 border-b border-slate-100"
                  >
                    <p className="text-xs font-medium text-slate-500">
                      {idx + 1}. {q.question}
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">
                      {q.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN: SIDEBAR INFO (KONTAK, RIWAYAT, AKSI) */}
        <div className="space-y-8 lg:pl-4">
          {/* KONTAK REKRUTMEN */}
          <section className="space-y-3 pb-6 border-b border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-slate-500" />
              Kontak Tim Rekrutmen
            </h3>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-900">
                {applicationDetail.recruiterContact.name}
              </p>
              <p className="text-xs text-slate-500">
                {applicationDetail.recruiterContact.role}
              </p>
            </div>
            <div className="space-y-1.5 pt-2 text-xs text-slate-700">
              <a
                href={`mailto:${applicationDetail.recruiterContact.email}`}
                className="flex items-center gap-2 hover:underline text-slate-700"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">
                  {applicationDetail.recruiterContact.email}
                </span>
              </a>
              <a
                href={`tel:${applicationDetail.recruiterContact.phone}`}
                className="flex items-center gap-2 hover:underline text-slate-700"
              >
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{applicationDetail.recruiterContact.phone}</span>
              </a>
            </div>
          </section>

          {/* RIWAYAT LOG STATUS */}
          <section className="space-y-3 pb-6 border-b border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <History className="w-4 h-4 text-slate-500" />
              Riwayat Aktivitas
            </h3>
            <div className="space-y-3">
              {applicationDetail.statusHistory.map((log, i) => (
                <div key={i} className="text-xs space-y-0.5">
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span>{log.status}</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      {log.date}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Oleh: {log.by}</p>
                </div>
              ))}
            </div>
          </section>

          {/* PEMBATALAN LAMARAN */}
          {applicationDetail.canCancel && (
            <section className="pt-2 space-y-3">
              <div className="flex items-start gap-2 text-rose-700">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed">
                  Ingin menarik berkas ini? Tindakan pembatalan tidak dapat
                  diubah kembali.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCancelModalOpen(true)}
                className="w-full py-2 px-3 border border-rose-300 hover:bg-rose-50 text-rose-700 font-bold text-xs rounded-xl transition-colors text-center cursor-pointer"
              >
                Batalkan Lamaran Ini
              </button>
            </section>
          )}
        </div>
      </div>

      {/* MODAL KONFIRMASI PEMBATALAN */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-base">
                <AlertTriangle className="w-5 h-5" />
                <span>Konfirmasi Pembatalan</span>
              </div>
              <button
                type="button"
                onClick={() => setIsCancelModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Apakah Anda yakin ingin membatalkan lamaran untuk posisi{" "}
              <strong className="text-slate-900">
                {applicationDetail.jobTitle}
              </strong>{" "}
              di{" "}
              <strong className="text-slate-900">
                {applicationDetail.companyName}
              </strong>
              ?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCancelModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
                disabled={isCancelling}
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={handleCancelApplication}
                disabled={isCancelling}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2"
              >
                {isCancelling ? (
                  <span>Memproses...</span>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" />
                    <span>Ya, Batalkan</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

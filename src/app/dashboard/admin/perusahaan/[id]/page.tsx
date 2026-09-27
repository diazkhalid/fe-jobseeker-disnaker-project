"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  FileText,
  ShieldCheck,
  ShieldAlert,
  MapPin,
  Phone,
  Mail,
  Globe,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Download,
  Eye,
  History,
  FileCheck2,
  Building,
  UserCheck,
} from "lucide-react";

// Types
interface CompanyDocument {
  id: string;
  name: string;
  fileType: string;
  uploadDate: string;
  fileSize: string;
  status: "Valid" | "Perlu Perbaikan" | "Menunggu Cek";
}

interface CompanyDetail {
  id: string;
  name: string;
  nib: string;
  npwp: string;
  industry: string;
  foundedYear: string;
  employeeCount: string;
  verificationStatus:
    | "Terverifikasi"
    | "Menunggu"
    | "Perlu Perbaikan"
    | "Ditolak";
  contact: {
    email: string;
    phone: string;
    website: string;
    picName: string;
    picPosition: string;
  };
  address: {
    street: string;
    district: string;
    regency: string;
    province: string;
    postalCode: string;
  };
  documents: CompanyDocument[];
  verificationHistory: {
    id: string;
    action: "Disetujui" | "Perlu Perbaikan" | "Ditolak";
    notes: string;
    date: string;
    verifier: string;
  }[];
}

// Dummy Data Detail Perusahaan
const MOCK_COMPANY_DETAIL: CompanyDetail = {
  id: "COMP-001",
  name: "PT Samawa Digital",
  nib: "9120102930129",
  npwp: "31.425.612.8-912.000",
  industry: "Teknologi Informasi & Rekayasa Perangkat Lunak",
  foundedYear: "2021",
  employeeCount: "50 - 100 Karyawan",
  verificationStatus: "Menunggu",
  contact: {
    email: "hrd@samawadigital.co.id",
    phone: "+62 812-3456-7890",
    website: "https://samawadigital.co.id",
    picName: "Ahmad Fauzi, S.Kom",
    picPosition: "Head of HR & General Affairs",
  },
  address: {
    street: "Jl. Diponegoro No. 12, Kel. Brang Biji",
    district: "Kec. Sumbawa",
    regency: "Kabupaten Sumbawa",
    province: "Nusa Tenggara Barat",
    postalCode: "84312",
  },
  documents: [
    {
      id: "DOC-01",
      name: "Nomor Induk Berusaha (NIB) OSS RBA",
      fileType: "PDF",
      uploadDate: "2026-09-20",
      fileSize: "2.4 MB",
      status: "Valid",
    },
    {
      id: "DOC-02",
      name: "NPWP Perusahaan (Kemenkeu)",
      fileType: "PDF",
      uploadDate: "2026-09-20",
      fileSize: "1.1 MB",
      status: "Valid",
    },
    {
      id: "DOC-03",
      name: "Akta Pendirian Perusahaan & SK Menkumham",
      fileType: "PDF",
      uploadDate: "2026-09-21",
      fileSize: "5.8 MB",
      status: "Menunggu Cek",
    },
    {
      id: "DOC-04",
      name: "Wajib Lapor Ketenagakerjaan (WLKP) Online",
      fileType: "PDF",
      uploadDate: "2026-09-21",
      fileSize: "1.7 MB",
      status: "Menunggu Cek",
    },
  ],
  verificationHistory: [
    {
      id: "HIST-C1",
      action: "Perlu Perbaikan",
      notes: "Dokumen WLKP belum melampirkan bukti lapor tahun berjalan.",
      date: "2026-09-22 10:15",
      verifier: "Admin Disnakertrans",
    },
  ],
};

export default function CompanyDetailPage() {
  const [company, setCompany] = useState<CompanyDetail>(MOCK_COMPANY_DETAIL);
  const [actionType, setActionType] = useState<
    "approve" | "revision" | "reject" | null
  >(null);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProcessVerification = () => {
    if (!actionType) return;

    if (
      (actionType === "revision" || actionType === "reject") &&
      !reason.trim()
    ) {
      alert("Harap masukkan alasan penolakan atau rincian catatan perbaikan.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      let newStatus: CompanyDetail["verificationStatus"] = "Terverifikasi";
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
          reason ||
          "Legalitas dan kelengkapan dokumen perusahaan terverifikasi valid.",
        date: new Date().toISOString().replace("T", " ").substring(0, 16),
        verifier: "Admin Disnakertrans",
      };

      setCompany((prev) => ({
        ...prev,
        verificationStatus: newStatus,
        verificationHistory: [newHistoryItem, ...prev.verificationHistory],
      }));

      setIsSubmitting(false);
      setActionType(null);
      setReason("");
      alert(
        `Status verifikasi perusahaan berhasil diperbarui menjadi '${newStatus}'.`,
      );
    }, 600);
  };

  return (
    <div className="space-y-6 bg-slate-50/50">
      {/* HEADER & BREADCRUMB */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/dashboard/admin/perusahaan"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke Semua Perusahaan
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              {company.name}
            </h1>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold border ${
                company.verificationStatus === "Terverifikasi"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : company.verificationStatus === "Menunggu"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : company.verificationStatus === "Perlu Perbaikan"
                      ? "bg-orange-50 text-orange-700 border-orange-200"
                      : "bg-rose-50 text-rose-700 border-rose-200"
              }`}
            >
              {company.verificationStatus}
            </span>
          </div>
        </div>

        <div className="text-xs text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-xl self-start sm:self-auto">
          ID Perusahaan:{" "}
          <strong className="text-slate-900">{company.id}</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KOLOM KIRI (2 SPAN): DETAIL PROFIL, LEGALITAS & DOKUMEN */}
        <div className="lg:col-span-2 space-y-6">
          {/* DETAIL PROFIL PERUSAHAAN */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Building2 className="w-4 h-4 text-teal-600" />
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Profil & Detail Umum Perusahaan
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[0.65rem]">
                  Nama Perusahaan
                </span>
                <p className="font-bold text-slate-800 mt-0.5">
                  {company.name}
                </p>
              </div>
              <div>
                <span className="text-slate-400 block text-[0.65rem]">
                  Bidang Industri
                </span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {company.industry}
                </p>
              </div>
              <div>
                <span className="text-slate-400 block text-[0.65rem]">
                  Tahun Berdiri
                </span>
                <p className="font-medium text-slate-800 mt-0.5">
                  {company.foundedYear}
                </p>
              </div>
              <div>
                <span className="text-slate-400 block text-[0.65rem]">
                  Jumlah Karyawan
                </span>
                <p className="font-medium text-slate-800 mt-0.5">
                  {company.employeeCount}
                </p>
              </div>
            </div>
          </div>

          {/* DATA LEGALITAS PERUSAHAAN */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Data Legalitas & Perpajakan
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-0.5">
                <span className="text-slate-400 block text-[0.65rem]">
                  Nomor Induk Berusaha (NIB)
                </span>
                <p className="font-mono font-bold text-teal-700 text-sm">
                  {company.nib}
                </p>
                <span className="text-[0.6rem] text-slate-400 block">
                  Terverifikasi via OSS RBA
                </span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-0.5">
                <span className="text-slate-400 block text-[0.65rem]">
                  NPWP Perusahaan
                </span>
                <p className="font-mono font-bold text-slate-800 text-sm">
                  {company.npwp}
                </p>
                <span className="text-[0.6rem] text-slate-400 block">
                  Direktorat Jenderal Pajak
                </span>
              </div>
            </div>
          </div>

          {/* DOKUMEN PERUSAHAAN & VERIFIKASI FILE */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-600" />
                <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Dokumen Legalitas & Kelengkapan BERKAS
                </h2>
              </div>
              <span className="text-[0.65rem] text-slate-400 font-medium">
                {company.documents.length} Berkas Diunggah
              </span>
            </div>

            <div className="space-y-2.5">
              {company.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between gap-3 text-xs hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 font-bold text-[0.65rem] flex items-center justify-center shrink-0 border border-rose-100">
                      {doc.fileType}
                    </div>
                    <div className="truncate">
                      <p className="font-bold text-slate-800 truncate">
                        {doc.name}
                      </p>
                      <p className="text-[0.65rem] text-slate-400">
                        {doc.uploadDate} • {doc.fileSize}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded text-[0.6rem] font-semibold ${
                        doc.status === "Valid"
                          ? "bg-emerald-100 text-emerald-800"
                          : doc.status === "Perlu Perbaikan"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {doc.status}
                    </span>
                    <button
                      type="button"
                      className="p-1.5 text-slate-500 hover:text-teal-600 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200"
                      title="Lihat Dokumen"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 text-slate-500 hover:text-teal-600 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200"
                      title="Unduh Dokumen"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KOLOM KANAN (1 SPAN): KONTAK, ALAMAT, AKSI VERIFIKASI & RIWAYAT */}
        <div className="space-y-6">
          {/* INFORMASI KONTAK & PIC */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 text-xs">
            <h2 className="font-bold text-slate-800 uppercase text-[0.7rem] tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-teal-600" /> Informasi Kontak &
              Penanggung Jawab
            </h2>

            <div className="space-y-2 text-slate-600">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[0.65rem] text-slate-400 block">
                  Penanggung Jawab (PIC)
                </span>
                <p className="font-bold text-slate-800 mt-0.5">
                  {company.contact.picName}
                </p>
                <p className="text-[0.65rem] text-slate-500">
                  {company.contact.picPosition}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{company.contact.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{company.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <a
                  href={company.contact.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal-600 hover:underline truncate"
                >
                  {company.contact.website}
                </a>
              </div>
            </div>
          </div>

          {/* ALAMAT PERUSAHAAN */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2 text-xs">
            <h2 className="font-bold text-slate-800 uppercase text-[0.7rem] tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-teal-600" /> Alamat Kantor /
              Operasional
            </h2>
            <p className="text-slate-700 leading-relaxed pt-1">
              {company.address.street}, {company.address.district},{" "}
              {company.address.regency}, {company.address.province}{" "}
              <strong className="text-slate-900">
                ({company.address.postalCode})
              </strong>
            </p>
          </div>

          {/* FORM AKSI KEPUTUSAN VERIFIKASI PERUSAHAAN */}
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

            {/* Input Alasan / Catatan jika dipicu */}
            {actionType && (
              <div className="space-y-2 pt-1">
                <label className="block text-[0.7rem] font-bold text-slate-700">
                  {actionType === "approve"
                    ? "Catatan Opsional Verifikator"
                    : actionType === "revision"
                      ? "Catatan Dokumen / Bagian yang Wajib Diperbaiki *"
                      : "Alasan Penolakan Verifikasi Perusahaan *"}
                </label>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder={
                    actionType === "approve"
                      ? "Tambahkan catatan jika diperlukan..."
                      : actionType === "revision"
                        ? "Tulis secara spesifik berkas atau data yang perlu direvisi..."
                        : "Jelaskan alasan hukum / administratif penolakan..."
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
                />

                <button
                  type="button"
                  onClick={handleProcessVerification}
                  disabled={isSubmitting}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs disabled:opacity-50"
                >
                  {isSubmitting ? "Memproses..." : "Simpan Keputusan"}
                </button>
              </div>
            )}
          </div>

          {/* RIWAYAT VERIFIKASI PERUSAHAAN */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
              <History className="w-4 h-4 text-teal-600" />
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Riwayat Verifikasi Perusahaan
              </h2>
            </div>

            <div className="space-y-3">
              {company.verificationHistory.length > 0 ? (
                company.verificationHistory.map((item) => (
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

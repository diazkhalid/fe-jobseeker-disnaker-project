"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Building2,
  FileText,
  ShieldCheck,
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
  UserCheck,
  Sparkles,
  Camera,
  Layers,
  Calendar,
  MessageSquare,
  FilePen,
} from "lucide-react";
import { useAdminCompany } from "@/features/manajemen-perusahaan-admin/hooks/useAdminCompany.hook";
import APP_CONFIG from "@/shared/global/app_config";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { useOptions } from "@/shared/hooks/useOptions.hook";
import Breadcrumbs from "@/shared/components/Breadcrumbs";
import { getFacilityIcon } from "@/shared/utils/getFacilityIcon";

export default function CompanyDetailPage() {
  const params = useParams();
  const companyId = params?.id as string;

  const {
    adminCompanyDetail,
    handleGetCompanyDetail,
    companyDocumentReviewForm,
    setCompanyDocumentReviewForm,
    handleReviewCompanyDocument,
    handleSetSelectedDocument,
  } = useAdminCompany();

  const [actionType, setActionType] = useState<
    "approve" | "revision" | "reject" | null
  >(null);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token] = useLocalStorage("access-token", null);

  // State lokal untuk melacak dokumen mana yang sedang dibuka panel review-nya
  const [activeReviewDocId, setActiveReviewDocId] = useState<number | null>(
    null,
  );
  const [isReviewingDoc, setIsReviewingDoc] = useState(false);

  // Ambil data detail perusahaan saat halaman dimuat atau ID berubah
  useEffect(() => {
    if (!token) return;

    if (companyId) {
      handleGetCompanyDetail(token, companyId);
    }
  }, [token, companyId, activeReviewDocId]);

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
      setIsSubmitting(false);
      setActionType(null);
      setReason("");
      alert("Status verifikasi perusahaan berhasil diperbarui.");
    }, 600);
  };

  const handleSubmitDocReview = async (docId: number) => {
    setIsReviewingDoc(true);
    await handleReviewCompanyDocument(docId.toString());
    setIsReviewingDoc(false);
    setActiveReviewDocId(null);
  };

  if (!adminCompanyDetail) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-3">
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-500 font-medium">
          Memuat data detail perusahaan...
        </p>
      </div>
    );
  }

  const { account, profile, documents, photos, facilities } =
    adminCompanyDetail;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* HEADER & BREADCRUMB */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-xs">
        <div className="space-y-1.5">
          <Breadcrumbs></Breadcrumbs>
          <div className="flex items-center gap-3 flex-wrap pt-1">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {profile?.brand_name || "Nama Perusahaan"}
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-[0.65rem] font-bold border ${
                profile?.verification_status === "verified"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }`}
            >
              {profile?.verification_status === "verified"
                ? "Terverifikasi"
                : "Belum Terverifikasi"}
            </span>
          </div>
        </div>

        <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200/80 px-4 py-2.5 rounded-2xl self-start sm:self-auto font-medium">
          ID Profil: <strong className="text-slate-900">{profile?.id}</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KOLOM KIRI (2 SPAN): PROFIL, VISI MISI, DOKUMEN, FOTO & FASILITAS */}
        <div className="lg:col-span-2 space-y-6">
          {/* DETAIL PROFIL & LOGO */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-5">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
              <div className="relative w-16 h-16 rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden shrink-0 flex items-center justify-center">
                {profile?.profile_image_url ? (
                  <Image
                    src={
                      profile.profile_image_url.startsWith("http")
                        ? profile.profile_image_url
                        : `${APP_CONFIG.STORAGE_URL}${profile.profile_image_url}`
                    }
                    alt="Logo"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Building2 className="w-7 h-7 text-slate-400" />
                )}
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  {profile?.legal_name || profile?.brand_name}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {profile?.business_entity || "Badan Usaha"} • Didirikan tahun{" "}
                  {profile?.founded_year || "-"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[0.65rem] font-medium">
                  Bidang Usaha / Industri
                </span>
                <p className="font-bold text-slate-800 mt-0.5">
                  {profile?.business_field || "-"}
                </p>
                {profile?.industries && profile.industries.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {profile.industries.map((ind) => (
                      <span
                        key={ind.id}
                        className="px-2 py-0.5 bg-teal-50 text-teal-700 text-[0.6rem] font-bold rounded-md"
                      >
                        {ind.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <span className="text-slate-400 block text-[0.65rem] font-medium">
                  Skala Perusahaan
                </span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {profile?.company_size || "-"}
                </p>
              </div>
              <div>
                <span className="text-slate-400 block text-[0.65rem] font-medium">
                  Website Resmi
                </span>
                <a
                  href={profile?.website_url || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-teal-600 hover:underline mt-0.5 block truncate"
                >
                  {profile?.website_url || "-"}
                </a>
              </div>
              <div>
                <span className="text-slate-400 block text-[0.65rem] font-medium">
                  Nomor Induk Berusaha (NIB)
                </span>
                <p className="font-mono font-bold text-slate-900 mt-0.5">
                  {profile?.nib || "-"}
                </p>
              </div>
            </div>

            {profile?.description && (
              <div className="pt-2 border-t border-slate-100">
                <span className="text-slate-400 block text-[0.65rem] font-medium mb-1">
                  Deskripsi Perusahaan
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {profile.description}
                </p>
              </div>
            )}
          </div>

          {/* VISI, MISI & BUDAYA KERJA */}
          {(profile?.company_vision ||
            profile?.company_mission ||
            profile?.workplace_culture) && (
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Visi, Misi & Budaya Kerja
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {profile?.company_vision && (
                  <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-100 space-y-1">
                    <span className="font-bold text-slate-900 block">Visi</span>
                    <p className="text-slate-600 leading-relaxed">
                      {profile.company_vision}
                    </p>
                  </div>
                )}
                {profile?.company_mission && (
                  <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-100 space-y-1">
                    <span className="font-bold text-slate-900 block">Misi</span>
                    <p className="text-slate-600 leading-relaxed">
                      {profile.company_mission}
                    </p>
                  </div>
                )}
              </div>

              {profile?.workplace_culture && (
                <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-100 space-y-1 text-xs">
                  <span className="font-bold text-slate-900 block">
                    Lingkungan & Budaya Kerja
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {profile.workplace_culture}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* DOKUMEN LEGALITAS & PANEL REVIEW */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-600" />
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Dokumen Legalitas & Perizinan
                </h3>
              </div>
              <span className="text-[0.65rem] text-slate-400 font-medium">
                {documents?.length || 0} Berkas Terlampir
              </span>
            </div>

            <div className="space-y-3">
              {documents && documents.length > 0 ? (
                documents.map((doc) => {
                  const isReviewingThis = activeReviewDocId === doc.id;

                  return (
                    <div
                      key={doc.id}
                      className="p-4 bg-slate-50/70 border border-slate-100 rounded-2xl space-y-3 text-xs"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">
                            {doc.document_name || "Dokumen Legalitas"}
                          </span>
                          {doc.code && (
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[0.6rem] font-mono rounded-md border border-slate-200">
                              {doc.code}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[0.6rem] font-bold ${
                              doc.review_status === "approved"
                                ? "bg-emerald-100 text-emerald-800"
                                : doc.review_status === "rejected"
                                  ? "bg-rose-100 text-rose-800"
                                  : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {doc.review_status}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              if (isReviewingThis) {
                                setActiveReviewDocId(null);
                              } else {
                                handleSetSelectedDocument(doc.id);
                                setActiveReviewDocId(doc.id);
                              }
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-full transition-all border border-teal-500 text-[0.65rem] shadow-2xs cursor-pointer"
                          >
                            <FilePen
                              className={`w-3 h-3 transition-transform ${isReviewingThis ? "rotate-180" : ""}`}
                            />
                            <span>{isReviewingThis ? "Tutup" : "Review"}</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-1 border-t border-slate-200/60">
                        <div className="flex items-center gap-2.5 min-w-0 mt-3">
                          <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 font-bold text-[0.6rem] flex items-center justify-center shrink-0 border border-teal-100">
                            PDF
                          </div>
                          <div className="truncate">
                            <p className="font-semibold text-slate-800 truncate">
                              {doc.original_filename}
                            </p>
                            <p className="text-[0.65rem] text-slate-400">
                              Diunggah:{" "}
                              {new Date(doc.uploaded_at).toLocaleDateString(
                                "id-ID",
                              )}{" "}
                              •{" "}
                              {(doc.file_size_bytes / (1024 * 1024)).toFixed(2)}{" "}
                              MB
                            </p>
                          </div>
                        </div>

                        {doc.file_url && (
                          <a
                            href={doc.file_url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 text-slate-500 mt-2 hover:text-teal-600 hover:bg-white rounded-xl transition-all border border-slate-200/60 shadow-2xs shrink-0"
                            title="Unduh / Lihat Dokumen"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      {/* Catatan Admin sebelumnya jika ada */}
                      {doc.admin_note && !isReviewingThis && (
                        <div className="p-2.5 bg-amber-50/60 border border-amber-100 rounded-xl text-[0.7rem] text-amber-900 flex items-center gap-2">
                          <MessageSquare className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <div className="mt-[3px]">
                            <strong className="font-bold">
                              Catatan Admin:
                            </strong>{" "}
                            {doc.admin_note}
                          </div>
                        </div>
                      )}

                      {/* PANEL FORM INTERAKTIF REVIEW DOKUMEN */}
                      {isReviewingThis && (
                        <div className="p-4 bg-white border border-teal-200 rounded-2xl space-y-3 shadow-sm animate-fadeIn">
                          <h4 className="font-bold text-slate-800 text-xs">
                            Form Evaluasi & Status Dokumen
                          </h4>

                          <div className="space-y-1">
                            <label className="block text-[0.65rem] font-bold text-slate-600">
                              Status Review
                            </label>
                            <select
                              value={companyDocumentReviewForm.review_status}
                              onChange={(e) =>
                                setCompanyDocumentReviewForm({
                                  ...companyDocumentReviewForm,
                                  review_status: e.target.value as any,
                                })
                              }
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-500 cursor-pointer"
                            >
                              <option value="approved">
                                Setujui (Approved)
                              </option>
                              <option value="rejected">Tolak (Rejected)</option>
                              <option value="pending_review">
                                Menunggu (Pending)
                              </option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[0.65rem] font-bold text-slate-600">
                              Catatan / Alasan Admin
                            </label>
                            <textarea
                              rows={2}
                              value={companyDocumentReviewForm.admin_note}
                              onChange={(e) =>
                                setCompanyDocumentReviewForm({
                                  ...companyDocumentReviewForm,
                                  admin_note: e.target.value,
                                })
                              }
                              placeholder="Tuliskan catatan perbaikan atau alasan jika ditolak..."
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                            />
                          </div>

                          <div className="flex justify-end gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => setActiveReviewDocId(null)}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
                            >
                              Batal
                            </button>
                            <button
                              type="button"
                              disabled={isReviewingDoc}
                              onClick={() => handleSubmitDocReview(doc.id)}
                              className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                            >
                              {isReviewingDoc
                                ? "Menyimpan..."
                                : "Simpan Status Dokumen"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-slate-400 text-center py-6">
                  Belum ada dokumen legalitas yang diunggah.
                </p>
              )}
            </div>
          </div>

          {/* GALERI FOTO & FASILITAS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Galeri Foto */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Camera className="w-4 h-4 text-teal-600" />
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Galeri Foto Kantor
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {photos && photos.length > 0 ? (
                  photos.map((photo) => (
                    <div
                      key={photo.id}
                      className="relative aspect-video rounded-2xl overflow-hidden border border-slate-100 bg-slate-50"
                    >
                      <Image
                        src={
                          photo.photo_url.startsWith("http")
                            ? photo.photo_url
                            : `${APP_CONFIG.STORAGE_URL}${photo.photo_url}`
                        }
                        alt="Foto Kantor"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <p className="col-span-2 text-xs text-slate-400 text-center py-6">
                    Tidak ada galeri foto.
                  </p>
                )}
              </div>
            </div>

            {/* Fasilitas Karyawan */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Layers className="w-4 h-4 text-teal-600" />
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Fasilitas & Benefit
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {facilities && facilities.length > 0 ? (
                  facilities.map((fac) => {
                    const FacilityIcon = getFacilityIcon(fac.icon_key);

                    return (
                      <span
                        key={fac.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50/80 border border-teal-100 text-teal-800 text-xs font-semibold rounded-xl"
                      >
                        <FacilityIcon className="w-3.5 h-3.5 text-teal-600" />
                        <span>{fac.facility_name}</span>
                      </span>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-400 text-center py-6 w-full">
                    Belum ada data fasilitas.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN (1 SPAN): AKUN, KONTAK, ALAMAT & AKSI VERIFIKASI */}
        <div className="space-y-6">
          {/* INFORMASI AKUN & PENDAFTARAN */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-slate-800 uppercase text-[0.7rem] tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-teal-600" /> Informasi Akun &
              PIC
            </h3>

            <div className="space-y-2 text-slate-600">
              <div className="p-3 bg-slate-50/70 rounded-2xl border border-slate-100 space-y-0.5">
                <span className="text-[0.65rem] text-slate-400 block font-medium">
                  Nama Akun Pemilik
                </span>
                <p className="font-bold text-slate-900">{account?.full_name}</p>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{account?.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{account?.phone || "-"}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>
                  Terdaftar:{" "}
                  {account?.registered_at
                    ? new Date(account.registered_at).toLocaleDateString(
                        "id-ID",
                      )
                    : "-"}
                </span>
              </div>
            </div>

            {/* Kontak HR / PIC di Profil */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider block">
                Kontak HR / PIC Perusahaan
              </span>
              <p className="font-bold text-slate-800">
                {profile?.hr_contact_name || "-"} (
                {profile?.hr_contact_position || "-"})
              </p>
              <p className="text-slate-500">
                {profile?.hr_contact_email || "-"}
              </p>
            </div>
          </div>

          {/* ALAMAT KANTOR */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-3 text-xs">
            <h3 className="font-bold text-slate-800 uppercase text-[0.7rem] tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-600" /> Lokasi & Alamat
              Kantor
            </h3>
            <p className="text-slate-700 leading-relaxed">
              {profile?.address || "-"}
            </p>
            <div className="p-3 bg-slate-50/70 rounded-2xl border border-slate-100 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Kecamatan / District:</span>
                <span className="font-semibold text-slate-800">
                  {profile?.district_name || "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Kota / Kabupaten:</span>
                <span className="font-semibold text-slate-800">
                  {profile?.city || "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Provinsi:</span>
                <span className="font-semibold text-slate-800">
                  {profile?.province || "-"}
                </span>
              </div>
            </div>
          </div>

          {/* FORM KEPUTUSAN VERIFIKASI */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4 text-xs">
            <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-teal-600" />
              <h3 className="font-bold text-slate-800 uppercase text-[0.7rem] tracking-wider">
                Aksi Keputusan Verifikasi
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setActionType("approve")}
                className={`py-2 px-1 rounded-2xl text-[0.7rem] font-bold flex flex-col items-center justify-center gap-1 transition-all border cursor-pointer ${
                  actionType === "approve"
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                    : "bg-emerald-50/50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                Setujui
              </button>

              <button
                type="button"
                onClick={() => setActionType("revision")}
                className={`py-2 px-1 rounded-2xl text-[0.7rem] font-bold flex flex-col items-center justify-center gap-1 transition-all border cursor-pointer ${
                  actionType === "revision"
                    ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                    : "bg-amber-50/50 text-amber-700 border-amber-200 hover:bg-amber-100"
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                Perbaikan
              </button>

              <button
                type="button"
                onClick={() => setActionType("reject")}
                className={`py-2 px-1 rounded-2xl text-[0.7rem] font-bold flex flex-col items-center justify-center gap-1 transition-all border cursor-pointer ${
                  actionType === "reject"
                    ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                    : "bg-rose-50/50 text-rose-700 border-rose-200 hover:bg-rose-100"
                }`}
              >
                <XCircle className="w-4 h-4" />
                Tolak
              </button>
            </div>

            {actionType && (
              <div className="space-y-2.5 pt-1">
                <label className="block text-[0.7rem] font-bold text-slate-700">
                  {actionType === "approve"
                    ? "Catatan Opsional Verifikator"
                    : actionType === "revision"
                      ? "Catatan Dokumen yang Wajib Diperbaiki *"
                      : "Alasan Penolakan Perusahaan *"}
                </label>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Tulis catatan atau alasan di sini..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-800 focus:outline-none focus:border-teal-500 transition-all"
                />

                <button
                  type="button"
                  onClick={handleProcessVerification}
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-slate-900 hover:bg-teal-600 text-white text-xs font-bold rounded-2xl transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Memproses..." : "Simpan Keputusan"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

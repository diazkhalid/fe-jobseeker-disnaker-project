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
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from "lucide-react";
import { useAdminCompany } from "@/features/manajemen-perusahaan-admin/hooks/useAdminCompany.hook";
import APP_CONFIG from "@/shared/global/app_config";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
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

  // State untuk tab Visi, Misi & Budaya Kerja
  const [activeCultureTab, setActiveCultureTab] = useState<
    "visi" | "misi" | "budaya"
  >("visi");

  // State lokal untuk melacak dokumen mana yang sedang dibuka panel review-nya
  const [activeReviewDocId, setActiveReviewDocId] = useState<number | null>(
    null,
  );
  const [isReviewingDoc, setIsReviewingDoc] = useState(false);

  // State Modal Pop-up Galeri Foto
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null,
  );

  // Ambil data detail perusahaan saat halaman dimuat atau ID berubah
  useEffect(() => {
    if (!token) return;

    if (companyId) {
      handleGetCompanyDetail(token, companyId);
    }
  }, [token, companyId, activeReviewDocId]);

  // Navigasi Keyboard untuk Pop-up Galeri Foto
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null || !adminCompanyDetail?.photos) return;
      if (e.key === "Escape") setSelectedPhotoIndex(null);
      if (e.key === "ArrowLeft") handlePrevPhoto();
      if (e.key === "ArrowRight") handleNextPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, adminCompanyDetail]);

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

  const handlePrevPhoto = () => {
    if (selectedPhotoIndex === null || !adminCompanyDetail?.photos) return;
    setSelectedPhotoIndex((prev) =>
      prev! > 0 ? prev! - 1 : adminCompanyDetail.photos.length - 1,
    );
  };

  const handleNextPhoto = () => {
    if (selectedPhotoIndex === null || !adminCompanyDetail?.photos) return;
    setSelectedPhotoIndex((prev) =>
      prev! < adminCompanyDetail.photos.length - 1 ? prev! + 1 : 0,
    );
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
      {/* BREADCRUMB TERPISAH */}
      <div className="">
        <Breadcrumbs />
      </div>
      {/* HEADER HERO CARD TERPISAH (DENGAN FOTO PROFIL) */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 p-6 sm:p-7 rounded-3xl text-white shadow-xl shadow-slate-900/10 border border-slate-700/50">
        {/* Ambient Glowing Effects Background */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Logo, Nama Perusahaan & Status */}
          <div className="flex items-center gap-4">
            {/* Foto Profil / Logo Perusahaan */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-slate-700/80 bg-slate-800/90 overflow-hidden shrink-0 flex items-center justify-center shadow-md">
              {profile?.profile_image_url ? (
                <Image
                  src={
                    profile.profile_image_url.startsWith("http")
                      ? profile.profile_image_url
                      : `${APP_CONFIG.STORAGE_URL}${profile.profile_image_url}`
                  }
                  alt="Logo Perusahaan"
                  fill
                  className="object-cover"
                />
              ) : (
                <Building2 className="w-8 h-8 text-teal-400" />
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {profile?.brand_name || "Nama Perusahaan"}
                </h1>

                {/* Badge Status Verifikasi Dynamic */}
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md transition-all ${
                    profile?.verification_status === "verified"
                      ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                      : "bg-amber-500/15 text-amber-300 border-amber-500/30"
                  }`}
                >
                  {profile?.verification_status === "verified" ? (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Terverifikasi</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Belum Terverifikasi</span>
                    </>
                  )}
                </span>
              </div>

              {/* Sub-info Perusahaan */}
              <p className="text-xs text-slate-300 flex items-center gap-2 flex-wrap pl-0.5">
                <span className="font-semibold text-teal-300">
                  {profile?.legal_name || "Legalitas Perusahaan"}
                </span>
                <span className="text-slate-600">•</span>
                <span>{profile?.business_entity || "Badan Usaha"}</span>
                {profile?.founded_year && (
                  <>
                    <span className="text-slate-600">•</span>
                    <span>Est. {profile.founded_year}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Quick Metadata ID Profile Badge */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-md text-xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span className="text-slate-400">ID Profil:</span>
              <span className="font-mono font-bold text-white tracking-wider">
                #{profile?.id}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KOLOM KIRI (2 SPAN): PROFIL, VISI MISI, DOKUMEN, FOTO & FASILITAS */}
        <div className="lg:col-span-2 space-y-6">
          {/* DETAIL PROFIL (RINGKAS DENGAN HEADER CONTAINER) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-5">
            {/* Header Container */}
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Building2 className="w-4 h-4 text-teal-600" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Detail Informasi Perusahaan
              </h3>
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
              <div className="pt-3 border-t border-slate-100">
                <span className="text-slate-400 block text-[0.65rem] font-medium mb-1">
                  Deskripsi Perusahaan
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {profile.description}
                </p>
              </div>
            )}
          </div>

          {/* VISI, MISI & BUDAYA KERJA - MODERN LINE TABBED LAYOUT */}
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

              <div className="space-y-4 text-xs">
                {/* Tab Header Line Style */}
                <div className="flex gap-6 border-b border-slate-100 overflow-x-auto scrollbar-none">
                  {profile?.company_vision && (
                    <button
                      type="button"
                      onClick={() => setActiveCultureTab("visi")}
                      className={`pb-2 text-xs font-bold transition-all relative cursor-pointer ${
                        activeCultureTab === "visi"
                          ? "text-teal-600"
                          : "text-slate-400 hover:text-slate-700"
                      }`}
                    >
                      Visi
                      {activeCultureTab === "visi" && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 rounded-full transition-all" />
                      )}
                    </button>
                  )}

                  {profile?.company_mission && (
                    <button
                      type="button"
                      onClick={() => setActiveCultureTab("misi")}
                      className={`pb-2 text-xs font-bold transition-all relative cursor-pointer ${
                        activeCultureTab === "misi"
                          ? "text-teal-600"
                          : "text-slate-400 hover:text-slate-700"
                      }`}
                    >
                      Misi
                      {activeCultureTab === "misi" && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 rounded-full transition-all" />
                      )}
                    </button>
                  )}

                  {profile?.workplace_culture && (
                    <button
                      type="button"
                      onClick={() => setActiveCultureTab("budaya")}
                      className={`pb-2 text-xs font-bold transition-all relative cursor-pointer ${
                        activeCultureTab === "budaya"
                          ? "text-teal-600"
                          : "text-slate-400 hover:text-slate-700"
                      }`}
                    >
                      Budaya Kerja
                      {activeCultureTab === "budaya" && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 rounded-full transition-all" />
                      )}
                    </button>
                  )}
                </div>

                {/* Konten Tab */}
                <div className="pt-1 min-h-[60px]">
                  {activeCultureTab === "visi" && profile?.company_vision && (
                    <div className="space-y-1 animate-fadeIn">
                      <p className="text-slate-700 leading-relaxed italic text-xs">
                        "{profile.company_vision}"
                      </p>
                    </div>
                  )}

                  {activeCultureTab === "misi" && profile?.company_mission && (
                    <div className="space-y-1 animate-fadeIn">
                      <p className="text-slate-700 leading-relaxed text-xs">
                        {profile.company_mission}
                      </p>
                    </div>
                  )}

                  {activeCultureTab === "budaya" &&
                    profile?.workplace_culture && (
                      <div className="space-y-1 animate-fadeIn">
                        <p className="text-slate-700 leading-relaxed text-xs">
                          {profile.workplace_culture}
                        </p>
                      </div>
                    )}
                </div>
              </div>
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
                            href={`${APP_CONFIG.STORAGE_URL}${doc.file_url}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 text-slate-500 mt-2 hover:text-teal-600 hover:bg-white rounded-xl transition-all border border-slate-200/60 shadow-2xs shrink-0"
                            title="Unduh / Lihat Dokumen"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

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

          {/* GALERI FOTO (HORIZONTAL STRIP POP-UP) & FASILITAS */}
          <div className="space-y-6">
            {/* GALERI FOTO */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-teal-600" />
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Galeri Foto Perusahaan
                  </h3>
                </div>
                {photos && photos.length > 0 && (
                  <span className="text-[0.65rem] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">
                    {photos.length} Foto
                  </span>
                )}
              </div>

              {photos && photos.length > 0 ? (
                <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-slate-200">
                  {photos.map((photo, index) => (
                    <div
                      key={photo.id}
                      onClick={() => setSelectedPhotoIndex(index)}
                      className="relative w-36 h-24 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0 group cursor-pointer transition-all hover:scale-[1.02] hover:shadow-md hover:border-teal-400"
                    >
                      <Image
                        src={
                          photo.photo_url.startsWith("http")
                            ? photo.photo_url
                            : `${APP_CONFIG.STORAGE_URL}${photo.photo_url}`
                        }
                        alt={`Foto Galeri ${index + 1}`}
                        fill
                        className="object-cover group-hover:opacity-90 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <Maximize2 className="w-5 h-5 drop-shadow-sm" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 text-center py-6">
                  Tidak ada galeri foto.
                </p>
              )}
            </div>

            {/* FASILITAS KARYAWAN */}
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

      {/* MODAL LIGHTBOX / POP-UP PREVIEW FOTO GALERI */}
      {selectedPhotoIndex !== null && photos && photos[selectedPhotoIndex] && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-5 right-5 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* TOMBOL PREVIOUS */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={handlePrevPhoto}
              className="absolute left-5 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* AREA DISPLAY GAMBAR & INDIKATOR */}
          <div className="relative max-w-4xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center space-y-3">
            <div className="relative w-full h-[75vh]">
              <Image
                src={
                  photos[selectedPhotoIndex].photo_url.startsWith("http")
                    ? photos[selectedPhotoIndex].photo_url
                    : `${APP_CONFIG.STORAGE_URL}${photos[selectedPhotoIndex].photo_url}`
                }
                alt="Foto Galeri Fullscreen"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-white text-xs font-semibold bg-white/10 px-4 py-1.5 rounded-full border border-white/10">
              Foto {selectedPhotoIndex + 1} dari {photos.length}
            </div>
          </div>

          {/* TOMBOL NEXT */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={handleNextPhoto}
              className="absolute right-5 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

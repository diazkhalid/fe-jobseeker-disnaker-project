/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  MapPin,
  GraduationCap,
  Briefcase,
  FileText,
  Download,
  Calendar,
  Building,
  ShieldAlert,
  ShieldCheck,
  FileCheck,
  Compass,
  DollarSign,
  SlidersHorizontal,
  Phone,
  Plus,
  Star,
  Building2,
  UserCheck,
  ExternalLink,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useAdminJobSeeker } from "@/features/dashboard-admin/hooks/useAdminJobSeeker.hook";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import APP_CONFIG from "@/shared/global/app_config";
import Breadcrumbs from "@/shared/components/Breadcrumbs";
import { getDistrictNameByCode } from "@/shared/utils/districtCodeNameMap";

// Helper untuk mengubah snake_case menjadi Capital Each Word
const formatCapitalEachWord = (text: string | null | undefined): string => {
  if (!text) return "";
  return text
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export default function AdminDetailPelamarPage() {
  const params = useParams();
  const id = params?.id as string;
  const [token] = useLocalStorage("access-token", null);

  // Integrasi Hook Admin Job Seeker Detail
  const { adminJobSeekerDetail, handleGetAdminJobSeekerDetail } =
    useAdminJobSeeker();

  const [activeTab, setActiveTab] = useState<
    "preferensi" | "profil" | "dokumen"
  >("preferensi");

  const [notes, setNotes] = useState<
    Array<{ author: string; date: string; text: string }>
  >([
    {
      author: "Admin Disnaker",
      date: "Hari Ini",
      text: "Data profil dan berkas pelamar sedang ditinjau.",
    },
  ]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    if (!token) return;
    if (id) {
      handleGetAdminJobSeekerDetail(token, id);
    }
  }, [id, token]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes([
      ...notes,
      {
        author: "Saya (Admin)",
        date: "Baru saja",
        text: newNote,
      },
    ]);
    setNewNote("");
  };

  // Jika data masih null atau proses fetching
  if (!adminJobSeekerDetail) {
    return (
      <div className="bg-slate-50/50 text-slate-800 text-[13px] min-h-[70vh] flex flex-col items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-9 h-9 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-500 font-medium">Memuat detail pelamar...</p>
        </div>
      </div>
    );
  }

  const { account, profile, preference, educations, experiences, documents } =
    adminJobSeekerDetail;

  const initials = profile?.full_name
    ? profile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "JS";

  const accountStatus = formatCapitalEachWord(account?.status || "aktif");

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 text-xs">
      {/* BREADCRUMBS */}
      <div>
        <Breadcrumbs />
      </div>

      {/* HEADER HERO PROFILE CARD (MODERN GRADIENT & GLASSMORPHISM) */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 p-6 sm:p-7 rounded-3xl text-white shadow-xl shadow-slate-900/10 border border-slate-700/50">
        {/* Ambient Glows */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Foto & Info Utama */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Foto Profil */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-slate-700/80 bg-slate-800/90 overflow-hidden shrink-0 flex items-center justify-center shadow-md">
              {profile?.profile_photo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`${APP_CONFIG.STORAGE_URL}${profile.profile_photo_url}`}
                  alt={profile.full_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xl font-bold text-teal-300">
                  {initials}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {profile?.full_name || account?.full_name || "Tanpa Nama"}
                </h1>

                {/* Status Akun Badge */}
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[0.65rem] font-bold border backdrop-blur-md transition-all ${
                    accountStatus.toLowerCase() === "aktif"
                      ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                      : "bg-slate-500/15 text-slate-300 border-slate-500/30"
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Status Akun: {accountStatus}
                </span>
              </div>

              {/* Sub Metadata (NIK, Email, Telepon) */}
              <p className="text-xs text-slate-300 flex items-center gap-2 flex-wrap font-mono">
                <span>NIK: {account?.nik || "-"}</span>
                <span className="text-slate-600">•</span>
                <span className="text-teal-300">{account?.email || "-"}</span>
                <span className="text-slate-600">•</span>
                <span>{account?.phone || profile?.phone || "-"}</span>
              </p>

              {/* Lokasi & Tanggal Daftar */}
              <div className="flex items-center gap-3 text-slate-400 text-[0.7rem] flex-wrap pt-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  {[
                    profile?.address,
                    getDistrictNameByCode(profile?.district_code),
                    profile?.regency_name,
                    profile?.province_name,
                  ]
                    .filter(Boolean)
                    .join(", ") || "Lokasi belum diatur"}
                </span>
                <span className="text-slate-700">•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  Terdaftar sejak {account?.registered_at || "-"}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions & User ID */}
          <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-700/60">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-md text-[0.7rem]">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span className="text-slate-400">ID User:</span>
              <span className="font-mono font-bold text-white tracking-wider">
                #{account?.user_id || "-"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[0.7rem] font-bold transition-all border shadow-xs cursor-pointer ${
                  accountStatus.toLowerCase() === "aktif"
                    ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500"
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                {accountStatus.toLowerCase() === "aktif"
                  ? "Nonaktifkan Akun"
                  : "Aktifkan Akun"}
              </button>

              <a
                href={`mailto:${account?.email}`}
                className="p-2 text-slate-300 hover:text-white bg-slate-800/80 border border-slate-700/80 rounded-xl hover:bg-slate-700 transition-all shadow-xs flex items-center justify-center"
                title="Kirim Email"
              >
                <Mail className="w-4 h-4 text-teal-400" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">
              Status Pencarian Kerja
            </p>
            <h3 className="text-sm font-bold text-teal-600 truncate max-w-[200px]">
              {formatCapitalEachWord(preference?.job_search_status) ||
                "Belum Ada Status"}
            </h3>
          </div>
          <div className="w-9 h-9 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold shrink-0 border border-teal-100">
            <Compass className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">
              Ekspektasi Gaji Pilihan
            </p>
            <h3 className="text-sm font-bold text-emerald-600">
              {preference?.min_salary !== undefined &&
              preference?.max_salary !== undefined
                ? `Rp ${preference.min_salary.toLocaleString()} - Rp ${preference.max_salary.toLocaleString()}`
                : "Tidak diatur"}
            </h3>
          </div>
          <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0 border border-emerald-100">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">
              Total Dokumen Unggahan
            </p>
            <h3 className="text-sm font-bold text-slate-900">
              {documents?.length || 0} Berkas Terlampir
            </h3>
          </div>
          <div className="w-9 h-9 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold shrink-0 border border-teal-100">
            <FileCheck className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* LINE TAB NAVIGATION */}
      <div className="flex border-b border-slate-200 overflow-x-auto scrollbar-none gap-6 pt-1">
        {[
          { id: "preferensi", label: "Preferensi Pekerjaan" },
          { id: "profil", label: "Biodata & Riwayat Kerja" },
          {
            id: "dokumen",
            label: `Dokumen & Berkas (${documents?.length || 0})`,
          },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 text-xs font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                isActive
                  ? "text-teal-600"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              {tab.label}
              {isActive && (
                <motion.span
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* LAYOUT KONTEN UTAMA & SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AREA KONTEN UTAMA (KIRI 2 KOLOM) */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            {/* TAB 1: PREFERENSI PEKERJAAN */}
            {activeTab === "preferensi" && (
              <motion.div
                key="preferensi"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-5"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-teal-600" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Preferensi Karir & Pekerjaan
                    </h3>
                  </div>
                  <span className="text-[0.65rem] font-bold bg-teal-50 text-teal-700 px-3 py-1 rounded-full border border-teal-100">
                    {formatCapitalEachWord(preference?.job_search_status) ||
                      "Belum Diatur"}
                  </span>
                </div>

                {/* Posisi Diinginkan */}
                <div className="space-y-2">
                  <span className="text-slate-400 block text-[0.65rem] font-medium uppercase tracking-wider">
                    Posisi / Jabatan yang Diinginkan
                  </span>
                  {preference?.preferred_positions &&
                  preference.preferred_positions.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {preference.preferred_positions.map((pos) => (
                        <span
                          key={pos.id}
                          className="px-3 py-1 bg-teal-50/80 border border-teal-100 text-teal-800 font-bold text-xs rounded-xl"
                        >
                          {formatCapitalEachWord(pos.name)}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 italic text-xs">
                      Data preferensi posisi belum diisi oleh pelamar.
                    </p>
                  )}
                </div>

                {/* Bidang & Industri */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 bg-slate-50/60 border border-slate-100 rounded-2xl space-y-1">
                    <span className="text-slate-400 block text-[0.65rem] font-medium uppercase tracking-wider">
                      Bidang & Kategori
                    </span>
                    {preference?.job_field ? (
                      <span className="inline-block text-xs font-bold text-slate-800 bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-2xs mt-1">
                        {formatCapitalEachWord(preference.job_field)}
                      </span>
                    ) : (
                      <p className="text-slate-400 italic text-xs pt-1">
                        Tidak ada bidang yang dipilih.
                      </p>
                    )}
                  </div>

                  <div className="p-4 bg-slate-50/60 border border-slate-100 rounded-2xl space-y-1">
                    <span className="text-slate-400 block text-[0.65rem] font-medium uppercase tracking-wider">
                      Industri Pilihan
                    </span>
                    {preference?.preferred_industries &&
                    preference.preferred_industries.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {preference.preferred_industries.map((item) => (
                          <span
                            key={item.id}
                            className="inline-block text-xs font-bold text-slate-800 bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-2xs"
                          >
                            {formatCapitalEachWord(item.name)}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-400 italic text-xs pt-1">
                        Tidak ada industri yang dipilih.
                      </p>
                    )}
                  </div>
                </div>

                {/* Wilayah Pilihan */}
                <div className="space-y-2 pt-1 border-t border-slate-100">
                  <span className="text-slate-400 block text-[0.65rem] font-medium uppercase tracking-wider mt-2">
                    Wilayah & Kecamatan Pilihan
                  </span>
                  {preference?.preferred_districts &&
                  preference.preferred_districts.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {preference.preferred_districts.map((dist) => (
                        <span
                          key={dist.code}
                          className="px-3 py-1 bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-xs rounded-xl"
                        >
                          🏘️ {formatCapitalEachWord(dist.name)}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 italic text-xs">
                      Tidak ada wilayah kecamatan khusus yang dipilih.
                    </p>
                  )}
                  <p className="text-xs text-slate-600 pt-1">
                    <strong className="text-slate-800">Status Relokasi:</strong>{" "}
                    {preference?.willing_to_relocate
                      ? "Bersedia direlokasi"
                      : "Tidak bersedia direlokasi"}
                  </p>
                </div>

                {/* Skema Kerja & Ekspektasi Gaji */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                  <div className="space-y-1.5">
                    <span className="text-slate-400 block text-[0.65rem] font-medium uppercase tracking-wider">
                      Jenis & Sistem Kerja
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {preference?.job_types &&
                      preference.job_types.length > 0 ? (
                        preference.job_types.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg font-semibold"
                          >
                            {formatCapitalEachWord(t)}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 italic text-xs">-</span>
                      )}
                      {preference?.work_arrangements &&
                      preference.work_arrangements.length > 0
                        ? preference.work_arrangements.map((w, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 bg-teal-50 text-teal-800 text-xs rounded-lg font-semibold border border-teal-100"
                            >
                              {formatCapitalEachWord(w)}
                            </span>
                          ))
                        : null}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-slate-400 block text-[0.65rem] font-medium uppercase tracking-wider">
                      Ekspektasi Gaji Bulanan
                    </span>
                    <p className="text-xs font-bold text-emerald-600 pt-0.5">
                      {preference?.min_salary !== undefined &&
                      preference?.max_salary !== undefined
                        ? `Rp ${preference.min_salary.toLocaleString()} - Rp ${preference.max_salary.toLocaleString()}`
                        : "Tidak ditentukan"}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: PROFIL & BIODATA */}
            {activeTab === "profil" && (
              <motion.div
                key="profil"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Ringkasan Singkat */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <UserCheck className="w-4 h-4 text-teal-600" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Ringkasan Singkat Pelamar
                    </h3>
                  </div>
                  {profile?.summary ? (
                    <p className="text-slate-700 leading-relaxed text-xs">
                      {profile.summary}
                    </p>
                  ) : (
                    <p className="text-slate-400 italic text-xs py-2">
                      Ringkasan profil belum diisi oleh pelamar.
                    </p>
                  )}
                </div>

                {/* Riwayat Pengalaman Kerja */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Briefcase className="w-4 h-4 text-teal-600" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Riwayat Pengalaman Kerja
                    </h3>
                  </div>

                  {experiences && experiences.length > 0 ? (
                    <div className="space-y-5 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-200/80">
                      {experiences.map((exp) => {
                        const getTypeColor = (type: string) => {
                          switch (type.toLowerCase()) {
                            case "full_time":
                            case "full-time":
                              return "text-emerald-700 bg-emerald-50 border-emerald-200";
                            case "part_time":
                            case "part-time":
                              return "text-blue-700 bg-blue-50 border-blue-200";
                            case "contract":
                              return "text-amber-700 bg-amber-50 border-amber-200";
                            case "internship":
                              return "text-purple-700 bg-purple-50 border-purple-200";
                            case "organization":
                              return "text-indigo-700 bg-indigo-50 border-indigo-200";
                            default:
                              return "text-slate-700 bg-slate-100 border-slate-200";
                          }
                        };

                        return (
                          <div key={exp.id} className="relative pl-8 group">
                            {/* Node Bullet Timeline */}
                            <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-teal-600 bg-white group-hover:bg-teal-600 transition-colors shadow-2xs" />

                            <div className="p-4 bg-slate-50/70 border border-slate-100 rounded-2xl space-y-2 hover:border-teal-300 transition-all">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                                  {exp.job_title}
                                </h4>
                                <span className="text-[0.65rem] font-bold text-slate-500 bg-white border border-slate-200 px-2.5 py-0.5 rounded-full w-fit">
                                  {exp.start_date} -{" "}
                                  {exp.end_date || "Sekarang"}
                                </span>
                              </div>

                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs text-teal-700 font-bold flex items-center gap-1.5">
                                  <Building2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                                  {exp.company_name}
                                </span>
                                {exp.location && (
                                  <span className="text-xs text-slate-400">
                                    • {exp.location}
                                  </span>
                                )}
                              </div>

                              {exp.employment_type && (
                                <div className="flex pt-0.5">
                                  <span
                                    className={`text-[0.6rem] font-bold px-2.5 py-0.5 rounded-full border ${getTypeColor(
                                      exp.employment_type,
                                    )}`}
                                  >
                                    {formatCapitalEachWord(exp.employment_type)}
                                  </span>
                                </div>
                              )}

                              {exp.description && (
                                <p className="text-slate-600 text-xs pt-2 border-t border-slate-200/60 leading-relaxed">
                                  {exp.description}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-slate-400 italic text-xs py-4 text-center">
                      Belum ada data riwayat pengalaman kerja yang tercatat.
                    </p>
                  )}
                </div>

                {/* Riwayat Pendidikan */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <GraduationCap className="w-4 h-4 text-teal-600" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Riwayat Pendidikan
                    </h3>
                  </div>

                  {educations && educations.length > 0 ? (
                    <div className="space-y-3">
                      {educations.map((edu) => (
                        <div
                          key={edu.id}
                          className="p-4 bg-slate-50/70 border border-slate-100 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
                        >
                          <div>
                            <h4 className="font-bold text-slate-900 text-xs">
                              {formatCapitalEachWord(edu.degree)}{" "}
                              {edu.major ? `- ${edu.major}` : ""}
                            </h4>
                            <p className="text-xs text-slate-600 mt-0.5">
                              {edu.institution}
                            </p>
                          </div>
                          <div className="text-left sm:text-right shrink-0">
                            <span className="text-[0.65rem] font-bold text-slate-600 bg-white border border-slate-200 px-2.5 py-0.5 rounded-full inline-block mb-1">
                              {edu.start_date} - {edu.end_date || "Sekarang"}
                            </span>
                            {edu.grade && (
                              <p className="text-[0.65rem] font-bold text-emerald-600">
                                IPK / Nilai: {edu.grade}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 italic text-xs py-4 text-center">
                      Belum ada data riwayat pendidikan yang tercatat.
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* TAB 3: DOKUMEN & BERKAS */}
            {activeTab === "dokumen" && (
              <motion.div
                key="dokumen"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-teal-600" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Berkas / Dokumen Pelamar
                    </h3>
                  </div>
                  <span className="text-[0.65rem] text-slate-400 font-medium">
                    {documents?.length || 0} Berkas Terlampir
                  </span>
                </div>

                {documents && documents.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className={`p-4 rounded-2xl border flex items-center justify-between transition-all shadow-xs ${
                          doc.is_primary
                            ? "border-teal-500 bg-teal-50/30"
                            : "border-slate-100 bg-slate-50/50 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-[0.65rem] shrink-0 border ${
                              doc.is_primary
                                ? "bg-teal-600 text-white border-teal-500"
                                : "bg-white text-teal-600 border-slate-200"
                            }`}
                          >
                            PDF
                          </div>
                          <div className="truncate">
                            <div className="flex items-center gap-1.5">
                              <p className="font-bold text-slate-800 truncate text-xs">
                                {doc.original_filename}
                              </p>
                              {doc.is_primary && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-teal-100 text-teal-800 text-[0.55rem] font-bold rounded-md shrink-0">
                                  <Star className="w-2.5 h-2.5 fill-teal-800" />{" "}
                                  CV Utama
                                </span>
                              )}
                            </div>
                            <p className="text-[0.65rem] text-slate-400 mt-0.5">
                              {doc.category_name ||
                                formatCapitalEachWord(doc.category_code)}{" "}
                              • {Math.round(doc.file_size_bytes / 1024)} KB
                            </p>
                          </div>
                        </div>

                        {doc.file_url ? (
                          <a
                            href={doc.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-slate-500 hover:text-teal-600 hover:bg-white rounded-xl transition-all border border-slate-200/60 shadow-2xs shrink-0"
                            title="Unduh / Lihat Berkas"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span className="text-[0.65rem] text-slate-400 italic">
                            Tidak ada URL
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 italic text-xs py-8 text-center">
                    Belum ada dokumen atau berkas yang diunggah oleh pelamar.
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* AREA SIDEBAR (KANAN 1 KOLOM) */}
        <div className="space-y-6">
          {/* KONTAK LANGSUNG CARD */}
          <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl shadow-slate-900/10 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-teal-500/20 text-teal-300 rounded-2xl border border-teal-500/30">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-white">
                  Informasi Kontak Direct
                </h4>
                <p className="text-[0.65rem] text-slate-400">
                  Saluran Komunikasi Pelamar
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300 pt-1 border-t border-slate-800">
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span className="truncate">
                  {account?.email || "Email tidak tersedia"}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>
                  {account?.phone ||
                    profile?.phone ||
                    "No. Telepon tidak tersedia"}
                </span>
              </div>
            </div>
          </div>

          {/* CATATAN PENGAWAS ADMIN CARD */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-teal-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Catatan Admin
                </h3>
              </div>
              <span className="text-[0.6rem] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                Internal Only
              </span>
            </div>

            <form onSubmit={handleAddNote} className="space-y-3">
              <textarea
                rows={3}
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Tulis catatan internal untuk pelamar ini..."
                className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-teal-500 transition-all text-slate-800"
              />
              <button
                type="submit"
                className="w-full py-2 bg-slate-900 hover:bg-teal-600 text-white font-bold text-xs rounded-2xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Simpan Catatan</span>
              </button>
            </form>

            <div className="space-y-2.5 pt-2 border-t border-slate-100 max-h-64 overflow-y-auto scrollbar-thin">
              {notes.map((note, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-1"
                >
                  <div className="flex items-center justify-between text-[0.65rem]">
                    <span className="font-bold text-slate-900">
                      {note.author}
                    </span>
                    <span className="text-slate-400 font-medium">
                      {note.date}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {note.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

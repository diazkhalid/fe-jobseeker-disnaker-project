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
} from "lucide-react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useAdminJobSeeker } from "@/features/dashboard-admin/hooks/useAdminJobSeeker.hook";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import APP_CONFIG from "@/shared/global/app_config";

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
      <div className="bg-slate-50/50 text-slate-800 text-[13px] min-h-screen pb-12 flex flex-col items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-500 font-medium">Memuat detail pelamar...</p>
          <Link
            href="/dashboard/admin/pelamar"
            className="inline-flex items-center gap-1.5 text-xs text-teal-600 hover:underline font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Database Pelamar
          </Link>
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
    <div className="bg-slate-50/50 text-slate-800 text-[13px] min-h-screen pb-12">
      <div className="mx-auto space-y-4">
        {/* Top Navigation & Back Button */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard/admin/pelamar"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-teal-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Database Pelamar
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">ID User:</span>
            <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              {account?.user_id || "-"}
            </span>
          </div>
        </div>

        {/* Header Profile Card Admin */}
        <div className="bg-white rounded-2xl p-4 md:p-5 border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start md:items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                {profile?.profile_photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`${APP_CONFIG.STORAGE_URL}${profile.profile_photo_url}`}
                    alt={profile.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-lg md:text-xl font-bold text-slate-900">
                    {profile?.full_name || account?.full_name || "Tanpa Nama"}
                  </h1>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${
                      accountStatus.toLowerCase() === "aktif"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    <ShieldCheck className="w-3 h-3" />
                    Status Akun: {accountStatus}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 font-mono">
                  <span>NIK: {account?.nik || "-"}</span>
                  <span>•</span>
                  <span>{account?.email || "-"}</span>
                  <span>•</span>
                  <span>{account?.phone || profile?.phone || "-"}</span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-500 pt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>
                    {[
                      profile?.address,
                      profile?.district_code,
                      profile?.regency_name,
                      profile?.province_name,
                    ]
                      .filter(Boolean)
                      .join(", ") || "Lokasi belum diatur"}
                  </span>
                  <span className="mx-1">•</span>
                  <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>Terdaftar sejak {account?.registered_at || "-"}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap md:flex-nowrap pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
              <button
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-lg transition-all shadow-xs border ${
                  accountStatus.toLowerCase() === "aktif"
                    ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                    : "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700"
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                {accountStatus.toLowerCase() === "aktif"
                  ? "Nonaktifkan Akun"
                  : "Aktifkan Akun"}
              </button>

              <a
                href={`mailto:${account?.email}`}
                className="p-1.5 text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all shadow-xs flex items-center justify-center"
                title="Kirim Email / Notifikasi"
              >
                <Mail className="w-4 h-4 text-slate-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">
                Status Pencarian Kerja
              </p>
              <h3 className="text-base font-bold text-teal-600 mt-0.5 truncate max-w-[200px]">
                {formatCapitalEachWord(preference?.job_search_status) ||
                  "Belum Ada Status"}
              </h3>
            </div>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <Compass className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">
                Ekspektasi Gaji Pilihan
              </p>
              <h3 className="text-base font-bold text-emerald-600 mt-0.5">
                {preference?.min_salary !== undefined &&
                preference?.max_salary !== undefined
                  ? `Rp ${preference.min_salary.toLocaleString()} - Rp ${preference.max_salary.toLocaleString()}`
                  : "Tidak diatur"}
              </h3>
            </div>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">
                Total Dokumen Unggahan
              </p>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                {documents?.length || 0} Berkas
              </h3>
            </div>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-white px-3 rounded-xl border overflow-x-auto">
          <button
            onClick={() => setActiveTab("preferensi")}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === "preferensi"
                ? "border-teal-600 text-teal-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Preferensi Pekerjaan
          </button>
          <button
            onClick={() => setActiveTab("profil")}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === "profil"
                ? "border-teal-600 text-teal-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Biodata & Riwayat Kerja
          </button>
          <button
            onClick={() => setActiveTab("dokumen")}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === "dokumen"
                ? "border-teal-600 text-teal-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Dokumen & Berkas ({documents?.length || 0})
          </button>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Content Area (Left 2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            {/* TAB 1: PREFERENSI PEKERJAAN PELAMAR */}
            {activeTab === "preferensi" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-teal-600" />{" "}
                      Preferensi Karir & Pekerjaan
                    </h3>
                    <span className="text-[10px] font-semibold bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full border border-teal-200">
                      {formatCapitalEachWord(preference?.job_search_status) ||
                        "Belum Diatur"}
                    </span>
                  </div>

                  {/* Posisi Diinginkan */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Posisi / Jabatan yang Diinginkan
                    </label>
                    {preference?.preferred_positions &&
                    preference.preferred_positions.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {preference.preferred_positions.map((pos) => (
                          <span
                            key={pos.id}
                            className="px-3 py-1 bg-teal-50 border border-teal-200 text-teal-800 font-bold text-xs rounded-xl"
                          >
                            {formatCapitalEachWord(pos.name)}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-400 italic text-[11px]">
                        Data preferensi posisi belum diisi oleh pelamar.
                      </p>
                    )}
                  </div>

                  {/* Bidang & Industri */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Bidang & Kategori
                      </p>
                      {preference?.job_field ? (
                        <span className="inline-block text-xs font-semibold text-slate-700 bg-white px-2.5 py-1 rounded border border-slate-200 mt-1">
                          {formatCapitalEachWord(preference.job_field)}
                        </span>
                      ) : (
                        <p className="text-slate-400 italic text-[11px] pt-1">
                          Tidak ada bidang yang dipilih.
                        </p>
                      )}
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Industri Pilihan
                      </p>
                      {preference?.industry ? (
                        <span className="inline-block text-xs font-semibold text-slate-700 bg-white px-2.5 py-1 rounded border border-slate-200 mt-1">
                          {formatCapitalEachWord(preference.industry)}
                        </span>
                      ) : (
                        <p className="text-slate-400 italic text-[11px] pt-1">
                          Tidak ada industri yang dipilih.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Lokasi & Wilayah Pilihan */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Wilayah & Kecamatan Pilihan
                    </label>
                    {preference?.preferred_districts &&
                    preference.preferred_districts.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {preference.preferred_districts.map((dist) => (
                          <span
                            key={dist.code}
                            className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs rounded-lg"
                          >
                            🏘️ {formatCapitalEachWord(dist.name)}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-400 italic text-[11px]">
                        Tidak ada wilayah kecamatan khusus yang dipilih.
                      </p>
                    )}
                    <p className="text-[11px] text-slate-500 pt-1">
                      <strong>Status Relokasi:</strong>{" "}
                      {preference?.willing_to_relocate
                        ? "Ya, bersedia direlokasi"
                        : "Tidak bersedia direlokasi"}
                    </p>
                  </div>

                  {/* Skema Kerja & Ekspektasi Gaji */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Jenis & Sistem Kerja
                      </p>
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {preference?.job_types &&
                        preference.job_types.length > 0 ? (
                          preference.job_types.map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] rounded font-medium"
                            >
                              {formatCapitalEachWord(t)}
                            </span>
                          ))
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">
                            -
                          </span>
                        )}
                        {preference?.work_arrangements &&
                        preference.work_arrangements.length > 0
                          ? preference.work_arrangements.map((w, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-teal-50 text-teal-700 text-[11px] rounded font-medium border border-teal-100"
                              >
                                {formatCapitalEachWord(w)}
                              </span>
                            ))
                          : null}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Ekspektasi Gaji Bulanan
                      </p>
                      <p className="text-xs font-bold text-emerald-700 pt-1">
                        {preference?.min_salary !== undefined &&
                        preference?.max_salary !== undefined
                          ? `Rp ${preference.min_salary.toLocaleString()} - Rp ${preference.max_salary.toLocaleString()}`
                          : "Tidak ditentukan"}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: PROFIL & BIODATA */}
            {activeTab === "profil" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Ringkasan Singkat Pelamar
                  </h3>
                  {profile?.summary ? (
                    <p className="text-slate-700 leading-relaxed">
                      {profile.summary}
                    </p>
                  ) : (
                    <p className="text-slate-400 italic text-[11px]">
                      Ringkasan profil belum diisi oleh pelamar.
                    </p>
                  )}
                </div>

                {/* Riwayat Pengalaman Kerja */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-teal-600" /> Riwayat
                    Pengalaman Kerja
                  </h3>

                  {experiences && experiences.length > 0 ? (
                    <div className="space-y-4 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-200">
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
                            {/* Dot Indicator pada garis timeline */}
                            <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-teal-600 bg-white group-hover:bg-teal-600 transition-colors" />

                            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2 hover:border-teal-300 transition-all">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <h4 className="font-bold text-slate-900 text-xs md:text-sm">
                                  {exp.job_title}
                                </h4>
                                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md w-fit">
                                  {exp.start_date} -{" "}
                                  {exp.end_date || "Sekarang"}
                                </span>
                              </div>

                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs text-teal-700 font-semibold flex items-center gap-1.5">
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
                                    className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${getTypeColor(
                                      exp.employment_type,
                                    )}`}
                                  >
                                    {formatCapitalEachWord(exp.employment_type)}
                                  </span>
                                </div>
                              )}

                              {exp.description && (
                                <p className="text-slate-600 text-[11px] pt-1.5 border-t border-slate-100 leading-relaxed">
                                  {exp.description}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-slate-400 italic text-[11px]">
                      Belum ada data riwayat pengalaman kerja yang tercatat.
                    </p>
                  )}
                </div>

                {/* Riwayat Pendidikan */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-teal-600" />{" "}
                    Riwayat Pendidikan
                  </h3>

                  {educations && educations.length > 0 ? (
                    <div className="space-y-2">
                      {educations.map((edu) => (
                        <div
                          key={edu.id}
                          className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex justify-between items-center"
                        >
                          <div>
                            <h4 className="font-semibold text-slate-900 text-xs">
                              {formatCapitalEachWord(edu.degree)}{" "}
                              {edu.major ? `- ${edu.major}` : ""}
                            </h4>
                            <p className="text-xs text-slate-600">
                              {edu.institution}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] font-medium bg-white text-slate-600 border border-slate-200 px-2 py-0.5 rounded block mb-1">
                              {edu.start_date} - {edu.end_date || "Sekarang"}
                            </span>
                            {edu.grade && (
                              <span className="text-[10px] font-bold text-emerald-700">
                                IPK/Nilai: {edu.grade}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 italic text-[11px]">
                      Belum ada data riwayat pendidikan yang tercatat.
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* TAB 3: DOKUMEN & BERKAS */}
            {activeTab === "dokumen" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Berkas / Dokumen Pelamar
                    </h3>
                  </div>

                  {documents && documents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {documents.map((doc) => (
                        <div
                          key={doc.id}
                          className={`p-3 border rounded-xl flex items-center justify-between bg-white transition-all shadow-xs ${
                            doc.is_primary
                              ? "border-teal-500 ring-1 ring-teal-500/20 bg-teal-50/20"
                              : "border-slate-200 hover:border-teal-200"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className={`p-2 rounded-lg shrink-0 ${
                                doc.is_primary
                                  ? "bg-teal-600 text-white"
                                  : "bg-teal-50 text-teal-600"
                              }`}
                            >
                              <FileText className="w-4 h-4" />
                            </div>
                            <div className="truncate">
                              <div className="flex items-center gap-1.5">
                                <p className="font-semibold text-slate-800 truncate text-[11px]">
                                  {doc.original_filename}
                                </p>
                                {doc.is_primary && (
                                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-teal-100 text-teal-800 text-[9px] font-bold rounded shrink-0">
                                    <Star className="w-2.5 h-2.5 fill-teal-800" />{" "}
                                    CV Utama
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-slate-400">
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
                              className="p-1.5 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                              title="Unduh Berkas"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <span className="text-[10px] text-slate-400 italic">
                              Tidak ada URL
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 italic text-[11px] py-4 text-center">
                      Belum ada dokumen atau berkas yang diunggah oleh pelamar.
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Sidebar Area */}
          <div className="space-y-4">
            <div className="bg-teal-900 text-white p-4 rounded-2xl shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-300" />
                <div>
                  <h4 className="font-semibold text-xs">Informasi Kontak</h4>
                  <p className="text-[10px] text-teal-200">Kontak Langsung</p>
                </div>
              </div>
              <div className="space-y-1.5 text-[11px] text-teal-50 pt-1">
                <p className="flex items-center gap-1.5 truncate">
                  <Mail className="w-3.5 h-3.5 shrink-0 text-teal-300" />{" "}
                  {account?.email || "Email tidak tersedia"}
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 shrink-0 text-teal-300" />{" "}
                  {account?.phone ||
                    profile?.phone ||
                    "No. Telepon tidak tersedia"}
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Catatan Pengawas Admin</span>
                <span className="text-[10px] text-slate-400 font-normal">
                  Internal Only
                </span>
              </h3>

              <form onSubmit={handleAddNote} className="space-y-2">
                <textarea
                  rows={3}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Tambahkan catatan verifikasi pelamar..."
                  className="w-full p-2.5 text-[11px] bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
                <button
                  type="submit"
                  className="w-full py-1.5 bg-slate-900 text-white font-medium text-[11px] rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Simpan Catatan
                </button>
              </form>

              <div className="space-y-2 pt-2 border-t border-slate-100 max-h-52 overflow-y-auto">
                {notes.map((note, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-semibold text-slate-800">
                        {note.author}
                      </span>
                      <span className="text-slate-400">{note.date}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {note.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  GraduationCap,
  Briefcase,
  Wrench,
  SlidersHorizontal,
  FileText,
  Paperclip,
  Edit3,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ShieldCheck,
  Zap,
  ChevronRight,
  Sparkles,
  Check,
  Award,
  AlertCircle,
} from "lucide-react";

import { useJobSeekerProfile } from "@/features/profil-pencaker/hooks/useUserProfile.hook";
import { useJobSeekerEducation } from "@/features/profil-pencaker/hooks/useUserEducation.hook";
import { useJobSeekerPreference } from "@/features/preference-pencaker/hooks/useUserPreference.hook";
import { useJobSeekerExperience } from "@/features/profil-pencaker/hooks/useUserExperience.hook";
import { useJobSeekerSkill } from "@/features/profil-pencaker/hooks/useUserSkill.hook";
import { useJobSeekerCertification } from "@/features/profil-pencaker/hooks/useUserCertification.hook";
import { useJobSeekerDocument } from "@/features/document-pencaker/hooks/useUserDocument.hook";
import { useJobSeekerProfileCompletionRate } from "@/features/profil-pencaker/hooks/useUserProfileCompletionRate";
import { useAuthUser } from "@/shared/contexts/SessionContext";
import { formatDateWithMonthName } from "@/shared/utils/formatDate.util";
import { userGenderMap } from "@/shared/utils/userGenderMap";
import APP_CONFIG from "@/shared/global/app_config";

export default function ProfileReviewAlternativePage() {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isProfileActive, setIsProfileActive] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  const { user } = useAuthUser();
  const { jobSeekerProfile } = useJobSeekerProfile();
  const { jobSeekerEducation } = useJobSeekerEducation();
  const { jobSeekerPreference } = useJobSeekerPreference();
  const { jobSeekerExperience } = useJobSeekerExperience();
  const { jobSeekerSkill } = useJobSeekerSkill();
  const { jobSeekerCertification } = useJobSeekerCertification();
  const { jobSeekerDocument } = useJobSeekerDocument();
  const { jobSeekerProfileCompletionRate: profileProgress } =
    useJobSeekerProfileCompletionRate();

  // Evaluasi kelengkapan tiap section secara dinamis (handle null / empty array)
  const isPersonalComplete = Boolean(
    jobSeekerProfile?.full_name &&
    jobSeekerProfile?.phone &&
    jobSeekerProfile?.address &&
    jobSeekerProfile?.headline,
  );
  const isEducationComplete = Boolean(
    jobSeekerEducation && jobSeekerEducation.length > 0,
  );
  const isExperienceComplete = Boolean(
    jobSeekerExperience && jobSeekerExperience.length > 0,
  );
  const isSkillsComplete = Boolean(jobSeekerSkill && jobSeekerSkill.length > 0);
  const isCertificationComplete = Boolean(
    jobSeekerCertification && jobSeekerCertification.length > 0,
  );
  const isPreferencesComplete = Boolean(
    jobSeekerPreference && jobSeekerPreference.preferred_positions?.length > 0,
  );

  // Dokumen CV Utama
  const mainCv =
    jobSeekerDocument?.find((doc) => doc.category === "cv" && doc.isMain) ||
    jobSeekerDocument?.find((doc) => doc.category === "cv");
  const isDocumentsComplete = Boolean(mainCv);

  const profileSections = [
    { id: "personal", title: "Data Pribadi", isComplete: isPersonalComplete },
    { id: "education", title: "Pendidikan", isComplete: isEducationComplete },
    {
      id: "experience",
      title: "Pengalaman Kerja",
      isComplete: isExperienceComplete,
    },
    { id: "skills", title: "Keahlian", isComplete: isSkillsComplete },
    {
      id: "certification",
      title: "Sertifikasi",
      isComplete: isCertificationComplete,
    },
    {
      id: "preferences",
      title: "Preferensi",
      isComplete: isPreferencesComplete,
    },
    { id: "documents", title: "CV & Dokumen", isComplete: isDocumentsComplete },
  ];

  // Nilai kelengkapan dan alert dari hook
  const progressPercentage = profileProgress?.profile_completeness ?? 0;
  const missingAlerts = profileProgress?.missing_data_alerts ?? [];
  const completedCount = profileSections.filter((s) => s.isComplete).length;

  const handleActivateProfile = () => {
    if (!isAgreed) return;
    setIsProfileActive(true);
    setShowSuccessModal(true);
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-16 space-y-6 text-slate-800">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="space-y-1">
          <Link
            href="/dashboard/pencaker/profil"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-app-navy-700 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Dashboard Profil
          </Link>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Peninjauan Berkas & Aktivasi Profil
          </h1>
          <p className="text-[11px] text-slate-500">
            Verifikasi seluruh ringkasan data lamaran Anda dalam satu lembar
            kerja terpadu.
          </p>
        </div>

        <div className="shrink-0">
          {isProfileActive ? (
            <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-[11px] rounded-full inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Profil Siap
              Melamar
            </span>
          ) : (
            <span className="px-3 py-1.5 bg-amber-100 text-amber-800 border border-amber-300 font-bold text-[11px] rounded-full inline-flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" /> Draf Belum
              Diaktifkan
            </span>
          )}
        </div>
      </div>

      {/* STRIP PROGRESS & BANNER PERINGATAN */}
      <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-300">
              Status Kelengkapan Profil ({progressPercentage}%)
            </h2>
          </div>
          <p className="text-[11px] text-teal-300 max-w-xl leading-relaxed">
            {progressPercentage === 100
              ? "Seluruh data profil sudah lengkap. Silakan lakukan aktivasi agar perekrut dapat melihat berkas Anda."
              : "Lengkapi berkas pendukung Anda untuk memaksimalkan peluang pemanggilan wawancara kerja."}
          </p>
        </div>

        {/* PROGRESS MINI */}
        <div className="w-full md:w-48 space-y-1.5 shrink-0">
          <div className="w-full bg-teal-800 h-2 rounded-full overflow-hidden border border-teal-700">
            <div
              className="bg-teal-400 h-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-[10px] text-teal-400 text-right">
            {completedCount} dari {profileSections.length} Bagian Terisi
          </p>
        </div>
      </div>

      {/* ALERT DATA YANG BELUM DIISI (DARI API) */}
      {missingAlerts.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Perhatian: Data Anda Belum Lengkap ({missingAlerts.length}{" "}
              Peringatan)
            </span>
          </div>
          <ul className="space-y-1 pl-6 list-disc text-xs text-amber-900">
            {missingAlerts.map((alert) => (
              <li key={alert.id}>
                <span className="font-semibold">{alert.category}:</span>{" "}
                {alert.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* MAIN CONTAINER: SINGLE SHEET DOCUMENT VIEW */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* STICKY TAB NAVIGATOR */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-200 z-10 px-4 sm:px-6 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {profileSections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap inline-flex items-center gap-1.5 ${
                activeTab === sec.id
                  ? "bg-app-navy-50 text-app-navy-800 border border-app-navy-200"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  sec.isComplete ? "bg-emerald-500" : "bg-amber-500"
                }`}
              />
              {sec.title}
            </button>
          ))}
        </div>

        {/* DOCUMENT BODY - TIMELINE / SHEET LAYOUT */}
        <div className="p-5 sm:p-8 divide-y divide-slate-100">
          {/* 1. DATA PRIBADI */}
          <section id="personal" className="pb-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-app-navy-50 border border-app-navy-200 flex items-center justify-center text-app-navy-700">
                  <User className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  1. Ringkasan Data Diri
                </h3>
              </div>
              <Link
                href="/dashboard/pencaker/profil/edit"
                className="text-[10px] font-bold text-app-navy-700 hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" /> Edit Section
              </Link>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 text-[11px] bg-slate-50/50 p-4 rounded-lg border border-slate-100">
              <div>
                <dt className="text-slate-400 text-[10px]">Nama Lengkap</dt>
                <dd className="font-bold text-slate-800">
                  {jobSeekerProfile?.full_name ||
                    user?.full_name ||
                    "Belum diisi"}
                </dd>
              </div>
              <div>
                <dt className="text-slate-400 text-[10px]">Alamat Email</dt>
                <dd className="font-bold text-slate-800">
                  {user?.email || "Belum diisi"}
                </dd>
              </div>
              <div>
                <dt className="text-slate-400 text-[10px]">
                  Kontak HP/WhatsApp
                </dt>
                <dd className="font-bold text-slate-800">
                  {jobSeekerProfile?.phone || user?.phone || "Belum diisi"}
                </dd>
              </div>
              <div>
                <dt className="text-slate-400 text-[10px]">
                  Tempat, Tanggal Lahir
                </dt>
                <dd className="font-bold text-slate-800">
                  {jobSeekerProfile?.birth_place
                    ? `${jobSeekerProfile.birth_place}, `
                    : ""}
                  {formatDateWithMonthName(jobSeekerProfile?.date_of_birth) ||
                    "Belum diisi"}
                </dd>
              </div>
              <div>
                <dt className="text-slate-400 text-[10px]">Jenis Kelamin</dt>
                <dd className="font-bold text-slate-800">
                  {jobSeekerProfile?.gender
                    ? userGenderMap[jobSeekerProfile.gender] ||
                      jobSeekerProfile.gender
                    : "Belum diisi"}
                </dd>
              </div>
              <div>
                <dt className="text-slate-400 text-[10px]">Domisili Utama</dt>
                <dd className="font-bold text-slate-800">
                  {jobSeekerProfile?.address
                    ? `${jobSeekerProfile.address}, ${
                        jobSeekerProfile?.regency_name || ""
                      }`
                    : "Belum diisi"}
                </dd>
              </div>
            </dl>
          </section>

          {/* 2. RIWAYAT PENDIDIKAN */}
          <section id="education" className="py-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-app-navy-50 border border-app-navy-200 flex items-center justify-center text-app-navy-700">
                  <GraduationCap className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  2. Pendidikan Terakhir
                </h3>
              </div>
              <Link
                href="/dashboard/pencaker/profil/edit"
                className="text-[10px] font-bold text-app-navy-700 hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" /> Edit Section
              </Link>
            </div>

            {jobSeekerEducation && jobSeekerEducation.length > 0 ? (
              jobSeekerEducation.map((edu) => (
                <div
                  key={edu.id}
                  className="pl-3 border-l-2 border-app-navy-600 space-y-1 ml-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900">
                      {edu.degree} {edu.major}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-semibold">
                      {edu.start_date} - {edu.end_date || "Sekarang"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-700">
                    {edu.institution} {edu.grade ? `• ` : ""}
                    {edu.grade && (
                      <span className="font-semibold text-app-navy-700">
                        IPK {edu.grade}
                      </span>
                    )}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-[11px] text-slate-400 italic pl-3">
                Belum ada riwayat pendidikan yang ditambahkan.
              </p>
            )}
          </section>

          {/* 3. PENGALAMAN KERJA */}
          <section id="experience" className="py-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-app-navy-50 border border-app-navy-200 flex items-center justify-center text-app-navy-700">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  3. Pengalaman Kerja / Pemagangan
                </h3>
              </div>
              <Link
                href="/dashboard/pencaker/profil/edit"
                className="text-[10px] font-bold text-app-navy-700 hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" /> Edit Section
              </Link>
            </div>

            {jobSeekerExperience && jobSeekerExperience.length > 0 ? (
              <div className="space-y-4 pl-3 border-l-2 border-slate-200 ml-3">
                {jobSeekerExperience.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900">
                        {exp.job_title}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-semibold">
                        {exp.start_date} -{" "}
                        {exp.is_current
                          ? "Sekarang"
                          : exp.end_date || "Selesai"}
                      </span>
                    </div>
                    <p className="text-[11px] font-semibold text-slate-700">
                      {exp.company_name}{" "}
                      {exp.location ? `— ${exp.location}` : ""}
                    </p>
                    {exp.description && (
                      <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 italic pl-3">
                Belum ada pengalaman kerja yang ditambahkan.
              </p>
            )}
          </section>

          {/* 4. KEAHLIAN & KOMPETENSI */}
          <section id="skills" className="py-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-app-navy-50 border border-app-navy-200 flex items-center justify-center text-app-navy-700">
                  <Wrench className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  4. Keahlian Utama
                </h3>
              </div>
              <Link
                href="/dashboard/pencaker/profil/edit"
                className="text-[10px] font-bold text-app-navy-700 hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" /> Edit Section
              </Link>
            </div>

            {jobSeekerSkill && jobSeekerSkill.length > 0 ? (
              <div className="flex flex-wrap gap-2 text-[11px]">
                {jobSeekerSkill.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-3 py-1 bg-slate-100 text-slate-700 font-bold rounded-md border border-slate-200 inline-flex items-center gap-1"
                  >
                    <span>✓ {skill.skill_name}</span>
                    {skill.proficiency_level && (
                      <span className="text-[9px] text-slate-400 font-normal">
                        ({skill.proficiency_level})
                      </span>
                    )}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 italic">
                Belum ada keahlian yang ditambahkan.
              </p>
            )}
          </section>

          {/* 5. SERTIFIKASI KOMPETENSI */}
          <section id="certification" className="py-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-app-navy-50 border border-app-navy-200 flex items-center justify-center text-app-navy-700">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  5. Sertifikasi Kompetensi
                </h3>
              </div>
              <Link
                href="/dashboard/pencaker/profil/edit"
                className="text-[10px] font-bold text-app-navy-700 hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" /> Edit Section
              </Link>
            </div>

            {jobSeekerCertification && jobSeekerCertification.length > 0 ? (
              <div className="space-y-3">
                {jobSeekerCertification.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-[11px]"
                  >
                    <div>
                      <p className="font-bold text-slate-900">{cert.name}</p>
                      <p className="text-[10px] text-slate-500">
                        {cert.issuer} • Diterbitkan:{" "}
                        {new Date(cert.issue_date).toLocaleDateString("id-ID", {
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    {cert.certificate_file_url ? (
                      <a
                        href={`${APP_CONFIG.STORAGE_URL}${cert.certificate_file_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 bg-white border border-slate-200 text-app-navy-700 font-bold rounded hover:bg-slate-100 transition"
                      >
                        Lihat Sertifikat
                      </a>
                    ) : (
                      <span className="text-[10px] text-slate-400 italic">
                        Tanpa File
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 italic">
                Belum ada sertifikasi yang ditambahkan.
              </p>
            )}
          </section>

          {/* 6. PREFERENSI PEKERJAAN */}
          <section id="preferences" className="py-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-app-navy-50 border border-app-navy-200 flex items-center justify-center text-app-navy-700">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  6. Preferensi Karier
                </h3>
              </div>
              <Link
                href="/dashboard/pencaker/preferensi"
                className="text-[10px] font-bold text-app-navy-700 hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" /> Edit Section
              </Link>
            </div>

            {jobSeekerPreference ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px] bg-slate-50/50 p-4 rounded-lg border border-slate-100">
                <div>
                  <span className="text-slate-400 text-[10px] block">
                    Peran / Jabatan Target
                  </span>
                  <p className="font-bold text-slate-800">
                    {jobSeekerPreference.preferred_positions &&
                    jobSeekerPreference.preferred_positions.length > 0
                      ? jobSeekerPreference.preferred_positions
                          .map((p) => p.name)
                          .join(", ")
                      : "Belum ditentukan"}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">
                    Ekspektasi Remunerasi
                  </span>
                  <p className="font-bold text-slate-800">
                    {jobSeekerPreference.min_salary ||
                    jobSeekerPreference.max_salary
                      ? `Rp ${Number(
                          jobSeekerPreference.min_salary || 0,
                        ).toLocaleString("id-ID")} - Rp ${Number(
                          jobSeekerPreference.max_salary || 0,
                        ).toLocaleString("id-ID")} / Bulan`
                      : "Tidak ditentukan"}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">
                    Status Pencarian Kerja
                  </span>
                  <p className="font-bold text-emerald-700">
                    {jobSeekerPreference.job_search_status ===
                    "actively_looking"
                      ? "Aktif mencari pekerjaan (Open to Work)"
                      : "Terbuka untuk penawaran"}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">
                    Preferensi Lokasi & Relokasi
                  </span>
                  <p className="font-bold text-slate-800">
                    {jobSeekerPreference.preferred_districts &&
                    jobSeekerPreference.preferred_districts.length > 0
                      ? jobSeekerPreference.preferred_districts
                          .map((d) => d.name)
                          .join(", ")
                      : "Seluruh wilayah"}
                    {jobSeekerPreference.willing_to_relocate &&
                      " (Siap Relokasi)"}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 italic">
                Belum ada preferensi kerja yang diatur.
              </p>
            )}
          </section>

          {/* 7. CV UTAMA & DOKUMEN PENDUKUNG */}
          <section id="documents" className="pt-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-app-navy-50 border border-app-navy-200 flex items-center justify-center text-app-navy-700">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  7. File Lampiran & Berkas Pendukung
                </h3>
              </div>
              <Link
                href="/dashboard/pencaker/dokumen"
                className="text-[10px] font-bold text-app-navy-700 hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" /> Kelola Berkas
              </Link>
            </div>

            <div className="space-y-2">
              {mainCv ? (
                <div className="flex items-center justify-between p-3 border border-emerald-200 bg-emerald-50/40 rounded-lg text-[11px]">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900">{mainCv.name}</p>
                      <p className="text-[10px] text-slate-500">
                        {mainCv.categoryLabel || "CV Utama"} • {mainCv.size}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[9px] rounded">
                    Diunggah
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 border border-amber-200 bg-amber-50/40 rounded-lg text-[11px]">
                  <div className="flex items-center gap-3">
                    <Paperclip className="w-5 h-5 text-amber-600 shrink-0" />
                    <div>
                      <p className="font-bold text-amber-900">CV Utama</p>
                      <p className="text-[10px] text-amber-700">
                        Belum ada CV utama yang diunggah.
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/dashboard/pencaker/dokumen"
                    className="px-2.5 py-1 bg-amber-600 text-white font-bold text-[10px] rounded-md hover:bg-amber-700 transition"
                  >
                    Unggah
                  </Link>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* FOOTER ACTION & PERSETUJUAN */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-sm">
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-app-navy-600 focus:ring-app-navy-500 cursor-pointer"
          />
          <span className="text-[11px] text-slate-600 leading-relaxed">
            Saya mengonfirmasi bahwa seluruh rincian di atas telah sesuai dengan
            dokumen asli saya. Saya menyetujui pemrosesan data profil ini untuk
            dipublikasikan kepada mitra rekrutmen.
          </span>
        </label>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-app-navy-600" /> Data
            dilindungi enkripsi SSL
          </div>

          <button
            type="button"
            disabled={!isAgreed}
            onClick={handleActivateProfile}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all inline-flex items-center gap-2 ${
              isAgreed
                ? "bg-app-navy-700 hover:bg-app-navy-800 text-white cursor-pointer shadow-sm"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>
              {isProfileActive
                ? "Perbarui Profil Aktif"
                : "Aktifkan Profil Pelamar"}
            </span>
          </button>
        </div>
      </div>

      {/* MODAL SUKSES */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-xl">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <Check className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">
                Profil Berhasil Dikonfirmasi
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Profil Anda telah aktif dan dapat langsung digunakan untuk
                melamar semua lowongan kerja yang tersedia.
              </p>
            </div>
            <div className="pt-2 space-y-2">
              <Link
                href="/lowongan"
                className="w-full py-2.5 bg-app-navy-700 hover:bg-app-navy-800 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <span>Mulai Melamar Lowongan</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-2 text-slate-600 hover:bg-slate-100 font-bold text-xs rounded-xl transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

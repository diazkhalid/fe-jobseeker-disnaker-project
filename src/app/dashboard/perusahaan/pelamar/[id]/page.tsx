"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
  FileText,
  Download,
  Calendar,
  Star,
  Plus,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Clock,
  Building,
  MessageSquare,
  UserCheck,
  UserX,
} from "lucide-react";
import { motion } from "framer-motion";

// Tipe Data Tahap Seleksi Kandidat
interface SelectionStageRecord {
  stage: string;
  date: string;
  notes?: string;
  updatedAt: string;
}

// Tipe Data Kandidat Detail
interface ApplicantDetail {
  id: string;
  name: string;
  avatar: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  positionApplied: string;
  appliedDate: string;
  status: string;
  statusDate: string;
  selectionHistory: SelectionStageRecord[];
  matchScore: number;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    gpa: string;
  }>;
  experience: Array<{
    role: string;
    company: string;
    period: string;
    description: string;
  }>;
  organizations: Array<{
    role: string;
    name: string;
    period: string;
  }>;
  skills: string[];
  certifications: Array<{
    name: string;
    issuer: string;
    year: string;
  }>;
  portfolios: Array<{
    title: string;
    link: string;
    type: string;
  }>;
  languages: Array<{
    name: string;
    proficiency: string;
  }>;
  documents: Array<{
    name: string;
    type: string;
    size: string;
  }>;
  customAnswers: Array<{
    question: string;
    answer: string;
  }>;
  notes: Array<{
    author: string;
    date: string;
    text: string;
  }>;
}

const DUMMY_APPLICANT: ApplicantDetail = {
  id: "APP-001",
  name: "Ahmad Rizky",
  avatar: "AR",
  title: "Senior Frontend Developer",
  email: "ahmad.rizky@example.com",
  phone: "+62 812-3456-7890",
  location: "Sumbawa, Nusa Tenggara Barat",
  summary:
    "Frontend Developer dengan pengalaman lebih dari 4 tahun dalam membangun aplikasi web modern, responsif, dan scalable menggunakan React, Next.js, serta Tailwind CSS. Terbiasa memimpin tim kecil dan berkolaborasi dengan UI/UX Designer.",
  positionApplied: "Senior Frontend Developer",
  appliedDate: "20 Mei 2026",
  status: "Interview HR",
  statusDate: "2026-05-25",
  selectionHistory: [
    {
      stage: "Administrasi",
      date: "2026-05-20",
      notes: "Berkas dan kualifikasi awal telah diverifikasi.",
      updatedAt: "20 Mei 2026",
    },
    {
      stage: "Interview HR",
      date: "2026-05-25",
      notes: "Jadwal interview via Zoom telah disepakati.",
      updatedAt: "22 Mei 2026",
    },
  ],
  matchScore: 95,
  education: [
    {
      degree: "S1 Teknik Informatika",
      institution: "Universitas Teknologi Sumbawa",
      year: "2018 - 2022",
      gpa: "IPK 3.82 / 4.00",
    },
  ],
  experience: [
    {
      role: "Frontend Developer",
      company: "PT Digital Solusi Nusantara",
      period: "2023 - Sekarang",
      description:
        "Mengembangkan dashboard analytics enterprise, mengoptimalkan performa web hingga naik 40%, dan mengimplementasikan arsitektur micro-frontend.",
    },
    {
      role: "Junior Web Developer",
      company: "Sumbawa Tech Studio",
      period: "2022 - 2023",
      description:
        "Membangun landing page dan e-commerce landing site menggunakan React dan Tailwind CSS.",
    },
  ],
  organizations: [
    {
      role: "Ketua Divisi Pemrograman",
      name: "Himpunan Mahasiswa Informatika (HMTI)",
      period: "2020 - 2021",
    },
  ],
  skills: [
    "React.js",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "REST API & GraphQL",
    "Git / GitHub",
    "Performance Optimization",
  ],
  certifications: [
    {
      name: "AWS Certified Developer - Associate",
      issuer: "Amazon Web Services",
      year: "2025",
    },
    {
      name: "Meta Front-End Developer Professional Certificate",
      issuer: "Coursera / Meta",
      year: "2024",
    },
  ],
  portfolios: [
    {
      title: "SumbawaTax Analytics Dashboard",
      link: "https://github.com/example/sumbawa-tax",
      type: "Web Application",
    },
    {
      title: "Personal Portfolio & Blog",
      link: "https://ahmadrizky.dev",
      type: "Website",
    },
  ],
  languages: [
    { name: "Bahasa Indonesia", proficiency: "Penutur Asli (Native)" },
    { name: "Bahasa Inggris", proficiency: "Tingkat Lanjut (Professional)" },
  ],
  documents: [
    {
      name: "CV_Ahmad_Rizky_2026.pdf",
      type: "Curriculum Vitae",
      size: "1.2 MB",
    },
    {
      name: "Surat_Lamaran_Ahmad_Rizky.pdf",
      type: "Surat Lamaran",
      size: "450 KB",
    },
    {
      name: "Portofolio_Frontend_Projects.pdf",
      type: "Portofolio",
      size: "5.8 MB",
    },
    {
      name: "Ijazah_S1_Teknik_Informatika.pdf",
      type: "Dokumen Pendukung",
      size: "890 KB",
    },
  ],
  customAnswers: [
    {
      question: "Berapa ekspektasi gaji Anda per bulan?",
      answer: "Rp 12.000.000 - Rp 15.000.000 (Dapat dinegosiasikan)",
    },
    {
      question:
        "Berapa lama periode pemberitahuan (notice period) Anda saat ini?",
      answer: "1 Bulan (30 hari)",
    },
    {
      question: "Apakah Anda bersedia bekerja secara Hybrid di Sumbawa?",
      answer: "Ya, saya berdomisili di Sumbawa dan sangat bersedia.",
    },
  ],
  notes: [
    {
      author: "Rina Astuti (HR Manager)",
      date: "21 Mei 2026",
      text: "Portfolio sangat solid, memiliki pengalaman yang sesuai dengan kualifikasi tim teknis kita. Direkomendasikan untuk interview.",
    },
  ],
};

export default function DetailPelamarPage() {
  const [applicant, setApplicant] = useState<ApplicantDetail>(DUMMY_APPLICANT);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<"profil" | "lamaran" | "dokumen">(
    "profil",
  );
  const [notes, setNotes] = useState(applicant.notes);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes([
      ...notes,
      {
        author: "Saya (Recruiter)",
        date: "Hari Ini",
        text: newNote,
      },
    ]);
    setNewNote("");
  };

  // Handler Tolak Pelamar
  const handleReject = () => {
    const today = new Date().toISOString().split("T")[0];
    const newRecord: SelectionStageRecord = {
      stage: "Ditolak",
      date: today,
      notes: "Kandidat ditolak.",
      updatedAt: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    setApplicant((prev) => ({
      ...prev,
      status: "Ditolak",
      statusDate: today,
      selectionHistory: [newRecord, ...prev.selectionHistory],
    }));
  };

  // Handler Terima Pelamar
  const handleAccept = () => {
    const today = new Date().toISOString().split("T")[0];
    const newRecord: SelectionStageRecord = {
      stage: "Diterima (Hired)",
      date: today,
      notes: "Kandidat diterima.",
      updatedAt: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    setApplicant((prev) => ({
      ...prev,
      status: "Diterima (Hired)",
      statusDate: today,
      selectionHistory: [newRecord, ...prev.selectionHistory],
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Diterima (Hired)":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Ditolak":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Offering Letter":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Interview HR":
      case "Interview User":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Psikotes & Skill Test":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  return (
    <div className="bg-slate-50/50 text-slate-800 text-[13px] min-h-screen">
      <div className="mx-auto space-y-4">
        {/* Top Navigation & Back Button */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard/perusahaan/pelamar"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-teal-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Daftar Pelamar
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`flex items-center gap-1 px-3 py-1.5 text-[11px] font-medium border rounded-lg transition-all ${
                isFavorite
                  ? "bg-amber-50 text-amber-700 border-amber-300"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <Star
                className={`w-3.5 h-3.5 ${
                  isFavorite
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-400"
                }`}
              />
              {isFavorite ? "Favorit" : "Tandai Favorit"}
            </button>
          </div>
        </div>

        {/* Header Profile Card */}
        <div className="bg-white rounded-xl p-4 md:p-5 border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Applicant Basic Info */}
            <div className="flex items-start md:items-center gap-3.5">
              <div className="w-14 h-14 rounded-xl bg-teal-600 text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-sm">
                {applicant.avatar}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-lg md:text-xl font-bold text-slate-900">
                    {applicant.name}
                  </h1>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border flex items-center gap-1 ${getStatusColor(
                      applicant.status,
                    )}`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    {applicant.status}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <Sparkles className="w-2.5 h-2.5" /> Skor Kecocokan{" "}
                    {applicant.matchScore}%
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-600">
                  {applicant.title}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 pt-0.5">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-slate-400" />{" "}
                    {applicant.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" />{" "}
                    {applicant.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />{" "}
                    {applicant.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons: Tolak / Terima */}
            <div className="flex items-center gap-2 flex-wrap md:flex-nowrap pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
              <button
                onClick={handleReject}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-semibold rounded-lg hover:bg-rose-100 transition-all shadow-sm"
              >
                <UserX className="w-3.5 h-3.5 text-rose-600" /> Tolak
              </button>
              <button
                onClick={handleAccept}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white text-[11px] font-semibold rounded-lg hover:bg-emerald-700 transition-all shadow-sm"
              >
                <UserCheck className="w-3.5 h-3.5" /> Terima
              </button>
              <button
                className="p-1.5 text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-all"
                title="Kirim Pesan"
              >
                <MessageSquare className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-white px-3 rounded-xl border">
          <button
            onClick={() => setActiveTab("profil")}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-all ${
              activeTab === "profil"
                ? "border-teal-600 text-teal-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Profil Karier
          </button>
          <button
            onClick={() => setActiveTab("lamaran")}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-all ${
              activeTab === "lamaran"
                ? "border-teal-600 text-teal-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Detail Lamaran & Pertanyaan
          </button>
          <button
            onClick={() => setActiveTab("dokumen")}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 transition-all ${
              activeTab === "dokumen"
                ? "border-teal-600 text-teal-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Dokumen & Berkas ({applicant.documents.length})
          </button>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Content Area (Left 2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            {/* TAB 1: PROFIL KARIER */}
            {activeTab === "profil" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {/* Ringkasan Profil */}
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Ringkasan Profil
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    {applicant.summary}
                  </p>
                </div>

                {/* Pengalaman Kerja - Timeline Mode */}
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-teal-600" />{" "}
                    Pengalaman Kerja
                  </h3>

                  <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
                    {applicant.experience.map((exp, idx) => (
                      <div key={idx} className="relative group">
                        <div className="absolute -left-[1.4rem] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <div className="w-1 h-1 rounded-full bg-teal-600"></div>
                        </div>

                        <div className="bg-slate-50/70 hover:bg-slate-50 border border-slate-100 p-3 rounded-lg transition-all space-y-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="font-semibold text-slate-900 text-[13px]">
                              {exp.role}
                            </h4>
                            <span className="text-[10px] font-medium bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5" />
                              {exp.period}
                            </span>
                          </div>
                          <p className="text-xs text-teal-600 font-medium flex items-center gap-1">
                            <Building className="w-3 h-3 text-slate-400" />
                            {exp.company}
                          </p>
                          <p className="text-slate-600 text-[12px] pt-1 leading-relaxed">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pendidikan - Timeline Mode */}
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-teal-600" />{" "}
                    Pendidikan
                  </h3>

                  <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
                    {applicant.education.map((edu, idx) => (
                      <div key={idx} className="relative group">
                        <div className="absolute -left-[1.4rem] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <div className="w-1 h-1 rounded-full bg-teal-600"></div>
                        </div>

                        <div className="bg-slate-50/70 hover:bg-slate-50 border border-slate-100 p-3 rounded-lg transition-all space-y-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="font-semibold text-slate-900 text-[13px]">
                              {edu.degree}
                            </h4>
                            <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Calendar className="w-2.5 h-2.5 text-slate-400" />
                              {edu.year}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 font-medium">
                            {edu.institution}
                          </p>
                          <span className="inline-block text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2 py-0.5 rounded mt-1">
                            {edu.gpa}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Keahlian & Bahasa */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Keahlian / Skills
                    </h3>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {applicant.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[11px] rounded-lg font-medium border border-slate-200/60"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Penguasaan Bahasa
                    </h3>
                    <div className="space-y-1.5 pt-1">
                      {applicant.languages.map((lang, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between text-[11px]"
                        >
                          <span className="font-medium text-slate-800">
                            {lang.name}
                          </span>
                          <span className="text-slate-500">
                            {lang.proficiency}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sertifikasi & Portofolio */}
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-teal-600" /> Sertifikasi
                    & Portofolio
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {applicant.certifications.map((cert, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 border border-slate-100 rounded-lg bg-slate-50/50"
                      >
                        <p className="font-semibold text-slate-800 text-[12px]">
                          {cert.name}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {cert.issuer} • {cert.year}
                        </p>
                      </div>
                    ))}
                    {applicant.portfolios.map((port, idx) => (
                      <a
                        key={idx}
                        href={port.link}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 border border-slate-100 rounded-lg bg-slate-50/50 hover:bg-teal-50/50 transition-colors block group"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-slate-800 text-[12px] group-hover:text-teal-600">
                            {port.title}
                          </p>
                          <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-teal-600" />
                        </div>
                        <p className="text-[10px] text-slate-500">
                          {port.type}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: DETAIL LAMARAN */}
            {activeTab === "lamaran" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {/* Ringkasan Status Pengajuan */}
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Informasi Pengajuan
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-[10px] text-slate-400">
                        Posisi Dilamar
                      </p>
                      <p className="font-semibold text-slate-800">
                        {applicant.positionApplied}
                      </p>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-[10px] text-slate-400">
                        Tanggal Pengajuan
                      </p>
                      <p className="font-semibold text-slate-800">
                        {applicant.appliedDate}
                      </p>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-[10px] text-slate-400">
                        Tahap & Tanggal Saat Ini
                      </p>
                      <p className="font-semibold text-teal-600">
                        {applicant.status} ({applicant.statusDate})
                      </p>
                    </div>
                  </div>
                </div>

                {/* Jawaban Pertanyaan Tambahan */}
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Jawaban Pertanyaan Kualifikasi
                  </h3>
                  <div className="space-y-3 divide-y divide-slate-100">
                    {applicant.customAnswers.map((qa, idx) => (
                      <div
                        key={idx}
                        className={`${idx > 0 ? "pt-2.5" : ""} space-y-1`}
                      >
                        <p className="font-medium text-slate-900 text-[12px]">
                          {qa.question}
                        </p>
                        <p className="text-slate-600 text-[11px] bg-slate-50 p-2 rounded border border-slate-100">
                          {qa.answer}
                        </p>
                      </div>
                    ))}
                  </div>
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
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Berkas Pendukung
                    </h3>
                    <button className="flex items-center gap-1 text-[11px] font-medium text-teal-600 hover:underline">
                      <Download className="w-3.5 h-3.5" /> Unduh Semua Berkas
                      (.zip)
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {applicant.documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="p-3 border border-slate-200/80 rounded-xl flex items-center justify-between hover:border-teal-200 bg-white transition-all shadow-sm"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="p-2 bg-teal-50 text-teal-600 rounded-lg shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="truncate">
                            <p className="font-semibold text-slate-800 truncate text-[11px]">
                              {doc.name}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              {doc.type} • {doc.size}
                            </p>
                          </div>
                        </div>
                        <button
                          className="p-1.5 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                          title="Unduh"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Sidebar Area (Timeline Tahapan, Catatan Recruiter & Quick Action) */}
          <div className="space-y-4">
            {/* Timeline Histori Tahapan Seleksi */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-teal-600" /> Histori
                  Seleksi
                </h3>
              </div>

              <div className="relative pl-5 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200 pt-1">
                {applicant.selectionHistory.map((item, idx) => (
                  <div key={idx} className="relative">
                    <div
                      className={`absolute -left-[1.05rem] top-1 w-3 h-3 rounded-full border-2 bg-white ${
                        idx === 0
                          ? "border-teal-600 bg-teal-600"
                          : "border-slate-300"
                      }`}
                    />
                    <div className="space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-800 text-[12px]">
                          {item.stage}
                        </span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                          {item.date}
                        </span>
                      </div>
                      {item.notes && (
                        <p className="text-[11px] text-slate-500 italic">
                          {`"${item.notes}"`}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick CV Download Action */}
            <div className="bg-teal-900 text-white p-4 rounded-xl shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-300" />
                <div>
                  <h4 className="font-semibold text-xs">
                    Curriculum Vitae (CV)
                  </h4>
                  <p className="text-[10px] text-teal-200">
                    Diperbarui Mei 2026
                  </p>
                </div>
              </div>
              <button className="w-full py-2 bg-white text-teal-900 font-semibold text-[11px] rounded-lg hover:bg-teal-50 transition-colors flex items-center justify-center gap-1.5 shadow">
                <Download className="w-3.5 h-3.5" /> Unduh CV Kandidat
              </button>
            </div>

            {/* Catatan Internal Recruiter */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Catatan Internal</span>
                <span className="text-[10px] text-slate-400 font-normal">
                  Hanya tim HR
                </span>
              </h3>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="space-y-2">
                <textarea
                  rows={3}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Tambahkan catatan evaluasi kandidat..."
                  className="w-full p-2.5 text-[11px] bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
                <button
                  type="submit"
                  className="w-full py-1.5 bg-slate-900 text-white font-medium text-[11px] rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Tambah Catatan
                </button>
              </form>

              {/* Note History List */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100 max-h-60 overflow-y-auto">
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

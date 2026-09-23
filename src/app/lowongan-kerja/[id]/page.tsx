"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  BadgeCheck,
  Building2,
  Clock,
  Calendar,
  Share2,
  Bookmark,
  Send,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  Copy,
  ChevronRight,
  X,
  FileText,
  Upload,
  Check,
  Flag,
  Sparkles,
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  DollarSign,
  Users,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

// --- DUMMY DATA ---
const jobDetail = {
  id: "job-101",
  title: "Senior Geologist & Mining Engineer",
  slug: "senior-geologist-mining-engineer",
  status: "Aktif",
  postedDate: "18 September 2026",
  deadlineDate: "15 Oktober 2026",
  daysLeft: 23,
  verifiedDate: "19 September 2026",
  company: {
    id: "c1",
    name: "PT AMNT (Aman Mineral Internasional)",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&auto=format&fit=crop&q=80",
    verified: true,
    industry: "Pertambangan & Energi Utama",
    foundedYear: "2016",
    employeeCount: "1,000 - 5,000 Karyawan",
    location: "Kecamatan Sekongkang, Kabupaten Sumbawa Barat, NTB",
    website: "https://www.amanmineral.com",
    activeJobsCount: 12,
    description:
      "PT Aman Mineral Nusa Tenggara (AMNT) adalah perusahaan pertambangan tembaga dan emas terkemuka di Indonesia yang mengoperasikan tambang Batu Hijau di Kabupaten Sumbawa Barat, Nusa Tenggara Barat.",
  },
  summary: {
    jobType: "Full-Time (Penuh Waktu)",
    workSystem: "WFO (Batu Hijau Site)",
    experienceLevel: "Minimal 4 - 6 Tahun",
    minEducation: "S1 Teknik Geologi / Pertambangan",
    salaryRange: "Rp 15.000.000 - Rp 25.000.000",
    vacancies: 3,
    workingHours: "Senin - Jumat (08:00 - 17:00 WITA)",
    ageLimit: "Maksimal 38 Tahun",
  },
  overview:
    "Kami sedang mencari Senior Geologist & Mining Engineer yang berpengalaman untuk bergabung dalam tim eksplorasi dan perencanaan tambang di Site Batu Hijau, Sumbawa Barat. Posisi ini bertanggung jawab atas pemetaan struktur geologi, evaluasi cadangan mineral, serta memastikan efisiensi operasi ekstraksi sesuai standar keselamatan lingkungan.",
  responsibilities: [
    "Melakukan pemetaan geologi lapangan, sampling, dan pemodelan deposit mineral 3D.",
    "Mengawasi tim pengeboran eksplorasi serta memastikan prosedur pit-control berjalan optimal.",
    "Menyusun laporan evaluasi cadangan bijih (ore reserve estimation) berkala.",
    "Bekerjasama dengan tim Keselamatan Kerja & Lingkungan Hidup (K3LH) dalam mitigasi risiko stabilitas lereng tambang.",
    "Mengoptimalkan alokasi alat berat dan urutan peledakan (blasting sequence) harian.",
  ],
  requirementsMandatory: [
    "Pendidikan minimal S1 Teknik Geologi atau Teknik Pertambangan dari universitas terakreditasi.",
    "Pengalaman kerja minimal 4 tahun di industri pertambangan terbuka (open-pit mining).",
    "Memiliki Sertifikat Pengawas Operasional Pratama (POP) aktif.",
    "Mahir mengoperasikan software geologi & tambang (Surpac, Leapfrog, Datamine, atau Micromine).",
    "Domisili atau bersedia ditempatkan secara permanen / roster di Batu Hijau, Sumbawa Barat.",
  ],
  requirementsOptional: [
    "Memiliki Sertifikat Pengawas Operasional Madya (POM) menjadi nilai tambah utama.",
    "Kemampuan bahasa Inggris tingkat bisnis (Lisan & Tulisan).",
    "Pengalaman dalam pengelolaan reklamasi lahan bekas tambang.",
  ],
  skills: [
    "Surpac / Leapfrog 3D",
    "Ore Reserve Estimation",
    "Open-Pit Mining",
    "Geological Mapping",
    "Sertifikasi POP",
    "K3 Pertambangan",
    "Bahasa Inggris Teknis",
  ],
  benefits: [
    {
      title: "Gaji & Insentif",
      desc: "Gaji kompetitif + Bonus Kinerja Tahunan",
    },
    {
      title: "Kesehatan Penuh",
      desc: "BPJS Kesehatan, Ketenagakerjaan & Asuransi Swasta Swakelola (Tertanggung Keluarga)",
    },
    {
      title: "Akomodasi & Transport",
      desc: "Fasilitas Mess Camp Eksekutif, Makan 3x sehari & Tiket Roster Penerbangan",
    },
    {
      title: "Pengembangan Diri",
      desc: "Pelatihan Sertifikasi Internasional & Program Kepemimpinan",
    },
  ],
  locationDetails: {
    address: "Area Tambang Batu Hijau, Desa Benete, Kec. Sekongkang",
    regency: "Kabupaten Sumbawa Barat",
    province: "Nusa Tenggara Barat (NTB)",
    landmark: "Dekat Pelabuhan Benete / Mess Camp AMNT",
    googleMapsUrl: "https://maps.google.com",
  },
  recruitmentProcess: [
    {
      step: "01",
      title: "Seleksi Berkas / Administrasi",
      duration: "1-3 Hari",
    },
    { step: "02", title: "Tes Psikotes & Asesmen Teknis", duration: "2 Hari" },
    { step: "03", title: "Wawancara HR & User Teknik", duration: "1 Minggu" },
    { step: "04", title: "Pemeriksaan Kesehatan (MCU)", duration: "3 Hari" },
    { step: "05", title: "Offering Letter & Onboarding", duration: "1 Minggu" },
  ],
  documents: [
    { name: "Curriculum Vitae (CV) / Resume Terbaru", mandatory: true },
    { name: "Surat Lamaran Kerja (Cover Letter)", mandatory: true },
    { name: "KTP Sumbawa / Sumbawa Barat (atau Luar Daerah)", mandatory: true },
    { name: "Ijazah & Transkrip Nilai Terakhir", mandatory: true },
    { name: "Sertifikat POP / Keahlian Tambang", mandatory: true },
    { name: "Portofolio Proyek / Laporan Lapangan", mandatory: false },
    { name: "SKCK Aktif", mandatory: false },
  ],
  relatedJobs: [
    {
      id: "j2",
      title: "HSE Specialist (K3LH)",
      company: "PT AMNT",
      location: "Sumbawa Barat",
      salary: "Rp 12.000.000 - Rp 18.000.000",
    },
    {
      id: "j3",
      title: "Dokter Spesialis Okupasi Site",
      company: "RSUD Kabupaten Sumbawa",
      location: "Sumbawa",
      salary: "Rp 18.000.000 - Rp 28.000.000",
    },
    {
      id: "j4",
      title: "Senior Heavy Equipment Mechanic",
      company: "PT Macmahon Indonesia",
      location: "Sumbawa Barat",
      salary: "Rp 10.000.000 - Rp 16.000.000",
    },
  ],
};

const navSections = [
  { id: "ikhtisar", label: "Ikhtisar" },
  { id: "deskripsi", label: "Deskripsi & Tugas" },
  { id: "persyaratan", label: "Persyaratan" },
  { id: "kompensasi", label: "Gaji & Benefit" },
  { id: "lokasi-proses", label: "Lokasi & Proses" },
];

export default function JobDetailPageEditorial() {
  const params = useParams();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState("ikhtisar");

  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: "Cek informasi karir menarik ini!",
      url: window.location.href,
    };

    // Menggunakan Web Share API jika didukung oleh browser/perangkat
    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare(shareData)
    ) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // Abaikan jika user membatalkan pendaftaran/sharing
        if ((error as Error).name !== "AbortError") {
          console.error("Gagal membagikan:", error);
        }
      }
    } else {
      // Fallback ke salin tautan jika Web Share API tidak didukung
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Gagal menyalin tautan:", err);
      }
    }
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    domicile: "",
    cvFile: null as File | null,
    coverLetter: "",
    portfolioUrl: "",
    agreement: false,
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased pt-20 pb-28">
      {/* HEADER UTAMA BERSAMBUNG (ARTICLE STYLE) */}
      <header className="border-b border-slate-200 bg-slate-50/50 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-6 tracking-wide uppercase">
            <Link
              href="/"
              className="hover:text-app-navy-700 transition-colors"
            >
              Beranda
            </Link>
            <span>/</span>
            <Link
              href="/lowongan"
              className="hover:text-app-navy-700 transition-colors"
            >
              Lowongan
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate max-w-xs">
              {jobDetail.company.name}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-teal-700 text-white rounded-full">
                  {jobDetail.status}
                </span>
                <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  Batas Pendaftaran: {jobDetail.deadlineDate} (
                  {jobDetail.daysLeft} hari lagi)
                </span>
                <span className="text-[11px] text-teal-600 font-medium flex items-center gap-1">
                  <ShieldCheck className="text-white w-3.5 h-3.5 fill-teal-500" />{" "}
                  Terverifikasi
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                {jobDetail.title}
              </h1>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-600">
                <Link
                  href={`/perusahaan/${jobDetail.company.id}`}
                  className="font-bold text-slate-900 hover:text-app-navy-700 flex items-center gap-1.5"
                >
                  <Building2 className="w-4 h-4 text-slate-400" />
                  {jobDetail.company.name}
                  {jobDetail.company.verified && (
                    <BadgeCheck className="w-3.5 h-3.5 text-app-navy-600 inline" />
                  )}
                </Link>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {jobDetail.company.location}
                </span>
              </div>
            </div>

            {/* Quick Action Bar Header */}
            <div className="flex items-center gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-200">
              <button
                onClick={() => {
                  router.push(`${params.id}/lamar-kerja`);
                }}
                className="px-6 py-3 bg-app-navy-700 hover:bg-app-navy-800 text-white font-bold text-xs tracking-wide rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                Lamar Posisi Ini
              </button>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-3 rounded-lg border text-xs transition-colors ${
                  isSaved
                    ? "bg-amber-50 border-amber-300 text-amber-800"
                    : "border-slate-300 text-slate-700 hover:bg-slate-100"
                }`}
                title="Simpan Lowongan"
              >
                <Bookmark
                  className={`w-4 h-4 ${isSaved ? "fill-amber-600" : ""}`}
                />
              </button>
              <button
                onClick={handleShare}
                className="p-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
                title="Bagikan Tautan"
                aria-label="Bagikan Tautan"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* STICKY SECTION NAVIGATOR */}
      <nav className="sticky top-20 z-30 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-8 overflow-x-auto no-scrollbar">
          {navSections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={`py-3.5 text-xs font-bold tracking-wide border-b-2 whitespace-nowrap transition-colors ${
                activeTab === sec.id
                  ? "border-app-navy-700 text-app-navy-800"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </nav>

      {/* MAIN LAYOUT CONTINUOUS CONTENT */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* KOLOM KIRI (CONTENT STREAM) - 8 COL */}
          <div className="lg:col-span-8 space-y-12">
            {/* 1. IKHTISAR & HIGHLIGHTS */}
            <section
              id="ikhtisar"
              className="scroll-mt-36 space-y-6 border-b border-b-slate-200 pb-10"
            >
              <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                01. Ringkasan Kunci
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4 py-4 border-y border-slate-100">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Estimasi Gaji
                  </span>
                  <p className="text-xs font-extrabold text-app-navy-800">
                    {jobDetail.summary.salaryRange}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Tipe Pekerjaan
                  </span>
                  <p className="text-xs font-bold text-slate-800">
                    {jobDetail.summary.jobType}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Pengalaman
                  </span>
                  <p className="text-xs font-bold text-slate-800">
                    {jobDetail.summary.experienceLevel}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Pendidikan
                  </span>
                  <p className="text-xs font-bold text-slate-800">
                    {jobDetail.summary.minEducation}
                  </p>
                </div>
              </div>

              {/* Minimalist Overview Paragraph */}
              <div className="prose prose-slate prose-sm leading-relaxed text-slate-700">
                <p className="text-sm sm:text-base font-normal leading-relaxed">
                  {jobDetail.overview}
                </p>
              </div>
            </section>

            {/* 2. DESKRIPSI & TUGAS */}
            <section
              id="deskripsi"
              className="scroll-mt-44 space-y-6 border-b border-b-slate-200 pb-10"
            >
              <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                02. Tanggung Jawab & Tugas Operasional
              </h2>

              <ul className="space-y-4">
                {jobDetail.responsibilities.map((task, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-4 text-xs text-slate-700 leading-relaxed"
                  >
                    <span className="font-mono text-slate-400 text-[11px] pt-0.5 shrink-0">
                      0{idx + 1}.
                    </span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 3. PERSYARATAN & KEAHLIAN */}
            <section
              id="persyaratan"
              className="scroll-mt-44 space-y-8 border-b border-b-slate-200 pb-10"
            >
              <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                03. Kualifikasi & Keahlian
              </h2>

              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wide text-slate-900 border-l-2 border-rose-500 pl-3">
                  Kualifikasi Wajib
                </h3>
                <ul className="space-y-3 pl-3">
                  {jobDetail.requirementsMandatory.map((req, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-xs text-slate-700 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-app-navy-700 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wide text-slate-900 border-l-2 border-amber-400 pl-3">
                  Nilai Tambah (Opsional)
                </h3>
                <ul className="space-y-3 pl-3">
                  {jobDetail.requirementsOptional.map((req, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-xs text-slate-600 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills Minimal Badge Row */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-3">
                  Kompetensi Teknis:
                </span>
                <div className="flex flex-wrap gap-2">
                  {jobDetail.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-slate-100 text-slate-700 text-[11px] font-medium rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* 4. GAJI & BENEFIT */}
            <section
              id="kompensasi"
              className="scroll-mt-44 space-y-6 border-b border-b-slate-200 pb-10"
            >
              <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                04. Paket Kompensasi & Fasilitas
              </h2>

              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase block">
                    Penawaran Gaji Pokok
                  </span>
                  <span className="text-xl font-black text-slate-900">
                    {jobDetail.summary.salaryRange}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 italic">
                  *Negosiasi terbuka sesuai pengalaman saat tahap wawancara
                  user.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {jobDetail.benefits.map((benefit, idx) => (
                  <div key={idx} className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-app-navy-700" />
                      {benefit.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 pl-5 leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. LOKASI, BERKAS & PROSES */}
            <section id="lokasi-proses" className="scroll-mt-44 space-y-10">
              <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                05. Lokasi, Berkas & Proses Rekrutmen
              </h2>

              {/* Lokasi */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900">
                  Lokasi Kerja
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {jobDetail.locationDetails.address},{" "}
                  {jobDetail.locationDetails.regency},{" "}
                  {jobDetail.locationDetails.province}
                </p>
                <div className="pt-1">
                  <a
                    href={jobDetail.locationDetails.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-app-navy-700 hover:text-app-navy-900 underline underline-offset-4"
                  >
                    Buka Petunjuk Arah di Google Maps
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Timetable Rekrutmen */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-900">
                  Tahapan Seleksi
                </h3>
                <div className="border-l border-slate-200 pl-4 ml-2 space-y-6">
                  {jobDetail.recruitmentProcess.map((step) => (
                    <div key={step.step} className="relative space-y-1">
                      <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-app-navy-700 ring-4 ring-white" />
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-800">
                          {step.step}. {step.title}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-400">
                          {step.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Berkas Wajib */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-900">
                  Dokumen yang Diperlukan
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {jobDetail.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="py-2 px-3 border-b border-slate-100 flex items-center justify-between"
                    >
                      <span className="text-slate-700 text-[11px] truncate">
                        {doc.name}
                      </span>
                      <span
                        className={`text-[9px] font-mono uppercase ${doc.mandatory ? "text-rose-600 font-bold" : "text-slate-400"}`}
                      >
                        {doc.mandatory ? "Wajib" : "Opsional"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Warning */}
              <div className="p-4 bg-amber-50 border-l-2 border-amber-500 text-[11px] text-amber-900 space-y-1">
                <p className="font-bold">Peringatan Bebas Biaya</p>
                <p className="text-amber-800">
                  Proses seleksi ini tidak memungut biaya apapun. Hati-hati
                  terhadap penipuan yang mengatasnamakan{" "}
                  {jobDetail.company.name}.
                </p>
              </div>
            </section>
          </div>

          {/* KOLOM KANAN (EDITORIAL SIDEBAR) - 4 COL */}
          <aside className="lg:col-span-4 space-y-10">
            {/* STICKY CTA SIDEBAR */}
            <div className="sticky top-36 space-y-8 lg:border-l lg:border-slate-200 lg:pl-8">
              {/* Quick Apply Box */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Batas Akhir
                  </span>
                  <p className="text-sm font-bold text-slate-900">
                    {jobDetail.deadlineDate}
                  </p>
                  <p className="text-[11px] text-rose-600 font-medium">
                    Sisa {jobDetail.daysLeft} hari lagi
                  </p>
                </div>

                <button
                  onClick={() => {
                    router.push(`${params.id}/lamar-kerja`);
                  }}
                  className="w-full py-3 bg-app-navy-700 hover:bg-app-navy-800 text-white font-bold text-xs tracking-wide rounded shadow-sm transition-all text-center block"
                >
                  Lamar Sekarang
                </button>

                <div className="pt-2">
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className="w-full py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded transition-colors flex items-center justify-center gap-2"
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${isSaved ? "fill-amber-600 text-amber-600" : ""}`}
                    />
                    <span>{isSaved ? "Tersimpan" : "Simpan Lowongan"}</span>
                  </button>
                </div>
              </div>

              {/* About Company Minimal Sidebar */}
              <div className="space-y-3 pt-6 border-t border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Tentang Perusahaan
                </span>
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-slate-900">
                    {jobDetail.company.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-4">
                    {jobDetail.company.description}
                  </p>
                </div>

                <div className="space-y-1 text-[11px] text-slate-600 pt-2">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">Industri:</span>
                    <span className="font-medium">
                      {jobDetail.company.industry}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-400">Karyawan:</span>
                    <span className="font-medium">
                      {jobDetail.company.employeeCount}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/perusahaan/${jobDetail.company.id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-app-navy-700 hover:underline pt-2"
                >
                  <span>Profil Selengkapnya</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Related Jobs Minimal List */}
              <div className="space-y-4 pt-6 border-t border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Lowongan Lainnya
                </span>
                <div className="space-y-4">
                  {jobDetail.relatedJobs.map((item) => (
                    <Link
                      key={item.id}
                      href={`/lowongan/${item.id}`}
                      className="block group space-y-1"
                    >
                      <h4 className="text-xs font-bold text-slate-800 group-hover:text-app-navy-700 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        {item.company} • {item.salary}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

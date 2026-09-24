/* eslint-disable react-hooks/purity */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Send,
  Eye,
  Plus,
  Trash2,
  CheckCircle2,
  Briefcase,
  Building,
  MapPin,
  Clock,
  DollarSign,
  FileText,
  UserCheck,
  HelpCircle,
  AlertCircle,
  X,
} from "lucide-react";

// Types
interface CustomQuestion {
  id: string;
  question: string;
  required: boolean;
}

export default function CreateJobPage() {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState({
    // A. Informasi Dasar
    positionTitle: "",
    jobCode: `JOB-${Math.floor(1000 + Math.random() * 9000)}`,
    department: "",
    companyName: "PT Sumbawa Digital Karya",
    location: "",
    quota: "1",
    urgency: "Normal",

    // B. Kategori Pekerjaan
    category: "",
    subCategory: "",
    employmentType: "Full-Time",
    workSystem: "On-site",

    // C. Deskripsi Pekerjaan
    summary: "",
    description: "",
    responsibilities: "",
    jobTargets: "",
    teamStructure: "",

    // D. Kualifikasi
    minEducation: "S1 / D4",
    major: "",
    minExperience: "1-3 Tahun",
    ageRange: "",
    gender: "Semua",
    requiredSkills: [] as string[],
    skillInput: "",
    niceToHaveSkills: [] as string[],
    niceSkillInput: "",
    certifications: "",
    languages: "Bahasa Indonesia, Bahasa Inggris",

    // E. Kompensasi & Fasilitas
    minSalary: "",
    maxSalary: "",
    showSalaryPublicly: true,
    benefits: {
      healthInsurance: false,
      transportation: false,
      meals: false,
      training: false,
      incentives: false,
    },
    otherBenefits: "",

    // F. Informasi Pendaftaran
    deadline: "",
    selectionMethod: "Seleksi Berkas & Wawancara",
    requiredDocuments: [
      "Curriculum Vitae (CV)",
      "Portofolio / Hasil Karya",
      "Ijazah & Transkrip Nilai",
    ],
    docInput: "",
    recruitmentContact: "hrd@sumbawadigital.com",
    candidateNotes: "",
  });

  // Questions State
  const [customQuestions, setCustomQuestions] = useState<CustomQuestion[]>([]);
  const [newQuestionText, setNewQuestionText] = useState("");

  // Handlers untuk Array Input (Skills & Docs)
  const handleAddSkill = (type: "required" | "nice") => {
    if (type === "required" && formData.skillInput.trim()) {
      if (!formData.requiredSkills.includes(formData.skillInput.trim())) {
        setFormData({
          ...formData,
          requiredSkills: [
            ...formData.requiredSkills,
            formData.skillInput.trim(),
          ],
          skillInput: "",
        });
      }
    } else if (type === "nice" && formData.niceSkillInput.trim()) {
      if (!formData.niceToHaveSkills.includes(formData.niceSkillInput.trim())) {
        setFormData({
          ...formData,
          niceToHaveSkills: [
            ...formData.niceToHaveSkills,
            formData.niceSkillInput.trim(),
          ],
          niceSkillInput: "",
        });
      }
    }
  };

  const handleRemoveSkill = (skill: string, type: "required" | "nice") => {
    if (type === "required") {
      setFormData({
        ...formData,
        requiredSkills: formData.requiredSkills.filter((s) => s !== skill),
      });
    } else {
      setFormData({
        ...formData,
        niceToHaveSkills: formData.niceToHaveSkills.filter((s) => s !== skill),
      });
    }
  };

  const handleAddDocument = () => {
    if (formData.docInput.trim()) {
      setFormData({
        ...formData,
        requiredDocuments: [
          ...formData.requiredDocuments,
          formData.docInput.trim(),
        ],
        docInput: "",
      });
    }
  };

  const handleRemoveDocument = (doc: string) => {
    setFormData({
      ...formData,
      requiredDocuments: formData.requiredDocuments.filter((d) => d !== doc),
    });
  };

  const handleAddQuestion = () => {
    if (newQuestionText.trim()) {
      setCustomQuestions([
        ...customQuestions,
        {
          id: Date.now().toString(),
          question: newQuestionText.trim(),
          required: true,
        },
      ]);
      setNewQuestionText("");
    }
  };

  const handleRemoveQuestion = (id: string) => {
    setCustomQuestions(customQuestions.filter((q) => q.id !== id));
  };

  // Step Navigation
  const steps = [
    { id: 1, name: "Informasi Dasar" },
    { id: 2, name: "Kategori & Sistem" },
    { id: 3, name: "Deskripsi Pekerjaan" },
    { id: 4, name: "Kualifikasi" },
    { id: 5, name: "Kompensasi & Fasilitas" },
    { id: 6, name: "Informasi Pendaftaran" },
  ];

  const handleSubmit = (
    statusAction: "Draft" | "Verifikasi" | "Publikasikan",
  ) => {
    alert(
      `Lowongan "${formData.positionTitle || "Tanpa Judul"}" berhasil disimpan dengan status: ${statusAction}`,
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/perusahaan/lowongan"
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900">
              Buat Lowongan Pekerjaan Baru
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Lengkapi informasi lowongan untuk menarik talenta terbaik.
            </p>
          </div>
        </div>

        {/* Quick Action Buttons Header */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
          >
            <Eye className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Preview</span>
          </button>
          <button
            type="button"
            onClick={() => handleSubmit("Draft")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
          >
            <Save className="w-4 h-4 text-slate-500" />
            <span>Simpan Draft</span>
          </button>
          <button
            type="button"
            onClick={() => handleSubmit("Publikasikan")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors shadow-xs shadow-teal-600/20"
          >
            <Send className="w-4 h-4" />
            <span>Publikasikan</span>
          </button>
        </div>
      </div>

      {/* STEPPER TABS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2 shadow-xs overflow-x-auto">
        <div className="flex items-center min-w-max">
          {steps.map((step) => {
            const isActive = activeTab === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveTab(step.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-teal-50 text-teal-700 border border-teal-200/80 shadow-xs"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[0.65rem] ${
                    isActive
                      ? "bg-teal-600 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {step.id}
                </span>
                <span>{step.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FORM CONTENT CONTAINER */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
        {/* ==================== A. INFORMASI DASAR ==================== */}
        {activeTab === 1 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-teal-600" />
                A. Informasi Dasar Lowongan
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Informasi utama mengenai posisi pekerjaan yang akan dibuka.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Judul Posisi */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Judul Posisi <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Senior Frontend Developer (React/Next.js)"
                  value={formData.positionTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, positionTitle: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Kode Lowongan */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kode Lowongan (Otomatis)
                </label>
                <input
                  type="text"
                  readOnly
                  value={formData.jobCode}
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-500 font-mono"
                />
              </div>

              {/* Departemen */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Departemen / Divisi <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Teknologi Informasi / Rekayasa Perangkat Lunak"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Nama Perusahaan */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Perusahaan
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Lokasi Penempatan */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Lokasi Penempatan <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Sumbawa Besar, NTB"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Jumlah Kebutuhan Tenaga Kerja */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jumlah Kebutuhan (Orang){" "}
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.quota}
                  onChange={(e) =>
                    setFormData({ ...formData, quota: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Status Urgensi */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Status Urgensi Lowongan
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) =>
                    setFormData({ ...formData, urgency: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                >
                  <option value="Normal">Normal</option>
                  <option value="Butuh Cepat (Mendesak)">
                    Butuh Cepat (Mendesak)
                  </option>
                  <option value="Tersedia Kapan Saja">
                    Tersedia Kapan Saja
                  </option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ==================== B. KATEGORI PEKERJAAN ==================== */}
        {activeTab === 2 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <Building className="w-4 h-4 text-teal-600" />
                B. Kategori & Sistem Kerja
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Kategorisasi pekerjaan untuk memudahkan pencarian oleh pelamar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Kategori Pekerjaan */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kategori Utama <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                >
                  <option value="">-- Pilih Kategori --</option>
                  <option value="Teknologi Informasi & Software">
                    Teknologi Informasi & Software
                  </option>
                  <option value="Desain & Kreatif">Desain & Kreatif</option>
                  <option value="Pemasaran & Penjualan">
                    Pemasaran & Penjualan
                  </option>
                  <option value="Keuangan & Akuntansi">
                    Keuangan & Akuntansi
                  </option>
                  <option value="Sumber Daya Manusia (HR)">
                    Sumber Daya Manusia (HR)
                  </option>
                  <option value="Operasional & Administrasi">
                    Operasional & Administrasi
                  </option>
                </select>
              </div>

              {/* Subkategori */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Subkategori
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Web Development / UI UX Design"
                  value={formData.subCategory}
                  onChange={(e) =>
                    setFormData({ ...formData, subCategory: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Jenis Pekerjaan */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Jenis Pekerjaan <span className="text-rose-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Full-Time",
                    "Part-Time",
                    "Kontrak",
                    "Magang",
                    "Freelance",
                  ].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() =>
                        setFormData({ ...formData, employmentType: type })
                      }
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        formData.employmentType === type
                          ? "bg-teal-600 text-white border-teal-600 shadow-xs"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sistem Kerja */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Sistem Kerja <span className="text-rose-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {["On-site", "Hybrid", "Remote"].map((sys) => (
                    <button
                      type="button"
                      key={sys}
                      onClick={() =>
                        setFormData({ ...formData, workSystem: sys })
                      }
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        formData.workSystem === sys
                          ? "bg-teal-600 text-white border-teal-600 shadow-xs"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {sys}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== C. DESKRIPSI PEKERJAAN ==================== */}
        {activeTab === 3 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-600" />
                C. Deskripsi & Rincian Pekerjaan
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Jelaskan ekspektasi, peran, dan gambaran tugas pekerjaan ini.
              </p>
            </div>

            <div className="space-y-4">
              {/* Ringkasan Posisi */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ringkasan Posisi (Singkat){" "}
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ringkasan 1-2 kalimat gambaran umum posisi ini..."
                  value={formData.summary}
                  onChange={(e) =>
                    setFormData({ ...formData, summary: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Deskripsi Pekerjaan */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Deskripsi Lengkap Pekerjaan{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Tuliskan latar belakang posisi, tantangan utama, dan ruang lingkup pekerjaan..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Tanggung Jawab Utama */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tanggung Jawab Utama <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Gunakan tanda (-) atau poin-poin untuk tanggung jawab harian..."
                  value={formData.responsibilities}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      responsibilities: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors font-mono text-[0.75rem]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Target Pekerjaan */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target / Key Performance Indicators (KPI)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Contoh: Mengembangkan 3 fitur baru per bulan..."
                    value={formData.jobTargets}
                    onChange={(e) =>
                      setFormData({ ...formData, jobTargets: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Struktur Tim */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Struktur Tim & Pelaporan
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Contoh: Lapor langsung ke Lead Developer, bekerja sama dengan 2 Designer..."
                    value={formData.teamStructure}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        teamStructure: e.target.value,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== D. KUALIFIKASI ==================== */}
        {activeTab === 4 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-teal-600" />
                D. Kualifikasi & Persyaratan Candidate
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Tentukan kriteria utama calon pelamar yang sesuai dengan posisi
                ini.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pendidikan Minimum */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pendidikan Minimum <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.minEducation}
                  onChange={(e) =>
                    setFormData({ ...formData, minEducation: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                >
                  <option value="SMA / SMK">SMA / SMK / Sederajat</option>
                  <option value="Diploma (D3)">Diploma (D3)</option>
                  <option value="S1 / D4">Sarjana (S1) / D4</option>
                  <option value="Magister (S2)">Magister (S2)</option>
                  <option value="Doktor (S3)">Doktor (S3)</option>
                  <option value="Tanpa Batasan">Tanpa Batasan Minimal</option>
                </select>
              </div>

              {/* Jurusan / Bidang Studi */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jurusan / Bidang Studi (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Teknik Informatika, Sistem Informasi"
                  value={formData.major}
                  onChange={(e) =>
                    setFormData({ ...formData, major: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Pengalaman Minimum */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pengalaman Minimum <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.minExperience}
                  onChange={(e) =>
                    setFormData({ ...formData, minExperience: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                >
                  <option value="Fresh Graduate">Fresh Graduate Allowed</option>
                  <option value="< 1 Tahun">Kurang dari 1 Tahun</option>
                  <option value="1-3 Tahun">1 - 3 Tahun</option>
                  <option value="3-5 Tahun">3 - 5 Tahun</option>
                  <option value="> 5 Tahun">Lebih dari 5 Tahun</option>
                </select>
              </div>

              {/* Rentang Usia */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Rentang Usia (Jika Relevan)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 21 - 35 Tahun"
                  value={formData.ageRange}
                  onChange={(e) =>
                    setFormData({ ...formData, ageRange: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Jenis Kelamin */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jenis Kelamin
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                >
                  <option value="Semua">Semua (Pria / Wanita)</option>
                  <option value="Pria">Pria Saja</option>
                  <option value="Wanita">Wanita Saja</option>
                </select>
              </div>

              {/* Bahasa */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Bahasa yang Diperlukan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Bahasa Indonesia, Bahasa Inggris"
                  value={formData.languages}
                  onChange={(e) =>
                    setFormData({ ...formData, languages: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Keahlian Wajib (Tags) */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Keahlian Wajib (Hard / Soft Skills)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Ketik skill & tekan Tambah (Contoh: React, Tailwind, Next.js)"
                    value={formData.skillInput}
                    onChange={(e) =>
                      setFormData({ ...formData, skillInput: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSkill("required");
                      }
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSkill("required")}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs rounded-xl transition-colors shrink-0"
                  >
                    Tambah
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 min-h-[36px] p-2 bg-slate-50 border border-slate-200 rounded-xl">
                  {formData.requiredSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-lg text-[0.7rem] font-medium shadow-2xs"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill, "required")}
                        className="text-slate-400 hover:text-rose-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {formData.requiredSkills.length === 0 && (
                    <span className="text-[0.7rem] text-slate-400 self-center italic">
                      Belum ada keahlian wajib ditambahkan.
                    </span>
                  )}
                </div>
              </div>

              {/* Keahlian Tambahan (Nice to have) */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Keahlian Tambahan (Nilai Plus)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Ketik skill tambahan (Contoh: Docker, Figma, GraphQL)"
                    value={formData.niceSkillInput}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        niceSkillInput: e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSkill("nice");
                      }
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSkill("nice")}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs rounded-xl transition-colors shrink-0"
                  >
                    Tambah
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 min-h-[36px] p-2 bg-slate-50 border border-slate-200 rounded-xl">
                  {formData.niceToHaveSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-lg text-[0.7rem] font-medium shadow-2xs"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill, "nice")}
                        className="text-slate-400 hover:text-rose-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {formData.niceToHaveSkills.length === 0 && (
                    <span className="text-[0.7rem] text-slate-400 self-center italic">
                      Belum ada keahlian tambahan ditambahkan.
                    </span>
                  )}
                </div>
              </div>

              {/* Sertifikasi */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Sertifikasi yang Diharapkan / Diutamakan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: AWS Certified, Google UX Design Professional"
                  value={formData.certifications}
                  onChange={(e) =>
                    setFormData({ ...formData, certifications: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* ==================== E. KOMPENSASI DAN FASILITAS ==================== */}
        {activeTab === 5 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-teal-600" />
                E. Kompensasi & Fasilitas
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Gaji, tunjangan, serta keuntungan lain bagi pekerja yang
                diterima.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Rentang Gaji */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gaji Minimum (Rp) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 4.000.000"
                  value={formData.minSalary}
                  onChange={(e) =>
                    setFormData({ ...formData, minSalary: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gaji Maksimum (Rp) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 7.000.000"
                  value={formData.maxSalary}
                  onChange={(e) =>
                    setFormData({ ...formData, maxSalary: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Toggle Tampilkan Gaji Publik */}
              <div className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    Tampilkan Informasi Gaji Secara Publik?
                  </h4>
                  <p className="text-[0.7rem] text-slate-500 mt-0.5">
                    Jika dinonaktifkan, gaji akan ditampilkan sebagai &quot;Gaji
                    Dirahasiakan / Kompetitif&quot;.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      showSalaryPublicly: !formData.showSalaryPublicly,
                    })
                  }
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    formData.showSalaryPublicly ? "bg-teal-600" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      formData.showSalaryPublicly
                        ? "translate-x-5"
                        : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Checkbox Benefit */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Fasilitas & Tunjangan Tambahan
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                  {[
                    {
                      key: "healthInsurance",
                      label: "BPJS / Asuransi Kesehatan",
                    },
                    { key: "transportation", label: "Tunjangan Transportasi" },
                    { key: "meals", label: "Uang Makan / Catering" },
                    { key: "training", label: "Pelatihan & Sertifikasi" },
                    { key: "incentives", label: "Bonus & Insentif Kinerja" },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className="flex items-center gap-2 cursor-pointer bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 hover:bg-slate-100/80 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={
                          formData.benefits[
                            item.key as keyof typeof formData.benefits
                          ]
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            benefits: {
                              ...formData.benefits,
                              [item.key]: e.target.checked,
                            },
                          })
                        }
                        className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 w-4 h-4"
                      />
                      <span className="text-xs text-slate-700 font-medium">
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Fasilitas Lainnya */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Fasilitas Lainnya (Opsional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Laptop kerja, parkir gratis, snack harian, dll."
                  value={formData.otherBenefits}
                  onChange={(e) =>
                    setFormData({ ...formData, otherBenefits: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* ==================== F. INFORMASI PENDAFTARAN ==================== */}
        {activeTab === 6 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-600" />
                F. Informasi & Alur Pendaftaran
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Atur jadwal batas pendaftaran, persyaratan berkas, serta
                pertanyaan khusus.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Batas Akhir Pendaftaran */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Batas Akhir Pendaftaran{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) =>
                    setFormData({ ...formData, deadline: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Kontak Rekrutmen */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kontak Rekrutmen / Email Person in Charge (PIC)
                </label>
                <input
                  type="email"
                  value={formData.recruitmentContact}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      recruitmentContact: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Dokumen yang Diperlukan */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Dokumen yang Diperlukan
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Contoh: Sertifikat Keahlian / Surat Pengalaman Kerja"
                    value={formData.docInput}
                    onChange={(e) =>
                      setFormData({ ...formData, docInput: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddDocument();
                      }
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={handleAddDocument}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs rounded-xl transition-colors shrink-0"
                  >
                    Tambah Dokumen
                  </button>
                </div>

                <div className="space-y-1.5">
                  {formData.requiredDocuments.map((doc) => (
                    <div
                      key={doc}
                      className="flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700"
                    >
                      <span>{doc}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDocument(doc)}
                        className="text-slate-400 hover:text-rose-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pertanyaan Tambahan untuk Kandidat */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pertanyaan Tambahan untuk Kandidat (Screening Questions)
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Contoh: Berapa ekspektasi gaji Anda? / Berapa lama notice period Anda?"
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs rounded-xl transition-colors shrink-0 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {customQuestions.map((q, idx) => (
                    <div
                      key={q.id}
                      className="flex items-center justify-between p-3 bg-teal-50/50 border border-teal-200/60 rounded-xl text-xs text-slate-800"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-teal-700">
                          Q{idx + 1}.
                        </span>
                        <span>{q.question}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(q.id)}
                        className="text-slate-400 hover:text-rose-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  {customQuestions.length === 0 && (
                    <p className="text-[0.7rem] text-slate-400 italic">
                      Belum ada pertanyaan kustom ditambahkan.
                    </p>
                  )}
                </div>
              </div>

              {/* Catatan untuk Pelamar */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Catatan Tambahan untuk Pelamar
                </label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Hanya kandidat yang memenuhi syarat yang akan diproses..."
                  value={formData.candidateNotes}
                  onChange={(e) =>
                    setFormData({ ...formData, candidateNotes: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM NAVIGATION STEPPER BUTTONS */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setActiveTab((prev) => Math.max(prev - 1, 1))}
            disabled={activeTab === 1}
            className="px-4 py-2 border border-slate-200 rounded-xl bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold transition-colors"
          >
            Kembali
          </button>

          {activeTab < steps.length ? (
            <button
              type="button"
              onClick={() =>
                setActiveTab((prev) => Math.min(prev + 1, steps.length))
              }
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Lanjutkan
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleSubmit("Publikasikan")}
              className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs shadow-teal-600/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publikasikan Sekarang</span>
            </button>
          )}
        </div>
      </div>

      {/* MODAL PREVIEW LOWONGAN */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-5 border border-slate-200 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200/80 text-[0.65rem] font-bold">
                  PREVIEW TAMPILAN
                </span>
                <h3 className="text-sm font-bold text-slate-800">
                  Pratinjau Halaman Detail Lowongan
                </h3>
              </div>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preview Card */}
            <div className="space-y-4 text-xs text-slate-700">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-slate-900">
                  {formData.positionTitle || "Nama Posisi Pekerjaan"}
                </h2>
                <p className="text-xs font-semibold text-teal-600">
                  {formData.companyName}
                </p>
                <div className="flex flex-wrap gap-2 text-[0.7rem] text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {formData.location || "Lokasi Penempatan"}
                  </span>
                  <span>•</span>
                  <span>{formData.employmentType}</span>
                  <span>•</span>
                  <span>{formData.workSystem}</span>
                </div>
              </div>

              {/* Salary Badge */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[0.65rem] text-slate-400 uppercase font-bold">
                  Estimasi Gaji
                </span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  {formData.showSalaryPublicly
                    ? `Rp ${formData.minSalary || "0"} - Rp ${
                        formData.maxSalary || "0"
                      } / Bulan`
                    : "Gaji Dirahasiakan / Kompetitif"}
                </p>
              </div>

              {/* Ringkasan */}
              <div>
                <h4 className="font-bold text-slate-900 mb-1">
                  Ringkasan Posisi
                </h4>
                <p className="text-slate-600">
                  {formData.summary || "Belum ada ringkasan posisi."}
                </p>
              </div>

              {/* Deskripsi */}
              <div>
                <h4 className="font-bold text-slate-900 mb-1">
                  Deskripsi Pekerjaan
                </h4>
                <p className="text-slate-600 whitespace-pre-line">
                  {formData.description || "Belum ada deskripsi pekerjaan."}
                </p>
              </div>

              {/* Kualifikasi Required Skills */}
              <div>
                <h4 className="font-bold text-slate-900 mb-1.5">
                  Keahlian yang Dibutuhkan
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {formData.requiredSkills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-[0.65rem] font-semibold"
                    >
                      {s}
                    </span>
                  ))}
                  {formData.requiredSkills.length === 0 && (
                    <span className="text-slate-400 italic">Tidak ada.</span>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Tutup Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

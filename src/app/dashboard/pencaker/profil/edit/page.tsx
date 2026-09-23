"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  GraduationCap,
  Briefcase,
  Award,
  Upload,
  Plus,
  Trash2,
  Edit3,
  Save,
  ArrowLeft,
  X,
  FileText,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

export default function CandidateEditProfilePage() {
  const [activeTab, setActiveTab] = useState<
    "pribadi" | "pendidikan" | "pengalaman" | "keahlian"
  >("pribadi");

  // --- STATE DATA PRIBADI ---
  const [personalData, setPersonalData] = useState({
    fullName: "Fajar Ardiansyah, S.T.",
    nickname: "Fajar",
    email: "fajar.dev@sumbawa.go.id",
    phone: "+62 812-3456-7890",
    gender: "Laki-laki",
    birthPlace: "Sumbawa Besar",
    birthDate: "1998-05-14",
    address: "Jl. Raya Lintas Sumbawa - Taliwang No. 45",
    district: "Unter Iwes",
    regency: "Kabupaten Sumbawa",
    province: "Nusa Tenggara Barat",
    linkedin: "https://linkedin.com/in/fajar-ardiansyah",
    github: "https://github.com/fajarardiansyah",
    portfolio: "https://fajarardiansyah.dev",
  });

  // --- STATE PENDIDIKAN ---
  const [educations, setEducations] = useState([
    {
      id: 1,
      degree: "S1",
      institution: "Universitas Mataram",
      major: "Teknik Geologi",
      startYear: "2018",
      endYear: "2022",
      gpa: "3.72",
      status: "Lulus",
    },
  ]);

  // --- STATE PENGALAMAN ---
  const [hasNoExperience, setHasNoExperience] = useState(false);
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      type: "Kerja", // Kerja, Magang, Organisasi
      company: "PT Amman Mineral Nusa Tenggara (AMNT)",
      role: "Junior Exploration Geologist",
      startDate: "2023-01",
      endDate: "Sekarang",
      isCurrent: true,
      description:
        "Memimpin pemetaan geologi permukaan di area eksplorasi Blok Elang.",
      achievement: "Menemukan titik potensi reservoar baru di zona utara.",
    },
  ]);

  // --- STATE KEAHLIAN & SERTIFIKASI ---
  const [skills, setSkills] = useState([
    {
      id: 1,
      name: "Geological Mapping",
      category: "Teknis",
      level: "Lanjutan",
    },
    { id: 2, name: "ArcGIS / QGIS", category: "Software", level: "Lanjutan" },
    { id: 3, name: "Bahasa Inggris", category: "Bahasa", level: "Menengah" },
  ]);

  const [certifications, setCertifications] = useState([
    {
      id: 1,
      name: "POP (Pengawas Operasional Pertama)",
      issuer: "BNSP",
      issueDate: "2023-06-15",
      fileName: "Cert_POP_Fajar.pdf",
    },
  ]);

  // --- MODAL STATES ---
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  // Form Handlers
  const handleSavePersonalData = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Data Pribadi berhasil diperbarui!");
  };

  const handleDeleteEducation = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus pendidikan ini?")) {
      setEducations(educations.filter((item) => item.id !== id));
    }
  };

  const handleDeleteExperience = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus pengalaman ini?")) {
      setExperiences(experiences.filter((item) => item.id !== id));
    }
  };

  const handleDeleteSkill = (id: number) => {
    setSkills(skills.filter((item) => item.id !== id));
  };

  const handleDeleteCert = (id: number) => {
    setCertifications(certifications.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* HEADER EDIT PROFIL */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1">
          <Link
            href="/dashboard/pencaker/profil"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-app-navy-700 hover:underline mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Profil
          </Link>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Edit Profil Pencaker
          </h1>
          <p className="text-xs text-slate-500">
            Perbarui data diri, riwayat pendidikan, pengalaman, dan keahlian
            Anda secara berkala.
          </p>
        </div>
      </div>

      {/* NAVIGASI TAB UTAMA (4 BAGIAN EDIT) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-sm">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
          <button
            onClick={() => setActiveTab("pribadi")}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === "pribadi"
                ? "bg-app-navy-700 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Data Pribadi</span>
          </button>

          <button
            onClick={() => setActiveTab("pendidikan")}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === "pendidikan"
                ? "bg-app-navy-700 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Pendidikan</span>
          </button>

          <button
            onClick={() => setActiveTab("pengalaman")}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === "pengalaman"
                ? "bg-app-navy-700 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Pengalaman</span>
          </button>

          <button
            onClick={() => setActiveTab("keahlian")}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === "keahlian"
                ? "bg-app-navy-700 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Keahlian & Sertifikasi</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. TAB 1: EDIT DATA PRIBADI */}
      {/* ========================================================================= */}
      {activeTab === "pribadi" && (
        <form
          onSubmit={handleSavePersonalData}
          className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-8 shadow-sm"
        >
          {/* UPLOAD FOTO PROFIL */}
          <div className="space-y-4 border-b border-slate-100 pb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Foto Profil
            </h3>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-slate-100 bg-slate-100 shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                  alt="Foto Profil"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <div className="flex items-center gap-2">
                  <label className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors inline-flex items-center gap-2">
                    <Upload className="w-3.5 h-3.5" /> Unggah Foto Baru
                    <input type="file" className="hidden" accept="image/*" />
                  </label>
                  <button
                    type="button"
                    className="px-3 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs rounded-xl transition-colors"
                  >
                    Hapus
                  </button>
                </div>
                <p className="text-[10px] text-slate-400">
                  Format JPG, PNG, atau WEBP. Maksimal ukuran 2MB.
                </p>
              </div>
            </div>
          </div>

          {/* FORM IDENTITAS */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Identitas Pengguna
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  value={personalData.fullName}
                  onChange={(e) =>
                    setPersonalData({
                      ...personalData,
                      fullName: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Panggilan
                </label>
                <input
                  type="text"
                  value={personalData.nickname}
                  onChange={(e) =>
                    setPersonalData({
                      ...personalData,
                      nickname: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={personalData.email}
                  onChange={(e) =>
                    setPersonalData({ ...personalData, email: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nomor Telepon / WhatsApp *
                </label>
                <input
                  type="text"
                  value={personalData.phone}
                  onChange={(e) =>
                    setPersonalData({ ...personalData, phone: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Jenis Kelamin *
                </label>
                <select
                  value={personalData.gender}
                  onChange={(e) =>
                    setPersonalData({ ...personalData, gender: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600 bg-white"
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tempat Lahir
                  </label>
                  <input
                    type="text"
                    value={personalData.birthPlace}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        birthPlace: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    value={personalData.birthDate}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        birthDate: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* FORM ALAMAT DOMISILI */}
          <div className="space-y-4 border-t border-slate-100 pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Alamat Domisili
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alamat Lengkap (Jalan / RT / RW / No. Rumah)
                </label>
                <textarea
                  rows={2}
                  value={personalData.address}
                  onChange={(e) =>
                    setPersonalData({
                      ...personalData,
                      address: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kecamatan
                  </label>
                  <input
                    type="text"
                    value={personalData.district}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        district: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kabupaten / Kota
                  </label>
                  <input
                    type="text"
                    value={personalData.regency}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        regency: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Provinsi
                  </label>
                  <input
                    type="text"
                    value={personalData.province}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        province: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* FORM TAUTAN / SOSIAL MEDIA */}
          <div className="space-y-4 border-t border-slate-100 pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Tautan Profesional
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Link LinkedIn
                </label>
                <div className="relative">
                  <FaLinkedin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="url"
                    value={personalData.linkedin}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        linkedin: e.target.value,
                      })
                    }
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Link GitHub
                </label>
                <div className="relative">
                  <FaGithub className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="url"
                    value={personalData.github}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        github: e.target.value,
                      })
                    }
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Link Portofolio
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="url"
                    value={personalData.portfolio}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        portfolio: e.target.value,
                      })
                    }
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-app-navy-600 hover:bg-app-navy-700 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-2 shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* 5. TAB 2: EDIT PENDIDIKAN */}
      {/* ========================================================================= */}
      {activeTab === "pendidikan" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Riwayat Pendidikan
              </h3>
              <p className="text-[11px] text-slate-500">
                Daftar pendidikan formal atau perguruan tinggi yang pernah
                ditempuh.
              </p>
            </div>
            <button
              onClick={() => setIsEducationModalOpen(true)}
              className="px-4 py-2 bg-app-navy-600 hover:bg-app-navy-700 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" /> Tambah Pendidikan
            </button>
          </div>

          <div className="space-y-4">
            {educations.map((edu) => (
              <div
                key={edu.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-app-navy-100 text-app-navy-800 font-bold text-[10px] rounded">
                      {edu.degree}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">
                      {edu.institution}
                    </h4>
                  </div>
                  <p className="text-xs font-semibold text-slate-700">
                    {edu.major}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Tahun {edu.startYear} - {edu.endYear} • IPK/Nilai: {edu.gpa}{" "}
                    • Status: {edu.status}
                  </p>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => setIsEducationModalOpen(true)}
                    className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteEducation(edu.id)}
                    className="p-2 bg-white border border-slate-200 rounded-lg text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. TAB 3: EDIT PENGALAMAN */}
      {/* ========================================================================= */}
      {activeTab === "pengalaman" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Pengalaman Kerja, Magang & Organisasi
              </h3>
              <p className="text-[11px] text-slate-500">
                Kelola riwayat karir profesional maupun kegiatan organisasi
                Anda.
              </p>
            </div>
            <button
              disabled={hasNoExperience}
              onClick={() => setIsExperienceModalOpen(true)}
              className={`px-4 py-2 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5 shrink-0 ${
                hasNoExperience
                  ? "bg-slate-300 cursor-not-allowed"
                  : "bg-app-navy-600 hover:bg-app-navy-700"
              }`}
            >
              <Plus className="w-4 h-4" /> Tambah Pengalaman
            </button>
          </div>

          {/* OPSI BELUM MEMILIKI PENGALAMAN */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
            <input
              type="checkbox"
              id="noExp"
              checked={hasNoExperience}
              onChange={(e) => setHasNoExperience(e.target.checked)}
              className="w-4 h-4 text-app-navy-600 rounded border-amber-300 focus:ring-app-navy-500"
            />
            <label
              htmlFor="noExp"
              className="text-xs font-bold text-amber-900 cursor-pointer"
            >
              Saya adalah lulusan baru (Fresh Graduate) dan belum memiliki
              pengalaman kerja.
            </label>
          </div>

          {!hasNoExperience && (
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold text-[10px] rounded">
                          Pengalaman {exp.type}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900">
                          {exp.role}
                        </h4>
                      </div>
                      <p className="text-xs font-semibold text-slate-700 mt-1">
                        {exp.company}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {exp.startDate} - {exp.endDate}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsExperienceModalOpen(true)}
                        className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteExperience(exp.id)}
                        className="p-2 bg-white border border-slate-200 rounded-lg text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-200/60">
                    <p>
                      <strong className="text-slate-800">
                        Tanggung Jawab:
                      </strong>{" "}
                      {exp.description}
                    </p>
                    {exp.achievement && (
                      <p>
                        <strong className="text-slate-800">Pencapaian:</strong>{" "}
                        {exp.achievement}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. TAB 4: EDIT KEAHLIAN & SERTIFIKASI */}
      {/* ========================================================================= */}
      {activeTab === "keahlian" && (
        <div className="space-y-8">
          {/* SEKSI KEAHLIAN */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Keahlian & Competency
                </h3>
                <p className="text-[11px] text-slate-500">
                  Daftar skill teknis, nonteknis, software, maupun kemampuan
                  bahasa.
                </p>
              </div>
              <button
                onClick={() => setIsSkillModalOpen(true)}
                className="px-4 py-2 bg-app-navy-600 hover:bg-app-navy-700 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" /> Tambah Keahlian
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between"
                >
                  <div>
                    <span className="text-[9px] font-bold uppercase text-app-navy-700 block">
                      {skill.category}
                    </span>
                    <p className="text-xs font-bold text-slate-800">
                      {skill.name}
                    </p>
                    <span className="text-[10px] text-slate-500">
                      Tingkat: {skill.level}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteSkill(skill.id)}
                    className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SEKSI SERTIFIKASI */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Sertifikat Kompetensi
                </h3>
                <p className="text-[11px] text-slate-500">
                  Unggah sertifikat resmi pendukung kualifikasi kerja Anda.
                </p>
              </div>
              <button
                onClick={() => setIsCertModalOpen(true)}
                className="px-4 py-2 bg-app-navy-600 hover:bg-app-navy-700 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" /> Tambah Sertifikasi
              </button>
            </div>

            <div className="space-y-3">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <FileText className="w-6 h-6 text-app-navy-600 shrink-0" />
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {cert.name}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Penerbit: {cert.issuer} • Tanggal: {cert.issueDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleDeleteCert(cert.id)}
                      className="p-2 bg-white border border-slate-200 rounded-lg text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL POPUPS FOR ADDING ITEMS */}
      {/* ========================================================================= */}

      {/* MODAL TAMBAH PENDIDIKAN */}
      {isEducationModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Tambah Riwayat Pendidikan
              </h3>
              <button onClick={() => setIsEducationModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Jenjang Pendidikan
                </label>
                <select className="w-full p-2.5 rounded-xl border border-slate-200">
                  <option>SMA / SMK</option>
                  <option>D3</option>
                  <option>D4 / S1</option>
                  <option>S2</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nama Institusi / Universitas
                </label>
                <input
                  type="text"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                  placeholder="Contoh: Universitas Mataram"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Jurusan / Program Studi
                </label>
                <input
                  type="text"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                  placeholder="Contoh: Teknik Geologi"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Tahun Masuk
                  </label>
                  <input
                    type="number"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    placeholder="2018"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Tahun Lulus
                  </label>
                  <input
                    type="number"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                    placeholder="2022"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  IPK / Nilai Akhir
                </label>
                <input
                  type="text"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                  placeholder="Contoh: 3.72"
                />
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => setIsEducationModalOpen(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  alert("Pendidikan baru disimpan");
                  setIsEducationModalOpen(false);
                }}
                className="px-4 py-2 bg-app-navy-600 text-white rounded-xl text-xs font-bold"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH PENGALAMAN */}
      {isExperienceModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Tambah Pengalaman
              </h3>
              <button onClick={() => setIsExperienceModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Jenis Pengalaman
                </label>
                <select className="w-full p-2.5 rounded-xl border border-slate-200">
                  <option>Kerja Penuh Waktu</option>
                  <option>Magang (Internship)</option>
                  <option>Organisasi / Sukarelawan</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nama Perusahaan / Organisasi
                </label>
                <input
                  type="text"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Jabatan / Posisi
                </label>
                <input
                  type="text"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Deskripsi Tanggung Jawab
                </label>
                <textarea
                  rows={3}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => setIsExperienceModalOpen(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  alert("Pengalaman disimpan");
                  setIsExperienceModalOpen(false);
                }}
                className="px-4 py-2 bg-app-navy-600 text-white rounded-xl text-xs font-bold"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH KEAHLIAN */}
      {isSkillModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Tambah Keahlian
              </h3>
              <button onClick={() => setIsSkillModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Kategori Skill
                </label>
                <select className="w-full p-2.5 rounded-xl border border-slate-200">
                  <option>Keahlian Teknis</option>
                  <option>Keahlian Nonteknis</option>
                  <option>Software & Tools</option>
                  <option>Kemampuan Bahasa</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nama Keahlian / Tool
                </label>
                <input
                  type="text"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                  placeholder="Contoh: ArcGIS, Public Speaking"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tingkat Kemampuan
                </label>
                <select className="w-full p-2.5 rounded-xl border border-slate-200">
                  <option>Pemula (Basic)</option>
                  <option>Menengah (Intermediate)</option>
                  <option>Lanjutan (Advanced)</option>
                </select>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => setIsSkillModalOpen(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  alert("Keahlian disimpan");
                  setIsSkillModalOpen(false);
                }}
                className="px-4 py-2 bg-app-navy-600 text-white rounded-xl text-xs font-bold"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH SERTIFIKASI */}
      {isCertModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Tambah Sertifikasi
              </h3>
              <button onClick={() => setIsCertModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nama Sertifikat / Kompetensi
                </label>
                <input
                  type="text"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Lembaga Penerbit
                </label>
                <input
                  type="text"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tanggal Penerbitan
                </label>
                <input
                  type="date"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  File Sertifikat (PDF)
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  className="w-full p-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => setIsCertModalOpen(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  alert("Sertifikasi disimpan");
                  setIsCertModalOpen(false);
                }}
                className="px-4 py-2 bg-app-navy-600 text-white rounded-xl text-xs font-bold"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

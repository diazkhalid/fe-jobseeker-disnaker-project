"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  Search,
  Users,
  Briefcase,
  MapPin,
  GraduationCap,
  SlidersHorizontal,
  ChevronRight,
  CheckCircle2,
  Building2,
  Compass,
  X,
  ChevronDown,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Breadcrumbs from "@/shared/components/Breadcrumbs";

// Tipe Data Pelamar Lengkap dengan Preferensinya
interface ExportApplicant {
  id: string;
  nik: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  education: string;
  experience: string;
  location: string;
  desiredPositions: string[];
  skills: string[];
  jobStatus: string;
  expectedSalary: string;
  registeredDate: string;
}

const DUMMY_EXPORT_APPLICANTS: ExportApplicant[] = [
  {
    id: "PLM-001",
    nik: "5204011203980001",
    name: "Ahmad Rizky",
    email: "ahmad.rizky@example.com",
    phone: "+62 812-3456-7890",
    avatar: "AR",
    education: "S1 Teknik Informatika",
    experience: "4 Tahun",
    location: "Sumbawa, NTB",
    desiredPositions: ["Frontend Developer", "Full Stack Engineer"],
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
    jobStatus: "Aktif mencari pekerjaan (Open to Work)",
    expectedSalary: "Rp 8.000.000 - 12.000.000",
    registeredDate: "10 Jan 2026",
  },
  {
    id: "PLM-002",
    nik: "5204024508990002",
    name: "Siti Nurhaliza",
    email: "siti.nurhaliza@example.com",
    phone: "+62 823-4567-8901",
    avatar: "SN",
    education: "S1 Desain Komunikasi Visual",
    experience: "3 Tahun",
    location: "Mataram, NTB",
    desiredPositions: ["UI/UX Designer", "Graphic Designer"],
    skills: ["Figma", "Adobe XD", "UI/UX Research"],
    jobStatus: "Terbuka untuk penawaran (Passive Candidate)",
    expectedSalary: "Rp 7.000.000 - 10.000.000",
    registeredDate: "15 Feb 2026",
  },
  {
    id: "PLM-003",
    nik: "5204012211000003",
    name: "Budi Pratama",
    email: "budi.pratama@example.com",
    phone: "+62 834-5678-9012",
    avatar: "BP",
    education: "D3 Manajemen Informatika",
    experience: "2 Tahun",
    location: "Sumbawa Barat, NTB",
    desiredPositions: ["Backend Developer", "Admin IT"],
    skills: ["Node.js", "MySQL", "PHP", "Laravel"],
    jobStatus: "Aktif mencari pekerjaan (Open to Work)",
    expectedSalary: "Rp 5.000.000 - 8.000.000",
    registeredDate: "01 Mar 2026",
  },
  {
    id: "PLM-004",
    nik: "5204036005970004",
    name: "Dina Mariana",
    email: "dina.m@example.com",
    phone: "+62 845-6789-0123",
    avatar: "DM",
    education: "S1 Sistem Informasi",
    experience: "5 Tahun",
    location: "DKI Jakarta",
    desiredPositions: ["Senior Frontend Developer", "UI/UX Lead"],
    skills: ["React.js", "TypeScript", "Next.js", "GraphQL"],
    jobStatus: "Aktif mencari pekerjaan (Open to Work)",
    expectedSalary: "Rp 12.000.000 - 18.000.000",
    registeredDate: "20 Mar 2026",
  },
];

const POSITION_OPTIONS = [
  "Frontend Developer",
  "Full Stack Engineer",
  "UI/UX Designer",
  "Backend Developer",
  "Senior Frontend Developer",
  "Graphic Designer",
  "Admin IT",
  "UI/UX Lead",
];

const SKILL_OPTIONS = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Figma",
  "Adobe XD",
  "Node.js",
  "PHP",
  "Laravel",
  "MySQL",
  "GraphQL",
  "UI/UX Research",
];

export default function ExportPelamarPage() {
  // State Filter Form
  const [selectedExperience, setSelectedExperience] =
    useState("Semua Pengalaman");
  const [selectedLocation, setSelectedLocation] = useState("Semua Lokasi");
  const [selectedJobStatus, setSelectedJobStatus] = useState("Semua Status");

  // State Multi-Select Searchable untuk Posisi
  const [positionQuery, setPositionQuery] = useState("");
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [isPositionOpen, setIsPositionOpen] = useState(false);

  // State Multi-Select Searchable untuk Keahlian
  const [skillQuery, setSkillQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isSkillOpen, setIsSkillOpen] = useState(false);

  // State Hasil Data & Notifikasi
  const [filteredResults, setFilteredResults] = useState<ExportApplicant[]>(
    DUMMY_EXPORT_APPLICANTS,
  );
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  const preferencesListRef = useRef<HTMLDivElement>(null);
  const skillsListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        preferencesListRef.current &&
        !preferencesListRef.current.contains(event.target as Node)
      ) {
        setIsPositionOpen(false);
      }
      if (
        skillsListRef.current &&
        !skillsListRef.current.contains(event.target as Node)
      ) {
        setIsSkillOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter list option berdasarkan pencarian
  const filteredPositions = POSITION_OPTIONS.filter((pos) =>
    pos.toLowerCase().includes(positionQuery.toLowerCase()),
  );

  const filteredSkills = SKILL_OPTIONS.filter((skill) =>
    skill.toLowerCase().includes(skillQuery.toLowerCase()),
  );

  // Toggle pilihan posisi
  const togglePosition = (pos: string) => {
    setSelectedPositions((prev) =>
      prev.includes(pos) ? prev.filter((p) => p !== pos) : [...prev, pos],
    );
  };

  // Toggle pilihan keahlian
  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  // Handle Submit Filter
  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const results = DUMMY_EXPORT_APPLICANTS.filter((item) => {
      const matchExp =
        selectedExperience === "Semua Pengalaman" ||
        item.experience.includes(selectedExperience);
      const matchLoc =
        selectedLocation === "Semua Lokasi" ||
        item.location.toLowerCase().includes(selectedLocation.toLowerCase());
      const matchStatus =
        selectedJobStatus === "Semua Status" ||
        item.jobStatus.includes(selectedJobStatus);

      const matchSkill =
        selectedSkills.length === 0 ||
        selectedSkills.some((selSkill) =>
          item.skills.some((s) => s.toLowerCase() === selSkill.toLowerCase()),
        );

      const matchPref =
        selectedPositions.length === 0 ||
        selectedPositions.some((selPos) =>
          item.desiredPositions.some(
            (p) => p.toLowerCase() === selPos.toLowerCase(),
          ),
        );

      return matchExp && matchLoc && matchStatus && matchSkill && matchPref;
    });

    setFilteredResults(results);
  };

  const handleExportExcel = () => {
    setExportMessage(
      "Berhasil mengekspor data ke format Excel (.xlsx)! File sedang diunduh.",
    );
    setTimeout(() => setExportMessage(null), 4000);
  };

  const handleExportPDF = () => {
    setExportMessage(
      "Berhasil mengekspor data ke format PDF (.pdf)! File sedang diunduh.",
    );
    setTimeout(() => setExportMessage(null), 4000);
  };

  return (
    <div className="space-y-6 mx-auto pb-12 text-xs">
      {/* BREADCRUMB & HEADER */}
      <div className="space-y-2">
        <Breadcrumbs></Breadcrumbs>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <Download className="w-7 h-7 text-teal-600" />
              <span>Export Laporan & Data Pelamar</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Saring database dengan memilih banyak posisi dan keahlian
              sekaligus (*multi-select*), lalu unduh laporan.
            </p>
          </div>
        </div>
      </div>

      {/* NOTIFIKASI TOAST */}
      {exportMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold transition-all shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{exportMessage}</span>
        </div>
      )}

      {/* FILTER BUILDER CARD */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
            <Filter className="w-4 h-4 text-teal-600" /> Kriteria Filter Export
            Data (Multi-Select)
          </h2>
          <span className="text-[11px] text-slate-400">
            Pilih satu atau lebih kriteria
          </span>
        </div>

        <form onSubmit={handleFilterSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Filter Pengalaman Kerja */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Pengalaman Kerja
              </label>
              <select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-slate-700"
              >
                <option>Semua Pengalaman</option>
                <option value="Freshgraduate">Freshgraduate</option>
                <option value="1 Tahun">1 Tahun</option>
                <option value="2 Tahun">2 Tahun</option>
                <option value="3 Tahun">3 Tahun</option>
                <option value="4 Tahun">4 Tahun</option>
                <option value="5 Tahun">5 Tahun</option>
              </select>
            </div>

            {/* MULTI-SELECT SEARCHABLE: Preferensi Posisi */}
            <div className="relative" ref={preferencesListRef}>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Preferensi Posisi (Bisa Pilih Banyak)
              </label>
              <div
                onClick={() => setIsPositionOpen(!isPositionOpen)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between cursor-pointer min-h-[38px]"
              >
                <div className="flex flex-wrap gap-1 items-center max-w-[85%]">
                  {selectedPositions.length > 0 ? (
                    selectedPositions.map((pos, idx) => (
                      <span
                        key={idx}
                        className="bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded text-[10px] font-bold"
                      >
                        {pos}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400 font-medium">
                      Semua Posisi
                    </span>
                  )}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>

              {isPositionOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg p-2 space-y-2">
                  <div className="relative">
                    <Search className="w-3 h-3 absolute left-2.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari posisi..."
                      value={positionQuery}
                      onChange={(e) => setPositionQuery(e.target.value)}
                      className="w-full pl-7 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-40 overflow-y-auto space-y-0.5">
                    {filteredPositions.length > 0 ? (
                      filteredPositions.map((pos, idx) => {
                        const isSelected = selectedPositions.includes(pos);
                        return (
                          <div
                            key={idx}
                            onClick={() => togglePosition(pos)}
                            className={`px-3 py-1.5 text-xs rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                              isSelected
                                ? "bg-teal-50 text-teal-700 font-bold"
                                : "hover:bg-slate-50 text-slate-700"
                            }`}
                          >
                            <span>{pos}</span>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-teal-600" />
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-2 text-center text-slate-400 text-[11px]">
                        Posisi tidak ditemukan
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* MULTI-SELECT SEARCHABLE: Keahlian Utama (Skills) */}
            <div className="relative" ref={skillsListRef}>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Keahlian Utama (Bisa Pilih Banyak)
              </label>
              <div
                onClick={() => setIsSkillOpen(!isSkillOpen)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between cursor-pointer min-h-[38px]"
              >
                <div className="flex flex-wrap gap-1 items-center max-w-[85%]">
                  {selectedSkills.length > 0 ? (
                    selectedSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-bold"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400 font-medium">
                      Semua Keahlian
                    </span>
                  )}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>

              {isSkillOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg p-2 space-y-2">
                  <div className="relative">
                    <Search className="w-3 h-3 absolute left-2.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari keahlian..."
                      value={skillQuery}
                      onChange={(e) => setSkillQuery(e.target.value)}
                      className="w-full pl-7 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-40 overflow-y-auto space-y-0.5">
                    {filteredSkills.length > 0 ? (
                      filteredSkills.map((skill, idx) => {
                        const isSelected = selectedSkills.includes(skill);
                        return (
                          <div
                            key={idx}
                            onClick={() => toggleSkill(skill)}
                            className={`px-3 py-1.5 text-xs rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                              isSelected
                                ? "bg-teal-50 text-teal-700 font-bold"
                                : "hover:bg-slate-50 text-slate-700"
                            }`}
                          >
                            <span>{skill}</span>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-teal-600" />
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-2 text-center text-slate-400 text-[11px]">
                        Keahlian tidak ditemukan
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Filter Lokasi */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Lokasi Domisili
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-slate-700"
              >
                <option>Semua Lokasi</option>
                <option value="Sumbawa">Sumbawa, NTB</option>
                <option value="Mataram">Mataram, NTB</option>
                <option value="Jakarta">DKI Jakarta</option>
              </select>
            </div>

            {/* Filter Status Kerja */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Status Pencarian Kerja
              </label>
              <select
                value={selectedJobStatus}
                onChange={(e) => setSelectedJobStatus(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-slate-700"
              >
                <option>Semua Status</option>
                <option value="Aktif mencari pekerjaan">
                  Aktif mencari pekerjaan (Open to Work)
                </option>
                <option value="Terbuka untuk penawaran">
                  Terbuka untuk penawaran (Passive)
                </option>
              </select>
            </div>
          </div>

          {/* Tombol Submit Filter */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Terapkan Filter & Tampilkan Data</span>
            </button>
          </div>
        </form>
      </div>

      {/* HASIL FILTER & TOMBOL EXPORT */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-600" /> Hasil Filter Data
              Pelamar
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Ditemukan{" "}
              <strong className="text-teal-700">
                {filteredResults.length}
              </strong>{" "}
              pelamar yang sesuai dengan kriteria.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportExcel}
              disabled={filteredResults.length === 0}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Excel</span>
            </button>
            <button
              onClick={handleExportPDF}
              disabled={filteredResults.length === 0}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FileText className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* TABEL HASIL FILTER */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3">Nama & NIK Pelamar</th>
                <th className="py-3 px-3">Pendidikan & Pengalaman</th>
                <th className="py-3 px-3">Preferensi Posisi</th>
                <th className="py-3 px-3">Keahlian (Skills)</th>
                <th className="py-3 px-3">Lokasi</th>
                <th className="py-3 px-3">Status Kerja</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredResults.length > 0 ? (
                filteredResults.map((applicant) => (
                  <tr
                    key={applicant.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-teal-50 text-teal-700 border border-teal-100 font-bold text-xs flex items-center justify-center shrink-0">
                          {applicant.avatar}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">
                            {applicant.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono">
                            NIK: {applicant.nik}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-medium text-slate-800">
                        {applicant.education}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        Exp: {applicant.experience}
                      </p>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex flex-wrap gap-1">
                        {applicant.desiredPositions.map((pos, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-teal-50 text-teal-700 text-[10px] rounded font-semibold"
                          >
                            {pos}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex flex-wrap gap-1">
                        {applicant.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 bg-slate-100 text-slate-700 text-[10px] rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      {applicant.location}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {applicant.jobStatus.includes("Aktif")
                          ? "Open to Work"
                          : "Passive"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-30 text-teal-600" />
                    <p className="text-xs font-bold text-slate-700">
                      Tidak ada pelamar yang cocok dengan kriteria filter
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Coba longgarkan pilihan filter untuk melihat hasil data
                      lainnya.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

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
import Breadcrumbs from "@/shared/components/Breadcrumbs";

// Interface Referensi Sesuai Struktur Preferensi Pekerjaan
interface PreferredPosition {
  id: number;
  name: string;
  display_order: number;
}

interface PreferredDistrict {
  code: string;
  name: string;
  display_order: number;
}

interface JobSeekerPreferenceData {
  user_id: number;
  job_field_id: number;
  job_field: string;
  industry_id: number;
  industry: string;
  preferred_positions: PreferredPosition[];
  preferred_districts: PreferredDistrict[];
  job_types: string[];
  work_arrangements: string[];
  willing_to_relocate: boolean;
  min_salary: number;
  max_salary: number;
  job_search_status: string;
  created_at: string;
  updated_at: string;
}

// Tipe Data Pelamar Lengkap dengan Properti Demografi & Preferensi
interface ExportApplicant {
  id: string;
  nik: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  education: string;
  educationLevel: string;
  gender: string;
  age: number;
  residenceDistrict: string; // Tempat tinggal / domisili (Select option)
  preferredDistricts: string[]; // Preferensi tempat kerja (Multi-select)
  jobField: string;
  industry: string;
  desiredPositions: string[];
  skills: string[];
  jobTypes: string[];
  workArrangements: string[];
  willingToRelocate: boolean;
  minSalary: number;
  maxSalary: number;
  jobStatus: string;
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
    educationLevel: "S1",
    gender: "Laki-laki",
    age: 26,
    residenceDistrict: "Alas",
    preferredDistricts: ["Alas", "Labuhan Badas"],
    jobField: "Teknologi Informasi & Perangkat Lunak",
    industry: "Teknologi / Perangkat Lunak",
    desiredPositions: ["Frontend Developer", "Full Stack Developer"],
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
    jobTypes: ["full_time", "contract_project"],
    workArrangements: ["hybrid", "onsite"],
    willingToRelocate: true,
    minSalary: 3000000,
    maxSalary: 8000000,
    jobStatus: "actively_looking",
    registeredDate: "10 Jan 2026",
  },
  {
    id: "PLM-002",
    nik: "5204024508990002",
    name: "Siti Nurhaliza",
    email: "siti.nurhaliza@example.com",
    phone: "+62 823-4567-8901",
    avatar: "SN",
    education: "S1 Sistem Informasi",
    educationLevel: "S1",
    gender: "Perempuan",
    age: 24,
    residenceDistrict: "Mataram",
    preferredDistricts: ["Mataram"],
    jobField: "Teknologi Informasi & Perangkat Lunak",
    industry: "Teknologi / Perangkat Lunak",
    desiredPositions: ["UI/UX Designer", "Backend Developer"],
    skills: ["Figma", "Node.js", "PHP", "MySQL"],
    jobTypes: ["full_time", "freelance"],
    workArrangements: ["remote"],
    willingToRelocate: false,
    minSalary: 5000000,
    maxSalary: 10000000,
    jobStatus: "open_to_offers",
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
    educationLevel: "D3",
    gender: "Laki-laki",
    age: 28,
    residenceDistrict: "Labuhan Badas",
    preferredDistricts: ["Alas", "Labuhan Badas", "Moyo Hulu"],
    jobField: "Teknologi Informasi & Perangkat Lunak",
    industry: "Teknologi / Perangkat Lunak",
    desiredPositions: ["Backend Developer", "Full Stack Developer"],
    skills: ["Node.js", "MySQL", "PHP", "Laravel"],
    jobTypes: ["contract_project", "internship"],
    workArrangements: ["hybrid"],
    willingToRelocate: true,
    minSalary: 2000000,
    maxSalary: 5000000,
    jobStatus: "actively_looking",
    registeredDate: "01 Mar 2026",
  },
];

// Master Options untuk Filter
const POSITION_OPTIONS = [
  "Frontend Developer",
  "Full Stack Developer",
  "Backend Developer",
  "UI/UX Designer",
  "Admin IT",
];

const DISTRICT_OPTIONS = [
  { code: "52.04.05", name: "Alas" },
  { code: "52.04.18", name: "Labuhan Badas" },
  { code: "52.04.10", name: "Moyo Hulu" },
  { code: "Mataram", name: "Mataram" },
];

const EDUCATION_LEVEL_OPTIONS = [
  "Semua Pendidikan",
  "SMA/SMK",
  "D3",
  "S1",
  "S2",
];
const GENDER_OPTIONS = ["Semua Gender", "Laki-laki", "Perempuan"];

const JOB_TYPE_OPTIONS = [
  { value: "full_time", label: "Penuh Waktu (Full-time)" },
  { value: "part_time", label: "Paruh Waktu (Part-time)" },
  { value: "contract_project", label: "Kontrak / Proyek" },
  { value: "internship", label: "Magang (Internship)" },
  { value: "freelance", label: "Lepas / Freelance" },
];

const WORK_ARRANGEMENT_OPTIONS = [
  { value: "onsite", label: "Kantor (On-site)" },
  { value: "hybrid", label: "Hibrida (Hybrid)" },
  { value: "remote", label: "Dari Rumah (Remote)" },
];

const JOB_FIELD_OPTIONS = [
  "Teknologi Informasi & Perangkat Lunak",
  "Keuangan & Perbankan",
  "Pemasaran & Digital Marketing",
  "Sumber Daya Manusia (HR)",
  "Logistik & Rantai Pasok",
  "Administrasi & Kesekretariatan",
];

const INDUSTRY_OPTIONS = [
  "Teknologi / Perangkat Lunak",
  "Konstruksi & Pertambangan",
  "Manufaktur & Pabrik",
  "Jasa Keuangan & Fintech",
  "Kesehatan & Farmasi",
  "Pendidikan & Pelatihan",
];

export default function ExportPelamarPage() {
  // State Filter Demografi, Tempat Tinggal & Gaji
  const [selectedEducationLevel, setSelectedEducationLevel] =
    useState("Semua Pendidikan");
  const [selectedResidence, setSelectedResidence] = useState("Semua Domisili");
  const [selectedGender, setSelectedGender] = useState("Semua Gender");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [filterMinSalary, setFilterMinSalary] = useState("");
  const [filterMaxSalary, setFilterMaxSalary] = useState("");

  // State Filter Single Select Searchable (Job Field & Industry)
  const [jobFieldQuery, setJobFieldQuery] = useState("");
  const [selectedJobField, setSelectedJobField] = useState("");
  const [isJobFieldOpen, setIsJobFieldOpen] = useState(false);

  const [industryQuery, setIndustryQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);

  const [selectedRelocate, setSelectedRelocate] = useState("all");
  const [selectedJobStatus, setSelectedJobStatus] = useState("Semua Status");

  // State Filter Multi-Select Searchable
  const [positionQuery, setPositionQuery] = useState("");
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [isPositionOpen, setIsPositionOpen] = useState(false);

  const [workPlaceQuery, setWorkPlaceQuery] = useState("");
  const [selectedPreferredDistricts, setSelectedPreferredDistricts] = useState<
    string[]
  >([]);
  const [isWorkPlaceOpen, setIsWorkPlaceOpen] = useState(false);

  const [jobTypeQuery, setJobTypeQuery] = useState("");
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [isJobTypeOpen, setIsJobTypeOpen] = useState(false);

  const [workArrQuery, setWorkArrQuery] = useState("");
  const [selectedWorkArrangements, setSelectedWorkArrangements] = useState<
    string[]
  >([]);
  const [isWorkArrOpen, setIsWorkArrOpen] = useState(false);

  // State Hasil Data & Notifikasi
  const [filteredResults, setFilteredResults] = useState<ExportApplicant[]>(
    DUMMY_EXPORT_APPLICANTS,
  );
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  // Refs untuk Click Outside Dropdown
  const posRef = useRef<HTMLDivElement>(null);
  const workPlaceRef = useRef<HTMLDivElement>(null);
  const jobTypeRef = useRef<HTMLDivElement>(null);
  const workArrRef = useRef<HTMLDivElement>(null);
  const jobFieldRef = useRef<HTMLDivElement>(null);
  const industryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (posRef.current && !posRef.current.contains(event.target as Node)) {
        setIsPositionOpen(false);
      }
      if (
        workPlaceRef.current &&
        !workPlaceRef.current.contains(event.target as Node)
      ) {
        setIsWorkPlaceOpen(false);
      }
      if (
        jobTypeRef.current &&
        !jobTypeRef.current.contains(event.target as Node)
      ) {
        setIsJobTypeOpen(false);
      }
      if (
        workArrRef.current &&
        !workArrRef.current.contains(event.target as Node)
      ) {
        setIsWorkArrOpen(false);
      }
      if (
        jobFieldRef.current &&
        !jobFieldRef.current.contains(event.target as Node)
      ) {
        setIsJobFieldOpen(false);
      }
      if (
        industryRef.current &&
        !industryRef.current.contains(event.target as Node)
      ) {
        setIsIndustryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter Search Lists
  const filteredPositions = POSITION_OPTIONS.filter((p) =>
    p.toLowerCase().includes(positionQuery.toLowerCase()),
  );
  const filteredWorkPlaces = DISTRICT_OPTIONS.filter((d) =>
    d.name.toLowerCase().includes(workPlaceQuery.toLowerCase()),
  );
  const filteredJobFields = JOB_FIELD_OPTIONS.filter((f) =>
    f.toLowerCase().includes(jobFieldQuery.toLowerCase()),
  );
  const filteredIndustries = INDUSTRY_OPTIONS.filter((i) =>
    i.toLowerCase().includes(industryQuery.toLowerCase()),
  );

  // Toggle Handlers untuk Multi-Select
  const togglePosition = (pos: string) => {
    setSelectedPositions((prev) =>
      prev.includes(pos) ? prev.filter((p) => p !== pos) : [...prev, pos],
    );
  };

  const togglePreferredDistrict = (distName: string) => {
    setSelectedPreferredDistricts((prev) =>
      prev.includes(distName)
        ? prev.filter((d) => d !== distName)
        : [...prev, distName],
    );
  };

  const toggleJobType = (jtValue: string) => {
    setSelectedJobTypes((prev) =>
      prev.includes(jtValue)
        ? prev.filter((t) => t !== jtValue)
        : [...prev, jtValue],
    );
  };

  const toggleWorkArr = (waValue: string) => {
    setSelectedWorkArrangements((prev) =>
      prev.includes(waValue)
        ? prev.filter((w) => w !== waValue)
        : [...prev, waValue],
    );
  };

  // Handle Submit Filter Lengkap
  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const results = DUMMY_EXPORT_APPLICANTS.filter((item) => {
      // 1. Pendidikan Terakhir
      const matchEdu =
        selectedEducationLevel === "Semua Pendidikan" ||
        item.educationLevel.toLowerCase() ===
          selectedEducationLevel.toLowerCase();

      // 2. Tempat Tinggal (Domisili / Kecamatan Select Option)
      const matchResidence =
        selectedResidence === "Semua Domisili" ||
        item.residenceDistrict.toLowerCase() ===
          selectedResidence.toLowerCase();

      // 3. Preferensi Tempat Kerja (Multi-Select)
      const matchPreferredDistricts =
        selectedPreferredDistricts.length === 0 ||
        selectedPreferredDistricts.some((selDist) =>
          item.preferredDistricts.some(
            (d) => d.toLowerCase() === selDist.toLowerCase(),
          ),
        );

      // 4. Gender
      const matchGender =
        selectedGender === "Semua Gender" ||
        item.gender.toLowerCase() === selectedGender.toLowerCase();

      // 5. Umur (Range Min - Max)
      const matchMinAge = minAge === "" || item.age >= Number(minAge);
      const matchMaxAge = maxAge === "" || item.age <= Number(maxAge);

      // 6. Rentang Ekspektasi Gaji
      const reqMinSalary =
        filterMinSalary !== "" ? Number(filterMinSalary.replace(/\D/g, "")) : 0;
      const reqMaxSalary =
        filterMaxSalary !== ""
          ? Number(filterMaxSalary.replace(/\D/g, ""))
          : Infinity;
      const matchSalary =
        (filterMinSalary === "" && filterMaxSalary === "") ||
        (item.minSalary <= reqMaxSalary && item.maxSalary >= reqMinSalary);

      // 7. Job Field (Searchable Select)
      const matchField =
        !selectedJobField ||
        item.jobField.toLowerCase() === selectedJobField.toLowerCase();

      // 8. Industry (Searchable Select)
      const matchIndustry =
        !selectedIndustry ||
        item.industry.toLowerCase() === selectedIndustry.toLowerCase();

      // 9. Preferred Positions (Multi-select)
      const matchPositions =
        selectedPositions.length === 0 ||
        selectedPositions.some((selPos) =>
          item.desiredPositions.some(
            (p) => p.toLowerCase() === selPos.toLowerCase(),
          ),
        );

      // 10. Job Types (Multi-select)
      const matchJobTypes =
        selectedJobTypes.length === 0 ||
        selectedJobTypes.some((selJt) => item.jobTypes.includes(selJt));

      // 11. Work Arrangements (Multi-select)
      const matchWorkArr =
        selectedWorkArrangements.length === 0 ||
        selectedWorkArrangements.some((selWa) =>
          item.workArrangements.includes(selWa),
        );

      // 12. Willing to Relocate
      const matchRelocate =
        selectedRelocate === "all" ||
        (selectedRelocate === "true" && item.willingToRelocate) ||
        (selectedRelocate === "false" && !item.willingToRelocate);

      // 13. Job Search Status
      const matchStatus =
        selectedJobStatus === "Semua Status" ||
        item.jobStatus.includes(selectedJobStatus);

      return (
        matchEdu &&
        matchResidence &&
        matchPreferredDistricts &&
        matchGender &&
        matchMinAge &&
        matchMaxAge &&
        matchSalary &&
        matchField &&
        matchIndustry &&
        matchPositions &&
        matchJobTypes &&
        matchWorkArr &&
        matchRelocate &&
        matchStatus
      );
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
        <Breadcrumbs />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <Download className="w-7 h-7 text-teal-600" />
              <span>Export Laporan Berdasarkan Preferensi Pelamar</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Saring database pelamar menggunakan parameter preferensi,
              demografi, tempat tinggal (domisili), serta preferensi tempat
              kerja.
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
            <Filter className="w-4 h-4 text-teal-600" /> Parameter Filter Data
            Pelamar
          </h2>
          <span className="text-[11px] text-slate-400">
            Searchable select & demografi lengkap
          </span>
        </div>

        <form onSubmit={handleFilterSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. Pendidikan Terakhir */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Pendidikan Terakhir
              </label>
              <select
                value={selectedEducationLevel}
                onChange={(e) => setSelectedEducationLevel(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-slate-700"
              >
                {EDUCATION_LEVEL_OPTIONS.map((edu, idx) => (
                  <option key={idx} value={edu}>
                    {edu}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Tempat Tinggal (Domisili / Select Option Kecamatan) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tempat Tinggal (Kecamatan)
              </label>
              <select
                value={selectedResidence}
                onChange={(e) => setSelectedResidence(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-slate-700"
              >
                <option value="Semua Domisili">Semua Domisili</option>
                {DISTRICT_OPTIONS.map((dist, idx) => (
                  <option key={idx} value={dist.name}>
                    Kec. {dist.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Preferensi Tempat Kerja (Multi-Select Kecamatan) */}
            <div className="relative" ref={workPlaceRef}>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Preferensi Tempat Kerja
              </label>
              <div
                onClick={() => setIsWorkPlaceOpen(!isWorkPlaceOpen)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between cursor-pointer min-h-[38px]"
              >
                <div className="flex flex-wrap gap-1 items-center max-w-[85%]">
                  {selectedPreferredDistricts.length > 0 ? (
                    selectedPreferredDistricts.map((d, idx) => (
                      <span
                        key={idx}
                        className="bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded text-[10px] font-bold"
                      >
                        {d}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400 font-medium">
                      Semua Tempat Kerja
                    </span>
                  )}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>

              {isWorkPlaceOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg p-2 space-y-2">
                  <div className="relative">
                    <Search className="w-3 h-3 absolute left-2.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari tempat kerja..."
                      value={workPlaceQuery}
                      onChange={(e) => setWorkPlaceQuery(e.target.value)}
                      className="w-full pl-7 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-40 overflow-y-auto space-y-0.5">
                    {filteredWorkPlaces.length > 0 ? (
                      filteredWorkPlaces.map((dist, idx) => {
                        const isSelected = selectedPreferredDistricts.includes(
                          dist.name,
                        );
                        return (
                          <div
                            key={idx}
                            onClick={() => togglePreferredDistrict(dist.name)}
                            className={`px-3 py-1.5 text-xs rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                              isSelected
                                ? "bg-teal-50 text-teal-700 font-bold"
                                : "hover:bg-slate-50 text-slate-700"
                            }`}
                          >
                            <span>{dist.name}</span>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-teal-600" />
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-2 text-center text-slate-400 text-[11px]">
                        Tidak ditemukan
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 4. Gender */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Jenis Kelamin
              </label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-slate-700"
              >
                {GENDER_OPTIONS.map((g, idx) => (
                  <option key={idx} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* 5. Umur (Range Min - Max) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Rentang Umur (Tahun)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min Umur"
                  value={minAge}
                  onChange={(e) => setMinAge(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-slate-700"
                />
                <input
                  type="number"
                  placeholder="Max Umur"
                  value={maxAge}
                  onChange={(e) => setMaxAge(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-slate-700"
                />
              </div>
            </div>

            {/* 6. Rentang Ekspektasi Gaji */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Rentang Ekspektasi Gaji (IDR)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Min Gaji"
                  value={filterMinSalary}
                  onChange={(e) => setFilterMinSalary(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-slate-700"
                />
                <input
                  type="text"
                  placeholder="Max Gaji"
                  value={filterMaxSalary}
                  onChange={(e) => setFilterMaxSalary(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-slate-700"
                />
              </div>
            </div>

            {/* 7. Job Field (Searchable Select Option) */}
            <div className="relative" ref={jobFieldRef}>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Bidang Pekerjaan
              </label>
              <div
                onClick={() => setIsJobFieldOpen(!isJobFieldOpen)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between cursor-pointer min-h-[38px]"
              >
                <span
                  className={
                    selectedJobField
                      ? "text-slate-800 font-bold"
                      : "text-slate-400 font-medium"
                  }
                >
                  {selectedJobField || "Semua Bidang Pekerjaan"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>

              {isJobFieldOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg p-2 space-y-2">
                  <div className="relative">
                    <Search className="w-3 h-3 absolute left-2.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari bidang pekerjaan..."
                      value={jobFieldQuery}
                      onChange={(e) => setJobFieldQuery(e.target.value)}
                      className="w-full pl-7 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-40 overflow-y-auto space-y-0.5">
                    <div
                      onClick={() => {
                        setSelectedJobField("");
                        setIsJobFieldOpen(false);
                      }}
                      className={`px-3 py-1.5 text-xs rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                        selectedJobField === ""
                          ? "bg-teal-50 text-teal-700 font-bold"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span>Semua Bidang Pekerjaan</span>
                      {selectedJobField === "" && (
                        <Check className="w-3.5 h-3.5 text-teal-600" />
                      )}
                    </div>
                    {filteredJobFields.length > 0 ? (
                      filteredJobFields.map((field, idx) => {
                        const isSelected = selectedJobField === field;
                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              setSelectedJobField(field);
                              setIsJobFieldOpen(false);
                            }}
                            className={`px-3 py-1.5 text-xs rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                              isSelected
                                ? "bg-teal-50 text-teal-700 font-bold"
                                : "hover:bg-slate-50 text-slate-700"
                            }`}
                          >
                            <span>{field}</span>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-teal-600" />
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-2 text-center text-slate-400 text-[11px]">
                        Tidak ditemukan
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 8. Industry (Searchable Select Option) */}
            <div className="relative" ref={industryRef}>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Industri Pilihan
              </label>
              <div
                onClick={() => setIsIndustryOpen(!isIndustryOpen)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between cursor-pointer min-h-[38px]"
              >
                <span
                  className={
                    selectedIndustry
                      ? "text-slate-800 font-bold"
                      : "text-slate-400 font-medium"
                  }
                >
                  {selectedIndustry || "Semua Industri"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>

              {isIndustryOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg p-2 space-y-2">
                  <div className="relative">
                    <Search className="w-3 h-3 absolute left-2.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari industri..."
                      value={industryQuery}
                      onChange={(e) => setIndustryQuery(e.target.value)}
                      className="w-full pl-7 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                      autoFocus
                    />
                  </div>
                  <div className="max-h-40 overflow-y-auto space-y-0.5">
                    <div
                      onClick={() => {
                        setSelectedIndustry("");
                        setIsIndustryOpen(false);
                      }}
                      className={`px-3 py-1.5 text-xs rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                        selectedIndustry === ""
                          ? "bg-teal-50 text-teal-700 font-bold"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span>Semua Industri</span>
                      {selectedIndustry === "" && (
                        <Check className="w-3.5 h-3.5 text-teal-600" />
                      )}
                    </div>
                    {filteredIndustries.length > 0 ? (
                      filteredIndustries.map((ind, idx) => {
                        const isSelected = selectedIndustry === ind;
                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              setSelectedIndustry(ind);
                              setIsIndustryOpen(false);
                            }}
                            className={`px-3 py-1.5 text-xs rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                              isSelected
                                ? "bg-teal-50 text-teal-700 font-bold"
                                : "hover:bg-slate-50 text-slate-700"
                            }`}
                          >
                            <span>{ind}</span>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-teal-600" />
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-2 text-center text-slate-400 text-[11px]">
                        Tidak ditemukan
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 9. Preferred Positions (Multi-Select Array) */}
            <div className="relative" ref={posRef}>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Posisi yang Diinginkan
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
                        Tidak ditemukan
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 10. Job Types (Multi-Select Array) */}
            <div className="relative" ref={jobTypeRef}>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Jenis Pekerjaan
              </label>
              <div
                onClick={() => setIsJobTypeOpen(!isJobTypeOpen)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between cursor-pointer min-h-[38px]"
              >
                <div className="flex flex-wrap gap-1 items-center max-w-[85%]">
                  {selectedJobTypes.length > 0 ? (
                    selectedJobTypes.map((jt, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-bold"
                      >
                        {JOB_TYPE_OPTIONS.find((o) => o.value === jt)?.label ||
                          jt}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400 font-medium">
                      Semua Jenis Kerja
                    </span>
                  )}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>

              {isJobTypeOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg p-2 space-y-2">
                  <div className="max-h-40 overflow-y-auto space-y-0.5">
                    {JOB_TYPE_OPTIONS.map((jt, idx) => {
                      const isSelected = selectedJobTypes.includes(jt.value);
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleJobType(jt.value)}
                          className={`px-3 py-1.5 text-xs rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                            isSelected
                              ? "bg-teal-50 text-teal-700 font-bold"
                              : "hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          <span>{jt.label}</span>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-teal-600" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 11. Work Arrangements (Multi-Select Array) */}
            <div className="relative" ref={workArrRef}>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Sistem Kerja
              </label>
              <div
                onClick={() => setIsWorkArrOpen(!isWorkArrOpen)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between cursor-pointer min-h-[38px]"
              >
                <div className="flex flex-wrap gap-1 items-center max-w-[85%]">
                  {selectedWorkArrangements.length > 0 ? (
                    selectedWorkArrangements.map((wa, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-bold"
                      >
                        {WORK_ARRANGEMENT_OPTIONS.find((o) => o.value === wa)
                          ?.label || wa}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400 font-medium">
                      Semua Sistem Kerja
                    </span>
                  )}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>

              {isWorkArrOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg p-2 space-y-2">
                  <div className="max-h-40 overflow-y-auto space-y-0.5">
                    {WORK_ARRANGEMENT_OPTIONS.map((wa, idx) => {
                      const isSelected = selectedWorkArrangements.includes(
                        wa.value,
                      );
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleWorkArr(wa.value)}
                          className={`px-3 py-1.5 text-xs rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                            isSelected
                              ? "bg-teal-50 text-teal-700 font-bold"
                              : "hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          <span>{wa.label}</span>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-teal-600" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 12. Willing to Relocate (Boolean) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kesediaan Relokasi
              </label>
              <select
                value={selectedRelocate}
                onChange={(e) => setSelectedRelocate(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-slate-700"
              >
                <option value="all">Semua Opsi</option>
                <option value="true">Bersedia Relokasi (Ya)</option>
                <option value="false">Tidak Bersedia Relokasi</option>
              </select>
            </div>

            {/* 13. Job Search Status */}
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
                <option value="actively_looking">
                  Aktif mencari pekerjaan (Open to Work)
                </option>
                <option value="open_to_offers">
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
              Preferensi Pelamar
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Ditemukan{" "}
              <strong className="text-teal-700">
                {filteredResults.length}
              </strong>{" "}
              pelamar yang cocok dengan kriteria filter preferensi.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportExcel}
              disabled={filteredResults.length === 0}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Excel</span>
            </button>
            <button
              onClick={handleExportPDF}
              disabled={filteredResults.length === 0}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
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
                <th className="py-3 px-3">Nama & NIK</th>
                <th className="py-3 px-3">Pendidikan & Demografi</th>
                <th className="py-3 px-3">
                  Domisili & Preferensi Tempat Kerja
                </th>
                <th className="py-3 px-3">Posisi Pilihan</th>
                <th className="py-3 px-3">Ekspektasi Gaji</th>
                <th className="py-3 px-3">Status</th>
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
                      <p className="font-semibold text-slate-800">
                        {applicant.education}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {applicant.gender} • {applicant.age} Tahun
                      </p>
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-medium text-slate-800">
                        Domisili: Kec. {applicant.residenceDistrict}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        Kerja:{" "}
                        {applicant.preferredDistricts
                          .map((d) => `Kec. ${d}`)
                          .join(", ")}
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
                    <td className="py-3 px-3 font-bold text-teal-700">
                      Rp {applicant.minSalary.toLocaleString("id-ID")} - Rp{" "}
                      {applicant.maxSalary.toLocaleString("id-ID")}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {applicant.jobStatus === "actively_looking"
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
                      Tidak ada pelamar yang cocok dengan kriteria preferensi
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Coba longgarkan parameter filter untuk melihat hasil data
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

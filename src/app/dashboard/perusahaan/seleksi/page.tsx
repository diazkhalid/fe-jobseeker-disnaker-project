"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Calendar,
  Clock,
  ChevronRight,
  ChevronLeft,
  X,
  Briefcase,
  Building2,
  Users,
  ArrowRightLeft,
  Sparkles,
  Layers,
} from "lucide-react";

// Types
interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  applicantCount: number;
  createdDate: string;
  deadline: string;
  isUrgent?: boolean;
  avatarBg: string;
  notes?: string;
  tags?: string[];
}

interface RecruitmentStage {
  id: string;
  name: string;
  order: number;
  color: string;
  description: string;
  jobs: JobPosition[];
}

// Alur Tahapan Rekrutmen Kandidat (Candidate Selection Pipeline)
const initialStages: RecruitmentStage[] = [
  {
    id: "stage-1",
    name: "Sourcing & Screening",
    order: 1,
    color: "bg-slate-500",
    description: "Pengumpulan berkas, CV screening, dan seleksi awal pelamar",
    jobs: [
      {
        id: "j1",
        title: "Frontend Developer",
        department: "Engineering",
        location: "Jakarta (Hybrid)",
        type: "Full-time",
        applicantCount: 42,
        createdDate: "20 Sep 2026",
        deadline: "10 Okt 2026",
        avatarBg: "bg-app-navy-500",
        notes: "Tahap penyaringan CV dan portofolio React/Next.js.",
        tags: ["React", "Next.js"],
      },
      {
        id: "j2",
        title: "UI/UX Designer",
        department: "Design",
        location: "Remote",
        type: "Full-time",
        applicantCount: 28,
        createdDate: "21 Sep 2026",
        deadline: "05 Okt 2026",
        isUrgent: true,
        avatarBg: "bg-purple-500",
        notes: "Memeriksa tautan Figma & portofolio Design System kandidat.",
        tags: ["Figma", "Design System"],
      },
    ],
  },
  {
    id: "stage-2",
    name: "Wawancara HR",
    order: 2,
    color: "bg-indigo-500",
    description: "Wawancara awal, evaluasi budaya, dan ekspektasi gaji",
    jobs: [
      {
        id: "j3",
        title: "Backend Developer",
        department: "Engineering",
        location: "Jakarta (Onsite)",
        type: "Full-time",
        applicantCount: 15,
        createdDate: "18 Sep 2026",
        deadline: "30 Sep 2026",
        avatarBg: "bg-emerald-500",
        notes: "Penjadwalan wawancara HRD untuk 5 kandidat Lolos Screening.",
        tags: ["Node.js", "PostgreSQL"],
      },
    ],
  },
  {
    id: "stage-3",
    name: "Asesmen & Tes Teknikal",
    order: 3,
    color: "bg-amber-500",
    description: "Ujian teknikal, coding test, atau case study",
    jobs: [
      {
        id: "j4",
        title: "DevOps Engineer",
        department: "Engineering",
        location: "Bandung (Hybrid)",
        type: "Full-time",
        applicantCount: 8,
        createdDate: "15 Sep 2026",
        deadline: "28 Sep 2026",
        isUrgent: true,
        avatarBg: "bg-amber-500",
        notes: "Kandidat sedang mengerjakan take-home technical test.",
        tags: ["Docker", "Kubernetes"],
      },
    ],
  },
  {
    id: "stage-4",
    name: "Wawancara User",
    order: 4,
    color: "bg-sky-500",
    description: "Sesi mendalam bersama Head of Department / Lead Engineer",
    jobs: [
      {
        id: "j5",
        title: "Fullstack Engineer",
        department: "Engineering",
        location: "Jakarta (Hybrid)",
        type: "Full-time",
        applicantCount: 6,
        createdDate: "10 Sep 2026",
        deadline: "25 Sep 2026",
        avatarBg: "bg-teal-500",
        notes: "Interview teknikal bersama Engineering Manager.",
        tags: ["Golang", "React"],
      },
    ],
  },
  {
    id: "stage-5",
    name: "Offering & Hired",
    order: 5,
    color: "bg-emerald-500",
    description: "Penawaran kerja (Offering Letter) & negosiasi akhir",
    jobs: [
      {
        id: "j6",
        title: "Product Manager",
        department: "Product",
        location: "Jakarta (Hybrid)",
        type: "Full-time",
        applicantCount: 2,
        createdDate: "01 Sep 2026",
        deadline: "20 Sep 2026",
        avatarBg: "bg-rose-500",
        notes: "Kandidat terpilih sedang dalam tahap review Offering Letter.",
        tags: ["Agile", "Scrum"],
      },
    ],
  },
];

const STAGE_COLORS = [
  "bg-app-navy-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-emerald-500",
  "bg-sky-500",
  "bg-teal-500",
];

export default function RecruitmentJobsPage() {
  const [stages, setStages] = useState<RecruitmentStage[]>(initialStages);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [selectedStage, setSelectedStage] = useState<RecruitmentStage | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<"overview" | "notes">("overview");

  // Modal State Tambah Tahapan Baru
  const [isStageModalOpen, setIsStageModalOpen] = useState(false);
  const [newStageName, setNewStageName] = useState("");
  const [newStageDescription, setNewStageDescription] = useState("");
  const [newStageColor, setNewStageColor] = useState("bg-app-navy-500");

  const totalJobs = stages.reduce((acc, stage) => acc + stage.jobs.length, 0);

  // Memindahkan urutan/posisi Tahapan
  const handleMoveStage = (index: number, direction: "left" | "right") => {
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= stages.length) return;

    const updatedStages = [...stages];
    const [movedStage] = updatedStages.splice(index, 1);
    updatedStages.splice(targetIndex, 0, movedStage);

    // Re-assign urutan order
    const reorderedStages = updatedStages.map((stage, idx) => ({
      ...stage,
      order: idx + 1,
    }));

    setStages(reorderedStages);
  };

  // Memindahkan lowongan antar tahapan rekrutmen
  const handleMoveJob = (jobId: string, targetStageId: string) => {
    setStages((prevStages) => {
      let movedJob: JobPosition | undefined;

      const updated = prevStages.map((stage) => {
        if (stage.jobs.some((j) => j.id === jobId)) {
          movedJob = stage.jobs.find((j) => j.id === jobId);
          return {
            ...stage,
            jobs: stage.jobs.filter((j) => j.id !== jobId),
          };
        }
        return stage;
      });

      if (movedJob) {
        return updated.map((stage) => {
          if (stage.id === targetStageId) {
            return {
              ...stage,
              jobs: [...stage.jobs, movedJob!],
            };
          }
          return stage;
        });
      }

      return prevStages;
    });

    if (selectedJob?.id === jobId) {
      const newStage = stages.find((s) => s.id === targetStageId);
      if (newStage) setSelectedStage(newStage);
    }
  };

  // Handler Tambah Tahapan Baru
  const handleAddStage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStageName.trim()) return;

    const newStage: RecruitmentStage = {
      id: `stage-${Date.now()}`,
      name: newStageName,
      order: stages.length + 1,
      color: newStageColor,
      description:
        newStageDescription || "Tahapan tambahan dalam alur rekrutmen.",
      jobs: [],
    };

    setStages((prev) => [...prev, newStage]);

    setNewStageName("");
    setNewStageDescription("");
    setNewStageColor("bg-app-navy-500");
    setIsStageModalOpen(false);
  };

  return (
    <div className="text-slate-800 w-full">
      {/* Top Banner & Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-app-navy-50 text-app-navy-700 border border-app-navy-100">
              <Sparkles className="w-3 h-3" /> Pipeline Rekrutmen
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-medium text-slate-500">
              Total {stages.length} Tahapan
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Tahapan Seleksi Rekrutmen
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Kelola urutan tahapan rekrutmen dan pantau pergerakan lowongan
            pekerjaan.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari posisi, departemen, atau tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-app-navy-500/20 focus:border-app-navy-500 transition-all placeholder:text-slate-400"
            />
          </div>

          <button
            onClick={() => setIsStageModalOpen(true)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-xs active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Tahapan</span>
          </button>
        </div>
      </div>

      {/* Kanban Board Tahapan Rekrutmen */}
      <div className="flex gap-5 overflow-x-auto pb-6 pt-1 items-start w-full custom-scrollbar">
        {stages.map((stage, index) => {
          const filteredJobs = stage.jobs.filter(
            (j) =>
              j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              j.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
              j.tags?.some((t) =>
                t.toLowerCase().includes(searchQuery.toLowerCase()),
              ),
          );

          return (
            <div
              key={stage.id}
              className="flex-shrink-0 w-80 bg-slate-100/70 rounded-2xl border border-slate-200/70 flex flex-col max-h-[calc(100vh-220px)] shadow-xs transition-all hover:border-slate-300"
            >
              {/* Stage Header dengan Kontrol Ubah Posisi Tahapan */}
              <div className="p-4 bg-white rounded-t-2xl border-b border-slate-200/80">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${stage.color}`}
                    />
                    <h2 className="font-bold text-sm text-slate-800 tracking-tight truncate">
                      {stage.name}
                    </h2>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    {/* Tombol Geser Tahapan Ke Kiri */}
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMoveStage(index, "left")}
                      title="Geser tahapan ke kiri"
                      className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md disabled:opacity-30 disabled:hover:bg-transparent transition"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Tombol Geser Tahapan Ke Kanan */}
                    <button
                      type="button"
                      disabled={index === stages.length - 1}
                      onClick={() => handleMoveStage(index, "right")}
                      title="Geser tahapan ke kanan"
                      className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md disabled:opacity-30 disabled:hover:bg-transparent transition"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-slate-200/60 ml-1">
                      {filteredJobs.length}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-1 mb-2">
                  {stage.description}
                </p>

                {/* Progress Bar Visual Indicator */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${stage.color} transition-all duration-300`}
                    style={{
                      width: `${
                        totalJobs > 0
                          ? (stage.jobs.length / totalJobs) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Cards Container (Daftar Lowongan di Tahapan Ini) */}
              <div className="p-3 flex-1 overflow-y-auto space-y-3 custom-scrollbar">
                {filteredJobs.length === 0 ? (
                  <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl bg-white/40">
                    <Briefcase className="w-6 h-6 text-slate-300 mx-auto mb-1.5" />
                    <p className="text-xs font-medium text-slate-400">
                      Tidak ada posisi di tahap ini
                    </p>
                  </div>
                ) : (
                  filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => {
                        setSelectedJob(job);
                        setSelectedStage(stage);
                      }}
                      className="group bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-app-navy-400 transition-all cursor-pointer relative"
                    >
                      {/* Urgent Indicator */}
                      {job.isUrgent && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                        </span>
                      )}

                      {/* Header Kartu: Posisi & Departemen */}
                      <div className="flex items-start gap-3 mb-2.5">
                        <div
                          className={`w-9 h-9 rounded-xl ${job.avatarBg} text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs`}
                        >
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-bold text-slate-800 group-hover:text-app-navy-600 transition-colors truncate">
                            {job.title}
                          </h3>
                          <p className="text-xs text-slate-500 font-medium truncate flex items-center gap-1 mt-0.5">
                            <Building2 className="w-3 h-3" /> {job.department}
                          </p>
                        </div>
                      </div>

                      {/* Tags & Pelamar */}
                      <div className="flex items-center justify-between mb-3">
                        {job.tags && job.tags.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {job.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div />
                        )}

                        <div className="flex items-center gap-1 text-[11px] font-semibold text-app-navy-700 bg-app-navy-50 px-2 py-0.5 rounded border border-app-navy-100 whitespace-nowrap">
                          <Users className="w-3 h-3" />
                          <span>{job.applicantCount} Kandidat</span>
                        </div>
                      </div>

                      {/* Catatan Lowongan Snippet */}
                      {job.notes && (
                        <p className="text-xs text-slate-600 bg-slate-50/80 p-2.5 rounded-lg border border-slate-100 mb-3 italic line-clamp-2">
                          {`"${job.notes}"`}
                        </p>
                      )}

                      {/* Card Footer */}
                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-1">
                          <Clock
                            className={`w-3.5 h-3.5 ${
                              job.isUrgent ? "text-rose-500" : "text-slate-400"
                            }`}
                          />
                          <span
                            className={
                              job.isUrgent ? "text-rose-600 font-medium" : ""
                            }
                          >
                            Deadline: {job.deadline}
                          </span>
                        </div>

                        <span className="text-[10px] text-slate-400 group-hover:text-app-navy-600 font-medium transition-colors flex items-center gap-0.5">
                          Detail <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide-over Drawer Detail Lowongan */}
      {selectedJob && selectedStage && (
        <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-xs flex justify-end transition-opacity">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl ${selectedJob.avatarBg} text-white font-bold text-base flex items-center justify-center shadow-md`}
                >
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {selectedJob.title}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <Building2 className="w-3 h-3" /> {selectedJob.department} •{" "}
                    {selectedJob.location}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stage Switcher Banner */}
            <div className="my-5 p-3.5 bg-app-navy-50/60 rounded-xl border border-app-navy-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold text-app-navy-600 tracking-wider">
                  Tahap Seleksi Saat Ini
                </p>
                <p className="text-xs font-semibold text-slate-800">
                  {selectedStage.name}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-app-navy-500" />
                <select
                  value={selectedStage.id}
                  onChange={(e) =>
                    handleMoveJob(selectedJob.id, e.target.value)
                  }
                  className="bg-white text-xs font-medium border border-app-navy-200 rounded-lg p-1.5 focus:outline-none focus:ring-2 focus:ring-app-navy-500"
                >
                  {stages.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.order}. {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex border-b border-slate-100 mb-5">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-2.5 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === "overview"
                    ? "border-app-navy-600 text-app-navy-600"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                Informasi Posisi
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`pb-2.5 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === "notes"
                    ? "border-app-navy-600 text-app-navy-600"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                Catatan Internal
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 space-y-5">
              {activeTab === "overview" ? (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-medium">
                          Tanggal Dibuat
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-700">
                        {selectedJob.createdDate}
                      </p>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-medium">
                          Batas Publikasi
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-700">
                        {selectedJob.deadline}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-app-navy-50/50 rounded-xl border border-app-navy-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-app-navy-900 block">
                        Jumlah Kandidat Aktif
                      </span>
                      <span className="text-[11px] text-app-navy-600">
                        Kandidat yang berada pada tahap seleksi ini.
                      </span>
                    </div>
                    <span className="text-lg font-bold text-app-navy-700 bg-app-navy-100 px-3 py-1 rounded-xl">
                      {selectedJob.applicantCount}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Kualifikasi & Keterampilan Required
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedJob.tags?.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg border border-slate-200/50"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Catatan Internal Lowongan
                    </label>
                    <textarea
                      rows={5}
                      defaultValue={selectedJob.notes}
                      placeholder="Tuliskan catatan terkait kebutuhan headcount, penyesuaian kriteria, atau catatan recruiter..."
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-app-navy-500/20 focus:border-app-navy-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="pt-4 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => setSelectedJob(null)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
              >
                Simpan & Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Buat Tahapan Baru */}
      {isStageModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsStageModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 bg-app-navy-50 text-app-navy-600 rounded-lg">
                <Layers className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Tambah Tahapan Rekrutmen Baru
              </h2>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Tahapan baru akan ditambahkan di urutan akhir alur seleksi
              kandidat.
            </p>

            <form onSubmit={handleAddStage} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Nama Tahapan Seleksi
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Tes Psikotes & Portofolio"
                  value={newStageName}
                  onChange={(e) => setNewStageName(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-app-navy-500/20 focus:border-app-navy-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Deskripsi Singkat Tahapan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Evaluasi logika, kognitif, dan kecocokan portofolio"
                  value={newStageDescription}
                  onChange={(e) => setNewStageDescription(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-app-navy-500/20 focus:border-app-navy-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Warna Indikator Tahapan
                </label>
                <div className="flex gap-2 pt-1">
                  {STAGE_COLORS.map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setNewStageColor(c)}
                      className={`w-7 h-7 rounded-full ${c} transition-all ${
                        newStageColor === c
                          ? "ring-2 ring-offset-2 ring-slate-800 scale-110"
                          : "opacity-80 hover:opacity-100"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsStageModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-medium hover:bg-slate-50 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-app-navy-600 hover:bg-app-navy-700 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  Tambah Tahapan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  MoreHorizontal,
  Calendar,
  Clock,
  ChevronRight,
  X,
  Filter,
  UserCheck,
  AlertCircle,
  CheckCircle2,
  FileText,
  Star,
  ArrowRightLeft,
  Sparkles,
  MessageSquare,
  Building2,
  Tag,
} from "lucide-react";

// Types
interface Candidate {
  id: string;
  name: string;
  appliedRole: string;
  appliedDate: string;
  deadline: string;
  isUrgent?: boolean;
  avatarBg: string;
  recruiterNotes?: string;
  score?: number;
  tags?: string[];
}

interface SelectionStage {
  id: string;
  name: string;
  order: number;
  color: string;
  description: string;
  candidates: Candidate[];
}

const initialStages: SelectionStage[] = [
  {
    id: "stage-1",
    name: "Lamaran Masuk",
    order: 1,
    color: "bg-slate-500",
    description: "Kandidat baru masuk via portal karier",
    candidates: [
      {
        id: "c1",
        name: "Andi Pratama",
        appliedRole: "Frontend Developer",
        appliedDate: "20 Sep 2026",
        deadline: "26 Sep 2026",
        avatarBg: "bg-blue-500",
        recruiterNotes: "Portofolio Next.js dan Tailwind sangat solid.",
        score: 4.8,
        tags: ["React", "Next.js"],
      },
      {
        id: "c2",
        name: "Bintari Rahma",
        appliedRole: "UI/UX Designer",
        appliedDate: "21 Sep 2026",
        deadline: "25 Sep 2026",
        isUrgent: true,
        avatarBg: "bg-purple-500",
        recruiterNotes: "Perlu konfirmasi link portofolio Figma.",
        tags: ["Figma", "Design System"],
      },
    ],
  },
  {
    id: "stage-2",
    name: "Seleksi Administrasi",
    order: 2,
    color: "bg-indigo-500",
    description: "Pemeriksaan berkas dan kualifikasi dasar",
    candidates: [
      {
        id: "c3",
        name: "Citra Lestari",
        appliedRole: "Backend Developer",
        appliedDate: "18 Sep 2026",
        deadline: "24 Sep 2026",
        avatarBg: "bg-emerald-500",
        recruiterNotes: "Sertifikasi AWS & Node.js lengkap.",
        score: 4.5,
        tags: ["Node.js", "PostgreSQL"],
      },
    ],
  },
  {
    id: "stage-3",
    name: "Tes Kompetensi",
    order: 3,
    color: "bg-amber-500",
    description: "Ujian teknis & live coding assessment",
    candidates: [
      {
        id: "c4",
        name: "Deni Kurniawan",
        appliedRole: "Frontend Developer",
        appliedDate: "15 Sep 2026",
        deadline: "23 Sep 2026",
        isUrgent: true,
        avatarBg: "bg-amber-500",
        recruiterNotes: "Menunggu penyerahan hasil take-home test.",
        tags: ["TypeScript"],
      },
    ],
  },
  {
    id: "stage-4",
    name: "Interview HR",
    order: 4,
    color: "bg-sky-500",
    description: "Evaluasi budaya & ekspektasi kompensasi",
    candidates: [
      {
        id: "c5",
        name: "Eka Putra",
        appliedRole: "Fullstack Engineer",
        appliedDate: "10 Sep 2026",
        deadline: "24 Sep 2026",
        avatarBg: "bg-teal-500",
        recruiterNotes: "Sangat komunikatif, notice period 1 bulan.",
        score: 4.9,
        tags: ["Golang", "React"],
      },
    ],
  },
  {
    id: "stage-5",
    name: "Interview User",
    order: 5,
    color: "bg-violet-500",
    description: "Wawancara teknis bersama Engineering Lead",
    candidates: [],
  },
  {
    id: "stage-6",
    name: "Offering",
    order: 6,
    color: "bg-rose-500",
    description: "Negosiasi dan pengiriman Offering Letter",
    candidates: [
      {
        id: "c6",
        name: "Fira Sahila",
        appliedRole: "Product Manager",
        appliedDate: "01 Sep 2026",
        deadline: "25 Sep 2026",
        avatarBg: "bg-rose-500",
        recruiterNotes: "Draf OL terkirim, menunggu TTD.",
        score: 5.0,
        tags: ["Agile", "Scrum"],
      },
    ],
  },
  {
    id: "stage-7",
    name: "Diterima",
    order: 7,
    color: "bg-emerald-500",
    description: "Kandidat menyetujui tawaran & onboarding",
    candidates: [],
  },
];

export default function SelectionProcessPage() {
  const [stages, setStages] = useState<SelectionStage[]>(initialStages);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null,
  );
  const [selectedStage, setSelectedStage] = useState<SelectionStage | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<"overview" | "notes">("overview");

  // Modal State
  const [isStageModalOpen, setIsStageModalOpen] = useState(false);
  const [newStageName, setNewStageName] = useState("");
  const [newStageDesc, setNewStageDesc] = useState("");

  const totalCandidates = stages.reduce(
    (acc, stage) => acc + stage.candidates.length,
    0,
  );

  // Move candidate logic
  const handleMoveCandidate = (candidateId: string, targetStageId: string) => {
    setStages((prevStages) => {
      let movedCandidate: Candidate | undefined;

      const updated = prevStages.map((stage) => {
        if (stage.candidates.some((c) => c.id === candidateId)) {
          movedCandidate = stage.candidates.find((c) => c.id === candidateId);
          return {
            ...stage,
            candidates: stage.candidates.filter((c) => c.id !== candidateId),
          };
        }
        return stage;
      });

      if (movedCandidate) {
        return updated.map((stage) => {
          if (stage.id === targetStageId) {
            return {
              ...stage,
              candidates: [...stage.candidates, movedCandidate!],
            };
          }
          return stage;
        });
      }

      return prevStages;
    });

    if (selectedCandidate?.id === candidateId) {
      const newStage = stages.find((s) => s.id === targetStageId);
      if (newStage) setSelectedStage(newStage);
    }
  };

  const handleAddStage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStageName.trim()) return;

    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-emerald-500",
      "bg-amber-500",
      "bg-rose-500",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newStage: SelectionStage = {
      id: `stage-${Date.now()}`,
      name: newStageName,
      order: stages.length + 1,
      color: randomColor,
      description: newStageDesc,
      candidates: [],
    };

    setStages([...stages, newStage]);
    setNewStageName("");
    setNewStageDesc("");
    setIsStageModalOpen(false);
  };

  return (
    <div className="text-slate-800 w-full">
      {/* Top Banner & Glass Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
              <Sparkles className="w-3 h-3" /> Rekrutmen Aktif
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-medium text-slate-500">
              Total {totalCandidates} Kandidat Berjalan
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Alur & Tahapan Seleksi
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Atur pipa rekrutmen, pantau progres kandidat, dan kelola alur kerja
            tim secara visual.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari kandidat atau keahlian..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
            />
          </div>

          <button
            onClick={() => setIsStageModalOpen(true)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-sm active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Tahapan</span>
          </button>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="w-full overflow-x-auto">
        <div className="flex gap-5 pb-6 pt-1 items-start custom-scrollbar">
          {stages.map((stage) => {
            const filteredCandidates = stage.candidates.filter(
              (c) =>
                c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.appliedRole
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                c.tags?.some((t) =>
                  t.toLowerCase().includes(searchQuery.toLowerCase()),
                ),
            );

            return (
              <div
                key={stage.id}
                className="flex-shrink-0 w-80 bg-slate-100/70 rounded-2xl border border-slate-200/70 flex flex-col max-h-[calc(100vh-220px)] shadow-xs transition-all hover:border-slate-300"
              >
                {/* Stage Header */}
                <div className="p-4 bg-white rounded-t-2xl border-b border-slate-200/80">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${stage.color}`}
                      />
                      <h2 className="font-bold text-sm text-slate-800 tracking-tight">
                        {stage.name}
                      </h2>
                    </div>
                    <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-slate-200/60">
                      {filteredCandidates.length}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-1 mb-2">
                    {stage.description}
                  </p>

                  {/* Progress Bar visual indicator */}
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${stage.color} transition-all duration-300`}
                      style={{
                        width: `${totalCandidates > 0 ? (stage.candidates.length / totalCandidates) * 100 : 0}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Cards Scrollable Area */}
                <div className="p-3 flex-1 overflow-y-auto space-y-3 custom-scrollbar">
                  {filteredCandidates.length === 0 ? (
                    <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl bg-white/40">
                      <UserCheck className="w-6 h-6 text-slate-300 mx-auto mb-1.5" />
                      <p className="text-xs font-medium text-slate-400">
                        Tidak ada kandidat
                      </p>
                    </div>
                  ) : (
                    filteredCandidates.map((candidate) => (
                      <div
                        key={candidate.id}
                        onClick={() => {
                          setSelectedCandidate(candidate);
                          setSelectedStage(stage);
                        }}
                        className="group bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-400 transition-all cursor-pointer relative"
                      >
                        {/* Urgent Indicator */}
                        {candidate.isUrgent && (
                          <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                          </span>
                        )}

                        {/* Header Kartu: Avatar & Info */}
                        <div className="flex items-start gap-3 mb-3">
                          <div
                            className={`w-9 h-9 rounded-xl ${candidate.avatarBg} text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs`}
                          >
                            {candidate.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                              {candidate.name}
                            </h3>
                            <p className="text-xs text-slate-500 font-medium truncate">
                              {candidate.appliedRole}
                            </p>
                          </div>
                        </div>

                        {/* Tags */}
                        {candidate.tags && candidate.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {candidate.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Recruiter Note Snippet */}
                        {candidate.recruiterNotes && (
                          <p className="text-xs text-slate-600 bg-slate-50/80 p-2.5 rounded-lg border border-slate-100 mb-3 italic line-clamp-2">
                            {`"${candidate.recruiterNotes}"`}
                          </p>
                        )}

                        {/* Card Footer */}
                        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                          <div className="flex items-center gap-1">
                            <Clock
                              className={`w-3.5 h-3.5 ${
                                candidate.isUrgent
                                  ? "text-rose-500"
                                  : "text-slate-400"
                              }`}
                            />
                            <span
                              className={
                                candidate.isUrgent
                                  ? "text-rose-600 font-medium"
                                  : ""
                              }
                            >
                              {candidate.deadline}
                            </span>
                          </div>

                          {candidate.score ? (
                            <div className="flex items-center gap-1 text-amber-600 font-semibold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span>{candidate.score}</span>
                            </div>
                          ) : (
                            <span className="text-[10px] text-slate-400 group-hover:text-blue-600 font-medium transition-colors flex items-center gap-0.5">
                              Detail <ChevronRight className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide-over Drawer Detail Kandidat */}
      {selectedCandidate && selectedStage && (
        <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-xs flex justify-end transition-opacity">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl ${selectedCandidate.avatarBg} text-white font-bold text-base flex items-center justify-center shadow-md`}
                >
                  {selectedCandidate.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {selectedCandidate.name}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    {selectedCandidate.appliedRole}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Stage Switcher Banner */}
            <div className="my-5 p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">
                  Tahap Saat Ini
                </p>
                <p className="text-xs font-semibold text-slate-800">
                  {selectedStage.name}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-blue-500" />
                <select
                  value={selectedStage.id}
                  onChange={(e) =>
                    handleMoveCandidate(selectedCandidate.id, e.target.value)
                  }
                  className="bg-white text-xs font-medium border border-blue-200 rounded-lg p-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className={`pb-2.5 px-4 text-xs font-semibold border-b-2 transition-all ${
                  activeTab === "overview"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                Informasi Umum
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`pb-2.5 px-4 text-xs font-semibold border-b-2 transition-all ${
                  activeTab === "notes"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                Catatan Evaluasi
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
                          Tanggal Melamar
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-700">
                        {selectedCandidate.appliedDate}
                      </p>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-medium">
                          Batas Batas Waktu
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-700">
                        {selectedCandidate.deadline}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Keahlian & Tag
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCandidate.tags?.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg border border-slate-200/50"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-amber-800">
                        Skor Penilaian Sementara
                      </span>
                      <div className="flex items-center gap-1 text-amber-700 font-bold text-sm">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span>
                          {selectedCandidate.score || "Belum Dinilai"}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-amber-600">
                      Skor dihitung berdasarkan penilaian teknis dan kesesuaian
                      budaya.
                    </p>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Catatan Recruiter / Interviewer
                    </label>
                    <textarea
                      rows={5}
                      defaultValue={selectedCandidate.recruiterNotes}
                      placeholder="Tuliskan umpan balik hasil interview, kelebihan, atau area perbaikan kandidat..."
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="pt-4 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition"
              >
                Simpan & Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tambah Tahapan */}
      {isStageModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsStageModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-slate-900 mb-1">
              Tambah Tahapan Baru
            </h2>
            <p className="text-xs text-slate-500 mb-5">
              Tahapan akan disisipkan pada urutan paling akhir pipeline.
            </p>

            <form onSubmit={handleAddStage} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Nama Tahapan
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Behavioral Test"
                  value={newStageName}
                  onChange={(e) => setNewStageName(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Deskripsi Singkat
                </label>
                <textarea
                  rows={3}
                  placeholder="Tujuan utama tahapan ini..."
                  value={newStageDesc}
                  onChange={(e) => setNewStageDesc(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsStageModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-medium hover:bg-slate-50 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold transition"
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

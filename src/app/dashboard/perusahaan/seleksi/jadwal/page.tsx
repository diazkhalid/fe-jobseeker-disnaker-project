"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  List,
  Plus,
  Search,
  Clock,
  MapPin,
  Video,
  User,
  CheckCircle2,
  AlertCircle,
  XCircle,
  HelpCircle,
  MoreVertical,
  X,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Filter,
  FileText,
  Building2,
  ExternalLink,
  Sparkles,
} from "lucide-react";

// Types
type ActivityType =
  | "Interview HR"
  | "Interview User"
  | "Tes Tertulis"
  | "Tes Praktik"
  | "Presentasi"
  | "Medical Check-up"
  | "Offering";

type ScheduleStatus =
  | "Dijadwalkan"
  | "Menunggu Konfirmasi"
  | "Dikonfirmasi"
  | "Selesai"
  | "Dibatalkan"
  | "Kandidat Tidak Hadir";

interface ScheduleItem {
  id: string;
  candidateName: string;
  position: string;
  activityType: ActivityType;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm - HH:mm
  locationOrLink: string;
  isOnline: boolean;
  interviewers: string[];
  status: ScheduleStatus;
  notes?: string;
  avatarBg: string;
}

const initialSchedules: ScheduleItem[] = [
  {
    id: "SCH-001",
    candidateName: "Andi Pratama",
    position: "Frontend Developer",
    activityType: "Interview HR",
    date: "2026-09-24",
    time: "09:00 - 10:00 WITA",
    locationOrLink: "https://meet.google.com/abc-defg-hij",
    isOnline: true,
    interviewers: ["Siti Rahma (HRD)", "Budi Santoso (TA Specialist)"],
    status: "Dikonfirmasi",
    notes:
      "Kandidat mengonfirmasi hadir tepat waktu. Siapkan draf pertanyaan seputar React & Next.js.",
    avatarBg: "bg-teal-500",
  },
  {
    id: "SCH-002",
    candidateName: "Bintari Rahma",
    position: "UI/UX Designer",
    activityType: "Interview User",
    date: "2026-09-24",
    time: "13:30 - 14:30 WITA",
    locationOrLink: "Ruang Rapat Utama - Lantai 3",
    isOnline: false,
    interviewers: ["Rian Ardianto (Design Lead)"],
    status: "Dijadwalkan",
    notes: "Review portofolio Figma dan case study design system.",
    avatarBg: "bg-purple-500",
  },
  {
    id: "SCH-003",
    candidateName: "Citra Lestari",
    position: "Backend Developer",
    activityType: "Tes Praktik",
    date: "2026-09-25",
    time: "10:00 - 12:00 WITA",
    locationOrLink: "https://hackerrank.com/test-backend-09",
    isOnline: true,
    interviewers: ["Hendra Wijaya (Engineering Manager)"],
    status: "Menunggu Konfirmasi",
    avatarBg: "bg-emerald-500",
  },
  {
    id: "SCH-004",
    candidateName: "Deni Kurniawan",
    position: "Product Manager",
    activityType: "Presentasi",
    date: "2026-09-25",
    time: "15:00 - 16:00 WITA",
    locationOrLink: "Ruang Inovasi - Lantai 2",
    isOnline: false,
    interviewers: ["Rina Novita (VP Product)", "Eko Prasetyo (CPO)"],
    status: "Selesai",
    notes:
      "Presentasi PRD sangat memuaskan, kandidat memiliki pemahaman bisnis yang tajam.",
    avatarBg: "bg-amber-500",
  },
  {
    id: "SCH-005",
    candidateName: "Eka Putra",
    position: "Fullstack Engineer",
    activityType: "Medical Check-up",
    date: "2026-09-26",
    time: "08:00 - 11:00 WITA",
    locationOrLink: "Klinik BioMedika Sumbawa",
    isOnline: false,
    interviewers: ["Team HR Operations"],
    status: "Dijadwalkan",
    avatarBg: "bg-teal-500",
  },
  {
    id: "SCH-006",
    candidateName: "Fira Sahila",
    position: "QA Automation",
    activityType: "Offering",
    date: "2026-09-26",
    time: "14:00 - 14:30 WITA",
    locationOrLink: "https://meet.google.com/xyz-offering-2026",
    isOnline: true,
    interviewers: ["Siti Rahma (HRD)"],
    status: "Dibatalkan",
    notes: "Kandidat telah menerima tawaran dari perusahaan lain.",
    avatarBg: "bg-rose-500",
  },
];

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<ScheduleItem[]>(initialSchedules);
  const [viewMode, setViewMode] = useState<"calendar" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedActivityFilter, setSelectedActivityFilter] =
    useState<string>("ALL");
  const [selectedStatusFilter, setSelectedStatusFilter] =
    useState<string>("ALL");

  // Drawer & Modal State
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleItem | null>(
    null,
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Quick Copy Helper
  const handleCopyLink = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Helper Badge Colors for Activity
  const getActivityBadge = (type: ActivityType) => {
    switch (type) {
      case "Interview HR":
        return "bg-sky-50 text-sky-700 border-sky-200/80";
      case "Interview User":
        return "bg-indigo-50 text-indigo-700 border-indigo-200/80";
      case "Tes Tertulis":
      case "Tes Praktik":
        return "bg-amber-50 text-amber-700 border-amber-200/80";
      case "Presentasi":
        return "bg-purple-50 text-purple-700 border-purple-200/80";
      case "Medical Check-up":
        return "bg-teal-50 text-teal-700 border-teal-200/80";
      case "Offering":
        return "bg-rose-50 text-rose-700 border-rose-200/80";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  // Helper Badge Colors for Status
  const getStatusBadge = (status: ScheduleStatus) => {
    switch (status) {
      case "Dikonfirmasi":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
        };
      case "Dijadwalkan":
        return {
          bg: "bg-teal-50 text-teal-700 border-teal-200",
          icon: <Clock className="w-3.5 h-3.5 text-teal-600" />,
        };
      case "Menunggu Konfirmasi":
        return {
          bg: "bg-amber-50 text-amber-700 border-amber-200",
          icon: <HelpCircle className="w-3.5 h-3.5 text-amber-600" />,
        };
      case "Selesai":
        return {
          bg: "bg-slate-100 text-slate-700 border-slate-200",
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />,
        };
      case "Dibatalkan":
        return {
          bg: "bg-rose-50 text-rose-700 border-rose-200",
          icon: <XCircle className="w-3.5 h-3.5 text-rose-600" />,
        };
      case "Kandidat Tidak Hadir":
        return {
          bg: "bg-orange-50 text-orange-700 border-orange-200",
          icon: <AlertCircle className="w-3.5 h-3.5 text-orange-600" />,
        };
    }
  };

  // Filtered Items
  const filteredSchedules = schedules.filter((item) => {
    const matchesSearch =
      item.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.interviewers.some((i) =>
        i.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesActivity =
      selectedActivityFilter === "ALL" ||
      item.activityType === selectedActivityFilter;

    const matchesStatus =
      selectedStatusFilter === "ALL" || item.status === selectedStatusFilter;

    return matchesSearch && matchesActivity && matchesStatus;
  });

  return (
    <div className="text-slate-800">
      {/* Header Banner */}
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-100">
              <Sparkles className="w-3 h-3" /> Manajemen Jadwal
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-medium text-slate-500">
              {filteredSchedules.length} Agenda Ditemukan
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Jadwal Seleksi Kandidat
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Atur dan kelola sesi wawancara, asesmen teknis, hingga proses
            offering secara teratur.
          </p>
        </div>

        {/* View Switcher & Action */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200/80">
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "list"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <List className="w-4 h-4" />
              <span>Daftar</span>
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "calendar"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Kalender</span>
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all shadow-xs active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Jadwal Baru</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Search Input */}
        <div className="md:col-span-5 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama kandidat, posisi, atau interviewer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder:text-slate-400 shadow-2xs"
          />
        </div>

        {/* Activity Filter */}
        <div className="md:col-span-3">
          <select
            value={selectedActivityFilter}
            onChange={(e) => setSelectedActivityFilter(e.target.value)}
            className="w-full py-2.5 px-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all shadow-2xs"
          >
            <option value="ALL">Semua Jenis Kegiatan</option>
            <option value="Interview HR">Interview HR</option>
            <option value="Interview User">Interview User</option>
            <option value="Tes Tertulis">Tes Tertulis</option>
            <option value="Tes Praktik">Tes Praktik</option>
            <option value="Presentasi">Presentasi</option>
            <option value="Medical Check-up">Medical Check-up</option>
            <option value="Offering">Offering</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="md:col-span-4">
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="w-full py-2.5 px-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all shadow-2xs"
          >
            <option value="ALL">Semua Status</option>
            <option value="Dijadwalkan">Dijadwalkan</option>
            <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
            <option value="Dikonfirmasi">Dikonfirmasi</option>
            <option value="Selesai">Selesai</option>
            <option value="Dibatalkan">Dibatalkan</option>
            <option value="Kandidat Tidak Hadir">Kandidat Tidak Hadir</option>
          </select>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === "list" ? (
        /* LIST / TABLE VIEW */
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto min-w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-4 sm:px-6">Kandidat & Posisi</th>
                  <th className="py-3.5 px-4">Jenis Kegiatan</th>
                  <th className="py-3.5 px-4">Waktu & Tanggal</th>
                  <th className="py-3.5 px-4">Lokasi / Link</th>
                  <th className="py-3.5 px-4">Interviewer</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filteredSchedules.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-12 text-center text-slate-400"
                    >
                      <CalendarIcon className="w-8 h-8 mx-auto mb-2 opacity-40" />
                      <p className="font-medium text-xs">
                        Tidak ada agenda yang cocok dengan pencarian.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredSchedules.map((item) => {
                    const statusInfo = getStatusBadge(item.status);
                    return (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedSchedule(item)}
                        className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                      >
                        {/* Candidate Name & Role */}
                        <td className="py-4 px-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-9 h-9 rounded-xl ${item.avatarBg} text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-2xs`}
                            >
                              {item.candidateName.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-slate-900 group-hover:text-teal-600 transition-colors truncate">
                                {item.candidateName}
                              </p>
                              <p className="text-xs text-slate-500 truncate">
                                {item.position}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Activity Type */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${getActivityBadge(
                              item.activityType,
                            )}`}
                          >
                            {item.activityType}
                          </span>
                        </td>

                        {/* Date & Time */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <p className="font-semibold text-slate-800">
                            {item.date}
                          </p>
                          <div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
                            <Clock className="w-3 h-3" />
                            <span>{item.time}</span>
                          </div>
                        </td>

                        {/* Location / Link */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1.5 max-w-[180px]">
                            {item.isOnline ? (
                              <Video className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" />
                            ) : (
                              <MapPin className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            )}
                            <span className="truncate text-xs text-slate-600 font-medium">
                              {item.locationOrLink}
                            </span>
                          </div>
                        </td>

                        {/* Interviewers */}
                        <td className="py-4 px-4">
                          <p className="text-xs text-slate-700 font-medium truncate max-w-[160px]">
                            {item.interviewers.join(", ")}
                          </p>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${statusInfo.bg}`}
                          >
                            {statusInfo.icon}
                            {item.status}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSchedule(item);
                            }}
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* CALENDAR VIEW GRID */
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5">
          {/* Calendar Controller Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-teal-600" />
              <span>September 2026</span>
            </h2>
            <div className="flex items-center gap-1">
              <button className="p-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50">
                Hari Ini
              </button>
              <button className="p-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Simple Calendar Day Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {["2026-09-24", "2026-09-25", "2026-09-26"].map((dayDate) => {
              const dayItems = filteredSchedules.filter(
                (s) => s.date === dayDate,
              );
              const isToday = dayDate === "2026-09-24";

              return (
                <div
                  key={dayDate}
                  className={`p-4 rounded-xl border ${
                    isToday
                      ? "bg-teal-50/30 border-teal-200"
                      : "bg-slate-50/50 border-slate-200/80"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-800">
                      {dayDate === "2026-09-24"
                        ? "Kamis, 24 Sep"
                        : dayDate === "2026-09-25"
                          ? "Jumat, 25 Sep"
                          : "Sabtu, 26 Sep"}
                    </span>
                    {isToday && (
                      <span className="bg-teal-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Hari Ini
                      </span>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    {dayItems.length === 0 ? (
                      <p className="text-[11px] text-slate-400 italic py-4 text-center">
                        Tidak ada agenda
                      </p>
                    ) : (
                      dayItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setSelectedSchedule(item)}
                          className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs hover:border-teal-400 transition cursor-pointer"
                        >
                          <div className="flex items-center justify-between gap-1 mb-1.5">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getActivityBadge(
                                item.activityType,
                              )}`}
                            >
                              {item.activityType}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">
                              {item.time.split(" ")[0]}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-slate-800 truncate">
                            {item.candidateName}
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">
                            {item.position}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Slide-Over Drawer Detail Jadwal */}
      {selectedSchedule && (
        <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-xs flex justify-end transition-opacity">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider mb-1 border ${getActivityBadge(
                    selectedSchedule.activityType,
                  )}`}
                >
                  {selectedSchedule.activityType}
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  {selectedSchedule.candidateName}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {selectedSchedule.position}
                </p>
              </div>
              <button
                onClick={() => setSelectedSchedule(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Update Quick Bar */}
            <div className="my-5 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Ubah Status Kehadiran / Seleksi
              </label>
              <select
                value={selectedSchedule.status}
                onChange={(e) => {
                  const updated = {
                    ...selectedSchedule,
                    status: e.target.value as ScheduleStatus,
                  };
                  setSelectedSchedule(updated);
                  setSchedules((prev) =>
                    prev.map((s) => (s.id === updated.id ? updated : s)),
                  );
                }}
                className="w-full bg-white border border-slate-200 rounded-lg text-xs font-semibold p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Dijadwalkan">Dijadwalkan</option>
                <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                <option value="Dikonfirmasi">Dikonfirmasi</option>
                <option value="Selesai">Selesai</option>
                <option value="Dibatalkan">Dibatalkan</option>
                <option value="Kandidat Tidak Hadir">
                  Kandidat Tidak Hadir
                </option>
              </select>
            </div>

            {/* Details Section */}
            <div className="space-y-4 flex-1">
              <div className="flex items-start gap-3 p-3 bg-slate-50/60 rounded-xl">
                <Clock className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-[11px] font-semibold text-slate-400">
                    Waktu & Tanggal
                  </p>
                  <p className="text-xs font-bold text-slate-800">
                    {selectedSchedule.date}
                  </p>
                  <p className="text-xs text-slate-600">
                    {selectedSchedule.time}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50/60 rounded-xl">
                {selectedSchedule.isOnline ? (
                  <Video className="w-4 h-4 text-teal-500 mt-0.5" />
                ) : (
                  <MapPin className="w-4 h-4 text-emerald-500 mt-0.5" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold text-slate-400">
                    Lokasi / Link Meeting
                  </p>
                  <p className="text-xs font-bold text-slate-800 break-all">
                    {selectedSchedule.locationOrLink}
                  </p>
                  {selectedSchedule.isOnline && (
                    <button
                      onClick={() =>
                        handleCopyLink(selectedSchedule.locationOrLink)
                      }
                      className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-teal-600 hover:underline"
                    >
                      {copiedLink ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>{copiedLink ? "Tersalin!" : "Salin Link"}</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50/60 rounded-xl">
                <User className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-[11px] font-semibold text-slate-400">
                    Interviewer / Penguji
                  </p>
                  <ul className="text-xs font-medium text-slate-700 list-disc list-inside mt-0.5">
                    {selectedSchedule.interviewers.map((inv, idx) => (
                      <li key={idx}>{inv}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Notes Area */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Catatan Hasil Interview / Evaluasi
                </label>
                <textarea
                  rows={4}
                  defaultValue={selectedSchedule.notes}
                  placeholder="Tuliskan umpan balik singkat, penilaian, atau catatan penting..."
                  onChange={(e) => {
                    const updated = {
                      ...selectedSchedule,
                      notes: e.target.value,
                    };
                    setSelectedSchedule(updated);
                    setSchedules((prev) =>
                      prev.map((s) => (s.id === updated.id ? updated : s)),
                    );
                  }}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-100 mt-4">
              <button
                onClick={() => setSelectedSchedule(null)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition"
              >
                Tutup Detail
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tambah Jadwal Baru */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-slate-900 mb-1">
              Buat Jadwal Seleksi Baru
            </h2>
            <p className="text-xs text-slate-500 mb-5">
              Isi formulir berikut untuk mengatur sesi wawancara atau asesmen
              baru.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsAddModalOpen(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Kandidat
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Maya Indah"
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Posisi
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: React Developer"
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Jenis Kegiatan
                  </label>
                  <select className="w-full p-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-teal-500">
                    <option>Interview HR</option>
                    <option>Interview User</option>
                    <option>Tes Tertulis</option>
                    <option>Tes Praktik</option>
                    <option>Presentasi</option>
                    <option>Medical Check-up</option>
                    <option>Offering</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-teal-500 text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Waktu
                  </label>
                  <input
                    type="text"
                    placeholder="09:00 - 10:00 WITA"
                    required
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Lokasi / Link Meeting
                </label>
                <input
                  type="text"
                  placeholder="Link Google Meet / Zoom atau Alamat Ruang Rapat"
                  required
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Interviewer / Tim Penguji
                </label>
                <input
                  type="text"
                  placeholder="Pisahkan dengan koma (mis: Siti, Budi)"
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-teal-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-medium hover:bg-slate-50 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold transition"
                >
                  Simpan Jadwal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

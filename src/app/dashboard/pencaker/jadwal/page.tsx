"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Video,
  Building2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen,
  Search,
  ArrowRight,
  Sparkles,
  Calendar,
  Layers,
  Filter,
} from "lucide-react";

interface ScheduleItem {
  id: string;
  applicationId: string;
  companyName: string;
  companyLogo: string;
  position: string;
  type: "Wawancara" | "Tes Kompetensi";
  subType: string;
  date: string; // YYYY-MM-DD
  formattedDate: string;
  time: string;
  locationType: "Online" | "Offline";
  locationDetail: string;
  meetingLink?: string;
  attendanceStatus: "Hadir" | "Belum Konfirmasi" | "Selesai" | "Absen";
  prepNotes: string;
}

export default function JadwalSeleksiPage() {
  const [selectedDate, setSelectedDate] = useState<string>("2026-09-25");
  const [filterType, setFilterType] = useState<string>("Semua");
  const [filterStatus, setFilterStatus] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Mock Data Agenda Seleksi
  const schedules: ScheduleItem[] = [
    {
      id: "SCH-001",
      applicationId: "APP-2026-0982",
      companyName: "PT Technology Innovation Indonesia",
      companyLogo:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
      position: "Senior Frontend Developer",
      type: "Wawancara",
      subType: "Wawancara User & Live Coding",
      date: "2026-09-25",
      formattedDate: "Jumat, 25 September 2026",
      time: "10:00 - 11:30 WIB",
      locationType: "Online",
      locationDetail: "Google Meet",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      attendanceStatus: "Belum Konfirmasi",
      prepNotes:
        "Siapkan environment pengembangan React/Next.js lokal. Pastikan mikrofon dan kamera berfungsi.",
    },
    {
      id: "SCH-002",
      applicationId: "APP-2026-0811",
      companyName: "Nusantara Digital Group",
      companyLogo:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&auto=format&fit=crop&q=80",
      position: "UI/UX Designer",
      type: "Tes Kompetensi",
      subType: "Design Challenge & Portfolio Defense",
      date: "2026-09-28",
      formattedDate: "Senin, 28 September 2026",
      time: "14:00 - 16:00 WIB",
      locationType: "Online",
      locationDetail: "Zoom Meeting",
      meetingLink: "https://zoom.us/j/9876543210",
      attendanceStatus: "Hadir",
      prepNotes:
        "Pelajari studi kasus aplikasi e-commerce terakhir yang telah dikirimkan ke HRD.",
    },
    {
      id: "SCH-003",
      applicationId: "APP-2026-0774",
      companyName: "Global Fintech Solutions",
      companyLogo:
        "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&auto=format&fit=crop&q=80",
      position: "Fullstack Engineer",
      type: "Wawancara",
      subType: "Wawancara HR & Culture Fit",
      date: "2026-10-02",
      formattedDate: "Jumat, 02 Oktober 2026",
      time: "09:00 - 10:00 WIB",
      locationType: "Offline",
      locationDetail:
        "Menara BCA Lantai 24, Jl. M.H. Thamrin No. 1, Jakarta Pusat",
      attendanceStatus: "Belum Konfirmasi",
      prepNotes:
        "Bawa KTP fisik untuk akses masuk gedung. Datang 15 menit sebelum jadwal.",
    },
  ];

  // Multi-Filter Data Handling
  const filteredSchedules = schedules.filter((item) => {
    const matchesType = filterType === "Semua" || item.type === filterType;
    const matchesStatus =
      filterStatus === "Semua" || item.attendanceStatus === filterStatus;
    const matchesSearch =
      item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subType.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-0 py-0 font-[Poppins] text-slate-800 space-y-10">
      {/* BREADCRUMB & HEADER */}
      <div className="space-y-2">
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link
            href="/dashboard"
            className="hover:text-app-navy-700 transition-colors"
          >
            Dashboard
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">Jadwal Seleksi</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <Calendar className="w-7 h-7 text-app-navy-700" />
              <span>Jadwal Seleksi</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Kelola agenda rekrutmen, pantau jadwal tes kompetensi, serta
              persiapkan wawancara Anda.
            </p>
          </div>

          {/* Total Badge */}
          <div className="self-start sm:self-auto bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="p-2 bg-app-navy-50 rounded-xl text-app-navy-700">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Total Agenda
              </span>
              <span className="text-sm font-extrabold text-slate-900">
                {schedules.length} Sesi
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN SPLIT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT COLUMN: KALENDER AGENDA & QUICK STATS (4 COLS) */}
        <div className="lg:col-span-4 space-y-8">
          {/* KALENDER WIDGET (Minimalist Flat Layout) */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-slate-500" />
                Kalender Agenda
              </h2>
              <span className="text-xs font-semibold text-slate-500">
                September 2026
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
              {/* Kalender Header Navigation */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 pb-2 border-b border-slate-200">
                <button className="p-1 hover:bg-slate-200 rounded-lg transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span>September 2026</span>
                <button className="p-1 hover:bg-slate-200 rounded-lg transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Days Grid Header */}
              <div className="grid grid-cols-7 text-center text-[11px] font-semibold text-slate-400">
                <span>Mi</span>
                <span>Se</span>
                <span>Se</span>
                <span>Ra</span>
                <span>Ka</span>
                <span>Ju</span>
                <span>Sa</span>
              </div>

              {/* Days Number Grid */}
              <div className="grid grid-cols-7 text-center text-xs gap-y-1">
                {/* Blank slots */}
                <span className="p-2 text-slate-300">24</span>
                <span className="p-2 text-slate-300">25</span>
                <span className="p-2 text-slate-300">26</span>
                <span className="p-2 text-slate-300">27</span>
                <span className="p-2 text-slate-300">28</span>
                <span className="p-2 text-slate-300">29</span>
                <span className="p-2 text-slate-300">30</span>

                {/* September 1-30 mockup */}
                {[...Array(30)].map((_, i) => {
                  const dayNum = i + 1;
                  const dateStr = `2026-09-${dayNum < 10 ? "0" + dayNum : dayNum}`;
                  const hasAgenda = schedules.some((s) => s.date === dateStr);
                  const isSelected = selectedDate === dateStr;

                  return (
                    <button
                      key={dayNum}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`py-1.5 rounded-lg font-medium transition-all relative flex flex-col items-center justify-center ${
                        isSelected
                          ? "bg-slate-900 text-white font-bold"
                          : hasAgenda
                            ? "bg-amber-100 text-amber-900 font-bold hover:bg-amber-200"
                            : "hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      {dayNum}
                      {hasAgenda && !isSelected && (
                        <span className="w-1 h-1 bg-amber-600 rounded-full mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            <p className="text-[11px] text-slate-400 italic">
              * Tanggal dengan warna kuning memiliki agenda seleksi aktif.
            </p>
          </section>

          {/* CATATAN RINGKASAN PERSAPSI / TIPS */}
          <section className="pt-4 border-t border-slate-200 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Tips Seleksi Berhasil
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-slate-400">•</span>
                <span>
                  Konfirmasi kehadiran setidaknya{" "}
                  <strong>24 jam sebelum</strong> sesi dimulai.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400">•</span>
                <span>
                  Uji tautan virtual meeting & perangkat 15 menit lebih awal.
                </span>
              </li>
            </ul>
          </section>
        </div>

        {/* RIGHT COLUMN: DAFTAR JADWAL TERPERINCI (8 COLS) */}
        <div className="lg:col-span-8 space-y-6">
          {/* SEARCH & FILTERS BAR */}
          <div className="space-y-4 pb-2 border-b border-slate-100">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari posisi, perusahaan, atau jenis tes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border-b border-slate-200 bg-transparent focus:outline-none focus:border-slate-900 transition-colors"
              />
            </div>

            {/* Filter Tabs & Dropdowns */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              {/* Type Filter Buttons */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold self-start">
                {["Semua", "Wawancara", "Tes Kompetensi"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      filterType === type
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Status Filter Dropdown */}
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-medium text-slate-500">
                  Status:
                </span>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl px-3 py-1.5 focus:outline-none focus:border-slate-900 transition-colors cursor-pointer"
                >
                  <option value="Semua">Semua Status</option>
                  <option value="Belum Konfirmasi">Belum Konfirmasi</option>
                  <option value="Hadir">Hadir</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Absen">Absen</option>
                </select>
              </div>
            </div>
          </div>

          {/* LIST JADWAL SELEKSI */}
          <div className="space-y-8 divide-y divide-slate-100">
            {filteredSchedules.length > 0 ? (
              filteredSchedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="pt-6 first:pt-0 space-y-5 group"
                >
                  {/* Item Header Info */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-start gap-4">
                      <img
                        src={schedule.companyLogo}
                        alt={schedule.companyName}
                        className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              schedule.type === "Wawancara"
                                ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                                : "bg-purple-50 text-purple-700 border border-purple-200"
                            }`}
                          >
                            {schedule.type}
                          </span>
                          <span className="text-xs font-semibold text-slate-400">
                            • {schedule.subType}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                          {schedule.position}
                        </h3>
                        <p className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          {schedule.companyName}
                        </p>
                      </div>
                    </div>

                    {/* Status Kehadiran Badge */}
                    <div className="self-start">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          schedule.attendanceStatus === "Hadir"
                            ? "bg-emerald-100 text-emerald-800"
                            : schedule.attendanceStatus === "Belum Konfirmasi"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {schedule.attendanceStatus === "Hadir" ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        )}
                        Status: {schedule.attendanceStatus}
                      </span>
                    </div>
                  </div>

                  {/* Date, Time & Location Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900 block">
                          {schedule.formattedDate}
                        </span>
                        <span className="text-slate-500">{schedule.time}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {schedule.locationType === "Online" ? (
                        <Video className="w-4 h-4 text-indigo-500 shrink-0" />
                      ) : (
                        <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                      <div className="truncate">
                        <span className="font-bold text-slate-900 block">
                          {schedule.locationType} ({schedule.locationDetail})
                        </span>
                        {schedule.meetingLink ? (
                          <a
                            href={schedule.meetingLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-indigo-600 hover:underline font-semibold inline-flex items-center gap-1"
                          >
                            Buka Link Pertemuan
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-slate-500 truncate block">
                            {schedule.locationDetail}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Catatan Persiapan */}
                  <div className="border-l-2 border-slate-300 pl-3 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <BookOpen className="w-3 h-3" /> Catatan Persiapan:
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed italic">
                      {`"${schedule.prepNotes}"`}
                    </p>
                  </div>

                  {/* Actions & Detail Link */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-slate-400 font-mono">
                      Ref: {schedule.applicationId}
                    </span>

                    <Link
                      href={`/dashboard/lamaran/${schedule.applicationId}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-slate-600 transition-colors"
                    >
                      Lihat Detail Lamaran
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center space-y-3">
                <HelpCircle className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-sm font-semibold text-slate-500">
                  Tidak ada agenda seleksi yang cocok dengan pencarian dan
                  filter Anda.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

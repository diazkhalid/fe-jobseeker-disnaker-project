"use client";

import React, { useState } from "react";
import {
  CalendarDays,
  Plus,
  MapPin,
  Building2,
  Users,
  Briefcase,
  Search,
  Filter,
  Edit3,
  Trash2,
  X,
  CheckCircle2,
  Clock,
  Archive,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";

// Types
interface JobFairEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  time: string;
  location: string;
  venue: string;
  description: string;
  companiesCount: number;
  jobsCount: number;
  quota: number;
  registeredCount: number;
  status: "AKAN_DATANG" | "BERLANGSUNG" | "SELESAI" | "DITUTUP";
  isArchived: boolean;
  registrationLink: string;
}

export default function JobFairPage() {
  const [activeTab, setActiveTab] = useState<"aktif" | "arsip">("aktif");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<JobFairEvent | null>(null);

  // Mock Data Event Job Fair
  const [events, setEvents] = useState<JobFairEvent[]>([
    {
      id: "JF-2026-001",
      title: "Sumbawa Career Expo 2026",
      startDate: "2026-10-15",
      endDate: "2026-10-17",
      time: "08:00 - 16:00 WITA",
      location: "Sumbawa Besar",
      venue: "Auditorium Universitas Samawa",
      description:
        "Job Fair terbesar di Kabupaten Sumbawa menghadirkan puluhan perusahaan dari sektor pertambangan, IT, keuangan, dan industri kreatif.",
      companiesCount: 28,
      jobsCount: 120,
      quota: 1500,
      registeredCount: 980,
      status: "AKAN_DATANG",
      isArchived: false,
      registrationLink: "https://disnakertrans.sumbawakab.go.id/jf2026",
    },
    {
      id: "JF-2026-002",
      title: "Batik & Vokasi Job Fair Disnakertrans",
      startDate: "2026-09-20",
      endDate: "2026-09-22",
      time: "09:00 - 15:00 WITA",
      location: "Kec. Badas",
      venue: "Gedung BLK Sumbawa",
      description:
        "Bursa kerja khusus lulusan pelatihan vokasi dan teknik industri.",
      companiesCount: 15,
      jobsCount: 45,
      quota: 500,
      registeredCount: 500,
      status: "BERLANGSUNG",
      isArchived: false,
      registrationLink: "https://disnakertrans.sumbawakab.go.id/vokasi2026",
    },
    {
      id: "JF-2025-004",
      title: "Sumbawa Mining & Agro Career Day 2025",
      startDate: "2025-11-10",
      endDate: "2025-11-12",
      time: "08:30 - 16:00 WITA",
      location: "Kec. Sekongkang",
      venue: "Gedung Serbaguna Sekongkang",
      description:
        "Fokus rekrutmen sektor pertambangan, alat berat, dan perkebunan.",
      companiesCount: 20,
      jobsCount: 85,
      quota: 1000,
      registeredCount: 1000,
      status: "SELESAI",
      isArchived: true,
      registrationLink: "-",
    },
  ]);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    time: "08:00 - 16:00 WITA",
    location: "",
    venue: "",
    description: "",
    companiesCount: 0,
    jobsCount: 0,
    quota: 500,
    status: "AKAN_DATANG" as JobFairEvent["status"],
    registrationLink: "",
  });

  const handleOpenAddModal = () => {
    setEditingEvent(null);
    setFormData({
      title: "",
      startDate: "",
      endDate: "",
      time: "08:00 - 16:00 WITA",
      location: "",
      venue: "",
      description: "",
      companiesCount: 0,
      jobsCount: 0,
      quota: 500,
      status: "AKAN_DATANG",
      registrationLink: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (event: JobFairEvent) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      startDate: event.startDate,
      endDate: event.endDate,
      time: event.time,
      location: event.location,
      venue: event.venue,
      description: event.description,
      companiesCount: event.companiesCount,
      jobsCount: event.jobsCount,
      quota: event.quota,
      status: event.status,
      registrationLink: event.registrationLink,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      setEvents(
        events.map((ev) =>
          ev.id === editingEvent.id ? { ...ev, ...formData } : ev,
        ),
      );
    } else {
      const newEvent: JobFairEvent = {
        id: `JF-2026-00${events.length + 1}`,
        ...formData,
        registeredCount: 0,
        isArchived: false,
      };
      setEvents([newEvent, ...events]);
    }
    setIsModalOpen(false);
  };

  const toggleArchive = (id: string) => {
    setEvents(
      events.map((ev) =>
        ev.id === id ? { ...ev, isArchived: !ev.isArchived } : ev,
      ),
    );
  };

  const filteredEvents = events.filter((ev) => {
    const matchesTab = activeTab === "aktif" ? !ev.isArchived : ev.isArchived;
    const matchesSearch =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || ev.status === statusFilter;
    return matchesTab && matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 bg-slate-50/50">
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-teal-600" />
            Manajemen Job Fair & Event
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Kelola jadwal, pendaftaran, perusahaan peserta, dan kuota
            pelaksanaan job fair Disnakertrans.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-2xs transition-colors self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          Tambah Event Baru
        </button>
      </div>

      {/* METRIK IKHTISAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider">
              Total Event Aktif
            </p>
            <p className="text-xl font-extrabold text-slate-900 mt-1">
              {events.filter((e) => !e.isArchived).length}
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <CalendarDays className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider">
              Perusahaan Peserta
            </p>
            <p className="text-xl font-extrabold text-slate-900 mt-1">
              {events.reduce(
                (acc, curr) =>
                  acc + (curr.isArchived ? 0 : curr.companiesCount),
                0,
              )}
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Building2 className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider">
              Lowongan Dibuka
            </p>
            <p className="text-xl font-extrabold text-slate-900 mt-1">
              {events.reduce(
                (acc, curr) => acc + (curr.isArchived ? 0 : curr.jobsCount),
                0,
              )}
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Briefcase className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider">
              Total Pendaftar
            </p>
            <p className="text-xl font-extrabold text-slate-900 mt-1">
              {events.reduce(
                (acc, curr) =>
                  acc + (curr.isArchived ? 0 : curr.registeredCount),
                0,
              )}
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* TABS & FILTER BAR */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          {/* TAB AKTIF VS ARSIP */}
          <div className="flex items-center gap-2 bg-slate-100/80 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab("aktif")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "aktif"
                  ? "bg-white text-teal-700 shadow-2xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Event Aktif & Mendatang
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("arsip")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "arsip"
                  ? "bg-white text-teal-700 shadow-2xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Archive className="w-3.5 h-3.5" />
              Arsip Event
            </button>
          </div>

          {/* SEARCH & STATUS FILTER */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari event atau lokasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-xl text-xs text-slate-600">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent focus:outline-none font-medium text-slate-700"
              >
                <option value="ALL">Semua Status</option>
                <option value="AKAN_DATANG">Akan Datang</option>
                <option value="BERLANGSUNG">Berlangsung</option>
                <option value="SELESAI">Selesai</option>
                <option value="DITUTUP">Ditutup</option>
              </select>
            </div>
          </div>
        </div>

        {/* DAFTAR EVENT (GRID CARDS) */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 text-slate-400 space-y-2">
            <CalendarDays className="w-10 h-10 mx-auto stroke-1" />
            <p className="text-xs font-medium">
              Tidak ada event Job Fair yang ditemukan.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEvents.map((ev) => (
              <div
                key={ev.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-teal-300 transition-all shadow-2xs flex flex-col justify-between space-y-4"
              >
                {/* HEAD EVENT */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[0.65rem] font-bold text-slate-400 tracking-wider">
                        {ev.id}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                        {ev.title}
                      </h3>
                    </div>

                    {/* BADGE STATUS */}
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold border shadow-2xs ${
                        ev.status === "BERLANGSUNG"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : ev.status === "AKAN_DATANG"
                            ? "bg-teal-50 text-teal-700 border-teal-200"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {ev.status === "BERLANGSUNG" && "🔴 BERLANGSUNG"}
                      {ev.status === "AKAN_DATANG" && "AKAN DATANG"}
                      {ev.status === "SELESAI" && "SELESAI"}
                      {ev.status === "DITUTUP" && "DITUTUP"}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {ev.description}
                  </p>
                </div>

                {/* DETAILS METADATA */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100 text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="truncate">
                      {ev.startDate} s/d {ev.endDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="truncate">{ev.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2">
                    <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="truncate font-medium text-slate-700">
                      {ev.venue}, {ev.location}
                    </span>
                  </div>
                </div>

                {/* STATS & PROGRESS KUOTA */}
                <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />{" "}
                      {ev.companiesCount} Perusahaan
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />{" "}
                      {ev.jobsCount} Lowongan
                    </span>
                  </div>

                  {/* Kuota Progress */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[0.68rem]">
                      <span className="text-slate-500">Kuota Pendaftar:</span>
                      <span className="font-bold text-slate-800">
                        {ev.registeredCount} / {ev.quota} Peserta
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-teal-600 h-full rounded-full transition-all"
                        style={{
                          width: `${Math.min((ev.registeredCount / ev.quota) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* FOOTER ACTIONS */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => toggleArchive(ev.id)}
                    className="text-[0.7rem] font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                  >
                    <Archive className="w-3.5 h-3.5" />
                    {ev.isArchived ? "Pulihkan dari Arsip" : "Arsipkan Event"}
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(ev)}
                      className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Edit Event"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL FORM TAMBAH / EDIT EVENT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-600" />
                {editingEvent
                  ? "Edit Event Job Fair"
                  : "Tambah Event Job Fair Baru"}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">
                  Nama / Judul Event
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Sumbawa Career Expo 2026"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">
                    Tanggal Mulai
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">
                    Tanggal Selesai
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">
                    Waktu Operasional
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="08:00 - 16:00 WITA"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">
                    Lokasi / Kecamatan
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Sumbawa Besar"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">
                    Nama Gedung / Tempat
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Auditorium Universitas Samawa"
                    value={formData.venue}
                    onChange={(e) =>
                      setFormData({ ...formData, venue: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">
                  Deskripsi Event
                </label>
                <textarea
                  rows={3}
                  placeholder="Penjelasan ringkas agenda event..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">
                    Perusahaan Peserta
                  </label>
                  <input
                    type="number"
                    value={formData.companiesCount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        companiesCount: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">
                    Lowongan Tersedia
                  </label>
                  <input
                    type="number"
                    value={formData.jobsCount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        jobsCount: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">
                    Kuota Peserta
                  </label>
                  <input
                    type="number"
                    value={formData.quota}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        quota: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">
                    Status Event
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as JobFairEvent["status"],
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium"
                  >
                    <option value="AKAN_DATANG">Akan Datang</option>
                    <option value="BERLANGSUNG">Berlangsung</option>
                    <option value="SELESAI">Selesai</option>
                    <option value="DITUTUP">Ditutup</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">
                    Link Pendaftaran Online
                  </label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={formData.registrationLink}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        registrationLink: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 shadow-2xs"
                >
                  {editingEvent ? "Simpan Perubahan" : "Terbitkan Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

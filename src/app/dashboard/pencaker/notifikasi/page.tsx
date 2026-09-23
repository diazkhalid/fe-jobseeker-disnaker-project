"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  ChevronRight,
  Briefcase,
  CalendarCheck2,
  Hourglass,
  GraduationCap,
  Users,
  MessageSquare,
  CheckCircle2,
  MailWarning,
  Circle,
  Clock,
  Filter,
  Search,
  CheckCircle,
  Eye,
  Trash2,
} from "lucide-react";

// Tipe Notifikasi sesuai spesifikasi
type NotificationType =
  | "status_lamaran"
  | "undangan_wawancara"
  | "pengingat_batas"
  | "rekomendasi_lowongan"
  | "job_fair"
  | "pelatihan"
  | "pesan_perusahaan";

// Interface Data Notifikasi
interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string; // Misal: "5 menit yang lalu", "1 jam yang lalu"
  rawDate: string; // YYYY-MM-DD HH:mm untuk sorting
  isRead: boolean;
  relatedId?: string; // ID Lamaran, Lowongan, atau Chat terkait
}

// Mock Data Notifikasi
const initialNotifications: NotificationItem[] = [
  {
    id: "NOTIF-001",
    type: "undangan_wawancara",
    title: "Undangan Wawancara User - PT Tech Innovate",
    message:
      "Selamat! Anda diundang wawancara untuk posisi Senior Frontend Developer. Silakan pilih jadwal.",
    timestamp: "3 menit yang lalu",
    rawDate: "2026-09-23 10:30",
    isRead: false,
    relatedId: "APP-001",
  },
  {
    id: "NOTIF-002",
    type: "status_lamaran",
    title: "Status Lamaran Berubah - PT Samawa Creative",
    message:
      "Lamaran Anda untuk UI/UX Designer saat ini berstatus: 'Ditinjau'.",
    timestamp: "1 jam yang lalu",
    rawDate: "2026-09-23 09:15",
    isRead: false,
    relatedId: "APP-002",
  },
  {
    id: "NOTIF-003",
    type: "rekomendasi_lowongan",
    title: "Rekomendasi Lowongan Baru untuk Anda",
    message:
      "Ada 5 lowongan 'Backend Engineer' di Sumbawa yang cocok dengan profil Anda minggu ini.",
    timestamp: "2 jam yang lalu",
    rawDate: "2026-09-23 08:00",
    isRead: false,
  },
  {
    id: "NOTIF-004",
    type: "pesan_perusahaan",
    title: "Pesan Baru dari HR - Nusantara Digital",
    message: "Andi (HR) mengirimkan pesan terkait berkas portofolio Anda.",
    timestamp: "Kemarin, 16:45",
    rawDate: "2026-09-22 16:45",
    isRead: true,
  },
  {
    id: "NOTIF-005",
    type: "pengingat_batas",
    title: "PENTING: Batas Melamar 'Project Manager'",
    message:
      "Lowongan 'Project Manager' di CV Samawa Jaya akan tutup dalam 2 hari. Segera lamar!",
    timestamp: "Kemarin, 10:00",
    rawDate: "2026-09-22 10:00",
    isRead: true,
  },
  {
    id: "NOTIF-006",
    type: "job_fair",
    title: "Ikuti Sumbawa Job Fair Virtual 2026",
    message:
      "Daftar sekarang untuk berpartisipasi dalam Job Fair terbesar di Sumbawa secara online.",
    timestamp: "2 hari yang lalu",
    rawDate: "2026-09-21 11:00",
    isRead: true,
  },
  {
    id: "NOTIF-007",
    type: "pelatihan",
    title: "Pelatihan Gratis: Laravel Expert Series",
    message:
      "Daftar pelatihan gratis ini untuk meningkatkan keahlian Backend Anda. Kuota terbatas.",
    timestamp: "3 hari yang lalu",
    rawDate: "2026-09-20 14:00",
    isRead: true,
  },
];

// Helper untuk mendapatkan Icon dan Warna berdasarkan Tipe Notifikasi
const getNotifConfig = (type: NotificationType) => {
  switch (type) {
    case "status_lamaran":
      return { icon: Briefcase, color: "text-blue-600", bgColor: "bg-blue-50" };
    case "undangan_wawancara":
      return {
        icon: CalendarCheck2,
        color: "text-teal-600",
        bgColor: "bg-teal-50",
      };
    case "pengingat_batas":
      return {
        icon: Hourglass,
        color: "text-amber-600",
        bgColor: "bg-amber-50",
      };
    case "rekomendasi_lowongan":
      return {
        icon: Briefcase,
        color: "text-emerald-600",
        bgColor: "bg-emerald-50",
      };
    case "job_fair":
      return { icon: Users, color: "text-purple-600", bgColor: "bg-purple-50" };
    case "pelatihan":
      return {
        icon: GraduationCap,
        color: "text-indigo-600",
        bgColor: "bg-indigo-50",
      };
    case "pesan_perusahaan":
      return {
        icon: MessageSquare,
        color: "text-slate-600",
        bgColor: "bg-slate-100",
      };
  }
};

export default function NotifikasiPage() {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<
    "semua" | "belum_dibaca" | "penting"
  >("semua");
  const [searchQuery, setSearchQuery] = useState("");

  // Fungsi: Tandai Semua Sudah Dibaca
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true })),
    );
  };

  // Fungsi: Tandai Satu Sudah Dibaca
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif,
      ),
    );
  };

  // Fungsi: Hapus Notifikasi
  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  // Multi-Filter & Search Logic
  const filteredNotifications = notifications
    .filter((notif) => {
      // Filter Tab
      if (activeTab === "belum_dibaca" && notif.isRead) return false;
      if (activeTab === "penting") {
        // Asumsi: undangan wawancara dan pengingat batas dianggap penting
        return (
          notif.type === "undangan_wawancara" ||
          notif.type === "pengingat_batas"
        );
      }

      // Filter Search
      const matchesSearch =
        notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notif.message.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    })
    // Sort by Date Terbaru
    .sort(
      (a, b) => new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime(),
    );

  // Hitung jumlah notifikasi belum dibaca
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const tabs: { id: "semua" | "belum_dibaca" | "penting"; label: string }[] = [
    { id: "semua", label: "Semua Notifikasi" },
    { id: "belum_dibaca", label: "Belum Dibaca" },
    { id: "penting", label: "Penting" },
  ];

  return (
    <div className="mx-auto p-4 sm:p-6 lg:p-0 space-y-8 text-slate-800">
      {/* BREADCRUMB & HEADER */}
      <div className="space-y-2">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link
            href="/dashboard"
            className="hover:text-app-navy-700 transition-colors"
          >
            Dashboard
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">Notifikasi</span>
        </nav>

        {/* Main Header Content */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <Bell className="w-7 h-7 text-app-navy-700" />
              <span>Pusat Notifikasi</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Pantau seluruh informasi terbaru, perubahan status lamaran, dan
              undangan penting Anda.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Tandai Semua Dibaca</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* FILTERS AREA: SEARCH & TABS */}
      <div className="space-y-4">
        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl w-full sm:w-auto overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                  isActive
                    ? "bg-white text-app-navy-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.id === "belum_dibaca" && unreadCount > 0 && (
                  <Circle className="w-2.5 h-2.5 fill-rose-500 text-rose-500" />
                )}
                {tab.id === "penting" && (
                  <MailWarning className="w-3.5 h-3.5 text-amber-500" />
                )}
                <span>{tab.label}</span>
                {tab.id === "semua" && (
                  <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-md">
                    {notifications.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-80 pt-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari notifikasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-app-navy-600 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* NOTIFICATION LIST LAYOUT */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {filteredNotifications.map((notif) => {
              const cfg = getNotifConfig(notif.type);
              const NotifIcon = cfg.icon;

              return (
                <div
                  key={notif.id}
                  className={`flex items-start gap-4 p-5 sm:p-6 transition-colors relative group ${
                    notif.isRead
                      ? "hover:bg-slate-50"
                      : "bg-app-navy-50/50 hover:bg-app-navy-50"
                  }`}
                >
                  {/* Indikator Belum Dibaca */}
                  {!notif.isRead && (
                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2">
                      <Circle className="w-2.5 h-2.5 fill-app-navy-600 text-app-navy-600" />
                    </div>
                  )}

                  {/* Icon Tipe Notifikasi */}
                  <div
                    className={`p-3 rounded-2xl shrink-0 ${cfg.bgColor} ${cfg.color} mt-1`}
                  >
                    <NotifIcon className="w-6 h-6" />
                  </div>

                  {/* Konten Teks */}
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 justify-between">
                      <h3
                        className={`text-sm font-bold tracking-tight ${
                          notif.isRead ? "text-slate-800" : "text-app-navy-950"
                        }`}
                      >
                        {notif.title}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 shrink-0">
                        <Clock className="w-3.5 h-3.5" />
                        {notif.timestamp}
                      </span>
                    </div>
                    <p
                      className={`text-xs leading-relaxed ${
                        notif.isRead
                          ? "text-slate-600"
                          : "text-slate-700 font-medium"
                      }`}
                    >
                      {notif.message}
                    </p>
                  </div>

                  {/* Action Buttons (Tampil saat Hover) */}
                  <div className="absolute right-6 top-6 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-1.5 rounded-lg border border-slate-100 shadow-sm backdrop-blur-sm">
                    {!notif.isRead && (
                      <button
                        type="button"
                        onClick={() => markAsRead(notif.id)}
                        className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Tandai Sudah Dibaca"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}
                    <Link
                      href={
                        notif.relatedId
                          ? `/dashboard/lamaran/${notif.relatedId}`
                          : "/dashboard/lowongan"
                      }
                      className="p-2 text-slate-500 hover:text-app-navy-700 hover:bg-app-navy-50 rounded-lg transition-colors"
                      title="Lihat Detail"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => deleteNotification(notif.id)}
                      className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Hapus Notifikasi"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="p-16 text-center space-y-4">
            <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-200">
              <MailWarning className="w-10 h-10" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="text-lg font-bold text-slate-900">
                Tidak Ada Notifikasi
              </h3>
              <p className="text-xs text-slate-500">
                {searchQuery || activeTab !== "semua"
                  ? "Tidak ada notifikasi yang cocok dengan pencarian atau filter tab Anda."
                  : "Pusat notifikasi Anda kosong. Seluruh informasi terbaru akan muncul di sini."}
              </p>
            </div>
            {(searchQuery || activeTab !== "semua") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("semua");
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
              >
                Reset Filter
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

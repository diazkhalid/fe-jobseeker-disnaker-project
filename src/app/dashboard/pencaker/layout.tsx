"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  User,
  FileText,
  Sliders,
  Search,
  Bookmark,
  Send,
  Calendar,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  ChevronDown,
  CheckCircle2,
  Info,
} from "lucide-react";

// --- NAVIGASI UTAMA (TOP NAVBAR) ---
const primaryNavItems = [
  { label: "Dashboard", href: "/dashboard/pencaker", icon: LayoutDashboard },
  {
    label: "Cari Lowongan",
    href: "/dashboard/pencaker/lowongan",
    icon: Search,
  },
  { label: "Lamaran Saya", href: "/dashboard/pencaker/lamaran", icon: Send },
  {
    label: "Jadwal Seleksi",
    href: "/dashboard/pencaker/jadwal",
    icon: Calendar,
  },
];

// --- SEMUA MENU UNTUK HUB & MOBILE MENU ---
const allNavItems = [
  {
    label: "Dashboard",
    href: "/dashboard/pencaker",
    icon: LayoutDashboard,
    category: "Utama",
  },
  {
    label: "Cari Lowongan",
    href: "/dashboard/pencaker/lowongan",
    icon: Search,
    category: "Utama",
  },
  {
    label: "Lamaran Saya",
    href: "/dashboard/pencaker/lamaran",
    icon: Send,
    category: "Utama",
  },
  {
    label: "Jadwal Seleksi",
    href: "/dashboard/pencaker/jadwal",
    icon: Calendar,
    category: "Utama",
  },
  {
    label: "Lowongan Tersimpan",
    href: "/dashboard/pencaker/tersimpan",
    icon: Bookmark,
    category: "Aktivitas",
  },
  {
    label: "Profil Saya",
    href: "/dashboard/pencaker/profil",
    icon: User,
    category: "Karir Saya",
  },
  {
    label: "CV dan Dokumen",
    href: "/dashboard/pencaker/dokumen",
    icon: FileText,
    category: "Karir Saya",
  },
  {
    label: "Preferensi Pekerjaan",
    href: "/dashboard/pencaker/preferensi",
    icon: Sliders,
    category: "Karir Saya",
  },
  {
    label: "Notifikasi",
    href: "/dashboard/pencaker/notifikasi",
    icon: Bell,
    category: "Akun",
    badge: 3,
  },
  {
    label: "Pengaturan Akun",
    href: "/dashboard/pencaker/pengaturan",
    icon: Settings,
    category: "Akun",
  },
  {
    label: "Bantuan",
    href: "/dashboard/pencaker/bantuan",
    icon: HelpCircle,
    category: "Akun",
  },
];

// --- DUMMY NOTIFICATIONS ---
const notificationsList = [
  {
    id: 1,
    title: "Undangan Wawancara",
    message: "PT AMNT mengundang Anda untuk Wawancara User pada 25 Sept 2026.",
    time: "10 menit lalu",
    type: "success",
  },
  {
    id: 2,
    title: "Status Lamaran",
    message: "Lamaran 'Senior Geologist' Anda sedang direview.",
    time: "2 jam lalu",
    type: "info",
  },
];

export default function CandidateHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "/dashboard";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar dari akun?")) {
      alert("Logout berhasil!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased">
      {/* 1. TOP HEADER NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Main Nav */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/images/karir-logo-0.png"
                    alt="Samawa Karir Logo"
                    width={200}
                    height={100}
                    className="h-10 w-auto object-contain"
                    priority
                  />
                </div>
              </Link>

              {/* Desktop Primary Nav Bar */}
              <nav className="hidden md:flex items-center gap-1">
                {primaryNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                        isActive
                          ? "bg-app-navy-50 text-app-navy-800"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${
                          isActive ? "text-app-navy-700" : "text-slate-400"
                        }`}
                      />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right Action Icons & Profile */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Notifikasi Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsNotificationsOpen(!isNotificationsOpen);
                    setIsProfileMenuOpen(false);
                  }}
                  className="relative p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
                </button>

                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
                    <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase text-slate-800">
                        Notifikasi
                      </h3>
                      <Link
                        href="/dashboard/notifikasi"
                        onClick={() => setIsNotificationsOpen(false)}
                        className="text-[11px] font-bold text-app-navy-700 hover:underline"
                      >
                        Lihat Semua
                      </Link>
                    </div>
                    <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                      {notificationsList.map((notif) => (
                        <div
                          key={notif.id}
                          className="p-3 hover:bg-slate-50 flex gap-3 text-xs"
                        >
                          {notif.type === "success" ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p className="font-bold text-slate-800">
                              {notif.title}
                            </p>
                            <p className="text-[11px] text-slate-600">
                              {notif.message}
                            </p>
                            <span className="text-[10px] text-slate-400">
                              {notif.time}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="h-5 w-px bg-slate-200 hidden sm:block" />

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(!isProfileMenuOpen);
                    setIsNotificationsOpen(false);
                  }}
                  className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-app-navy-800 text-white flex items-center justify-center font-bold text-xs">
                    FA
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-bold text-slate-800 leading-none">
                      Fajar A.
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Pencari Kerja
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 z-50 py-1 text-xs">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="font-bold text-slate-800">
                        Fajar Ardiansyah
                      </p>
                      <p className="text-[10px] text-slate-500">
                        fajar.dev@sumbawa.go.id
                      </p>
                    </div>
                    <Link
                      href="/dashboard/profil"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>Profil Saya</span>
                    </Link>
                    <Link
                      href="/dashboard/dokumen"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50"
                    >
                      <FileText className="w-4 h-4 text-slate-400" />
                      <span>CV & Dokumen</span>
                    </Link>
                    <Link
                      href="/dashboard/pengaturan"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      <span>Pengaturan Akun</span>
                    </Link>
                    <div className="border-t border-slate-100 my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-rose-600 hover:bg-rose-50 text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Keluar (Logout)</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 md:hidden"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2">
                Menu Utama
              </p>
              {allNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] bg-rose-500 text-white font-bold rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. SUB-HEADER / TAB NAVIGATION HUB */}
      <div className="bg-white border-b border-slate-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-2 text-xs">
            <span className="text-slate-400 font-bold uppercase text-[10px] shrink-0">
              Akses Cepat:
            </span>
            {allNavItems.slice(4).map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 py-1 px-2.5 rounded-full font-medium shrink-0 transition-colors ${
                    isActive
                      ? "bg-app-navy-700 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. AREA KONTEN UTAMA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

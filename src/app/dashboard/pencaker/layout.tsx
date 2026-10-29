"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import TopHeaderNav from "@/features/dashboard-pencaker/components/TopHeaderNav";
import SubHeaderNav from "@/features/dashboard-pencaker/components/SubHeaderNav";
import { useAuthUser } from "@/shared/contexts/SessionContext";
import { useToast } from "@/shared/contexts/ToastContext";

// --- NAVIGASI UTAMA (TOP NAVBAR) ---
const primaryNavItems = [
  { label: "Dashboard", href: "/dashboard/pencaker", icon: LayoutDashboard },
  {
    label: "Cari Lowongan",
    href: "/lowongan-kerja",
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
  // {
  //   label: "Bantuan",
  //   href: "/dashboard/pencaker/bantuan",
  //   icon: HelpCircle,
  //   category: "Akun",
  // },
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
  const router = useRouter();
  const { user, isLoading } = useAuthUser();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      if (isLoading) return;

      if (user?.account_type !== "job_seeker") {
        setIsAuthorized(false);
        router.push("/403");
        return;
      }
      setIsAuthorized(true);
    };
    checkLogin();
  }, [user, isLoading, router]);
  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased">
      <TopHeaderNav />
      <SubHeaderNav />

      {/* 3. AREA KONTEN UTAMA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

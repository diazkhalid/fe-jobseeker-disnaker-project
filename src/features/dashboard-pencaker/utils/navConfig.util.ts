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
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  category: string;
  badge?: number;
};

export const primaryNavItems = [
  { label: "Dashboard", href: "/dashboard/pencaker", icon: LayoutDashboard },
  { label: "Cari Lowongan", href: "/lowongan-kerja", icon: Search },
  { label: "Lamaran Saya", href: "/dashboard/pencaker/lamaran", icon: Send },
  {
    label: "Jadwal Seleksi",
    href: "/dashboard/pencaker/jadwal",
    icon: Calendar,
  },
];

export const allNavItems: NavItem[] = [
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
];

export const notificationsList = [
  {
    id: 1,
    title: "Undangan Wawancara",
    message: "PT AMNT mengundang Anda untuk Wawancara User pada 25 Sept 2026.",
    time: "10 menit lalu",
    type: "success" as const,
  },
  {
    id: 2,
    title: "Status Lamaran",
    message: "Lamaran 'Senior Geologist' Anda sedang direview.",
    time: "2 jam lalu",
    type: "info" as const,
  },
];

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  Users,
  GitMerge,
  MessageSquare,
  BarChart3,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  PlusCircle,
  FileText,
  Archive,
  UserCheck,
  UserPlus,
  Clock,
  Calendar,
  CheckCircle2,
  ListOrdered,
  UserCog,
  ShieldCheck,
  BellRing,
  Send,
  MailClock,
} from "lucide-react";

interface SubMenuItem {
  title: string;
  href: string;
  icon?: React.ElementType;
  badge?: string | number;
}

interface MenuItem {
  title: string;
  href?: string;
  icon: React.ElementType;
  badge?: string | number;
  submenu?: SubMenuItem[];
}

export default function Sidebar() {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(
    "Lowongan Kerja",
  );

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu((prev) => (prev === title ? null : title));
  };

  const menuItems: MenuItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard/perusahaan",
      icon: LayoutDashboard,
    },
    {
      title: "Profil Perusahaan",
      href: "/dashboard/perusahaan/profil",
      icon: Building2,
    },
    {
      title: "Lowongan Kerja",
      icon: Briefcase,
      submenu: [
        {
          title: "Semua Lowongan",
          href: "/dashboard/perusahaan/lowongan",
          icon: Briefcase,
        },
        {
          title: "Buat Lowongan",
          href: "/dashboard/perusahaan/lowongan/buat",
          icon: PlusCircle,
        },
        {
          title: "Draft Lowongan",
          href: "/dashboard/perusahaan/lowongan/draft",
          icon: FileText,
          badge: 2,
        },
        {
          title: "Arsip Lowongan",
          href: "/dashboard/perusahaan/lowongan/arsip",
          icon: Archive,
        },
      ],
    },
    {
      title: "Pelamar",
      icon: Users,
      badge: "New",
      submenu: [
        {
          title: "Semua Pelamar",
          href: "/dashboard/perusahaan/pelamar",
          icon: Users,
        },
        {
          title: "Pelamar Baru",
          href: "/dashboard/perusahaan/pelamar/baru",
          icon: UserPlus,
          badge: 12,
        },
        {
          title: "Dalam Proses Seleksi",
          href: "/dashboard/perusahaan/pelamar/proses",
          icon: Clock,
        },
        {
          title: "Kandidat Diterima",
          href: "/dashboard/perusahaan/pelamar/diterima",
          icon: UserCheck,
        },
      ],
    },
    {
      title: "Proses Seleksi",
      icon: GitMerge,
      submenu: [
        {
          title: "Tahapan Rekrutmen",
          href: "/dashboard/perusahaan/seleksi",
          icon: ListOrdered,
        },
        {
          title: "Jadwal Seleksi",
          href: "/dashboard/perusahaan/seleksi/jadwal",
          icon: Calendar,
        },
        {
          title: "Hasil Seleksi",
          href: "/dashboard/perusahaan/seleksi/hasil",
          icon: CheckCircle2,
        },
      ],
    },
    {
      title: "Pesan",
      icon: MessageSquare,
      submenu: [
        {
          title: "Riwayat",
          href: "/dashboard/perusahaan/pesan",
          icon: MailClock,
        },
        {
          title: "Buat Pesan",
          href: "/dashboard/perusahaan/pesan/buat",
          icon: Send,
        },
      ],
    },
    {
      title: "Laporan Rekrutmen",
      href: "/dashboard/perusahaan/laporan",
      icon: BarChart3,
    },
    {
      title: "Notifikasi",
      href: "/dashboard/perusahaan/notifikasi",
      icon: Bell,
    },
    {
      title: "Pengaturan",
      icon: Settings,
      submenu: [
        {
          title: "Pengaturan Akun",
          href: "/dashboard/perusahaan/pengaturan/akun",
          icon: Settings,
        },
        {
          title: "Pengguna & Tim",
          href: "/dashboard/perusahaan/pengaturan/tim",
          icon: UserCog,
        },
        {
          title: "Keamanan",
          href: "/dashboard/perusahaan/pengaturan/keamanan",
          icon: ShieldCheck,
        },
        {
          title: "Preferensi Notifikasi",
          href: "/dashboard/perusahaan/pengaturan/notifikasi",
          icon: BellRing,
        },
      ],
    },
  ];

  return (
    <aside className="w-[15%] h-screen bg-white text-slate-700 flex flex-col border-r border-slate-200 sticky top-0 left-0 z-40 select-none">
      {/* BRAND / LOGO */}
      <div className="pl-5">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-30 h-20 shrink-0">
            <Image
              src="/images/karir-logo-0.png"
              alt="Logo App"
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-200"
              priority
            />
          </div>
        </Link>
      </div>

      {/* NAVIGATION MENU */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-200">
        <div className="px-3 pb-2 text-[0.625rem] font-bold text-slate-400 uppercase tracking-wider">
          Menu Utama
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const hasSubmenu = Boolean(item.submenu && item.submenu.length > 0);
          const isSubmenuOpen = openSubmenu === item.title;

          const isParentActive = item.href
            ? pathname === item.href
            : item.submenu?.some((sub) => pathname === sub.href);

          return (
            <div key={item.title} className="space-y-0.5">
              {hasSubmenu ? (
                <button
                  onClick={() => toggleSubmenu(item.title)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[0.75rem] font-medium transition-all duration-200 group ${
                    isParentActive
                      ? "bg-teal-50/80 text-teal-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isParentActive
                          ? "text-teal-600"
                          : "text-slate-400 group-hover:text-slate-700"
                      }`}
                    />
                    <span>{item.title}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className="px-2 py-0.5 text-[0.6rem] font-bold rounded-full bg-teal-100 text-teal-700">
                        {item.badge}
                      </span>
                    )}
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                        isSubmenuOpen ? "rotate-180 text-slate-700" : ""
                      }`}
                    />
                  </div>
                </button>
              ) : (
                <Link
                  href={item.href || "#"}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-[0.75rem] font-medium transition-all duration-200 group ${
                    pathname === item.href
                      ? "bg-teal-600 text-white font-semibold shadow-sm shadow-teal-600/20"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        pathname === item.href
                          ? "text-white"
                          : "text-slate-400 group-hover:text-slate-700"
                      }`}
                    />
                    <span>{item.title}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 text-[0.6rem] font-bold rounded-full ${
                        pathname === item.href
                          ? "bg-white/20 text-white"
                          : "bg-teal-100 text-teal-700"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}

              {hasSubmenu && (
                <AnimatePresence>
                  {isSubmenuOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-4 pr-1 space-y-0.5 border-l border-slate-200 ml-5 my-1"
                    >
                      {item.submenu?.map((sub) => {
                        const SubIcon = sub.icon;
                        const isSubActive = pathname === sub.href;

                        return (
                          <Link
                            key={sub.title}
                            href={sub.href}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-[0.7rem] font-medium transition-all duration-150 ${
                              isSubActive
                                ? "bg-teal-50 text-teal-700 font-semibold"
                                : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/70"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {SubIcon && (
                                <SubIcon
                                  className={`w-3.5 h-3.5 ${
                                    isSubActive
                                      ? "text-teal-600"
                                      : "text-slate-400"
                                  }`}
                                />
                              )}
                              <span>{sub.title}</span>
                            </div>

                            {sub.badge && (
                              <span className="px-1.5 py-0.2 text-[0.55rem] font-bold rounded-md bg-teal-100 text-teal-700">
                                {sub.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          );
        })}
      </div>

      {/* BOTTOM SECTION: HELP & LOGOUT */}
      {/* <div className="p-3 border-t border-slate-100 space-y-1">
        <Link
          href="/dashboard/perusahaan/bantuan"
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-[0.75rem] font-medium transition-colors ${
            pathname === "/dashboard/perusahaan/bantuan"
              ? "bg-teal-50 text-teal-700"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <HelpCircle className="w-4 h-4 text-slate-400" />
          <span>Pusat Bantuan</span>
        </Link>

        <button
          onClick={() => console.log("Logout diklik")}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[0.75rem] font-medium text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar</span>
        </button>
      </div> */}
    </aside>
  );
}

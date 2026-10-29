"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  FileText,
  Info,
  LogOut,
  Menu,
  Settings,
  User,
  X,
} from "lucide-react";
import {
  allNavItems,
  notificationsList,
  primaryNavItems,
} from "../utils/navConfig.util";
import { useAuthUser } from "@/shared/contexts/SessionContext";
import { accountTypeMap } from "@/shared/utils/userAccountTypeMap";
import APP_CONFIG from "@/shared/global/app_config";
import { useJobSeekerProfile } from "@/features/profil-pencaker/hooks/useUserProfile.hook";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { logout } from "@/features/auth/services/auth.service";
import { useToast } from "@/shared/contexts/ToastContext";

export default function TopHeaderNav() {
  const pathname = usePathname() || "/dashboard";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { jobSeekerProfile } = useJobSeekerProfile();
  const [token] = useLocalStorage("access-token", null);

  const { user, isLoading } = useAuthUser();
  const { addToast } = useToast();

  const handleLogout = async () => {
    if (!token) return;
    const result = await logout(token);
    if (result.status !== 200) {
      addToast("Gagal logout", "error");
      return;
    }

    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/karir-logo-1.png"
                  alt="SIMNAKER Logo"
                  width={200}
                  height={100}
                  className="h-10 w-auto object-contain"
                  priority
                />
              </div>
            </Link>

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
                      className={`w-4 h-4 ${isActive ? "text-app-navy-700" : "text-slate-400"}`}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <button
                type="button"
                aria-label="Buka notifikasi"
                aria-expanded={isNotificationsOpen}
                onClick={() => {
                  setIsNotificationsOpen((open) => !open);
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
                      href="/dashboard/pencaker/notifikasi"
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

            <div className="relative">
              <button
                type="button"
                aria-expanded={isProfileMenuOpen}
                onClick={() => {
                  setIsProfileMenuOpen((open) => !open);
                  setIsNotificationsOpen(false);
                }}
                className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="relative w-5 h-5 sm:w-8 sm:h-8 rounded-full overflow-hidden border-2 border-app-navy-400/50 bg-slate-800 shrink-0">
                  {jobSeekerProfile?.profile_photo_url ? (
                    <Image
                      src={`${APP_CONFIG.STORAGE_URL}${jobSeekerProfile?.profile_photo_url}`}
                      alt="Foto Profil"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex h-full flex-col justify-center text-sm font-medium items-center text-slate-500">
                      {user?.full_name.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-bold text-slate-800 leading-none">
                    {user?.full_name}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    {user?.account_type
                      ? accountTypeMap[user?.account_type]
                      : "-"}
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 z-50 py-1 text-xs">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="font-bold text-slate-800">
                      {user?.full_name}
                    </p>
                    <p className="text-[10px] text-slate-500">{user?.email}</p>
                  </div>
                  <Link
                    href="/dashboard/pencaker/profil"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50"
                  >
                    <User className="w-4 h-4 text-slate-400" />{" "}
                    <span>Profil Saya</span>
                  </Link>
                  <Link
                    href="/dashboard/pencaker/dokumen"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50"
                  >
                    <FileText className="w-4 h-4 text-slate-400" />{" "}
                    <span>CV &amp; Dokumen</span>
                  </Link>
                  <Link
                    href="/dashboard/pencaker/pengaturan"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />{" "}
                    <span>Pengaturan Akun</span>
                  </Link>
                  <div className="border-t border-slate-100 my-1" />
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-rose-600 hover:bg-rose-50 text-left"
                  >
                    <LogOut className="w-4 h-4" /> <span>Keluar (Logout)</span>
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
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
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50"
            >
              <LogOut className="w-4 h-4" /> <span>Keluar</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

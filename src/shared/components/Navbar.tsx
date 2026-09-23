"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  FileText,
  Bookmark,
  Settings,
  Sparkles,
  Clock,
  Building2,
  GraduationCap,
  Laptop,
  Flame,
  Search,
} from "lucide-react";

// Tipe lowongan untuk Dropdown Lowongan Kerja
const jobCategories = [
  {
    title: "Semua Lowongan",
    desc: "Jelajahi seluruh peluang karir di Sumbawa",
    href: "/lowongan",
    icon: Search,
    badge: null,
  },
  {
    title: "Lowongan Terbaru",
    desc: "Peluang kerja yang baru dipublikasikan",
    href: "/lowongan?filter=terbaru",
    icon: Flame,
    badge: "Hot",
  },
  {
    title: "Full-Time (Penuh Waktu)",
    desc: "Karir permanen & kontrak jangka panjang",
    href: "/lowongan?tipe=full-time",
    icon: Clock,
    badge: null,
  },
  {
    title: "Remote / Work From Home",
    desc: "Kerja fleksibel dari mana saja",
    href: "/lowongan?tipe=remote",
    icon: Laptop,
    badge: "Populer",
  },
  {
    title: "BUMN & Instansi Daerah",
    desc: "Peluang karir di sektor pemerintahan & BUMN",
    href: "/lowongan?kategori=bumn",
    icon: Building2,
    badge: null,
  },
  {
    title: "Magang & Fresh Graduate",
    desc: "Khusus lulusan baru & program magang",
    href: "/lowongan?kategori=magang",
    icon: GraduationCap,
    badge: null,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // State Dropdown Lowongan (Desktop & Mobile)
  const [isJobsDropdownOpen, setIsJobsDropdownOpen] = useState(false);
  const [isMobileJobsOpen, setIsMobileJobsOpen] = useState(false);

  // State simulasi login
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Reference & Click Outside listener untuk dropdown desktop
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsJobsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll handler untuk efek sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hideNavbar =
    pathname.startsWith("/dashboard") ||
    ["login", "registration"].some((route) => pathname.includes(route));

  if (hideNavbar) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 backdrop-blur-md shadow-sm shadow-slate-900/5 py-3 border-b border-teal-900/5"
          : "bg-white py-4 border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* 1. LOGO SAMAWA KARIR (GAMBAR LOGO) */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/karir-logo-0.png"
                alt="Samawa Karir Logo"
                width={200}
                height={100}
                className="h-12 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* 2. NAVIGATION MENU (DESKTOP) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-50/80 p-1.5 rounded-full border border-slate-200/60 shadow-inner">
            {/* Beranda */}
            <Link
              href="/"
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 relative ${
                pathname === "/"
                  ? "text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Beranda
              {pathname === "/" && (
                <motion.div
                  layoutId="activeTabNav"
                  className="absolute inset-0 bg-white rounded-full shadow-sm border border-teal-500/20 -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>

            {/* DROPDOWN: Lowongan Kerja */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsJobsDropdownOpen(!isJobsDropdownOpen)}
                onMouseEnter={() => setIsJobsDropdownOpen(true)}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 ${
                  pathname.startsWith("/lowongan") || isJobsDropdownOpen
                    ? "text-teal-700 bg-teal-50/80"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>Lowongan Kerja</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isJobsDropdownOpen
                      ? "rotate-180 text-teal-600"
                      : "text-slate-400"
                  }`}
                />
              </button>

              {/* Mega Dropdown Box */}
              <AnimatePresence>
                {isJobsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    onMouseLeave={() => setIsJobsDropdownOpen(false)}
                    className="absolute top-full left-0 mt-2 w-[480px] bg-white rounded-2xl shadow-2xl shadow-slate-900/10 border border-slate-100 p-3 z-50 grid grid-cols-2 gap-1.5"
                  >
                    {jobCategories.map((cat, idx) => {
                      const Icon = cat.icon;
                      return (
                        <Link
                          key={idx}
                          href={cat.href}
                          onClick={() => setIsJobsDropdownOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-teal-50/60 transition-all group"
                        >
                          <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-teal-600 text-slate-700 group-hover:text-white transition-colors mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                                {cat.title}
                              </span>
                              {cat.badge && (
                                <span
                                  className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full ${
                                    cat.badge === "Hot"
                                      ? "bg-rose-100 text-rose-600"
                                      : "bg-teal-100 text-teal-700"
                                  }`}
                                >
                                  {cat.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-500 leading-tight mt-0.5 line-clamp-1">
                              {cat.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Perusahaan */}
            <Link
              href="/perusahaan"
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 relative ${
                pathname === "/perusahaan"
                  ? "text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Perusahaan
              {pathname === "/perusahaan" && (
                <motion.div
                  layoutId="activeTabNav"
                  className="absolute inset-0 bg-white rounded-full shadow-sm border border-teal-500/20 -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>

            {/* Informasi Karir */}
            <Link
              href="/informasi-karir"
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 relative ${
                pathname === "/informasi-karir"
                  ? "text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Informasi Karir
              {pathname === "/informasi-karir" && (
                <motion.div
                  layoutId="activeTabNav"
                  className="absolute inset-0 bg-white rounded-full shadow-sm border border-teal-500/20 -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>

            {/* Tentang Kami */}
            <Link
              href="/tentang"
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 relative ${
                pathname === "/tentang"
                  ? "text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Tentang Kami
              {pathname === "/tentang" && (
                <motion.div
                  layoutId="activeTabNav"
                  className="absolute inset-0 bg-white rounded-full shadow-sm border border-teal-500/20 -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          </nav>

          {/* 3. RIGHT SECTION: CTA & AUTH (DESKTOP) */}
          <div className="hidden lg:flex items-center gap-3">
            {/* CTA Pasang Lowongan */}
            <Link
              href="/pasang-lowongan"
              className="group relative inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-full text-teal-800 bg-teal-50/80 hover:bg-teal-100/80 border border-teal-200 transition-all duration-200"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600 group-hover:rotate-12 transition-transform" />
              <span>Pasang Lowongan</span>
            </Link>

            <div className="h-4 w-[1px] bg-slate-200 mx-1" />

            {/* AUTH STATE */}
            {isLoggedIn ? (
              /* Dropdown Profile */
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-all focus:outline-none"
                >
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-teal-300 flex items-center justify-center text-xs font-bold ring-2 ring-teal-500/30">
                    A
                  </div>
                  <span className="text-xs font-semibold text-slate-800">
                    Ahmad
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 py-2 z-50"
                    >
                      <div className="px-4 py-2.5 border-b border-slate-100">
                        <p className="text-[10px] uppercase font-bold text-teal-600 tracking-wider">
                          Pencari Kerja
                        </p>
                        <p className="text-xs font-semibold text-slate-900 truncate">
                          ahmad@example.com
                        </p>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/profil"
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-teal-50/50 transition-colors"
                        >
                          <User className="w-4 h-4 text-teal-600" /> Profil Saya
                        </Link>
                        <Link
                          href="/lamaran-saya"
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-teal-50/50 transition-colors"
                        >
                          <FileText className="w-4 h-4 text-teal-600" /> Lamaran
                          Saya
                        </Link>
                        <Link
                          href="/tersimpan"
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-teal-50/50 transition-colors"
                        >
                          <Bookmark className="w-4 h-4 text-teal-600" /> Saved
                          Jobs
                        </Link>
                        <Link
                          href="/pengaturan"
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-teal-50/50 transition-colors"
                        >
                          <Settings className="w-4 h-4 text-teal-600" />{" "}
                          Pengaturan
                        </Link>
                      </div>

                      <div className="border-t border-slate-100 pt-1 mt-1">
                        <button
                          onClick={() => setIsLoggedIn(false)}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 text-left transition-colors"
                        >
                          <LogOut className="w-4 h-4" /> Keluar
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Buttons Masuk & Daftar */
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-teal-600 transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  href="/daftar"
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-teal-700 rounded-full shadow-md shadow-slate-900/10 transition-all duration-300"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>

          {/* 4. HAMBURGER BUTTON (MOBILE) */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 5. MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-100 shadow-xl overflow-hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="px-4 pt-3 pb-6 space-y-4">
              <div className="space-y-1">
                {/* Mobile: Beranda */}
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    pathname === "/"
                      ? "bg-teal-50 text-teal-700 border-l-4 border-teal-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Beranda
                </Link>

                {/* Mobile: Accordion Lowongan Kerja */}
                <div>
                  <button
                    onClick={() => setIsMobileJobsOpen(!isMobileJobsOpen)}
                    className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <span>Lowongan Kerja</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isMobileJobsOpen ? "rotate-180 text-teal-600" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isMobileJobsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 pr-2 py-1 space-y-1 bg-slate-50/50 rounded-xl my-1 border border-slate-100"
                      >
                        {jobCategories.map((cat, i) => {
                          const Icon = cat.icon;
                          return (
                            <Link
                              key={i}
                              href={cat.href}
                              onClick={() => {
                                setIsMobileJobsOpen(false);
                                setIsMobileMenuOpen(false);
                              }}
                              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
                            >
                              <Icon className="w-3.5 h-3.5 text-teal-600" />
                              <span>{cat.title}</span>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile: Perusahaan */}
                <Link
                  href="/perusahaan"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    pathname === "/perusahaan"
                      ? "bg-teal-50 text-teal-700 border-l-4 border-teal-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Perusahaan
                </Link>

                {/* Mobile: Informasi Karir */}
                <Link
                  href="/informasi-karir"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    pathname === "/informasi-karir"
                      ? "bg-teal-50 text-teal-700 border-l-4 border-teal-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Informasi Karir
                </Link>

                {/* Mobile: Tentang Kami */}
                <Link
                  href="/tentang"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    pathname === "/tentang"
                      ? "bg-teal-50 text-teal-700 border-l-4 border-teal-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Tentang Kami
                </Link>
              </div>

              {/* Mobile CTA & Auth */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <Link
                  href="/pasang-lowongan"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200/80 rounded-xl"
                >
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  Pasang Lowongan Perusahaan
                </Link>

                {isLoggedIn ? (
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-3 px-4 py-2">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-teal-300 flex items-center justify-center font-bold text-xs">
                        A
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-900">
                          Ahmad
                        </p>
                        <p className="text-[10px] text-slate-400">
                          ahmad@example.com
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 space-y-1">
                      <Link
                        href="/profil"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 rounded-lg"
                      >
                        Profil Saya
                      </Link>
                      <button
                        onClick={() => {
                          setIsLoggedIn(false);
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg"
                      >
                        Keluar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Link
                      href="/masuk"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full text-center py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-xl"
                    >
                      Masuk
                    </Link>
                    <Link
                      href="/daftar"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full text-center py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-xl shadow-md shadow-slate-900/10"
                    >
                      Daftar
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

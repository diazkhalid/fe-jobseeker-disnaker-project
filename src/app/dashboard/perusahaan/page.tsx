"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Briefcase,
  Users,
  UserPlus,
  Clock,
  Calendar,
  UserCheck,
  PlusCircle,
  Eye,
  CheckCircle2,
  ArrowRight,
  MoreVertical,
  Building2,
  AlertCircle,
  FileText,
  User,
  ExternalLink,
} from "lucide-react";

export default function DashboardOverviewPage() {
  // Mock Data untuk Statistik Rekrutmen
  const stats = [
    {
      title: "Lowongan Aktif",
      value: "12",
      desc: "Sedang dipublikasikan",
      icon: Briefcase,
      color: "bg-teal-500/10 text-teal-600 border-teal-200",
    },
    {
      title: "Total Pelamar",
      value: "1,284",
      desc: "Seluruh kandidat melamar",
      icon: Users,
      color: "bg-blue-500/10 text-blue-600 border-blue-200",
    },
    {
      title: "Pelamar Baru",
      value: "48",
      desc: "Belum ditinjau",
      icon: UserPlus,
      color: "bg-amber-500/10 text-amber-600 border-amber-200",
      badge: "+12 hari ini",
    },
    {
      title: "Dalam Seleksi",
      value: "86",
      desc: "Sedang diproses",
      icon: Clock,
      color: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
    },
    {
      title: "Jadwal Interview",
      value: "8",
      desc: "Interview mendatang",
      icon: Calendar,
      color: "bg-purple-500/10 text-purple-600 border-purple-200",
    },
    {
      title: "Kandidat Diterima",
      value: "34",
      desc: "Telah lolos seleksi",
      icon: UserCheck,
      color: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    },
  ];

  // Mock Data Lowongan Aktif
  const activeJobs = [
    {
      id: "1",
      title: "Frontend Developer (React/Next.js)",
      type: "Full-time",
      applicants: 142,
      publishedAt: "12 Sep 2026",
      deadline: "30 Sep 2026",
      status: "Aktif",
    },
    {
      id: "2",
      title: "UI/UX Designer",
      type: "Full-time",
      applicants: 89,
      publishedAt: "15 Sep 2026",
      deadline: "05 Okt 2026",
      status: "Aktif",
    },
    {
      id: "3",
      title: "Digital Marketing Specialist",
      type: "Contract",
      applicants: 54,
      publishedAt: "18 Sep 2026",
      deadline: "28 Sep 2026",
      status: "Hampir Berakhir",
    },
    {
      id: "4",
      title: "Backend Engineer (Golang)",
      type: "Full-time",
      applicants: 96,
      publishedAt: "20 Sep 2026",
      deadline: "10 Okt 2026",
      status: "Aktif",
    },
  ];

  // Mock Data Pelamar Terbaru
  const recentApplicants = [
    {
      id: "1",
      name: "Ahmad Rizky",
      position: "Frontend Developer",
      appliedAt: "10 menit lalu",
      status: "Pelamar Baru",
      avatar: "/images/avatars/user-1.png", // fallback ke icon jika image tidak ada
    },
    {
      id: "2",
      name: "Siti Nurhaliza",
      position: "UI/UX Designer",
      appliedAt: "1 jam lalu",
      status: "Review Berkas",
      avatar: "/images/avatars/user-2.png",
    },
    {
      id: "3",
      name: "Budi Santoso",
      position: "Backend Engineer",
      appliedAt: "3 jam lalu",
      status: "Jadwal Interview",
      avatar: "/images/avatars/user-3.png",
    },
    {
      id: "4",
      name: "Dina Pratama",
      position: "Digital Marketing",
      appliedAt: "5 jam lalu",
      status: "Pelamar Baru",
      avatar: "/images/avatars/user-4.png",
    },
  ];

  // Mock Data Aktivitas Terbaru
  const recentActivities = [
    {
      id: "1",
      text: "Kandidat baru (Ahmad Rizky) melamar posisi Frontend Developer.",
      time: "10 menit yang lalu",
      type: "applicant",
    },
    {
      id: "2",
      text: "Lowongan Digital Marketing Specialist akan berakhir dalam 3 hari.",
      time: "2 jam yang lalu",
      type: "warning",
    },
    {
      id: "3",
      text: "Profil perusahaan berhasil diverifikasi oleh tim admin.",
      time: "1 hari yang lalu",
      type: "success",
    },
    {
      id: "4",
      text: "Interview kandidat Budi Santoso dijadwalkan besok pukul 10:00 WITA.",
      time: "1 hari yang lalu",
      type: "event",
    },
  ];

  return (
    <div className="space-y-6 w-full font-['Poppins',sans-serif] bg-slate-50/50 min-h-screen">
      {/* SEKSI A & B: GREETING & STATUS PROFIL PERUSAHAAN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Seksi A: Greeting Banner */}
        <div className="lg:col-span-2 bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 rounded-2xl p-6 text-white shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="space-y-2 z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-[0.65rem] font-semibold border border-teal-500/30">
              <CheckCircle2 className="w-3 h-3 text-teal-400" /> Perusahaan
              Terverifikasi
            </span>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Selamat datang, PT Samawa Digital Nusantara!
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Kelola lowongan kerja dan temukan kandidat terbaik untuk kebutuhan
              pertumbuhan bisnis perusahaan Anda.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-3 z-10">
            <div className="flex items-center gap-4 text-xs text-slate-300">
              <div>
                <span className="text-slate-400 block text-[0.65rem]">
                  ID Mitra
                </span>
                <span className="font-semibold text-white">SMW-2026-091</span>
              </div>
              <div className="h-6 w-[1px] bg-slate-700" />
              <div>
                <span className="text-slate-400 block text-[0.65rem]">
                  Paket Layanan
                </span>
                <span className="font-semibold text-teal-400">
                  Enterprise Partner
                </span>
              </div>
            </div>

            <Link
              href="/dashboard/lowongan/buat"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold text-xs transition-colors shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Pasang Lowongan Baru</span>
            </Link>
          </div>
        </div>

        {/* Seksi B: Status Profil Perusahaan */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl border border-slate-200 bg-slate-50 p-1 shrink-0 overflow-hidden">
                <Image
                  src="/images/karir-logo-0.png"
                  alt="Logo Perusahaan"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  Status Profil
                </h3>
                <p className="text-[0.65rem] text-slate-500">
                  Kelengkapan data publikasi
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">
              80% Lengkap
            </span>
          </div>

          {/* Progress Bar */}
          <div className="my-4 space-y-1.5">
            <div className="flex justify-between text-[0.65rem] font-medium">
              <span className="text-slate-600">Progress Kelengkapan</span>
              <span className="text-slate-900 font-bold">80/100%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-teal-600 rounded-full w-[80%] transition-all duration-500" />
            </div>
            <p className="text-[0.65rem] text-slate-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-amber-500 shrink-0" />
              Lengkapi legalitas NPWP untuk verifikasi 100%
            </p>
          </div>

          <Link
            href="/dashboard/profil"
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200/60 transition-colors"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Lengkapi Profil Perusahaan</span>
          </Link>
        </div>
      </div>

      {/* SEKSI G: QUICK ACTIONS (Akses Cepat) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider block mb-3">
          Aksi Cepat
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/dashboard/lowongan/buat"
            className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 group-hover:text-teal-700">
                Buat Lowongan
              </p>
              <p className="text-[0.625rem] text-slate-500">
                Tambah posisi baru
              </p>
            </div>
          </Link>

          <Link
            href="/dashboard/pelamar"
            className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 group-hover:text-teal-700">
                Lihat Pelamar
              </p>
              <p className="text-[0.625rem] text-slate-500">
                Tinjau kandidat masuk
              </p>
            </div>
          </Link>

          <Link
            href="/dashboard/profil"
            className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 group-hover:text-teal-700">
                Perbarui Profil
              </p>
              <p className="text-[0.625rem] text-slate-500">
                Update data perusahaan
              </p>
            </div>
          </Link>

          <Link
            href="/dashboard/seleksi/interview"
            className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 group-hover:text-teal-700">
                Atur Interview
              </p>
              <p className="text-[0.625rem] text-slate-500">
                Jadwalkan wawancara
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* SEKSI C: STATISTIK REKRUTMEN */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-900">
            Statistik Rekrutmen
          </h2>
          <span className="text-[0.65rem] text-slate-500">
            Update realtime hari ini
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className={`p-2 rounded-xl border ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {item.badge && (
                    <span className="text-[0.55rem] font-bold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-700">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-xl font-bold text-slate-900">
                    {item.value}
                  </p>
                  <p className="text-[0.7rem] font-semibold text-slate-700 mt-0.5">
                    {item.title}
                  </p>
                  <p className="text-[0.625rem] text-slate-400 mt-0.5 truncate">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SEKSI D & E: LOWONGAN AKTIF & PELAMAR TERBARU */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seksi D: Tabel Lowongan Aktif (2 Kolom di Desktop) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Lowongan Aktif
              </h3>
              <p className="text-[0.65rem] text-slate-500">
                Daftar lowongan kerja yang sedang dipublikasikan
              </p>
            </div>
            <Link
              href="/dashboard/lowongan"
              className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 pr-4">Posisi</th>
                  <th className="pb-3 px-3">Tipe</th>
                  <th className="pb-3 px-3 text-center">Pelamar</th>
                  <th className="pb-3 px-3">Batas Akhir</th>
                  <th className="pb-3 px-3">Status</th>
                  <th className="pb-3 pl-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {activeJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3 pr-4">
                      <p className="font-semibold text-slate-900 hover:text-teal-600 transition-colors cursor-pointer">
                        {job.title}
                      </p>
                      <span className="text-[0.625rem] text-slate-400">
                        Rilis: {job.publishedAt}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[0.65rem] font-medium">
                        {job.type}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="font-bold text-slate-900">
                        {job.applicants}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-500 text-[0.7rem]">
                      {job.deadline}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[0.6rem] font-bold ${
                          job.status === "Aktif"
                            ? "bg-teal-100 text-teal-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="py-3 pl-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/dashboard/lowongan/${job.id}`}
                          className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Lihat Detail"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Seksi E: Pelamar Terbaru (1 Kolom di Desktop) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Pelamar Terbaru
                </h3>
                <p className="text-[0.65rem] text-slate-500">
                  Kandidat terbaru yang mengirimkan berkas
                </p>
              </div>
              <Link
                href="/dashboard/pelamar"
                className="text-xs font-semibold text-teal-600 hover:text-teal-700"
              >
                Semua
              </Link>
            </div>

            <div className="space-y-3">
              {recentApplicants.map((applicant) => (
                <div
                  key={applicant.id}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-slate-500">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {applicant.name}
                      </p>
                      <p className="text-[0.65rem] text-slate-500 truncate">
                        {applicant.position}
                      </p>
                      <span className="text-[0.6rem] text-slate-400">
                        {applicant.appliedAt}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/dashboard/pelamar/${applicant.id}`}
                    className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors shrink-0"
                    title="Detail Pelamar"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/dashboard/pelamar"
            className="w-full text-center py-2 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-xl transition-colors block mt-2"
          >
            Tinjau Semua Pelamar
          </Link>
        </div>
      </div>

      {/* SEKSI F: AKTIVITAS TERBARU */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Aktivitas Terbaru
            </h3>
            <p className="text-[0.65rem] text-slate-500">
              Log riwayat aksi rekrutmen dan sistem
            </p>
          </div>
          <span className="text-[0.65rem] font-medium text-slate-400">
            4 Aktivitas Hari Ini
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {recentActivities.map((act) => (
            <div
              key={act.id}
              className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2 flex flex-col justify-between"
            >
              <div className="flex items-start gap-2.5">
                <div
                  className={`p-1.5 rounded-lg shrink-0 ${
                    act.type === "applicant"
                      ? "bg-blue-100 text-blue-600"
                      : act.type === "warning"
                        ? "bg-amber-100 text-amber-600"
                        : act.type === "success"
                          ? "bg-teal-100 text-teal-600"
                          : "bg-purple-100 text-purple-600"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs font-medium text-slate-700 leading-snug">
                  {act.text}
                </p>
              </div>
              <span className="text-[0.625rem] text-slate-400 self-end">
                {act.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  CalendarDays,
  Clock,
  MapPin,
  Building2,
  CheckCircle2,
  ChevronRight,
  Share2,
  Bookmark,
  UserCheck,
  Calendar,
  Gift,
  ExternalLink,
} from "lucide-react";

interface CareerEventDetail {
  id: string;
  slug: string;
  title: string;
  category: "Pelatihan" | "Job Fair" | "Seminar & Workshop";
  organizer: {
    name: string;
    logo: string;
    phone: string;
    email: string;
    address: string;
  };
  startDate: string;
  displayDate: string;
  time: string;
  location: string;
  isOnline: boolean;
  status: "Pendaftaran Buka" | "Akan Datang" | "Selesai";
  banner: string;
  quota: string;
  registeredCount: number;
  totalQuota: number;
  registrationDeadline: string;
  description: string;
  speakers?: Array<{
    name: string;
    role: string;
  }>;
  requirements: string[];
  schedule: Array<{
    time: string;
    activity: string;
  }>;
  facilities: string[];
}

const mockEventsData: Record<string, CareerEventDetail> = {
  "job-fair-sumbawa-2026": {
    id: "EVT-001",
    slug: "job-fair-sumbawa-2026",
    title: "Sumbawa Grand Job Fair 2026",
    category: "Job Fair",
    organizer: {
      name: "Dinas Tenaga Kerja & Transmigrasi Sumbawa",
      logo: "/images/karir-logo-0.png",
      phone: "+62 812-3456-7890",
      email: "disnakertrans@sumbawakab.go.id",
      address: "Jl. Lintas Sumbawa - Bima Km 3, Sumbawa Besar",
    },
    startDate: "2026-10-15",
    displayDate: "15 - 16 Oktober 2026",
    time: "08:00 - 16:00 WITA",
    location: "Gedung Wanita Sumbawa Besar",
    isOnline: false,
    status: "Pendaftaran Buka",
    banner: "/images/karir-logo-0.png",
    quota: "1.000+ Kuota Peserta",
    registeredCount: 640,
    totalQuota: 1000,
    registrationDeadline: "14 Oktober 2026",
    description:
      "Bursa kerja terbesar di Sumbawa tahun 2026 yang menghadirkan lebih dari 50 perusahaan lokal dan nasional dari berbagai bidang industri, mulai dari pertambangan, perbankan, IT, hingga retail. Temukan ribuan peluang karir dan ikuti sesi walk-in interview secara langsung.",
    speakers: [
      {
        name: "Drs. H. Ahmad Zulkarnaen, M.Si",
        role: "Kepala Disnakertrans Sumbawa",
      },
      {
        name: "Rina Kartika, M.Psi",
        role: "Senior HR Consultant & Career Coach",
      },
    ],
    requirements: [
      "Warga Negara Indonesia (WNI) minimal usia 18 tahun",
      "Pendidikan minimal SMA/SMK, D3, S1, hingga S2 semua jurusan",
      "Membawa softcopy/hardcopy CV terbaru dan berkas lamaran",
      "Berpakaian rapi dan formal (Kemeja & Sepatu)",
      "Melakukan pendaftaran/registrasi online terlebih dahulu",
    ],
    schedule: [
      {
        time: "08:00 - 09:00",
        activity: "Registrasi Peserta & Check-in QR Code",
      },
      {
        time: "09:00 - 09:30",
        activity: "Pembukaan Resmi oleh Bupati Sumbawa",
      },
      {
        time: "09:30 - 12:00",
        activity: "Sesi Walk-in Interview & Drop CV (Sesi Pagi)",
      },
      { time: "12:00 - 13:00", activity: "Istirahat" },
      {
        time: "13:00 - 16:00",
        activity: "Sesi Walk-in Interview & Presentation Booth (Sesi Siang)",
      },
    ],
    facilities: [
      "E-Certificate Kehadiran",
      "Konsultasi Karir & CV Review Gratis",
      "Akses Langsung ke HRD 50+ Perusahaan",
      "Snack & Coffee Break",
      "Area Wi-Fi Gratis",
    ],
  },
};

export default function DetailInformasiKarirPage() {
  const params = useParams();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);

  const slug = (params?.id as string) || "job-fair-sumbawa-2026";
  const event = mockEventsData[slug] || mockEventsData["job-fair-sumbawa-2026"];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 relative top-[5rem] pb-24">
      {/* BREADCRUMBS & TOP ACTIONS */}
      <div className="border-b border-slate-200/80 bg-white/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-[11px] text-slate-500 overflow-x-auto no-scrollbar">
            <Link
              href="/"
              className="hover:text-teal-700 transition-colors shrink-0"
            >
              Beranda
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
            <Link
              href="/informasi-karir"
              className="hover:text-teal-700 transition-colors shrink-0"
            >
              Informasi Karir
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-800 truncate max-w-[180px] sm:max-w-xs">
              {event.title}
            </span>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-1.5 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1 ${
                isSaved
                  ? "text-teal-700 bg-teal-50"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Bookmark
                className={`w-3.5 h-3.5 ${isSaved ? "fill-teal-700" : ""}`}
              />
              <span className="hidden sm:inline">
                {isSaved ? "Tersimpan" : "Simpan"}
              </span>
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: event.title,
                    url: window.location.href,
                  });
                }
              }}
              className="p-1.5 text-slate-500 hover:text-slate-800 text-[11px] font-semibold flex items-center gap-1"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Bagikan</span>
            </button>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center gap-6 border-b border-slate-200 pb-8">
          <div className="w-full md:w-72 h-48 shrink-0 relative flex items-center justify-center p-5 bg-slate-200/50 rounded-xl border border-slate-200">
            <Image
              src={event.banner}
              alt={event.title}
              width={150}
              height={150}
              className="object-contain"
              priority
            />
          </div>

          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider">
                {event.category}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[11px] text-slate-500 font-semibold">
                {event.organizer.name}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
              {event.title}
            </h1>

            <div className="flex flex-wrap gap-y-1.5 gap-x-5 text-[11px] text-slate-600 font-medium">
              <div className="flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5 text-teal-700" />
                <span>{event.displayDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-700" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-700" />
                <span>{event.location}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                disabled={event.status === "Selesai"}
                className={`px-5 py-2.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                  event.status === "Selesai"
                    ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                    : "bg-teal-700 hover:bg-teal-800 text-white shadow-sm"
                }`}
              >
                <span>
                  {event.status === "Selesai"
                    ? "Pendaftaran Ditutup"
                    : "Daftar Kegiatan"}
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] text-slate-500 font-medium">
                Kuota:{" "}
                <strong className="text-slate-800">
                  {event.registeredCount}/{event.totalQuota} Peserta
                </strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* DOCUMENT BODY CONTENT */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-10">
        {/* DESKRIPSI */}
        <section className="space-y-2">
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Informasi Acara
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-3xl">
            {event.description}
          </p>
        </section>

        {/* PEMBICARA */}
        {event.speakers && event.speakers.length > 0 && (
          <section className="space-y-3 border-t border-slate-200 pt-6">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-teal-700" />
              Narasumber & Pembicara
            </h2>
            <div className="divide-y divide-slate-200/60">
              {event.speakers.map((sp, idx) => (
                <div
                  key={idx}
                  className="py-2.5 flex items-center justify-between gap-4"
                >
                  <span className="text-xs font-bold text-slate-900">
                    {sp.name}
                  </span>
                  <span className="text-[11px] text-slate-500">{sp.role}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PERSYARATAN */}
        <section className="space-y-3 border-t border-slate-200 pt-6">
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
            Syarat & Ketentuan Peserta
          </h2>
          <ul className="space-y-2 max-w-3xl">
            {event.requirements.map((req, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs text-slate-700"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-teal-700 shrink-0 mt-1.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* SUSUNAN ACARA */}
        <section className="space-y-3 border-t border-slate-200 pt-6">
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-teal-700" />
            Rangkaian Acara
          </h2>
          <div className="space-y-2.5 max-w-3xl">
            {event.schedule.map((item, idx) => (
              <div
                key={idx}
                className="flex items-baseline gap-3 text-xs border-b border-slate-100 pb-2"
              >
                <span className="font-bold text-teal-800 w-24 shrink-0 text-[11px]">
                  {item.time}
                </span>
                <span className="text-slate-700 font-medium">
                  {item.activity}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* FASILITAS */}
        <section className="space-y-3 border-t border-slate-200 pt-6">
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Gift className="w-3.5 h-3.5 text-teal-700" />
            Fasilitas
          </h2>
          <div className="flex flex-wrap gap-1.5 max-w-3xl">
            {event.facilities.map((fac, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-slate-200/60 text-slate-700 text-[11px] font-medium"
              >
                {fac}
              </span>
            ))}
          </div>
        </section>

        {/* PENYELENGGARA & KONTAK */}
        <section className="space-y-2.5 border-t border-slate-200 pt-6">
          <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-teal-700" />
            Kontak & Penyelenggara
          </h2>
          <div className="text-xs text-slate-600 space-y-1">
            <p className="font-bold text-slate-900">{event.organizer.name}</p>
            <p className="text-[11px] text-slate-500">
              {event.organizer.address}
            </p>
            <div className="flex items-center gap-3 pt-1 font-medium text-[11px] text-teal-800">
              <a
                href={`tel:${event.organizer.phone}`}
                className="hover:underline"
              >
                {event.organizer.phone}
              </a>
              <span>•</span>
              <a
                href={`mailto:${event.organizer.email}`}
                className="hover:underline"
              >
                {event.organizer.email}
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

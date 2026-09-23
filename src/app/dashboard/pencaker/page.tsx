import Link from "next/link";
import Image from "next/image";
import {
  User,
  Sparkles,
  Send,
  Clock,
  CheckCircle2,
  Bookmark,
  Calendar,
  Bell,
  Briefcase,
  ChevronRight,
  ArrowUpRight,
  Lightbulb,
  MapPin,
  Building2,
  Award,
  ArrowRight,
} from "lucide-react";

// --- DUMMY DATA STATISTIK LAMARAN ---
const statItems = [
  {
    label: "Total Lamaran",
    value: "12",
    icon: Send,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    label: "Sedang Ditinjau",
    value: "5",
    icon: Clock,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    label: "Dipanggil Seleksi",
    value: "3",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    label: "Diterima",
    value: "1",
    icon: Award,
    color: "text-app-navy-600",
    bgColor: "bg-app-navy-50",
  },
  {
    label: "Lowongan Tersimpan",
    value: "8",
    icon: Bookmark,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

// --- DUMMY DATA JADWAL SELEKSI TERDEKAT ---
const upcomingSchedules = [
  {
    id: 1,
    title: "Wawancara User (Online)",
    company: "PT AMNT",
    date: "25 Sep 2026",
    time: "09:00 WITA",
    type: "Interview",
  },
  {
    id: 2,
    title: "Psikotes Online",
    company: "PT Macmahon Indonesia",
    date: "28 Sep 2026",
    time: "13:30 WITA",
    type: "Tes Substantif",
  },
];

// --- DUMMY DATA LAMARAN TERBARU ---
const recentApplications = [
  {
    id: 1,
    role: "Senior Geologist",
    company: "PT AMNT",
    location: "Sumbawa Barat",
    appliedDate: "18 Sep 2026",
    status: "Dipanggil Wawancara",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: 2,
    role: "HSE Specialist (K3LH)",
    company: "PT Macmahon Indonesia",
    location: "Batu Hijau",
    appliedDate: "15 Sep 2026",
    status: "Sedang Ditinjau",
    statusColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    id: 3,
    role: "Database Administrator",
    company: "Diskominfo Sumbawa",
    location: "Sumbawa Besar",
    appliedDate: "10 Sep 2026",
    status: "Seleksi Berkas",
    statusColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
];

// --- DUMMY DATA REKOMENDASI LOWONGAN ---
const jobRecommendations = [
  {
    id: 1,
    title: "Frontend Web Developer",
    company: "PT Digital Sumbawa",
    location: "Sumbawa Besar",
    salary: "Rp 6.000.000 - Rp 8.500.000",
    type: "Full-time",
  },
  {
    id: 2,
    title: "Environmental Officer",
    company: "PT Amman Mineral",
    location: "Sumbawa Barat",
    salary: "Kompetitif",
    type: "Full-time",
  },
];

// --- DUMMY DATA NOTIFIKASI TERBARU ---
const recentNotifications = [
  {
    id: 1,
    text: "Undangan Wawancara dari PT AMNT telah dikirim ke email Anda.",
    time: "2 jam yang lalu",
  },
  {
    id: 2,
    text: "Lamaran Anda untuk posisi 'HSE Specialist' telah dibaca oleh HRD.",
    time: "1 hari yang lalu",
  },
];

export default function CandidateDashboardPage() {
  const profileProgress = 85;

  return (
    <div className="space-y-8">
      {/* 1. SAPAAN PENGGUNA & KELENGKAPAN PROFIL */}
      <section className="bg-gradient-to-r from-app-navy-900 via-slate-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Identitas User */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-app-navy-400/50 bg-slate-800 shrink-0">
              {/* Tempatkan foto profil pengguna */}
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                alt="Foto Profil Fajar"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-app-navy-800/80 text-app-navy-200 text-[10px] font-semibold">
                <Sparkles className="w-3 h-3 text-app-navy-300" /> Pencari Kerja
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Selamat Datang, Fajar Ardiansyah!
              </h2>
              <p className="text-xs text-slate-300">
                Pantau perkembangan lamaran kerja dan peluang karir terbaru
                kamu.
              </p>
            </div>
          </div>

          {/* Progress Bar & CTA - Compact Floating Card */}
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-4 border border-white/10 w-full lg:w-80 shadow-xl space-y-3 shrink-0 relative overflow-hidden group">
            {/* Ambient Ambient Background Glow */}
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />

            <div className="flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Profil Pengguna
                </p>
                <h4 className="text-xs font-bold text-white">
                  Kelengkapan Profil
                </h4>
              </div>

              {/* Badge Persentase */}
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-extrabold text-xs tracking-tight">
                {profileProgress}%
              </span>
            </div>

            {/* Progress Bar Segmented Effect */}
            <div className="space-y-1">
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden p-0.5 border border-white/5">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700 ease-out shadow-sm shadow-emerald-500/50"
                  style={{ width: `${profileProgress}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 text-right">
                {profileProgress < 100
                  ? "Lengkapi agar dilirik rekruter"
                  : "Profil sudah lengkap!"}
              </p>
            </div>

            {/* CTA Button */}
            <Link
              href="/dashboard/profil"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-xs rounded-xl transition-all duration-200 shadow-md shadow-emerald-900/20 active:scale-[0.98]"
            >
              <User className="w-4 h-4 text-slate-950" />
              <span>Lengkapi Profil Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-70 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. RINGKASAN JUMLAH LAMARAN & TERTIMPAN */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Ringkasan Lamaran
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {statItems.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-app-navy-500/50 transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold text-slate-500">
                    {stat.label}
                  </span>
                  <div
                    className={`p-2 rounded-lg ${stat.bgColor} ${stat.color}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* GRID KONTEN UTAMA: UTAMA & SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* KOLOM KIRI (2/3): Jadwal, Lamaran Terbaru, Rekomendasi */}
        <div className="lg:col-span-2 space-y-8">
          {/* 3. JADWAL SELEKSI TERDEKAT */}
          <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-app-navy-700" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Jadwal Seleksi Terdekat
                </h3>
              </div>
              <Link
                href="/dashboard/jadwal"
                className="text-xs font-bold text-app-navy-700 hover:underline flex items-center gap-1"
              >
                Lihat Jadwal <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {upcomingSchedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-app-navy-100 text-app-navy-800 font-bold text-[10px] rounded">
                      {schedule.type}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500">
                      {schedule.time}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      {schedule.title}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {schedule.company}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-200/60 text-[10px] font-semibold text-slate-600 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{schedule.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. LAMARAN TERBARU */}
          <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-app-navy-700" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Lamaran Terbaru
                </h3>
              </div>
              <Link
                href="/dashboard/lamaran"
                className="text-xs font-bold text-app-navy-700 hover:underline flex items-center gap-1"
              >
                Semua Lamaran <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 first:pt-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-900">
                      {app.role}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" /> {app.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {app.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    <span className="text-[10px] text-slate-400">
                      {app.appliedDate}
                    </span>
                    <span
                      className={`px-2.5 py-1 text-[10px] font-bold rounded-full border ${app.statusColor}`}
                    >
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. REKOMENDASI LOWONGAN */}
          <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-app-navy-700" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Rekomendasi Lowongan
                </h3>
              </div>
              <Link
                href="/dashboard/lowongan"
                className="text-xs font-bold text-app-navy-700 hover:underline flex items-center gap-1"
              >
                Eksplor Lainnya <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {jobRecommendations.map((job) => (
                <div
                  key={job.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-app-navy-500 transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-app-navy-700 transition-colors">
                        {job.title}
                      </h4>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold rounded">
                        {job.type}
                      </span>
                    </div>
                    <p className="text-[11px] font-medium text-slate-600">
                      {job.company}
                    </p>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {job.location}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-800">
                      {job.salary}
                    </span>
                    <Link
                      href={`/dashboard/lowongan/${job.id}`}
                      className="p-1.5 rounded-lg bg-app-navy-50 text-app-navy-700 hover:bg-app-navy-700 hover:text-white transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* KOLOM KANAN (1/3): Notifikasi & Tips Karier */}
        <div className="space-y-8">
          {/* 6. NOTIFIKASI TERBARU */}
          <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-app-navy-700" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Notifikasi Terbaru
                </h3>
              </div>
              <Link
                href="/dashboard/notifikasi"
                className="text-[11px] font-bold text-app-navy-700 hover:underline"
              >
                Semua
              </Link>
            </div>

            <div className="space-y-3">
              {recentNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1"
                >
                  <p className="text-xs text-slate-700 leading-snug">
                    {notif.text}
                  </p>
                  <span className="text-[10px] text-slate-400 block">
                    {notif.time}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 7. TIPS KARIER SINGKAT */}
          <section className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200/80 p-5 sm:p-6 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-amber-800">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider">
                Tips Karier Hari Ini
              </h3>
            </div>
            <p className="text-xs font-semibold text-amber-950 leading-relaxed">
              &quot;Pastikan CV Anda sudah mencantumkan sertifikasi K3LH atau
              keahlian teknis terbaru jika melamar di sektor pertambangan.&quot;
            </p>
            <p className="text-[10px] text-amber-800/80">
              CV dengan data sertifikasi yang valid berpeluang 2x lebih besar
              dilirik oleh HRD.
            </p>
            <Link
              href="/dashboard/dokumen"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 hover:underline pt-1"
            >
              Update Dokumen & Sertifikat <ChevronRight className="w-3 h-3" />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

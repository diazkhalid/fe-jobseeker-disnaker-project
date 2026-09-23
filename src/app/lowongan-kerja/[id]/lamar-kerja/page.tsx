/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Briefcase,
  Building2,
  MapPin,
  FileText,
  UserCircle,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  UploadCloud,
  ArrowRight,
  Paperclip,
  ShieldCheck,
  Download,
  DollarSign,
  CalendarDays,
  Globe,
  HelpCircle,
  Eye,
  Hourglass,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

// ==========================================
// MOCK DATA (Simulasi dari API/Database)
// ==========================================
const mockJobData = {
  id: "job-123",
  title: "Senior Frontend Developer (React)",
  company: "PT Teknologi Nusantara",
  logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&q=80",
  location: "Sumbawa Besar (Hybrid)",
  // Persyaratan Lowongan vs Data Profil User
  requirements: [
    { id: 1, name: "Minimal Pengalaman 5 Tahun", met: true },
    { id: 2, name: "Menguasai React, Next.js, TypeScript", met: true },
    { id: 3, name: "Portofolio Proyek Aktif", met: false }, // Belum terpenuhi
    { id: 4, name: "Pendidikan Min. S1 Informatika", met: true },
    { id: 5, name: "Sertifikasi React Expert (Opsional)", met: false }, // Opsional, belum terpenuhi
  ],
  // Pertanyaan Tambahan dari Perusahaan
  customQuestions: [
    {
      id: "q1",
      type: "text",
      question:
        "Sebutkan 3 proyek Next.js terbesar yang pernah Anda kerjakan dan peran Anda.",
      required: true,
    },
    {
      id: "q2",
      type: "radio",
      question: "Apakah Anda bersedia mengikuti tes live coding selama 2 jam?",
      options: ["Ya", "Tidak"],
      required: true,
    },
    {
      id: "q3",
      type: "file",
      question: "Upload hasil design test (jika ada)",
      required: false,
    },
  ],
};

const mockUserData = {
  name: "Andi Pratama",
  email: "andi.pratama@email.com",
  phone: "+62 812 3456 7890",
  profileCompletePercent: 85,
  hasMainCv: true,
  // Daftar Dokumen User
  documents: {
    cv: [
      {
        id: "cv1",
        name: "CV_Andi_Pratama_Utama.pdf",
        size: "1.2 MB",
        isMain: true,
      },
      {
        id: "cv2",
        name: "CV_Andi_Pratama_ATS_Friendly.pdf",
        size: "1.1 MB",
        isMain: false,
      },
    ],
    coveringLetters: [
      { id: "cl1", name: "Surat_Lamaran_PT_Teknologi.pdf", size: "800 KB" },
    ],
    portfolios: [
      { id: "p1", name: "Link_Portofolio_Online.txt", size: "1 KB" },
      { id: "p2", name: "Portofolio_Design_System.pdf", size: "15 MB" },
    ],
    certificates: [
      { id: "c1", name: "Sertifikat_NextJS_Expert.pdf", size: "2.5 MB" },
    ],
  },
};

// ==========================================
// TAHAPAN STEPPER
// ==========================================
const steps = [
  { id: 1, name: "Persiapan", icon: ShieldCheck },
  { id: 2, name: "Dokumen", icon: FileText },
  { id: 3, name: "Pertanyaan", icon: HelpCircle },
  { id: 4, name: "Review", icon: Eye },
];

export default function ApplicationStepperPage() {
  const router = useRouter();
  const params = useParams();
  const [currentStep, setCurrentStep] = useState(1);

  // State untuk menyimpan pilihan & jawaban user
  const [selectedDocs, setSelectedDocs] = useState({
    cv: mockUserData.documents.cv.find((d) => d.isMain)?.id || "",
    coveringLetter: "",
    portfolio: "",
    certificates: [] as string[],
  });

  const [answers, setAnswers] = useState<Record<string, any>>({
    salary: "",
    startDate: "",
    locationFit: "",
  });

  const [agreements, setAgreements] = useState({
    dataCorrect: false,
    dataSharing: false,
  });

  const allRequirementsMet = useMemo(() => {
    // Abaikan persyaratan opsional jika ada logika tersebut
    return (
      mockJobData.requirements.filter((r) => !r.met).length === 0 &&
      mockUserData.hasMainCv &&
      mockUserData.profileCompletePercent >= 80
    );
  }, []);

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // ==========================================
  // RENDER STEP 1: PERSIAPAN LAMARAN
  // ==========================================
  const renderStep1 = () => {
    const unmetRequirements = mockJobData.requirements.filter((r) => !r.met);
    const metRequirements = mockJobData.requirements.filter((r) => r.met);
    const profileIncomplete =
      mockUserData.profileCompletePercent < 100 || !mockUserData.hasMainCv;

    return (
      <div className="space-y-8">
        <div className="space-y-3 pl-4 border-l-4 border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            Tahap 1: Persiapan & Cek Kelayakan
          </h2>
          <p className="text-sm text-slate-600">
            Kami memeriksa kecocokan profil Anda dengan persyaratan minimum
            lowongan ini.
          </p>
        </div>

        {/* Cek Status Profil */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4 shadow-sm hover:border-slate-200 transition-colors">
          <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wider">
            Status Profil Anda
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div
              className={`flex items-center gap-3 p-4 rounded-xl border ${mockUserData.profileCompletePercent >= 80 ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-amber-50 border-amber-200 text-amber-900"}`}
            >
              <UserCircle className="w-8 h-8 opacity-60" />
              <div>
                <p className="font-bold">Kelengkapan Profil</p>
                <p className="text-xs">
                  {mockUserData.profileCompletePercent}% Lengkap
                </p>
              </div>
            </div>
            <div
              className={`flex items-center gap-3 p-4 rounded-xl border ${mockUserData.hasMainCv ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-rose-50 border-rose-200 text-rose-900"}`}
            >
              <FileText className="w-8 h-8 opacity-60" />
              <div>
                <p className="font-bold">CV Utama</p>
                <p className="text-xs">
                  {mockUserData.hasMainCv ? "Tersedia" : "Belum Diunggah"}
                </p>
              </div>
            </div>
          </div>

          {profileIncomplete && (
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 text-xs">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
              <div className="space-y-2 flex-1">
                <p className="font-semibold">
                  Profil Anda belum lengkap (100%) atau CV utama belum tersedia.
                </p>
                <p>
                  Melengkapi profil meningkatkan peluang Anda dilirik oleh
                  rekruter.
                </p>
                <Link
                  href="/dashboard/profil/edit"
                  className="inline-flex items-center gap-1.5 font-bold text-app-navy-700 hover:underline"
                >
                  Lengkapi Profil Sekarang{" "}
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Cek Persyaratan Lowongan */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wider">
            Daftar Persyaratan Lowongan
          </h3>

          <div className="space-y-3">
            {metRequirements.map((req) => (
              <div
                key={req.id}
                className="flex items-center gap-3 text-sm text-emerald-800 bg-emerald-50 p-3 rounded-lg border border-emerald-100"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="font-medium">{req.name}</span>
              </div>
            ))}
            {unmetRequirements.map((req) => (
              <div
                key={req.id}
                className="flex items-center gap-3 text-sm text-rose-800 bg-rose-50 p-3 rounded-lg border border-rose-100"
              >
                <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                <span className="font-medium">
                  {req.name} (Belum Terpenuhi)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tombol Aksi Step 1 */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
          <Link
            href={`/lowongan-kerja/${params.id}`}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Batal
          </Link>
          <button
            onClick={nextStep}
            // disabled={!allRequirementsMet}
            className="px-5 py-2.5 bg-app-navy-700 hover:bg-app-navy-800 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-app-navy-700/10"
          >
            Lanjutkan Lamaran <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // ==========================================
  // RENDER STEP 2: PILIH CV DAN DOKUMEN
  // ==========================================
  const renderStep2 = () => {
    const handleFileSelect = (category: string, id: string) => {
      setSelectedDocs((prev) => ({ ...prev, [category]: id }));
    };

    const handleCheckboxChange = (id: string) => {
      setSelectedDocs((prev) => {
        const current = prev.certificates;
        if (current.includes(id)) {
          return {
            ...prev,
            certificates: current.filter((item) => item !== id),
          };
        } else {
          return { ...prev, certificates: [...current, id] };
        }
      });
    };

    const renderDocumentList = (
      title: string,
      docs: any[],
      category: string,
      isMultiple = false,
      required = false,
    ) => (
      <div className="space-y-3 pt-4 first:pt-0">
        <div className="flex items-center justify-between gap-4">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            {required && <span className="text-rose-500">*</span>}
            {title}
          </h4>
          <button className="text-[11px] font-bold text-app-navy-700 hover:underline flex items-center gap-1">
            <UploadCloud className="w-3.5 h-3.5" /> Upload Baru
          </button>
        </div>
        <div className="space-y-2.5">
          {docs.map((doc) => {
            const isSelected = isMultiple
              ? selectedDocs.certificates.includes(doc.id)
              : selectedDocs[category as keyof typeof selectedDocs] === doc.id;
            return (
              <label
                key={doc.id}
                className={`flex items-center justify-between gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${isSelected ? "border-app-navy-600 bg-app-navy-50/50" : "border-slate-100 bg-slate-50 hover:border-slate-200"}`}
              >
                <div className="flex items-center gap-3">
                  {isMultiple ? (
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleCheckboxChange(doc.id)}
                      className="h-4 w-4 rounded border-slate-300 text-app-navy-700 focus:ring-app-navy-600"
                    />
                  ) : (
                    <input
                      type="radio"
                      name={category}
                      checked={isSelected}
                      onChange={() => handleFileSelect(category, doc.id)}
                      className="h-4 w-4 border-slate-300 text-app-navy-700 focus:ring-app-navy-600"
                    />
                  )}
                  <div className="p-2 bg-white rounded-lg border border-slate-100">
                    <FileText className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      {doc.name}{" "}
                      {doc.isMain && (
                        <span className="text-[10px] text-emerald-600 font-medium">
                          (Utama)
                        </span>
                      )}
                    </p>
                    <p className="text-[10px] text-slate-400">{doc.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    className="p-1.5 rounded-lg bg-white border border-slate-100 text-slate-400 hover:text-slate-600"
                    title="Preview"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    className="p-1.5 rounded-lg bg-white border border-slate-100 text-slate-400 hover:text-slate-600"
                    title="Download"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    );

    return (
      <div className="space-y-8">
        <div className="space-y-3 pl-4 border-l-4 border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            Tahap 2: Pilih CV & Dokumen Pendukung
          </h2>
          <p className="text-sm text-slate-600">
            Tentukan dokumen yang akan dikirimkan ke perusahaan. Pastikan data
            sudah benar.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 space-y-6 shadow-sm divide-y divide-slate-100">
          {renderDocumentList(
            "Pilih CV Lamaran",
            mockUserData.documents.cv,
            "cv",
            false,
            true,
          )}
          {renderDocumentList(
            "Pilih Surat Lamaran (Covering Letter)",
            mockUserData.documents.coveringLetters,
            "coveringLetter",
            false,
          )}
          {renderDocumentList(
            "Pilih Portofolio Terbaik",
            mockUserData.documents.portfolios,
            "portfolio",
            false,
          )}
          {renderDocumentList(
            "Pilih Sertifikat Relevan (Bisa multi-select)",
            mockUserData.documents.certificates,
            "certificates",
            true,
          )}

          {/* Dokumen Tambahan Opsional */}
          <div className="space-y-3 pt-5">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              Dokumen Tambahan Lainnya
            </h4>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer space-y-2">
              <UploadCloud className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-xs font-semibold text-slate-700">
                Klik untuk upload atau drag & drop
              </p>
              <p className="text-[10px] text-slate-400">
                PDF, DOCX, JPG, PNG (Maks. 10MB)
              </p>
            </div>
          </div>
        </div>

        {/* Tombol Aksi Step 2 */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
          <button
            onClick={prevStep}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Kembali
          </button>
          <button
            onClick={nextStep}
            disabled={!selectedDocs.cv}
            className="px-5 py-2.5 bg-app-navy-700 hover:bg-app-navy-800 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-app-navy-700/10"
          >
            Lanjut ke Pertanyaan <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // ==========================================
  // RENDER STEP 3: PERTANYAAN LAMARAN
  // ==========================================
  const renderStep3 = () => {
    const handleInputChange = (id: string, value: string) => {
      setAnswers((prev) => ({ ...prev, [id]: value }));
    };

    return (
      <div className="space-y-8">
        <div className="space-y-3 pl-4 border-l-4 border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            Tahap 3: Pertanyaan Tambahan & Preferensi
          </h2>
          <p className="text-sm text-slate-600">
            Perusahaan memerlukan informasi tambahan berikut untuk memproses
            lamaran Anda.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 space-y-8 shadow-sm">
          {/* Pertanyaan Custom dari Perusahaan */}
          {mockJobData.customQuestions.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wider border-b border-slate-100 pb-3">
                Pertanyaan dari {mockJobData.company}
              </h3>
              {mockJobData.customQuestions.map((q, index) => (
                <div key={q.id} className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 flex items-start gap-1">
                    {q.required && <span className="text-rose-500">*</span>}
                    {index + 1}. {q.question}
                  </label>
                  {q.type === "text" && (
                    <textarea
                      value={answers[q.id] || ""}
                      onChange={(e) => handleInputChange(q.id, e.target.value)}
                      rows={3}
                      placeholder="Masukkan jawaban Anda..."
                      className="block w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-app-navy-600 focus:border-app-navy-600"
                    />
                  )}
                  {q.type === "radio" && (
                    <div className="flex items-center gap-4 pt-1">
                      {q.options?.map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={q.id}
                            value={option}
                            checked={answers[q.id] === option}
                            onChange={(e) =>
                              handleInputChange(q.id, e.target.value)
                            }
                            className="h-4 w-4 border-slate-300 text-app-navy-700 focus:ring-app-navy-600"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  )}
                  {q.type === "file" && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 border-dashed hover:bg-slate-100 cursor-pointer">
                      <UploadCloud className="w-5 h-5 text-slate-400" />
                      <span className="text-xs text-slate-600 font-medium">
                        Klik untuk upload file pendukung
                      </span>
                      <span className="text-[10px] text-slate-400 ml-auto">
                        (Opsional)
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Preferensi Umum */}
          <div className="space-y-6 pt-6 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wider border-b border-slate-100 pb-3">
              Preferensi & Ketersediaan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5 relative">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <span className="text-rose-500">*</span> Ekspektasi Gaji
                  Bulanan (Gross)
                </label>
                <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-8" />
                <input
                  type="number"
                  value={answers.salary}
                  onChange={(e) => handleInputChange("salary", e.target.value)}
                  placeholder="Contoh: 15000000"
                  className="block w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-app-navy-600 focus:border-app-navy-600"
                />
              </div>
              <div className="space-y-1.5 relative">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <span className="text-rose-500">*</span> Ketersediaan Mulai
                  Bekerja
                </label>
                <CalendarDays className="w-4 h-4 text-slate-400 absolute left-3 top-8" />
                <input
                  type="date"
                  value={answers.startDate}
                  onChange={(e) =>
                    handleInputChange("startDate", e.target.value)
                  }
                  className="block w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-app-navy-600 focus:border-app-navy-600"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <span className="text-rose-500">*</span> Kesediaan Ditempatkan
                  / Bekerja Remote/WFO sesuai kebijakan ({mockJobData.location})
                </label>
                <div className="flex items-center gap-4 pt-1 ml-3">
                  {[
                    "Ya, Sepenuhnya Bersedia",
                    "Bersedia dengan Syarat",
                    "Tidak Bersedia",
                  ].map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="locationFit"
                        value={option}
                        checked={answers.locationFit === option}
                        onChange={(e) =>
                          handleInputChange("locationFit", e.target.value)
                        }
                        className="h-4 w-4 border-slate-300 text-app-navy-700 focus:ring-app-navy-600"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tombol Aksi Step 3 */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
          <button
            onClick={prevStep}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Kembali
          </button>
          <button
            onClick={nextStep}
            className="px-5 py-2.5 bg-app-navy-700 hover:bg-app-navy-800 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 shadow-md shadow-app-navy-700/10"
          >
            Lanjut ke Review <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // ==========================================
  // RENDER STEP 4: REVIEW DAN KONFIRMASI
  // ==========================================
  const renderStep4 = () => {
    const handleAgreementChange = (id: string) => {
      setAgreements((prev) => ({
        ...prev,
        [id]: !prev[id as keyof typeof agreements],
      }));
    };

    const getDocName = (category: string, id: string) => {
      if (!id) return "-";
      const docList = mockUserData.documents[
        category as keyof typeof mockUserData.documents
      ] as any[];
      return docList.find((d) => d.id === id)?.name || "-";
    };

    const ReviewSection = ({ title, icon: Icon, children }: any) => (
      <div className="space-y-4 pt-6 first:pt-0">
        <div className="flex items-center gap-2.5 text-app-navy-700 pb-2 border-b border-slate-100">
          <Icon className="w-5 h-5" />
          <h3 className="text-sm font-bold text-slate-900">{title}</h3>
        </div>
        {children}
      </div>
    );

    return (
      <div className="space-y-8">
        <div className="space-y-3 pl-4 border-l-4 border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            Tahap Terakhir: Review & Kirim Lamaran
          </h2>
          <p className="text-sm text-slate-600">
            Mohon tinjau kembali seluruh data Anda sebelum mengirimkan lamaran.
            Data tidak dapat diubah setelah dikirim.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 space-y-7 shadow-sm divide-y divide-slate-100">
          {/* Informasi Lowongan */}
          <ReviewSection title="Posisi yang Dilamar" icon={Briefcase}>
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <Image
                src={mockJobData.logo}
                alt={mockJobData.company}
                width={50}
                height={50}
                className="rounded-xl object-cover border border-slate-100"
              />
              <div>
                <p className="text-base font-bold text-slate-950">
                  {mockJobData.title}
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-600 pt-0.5 font-medium">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" /> {mockJobData.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {mockJobData.location}
                  </span>
                </div>
              </div>
            </div>
          </ReviewSection>

          {/* Data Diri */}
          <ReviewSection title="Data Diri Pelamar" icon={UserCircle}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-xs">
              <p>
                <span className="font-semibold text-slate-500">
                  Nama Lengkap:
                </span>{" "}
                <span className="font-bold text-slate-900">
                  {mockUserData.name}
                </span>
              </p>
              <p>
                <span className="font-semibold text-slate-500">Email:</span>{" "}
                <span className="font-bold text-slate-900">
                  {mockUserData.email}
                </span>
              </p>
              <p>
                <span className="font-semibold text-slate-500">
                  Nomor Telepon:
                </span>{" "}
                <span className="font-bold text-slate-900">
                  {mockUserData.phone}
                </span>
              </p>
            </div>
          </ReviewSection>

          {/* Dokumen */}
          <ReviewSection title="Dokumen yang Dikirim" icon={FileText}>
            <div className="space-y-2.5 text-xs">
              <p className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />{" "}
                <span className="font-semibold text-slate-500">CV Utama:</span>{" "}
                <span className="font-bold text-slate-900">
                  {getDocName("cv", selectedDocs.cv)}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-slate-400" />{" "}
                <span className="font-semibold text-slate-500">
                  Surat Lamaran:
                </span>{" "}
                <span className="font-bold text-slate-900">
                  {getDocName("coveringLetters", selectedDocs.coveringLetter)}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-400" />{" "}
                <span className="font-semibold text-slate-500">
                  Portofolio:
                </span>{" "}
                <span className="font-bold text-slate-900">
                  {getDocName("portfolios", selectedDocs.portfolio)}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-400" />{" "}
                <span className="font-semibold text-slate-500">
                  Sertifikat:
                </span>{" "}
                <span className="font-bold text-slate-900">
                  {selectedDocs.certificates.length} Dokumen Terpilih
                </span>
              </p>
            </div>
          </ReviewSection>

          {/* Jawaban Pertanyaan */}
          <ReviewSection
            title="Jawaban Pertanyaan & Preferensi"
            icon={HelpCircle}
          >
            <div className="space-y-4 text-xs">
              {mockJobData.customQuestions.map((q, idx) => (
                <div key={q.id} className="space-y-1">
                  <p className="font-semibold text-slate-600">
                    {idx + 1}. {q.question}
                  </p>
                  <p className="font-bold text-slate-900 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    {answers[q.id] || "-"}
                  </p>
                </div>
              ))}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p>
                  <span className="font-semibold text-slate-600">
                    Ekspektasi Gaji:
                  </span>{" "}
                  <span className="font-bold text-slate-900">
                    Rp {Number(answers.salary).toLocaleString("id-ID")}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-slate-600">
                    Ketersediaan Mulai:
                  </span>{" "}
                  <span className="font-bold text-slate-900">
                    {answers.startDate}
                  </span>
                </p>
                <p className="md:col-span-2">
                  <span className="font-semibold text-slate-600">
                    Kesediaan Penempatan:
                  </span>{" "}
                  <span className="font-bold text-slate-900">
                    {answers.locationFit || "-"}
                  </span>
                </p>
              </div>
            </div>
          </ReviewSection>
        </div>

        {/* Pernyataan Persetujuan */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4 shadow-sm">
          <label className="flex items-start gap-3 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={agreements.dataSharing}
              onChange={() => handleAgreementChange("dataSharing")}
              className="h-4 w-4 mt-0.5 rounded border-slate-300 text-app-navy-700 focus:ring-app-navy-600"
            />
            Saya menyetujui data profil dan dokumen saya dikirimkan kepada{" "}
            {mockJobData.company} untuk keperluan proses seleksi lamaran ini
            sesuai kebijakan privasi.
          </label>
          <label className="flex items-start gap-3 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={agreements.dataCorrect}
              onChange={() => handleAgreementChange("dataCorrect")}
              className="h-4 w-4 mt-0.5 rounded border-slate-300 text-app-navy-700 focus:ring-app-navy-600"
            />
            Saya menyatakan bahwa seluruh informasi dan dokumen yang saya
            berikan adalah benar dan akurat.
          </label>
        </div>

        {/* Tombol Aksi Step 4 */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
          <button
            onClick={prevStep}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Kembali & Edit
          </button>
          <button
            // disabled={!agreements.dataCorrect || !agreements.dataSharing}
            onClick={() => router.push("/dashboard/pencaker/lamaran")}
            className="px-6 py-2.5 bg-app-navy-700 hover:bg-app-navy-800 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-app-navy-700/10 active:scale-[0.98]"
          >
            Kirim Lamaran Sekarang <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // ==========================================
  // MAIN RENDER LAYOUT
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 relative top-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
        {/* Header Section */}
        <div className="space-y-4">
          <Link
            href={`/lowongan-kerja/${params.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Kembali ke Detail Lowongan
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight">
                Formulir Pengiriman Lamaran
              </h1>
              <p className="text-sm md:text-base text-slate-600 max-w-2xl">
                Lengkapi tahapan di bawah ini dengan teliti untuk mengirimkan
                lamaran Anda.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <Hourglass className="w-3.5 h-3.5" /> Estimasi waktu: 3-5 menit
            </div>
          </div>
        </div>

        {/* STEPPER INDICATOR */}
        <div className="relative">
          {/* Garis Progress Background */}
          <div
            className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200"
            aria-hidden="true"
          />
          {/* Garis Progress Active */}
          <div
            className="absolute top-5 left-0 h-0.5 bg-app-navy-600 transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
            aria-hidden="true"
          />

          <nav
            className="relative z-10 flex items-center justify-between"
            aria-label="Progress"
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.id;
              const isActive = currentStep === step.id;

              return (
                <div
                  key={step.name}
                  className="flex flex-col items-center text-center group"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                      isCompleted
                        ? "bg-app-navy-600 border-app-navy-600 text-white"
                        : isActive
                          ? "bg-white border-app-navy-600 text-app-navy-600 ring-2 ring-app-navy-100"
                          : "bg-white border-slate-300 text-slate-400 group-hover:border-slate-400"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <div className="mt-2 space-y-0.5">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider ${isActive || isCompleted ? "text-app-navy-800" : "text-slate-500"}`}
                    >
                      Step {step.id}
                    </span>
                    <span
                      className={`text-xs font-semibold block ${isActive ? "text-slate-950" : "text-slate-600"}`}
                    >
                      {step.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </nav>
        </div>

        {/* STEP CONTENT RENDERER */}
        <div className="pt-4">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>
      </div>
    </div>
  );
}

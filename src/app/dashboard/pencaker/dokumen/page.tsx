"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  FileText,
  Upload,
  Download,
  Trash2,
  RefreshCw,
  Eye,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Award,
  Briefcase,
  FileSpreadsheet,
  Info,
  X,
  ArrowLeft,
} from "lucide-react";

// Tipe Data Dokumen
interface DocumentItem {
  id: string;
  name: string;
  category: "cv" | "akademik" | "sertifikat" | "portofolio" | "pendukung";
  categoryLabel: string;
  size: string;
  sizeInMB: number;
  uploadDate: string;
  isMain?: boolean;
  isRequired?: boolean;
  fileUrl?: string;
  format: string;
}

export default function DocumentManagementPage() {
  // State untuk daftar dokumen
  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: "doc-1",
      name: "CV_Fajar_Ardiansyah_2026.pdf",
      category: "cv",
      categoryLabel: "CV Utama",
      size: "1.2 MB",
      sizeInMB: 1.2,
      uploadDate: "2026-05-10",
      isMain: true,
      isRequired: true,
      format: "PDF",
    },
    {
      id: "doc-2",
      name: "CV_Fajar_ATS_Friendly.pdf",
      category: "cv",
      categoryLabel: "CV Alternatif",
      size: "850 KB",
      sizeInMB: 0.85,
      uploadDate: "2026-05-12",
      isMain: false,
      isRequired: false,
      format: "PDF",
    },
    {
      id: "doc-3",
      name: "Surat_Lamaran_Umum.pdf",
      category: "pendukung",
      categoryLabel: "Surat Lamaran",
      size: "420 KB",
      sizeInMB: 0.42,
      uploadDate: "2026-05-11",
      isMain: false,
      isRequired: false,
      format: "PDF",
    },
    {
      id: "doc-4",
      name: "Ijazah_S1_Teknik_Geologi.pdf",
      category: "akademik",
      categoryLabel: "Ijazah",
      size: "2.4 MB",
      sizeInMB: 2.4,
      uploadDate: "2026-05-01",
      isMain: false,
      isRequired: true,
      format: "PDF",
    },
    {
      id: "doc-5",
      name: "Transkrip_Nilai_Legaliz.pdf",
      category: "akademik",
      categoryLabel: "Transkrip Nilai",
      size: "1.8 MB",
      sizeInMB: 1.8,
      uploadDate: "2026-05-01",
      isMain: false,
      isRequired: true,
      format: "PDF",
    },
    {
      id: "doc-6",
      name: "Portofolio_Eksplorasi_Geologi.pdf",
      category: "portofolio",
      categoryLabel: "Portofolio",
      size: "4.5 MB",
      sizeInMB: 4.5,
      uploadDate: "2026-05-15",
      isMain: false,
      isRequired: false,
      format: "PDF",
    },
  ]);

  // State Modal Preview & Upload
  const [selectedDocForPreview, setSelectedDocForPreview] =
    useState<DocumentItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadCategory, setUploadCategory] = useState<string>("cv");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Batas Maksimal Ukuran File (5 MB)
  const MAX_FILE_SIZE_MB = 5;
  const ALLOWED_FORMATS = ["application/pdf", "image/jpeg", "image/png"];

  // Handler Ganti CV Utama
  const handleSetMainCV = (id: string) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.category === "cv") {
          return { ...doc, isMain: doc.id === id };
        }
        return doc;
      }),
    );
  };

  // Handler Hapus Dokumen
  const handleDeleteDoc = (id: string) => {
    const target = documents.find((d) => d.id === id);
    if (target?.isMain) {
      alert(
        "Dokumen CV Utama tidak dapat dihapus. Pindahkan status CV Utama ke dokumen lain terlebih dahulu.",
      );
      return;
    }

    if (confirm("Apakah Anda yakin ingin menghapus dokumen ini?")) {
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    }
  };

  // Handler Validasi & File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];

    if (!file) return;

    // Validasi Format
    if (!ALLOWED_FORMATS.includes(file.type)) {
      setUploadError(
        "Format file tidak didukung! Harus berupa PDF, JPG, atau PNG.",
      );
      setSelectedFile(null);
      return;
    }

    // Validasi Ukuran (Maksimal 5MB)
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > MAX_FILE_SIZE_MB) {
      setUploadError(
        `Ukuran file melebihi batas ${MAX_FILE_SIZE_MB}MB! (Ukuran file: ${sizeMB.toFixed(2)}MB)`,
      );
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  // Handler Submit Upload / Ganti File
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadError("Silakan pilih file terlebih dahulu.");
      return;
    }

    const newDoc: DocumentItem = {
      id: `doc-${new Date()}`,
      name: selectedFile.name,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      category: uploadCategory as any,
      categoryLabel: getCategoryLabel(uploadCategory),
      size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
      sizeInMB: Number((selectedFile.size / (1024 * 1024)).toFixed(2)),
      uploadDate: new Date().toISOString().split("T")[0],
      isMain:
        uploadCategory === "cv" &&
        !documents.some((d) => d.category === "cv" && d.isMain),
      isRequired: uploadCategory === "akademik",
      format: selectedFile.name.split(".").pop()?.toUpperCase() || "PDF",
    };

    setDocuments([newDoc, ...documents]);
    setIsUploadModalOpen(false);
    setSelectedFile(null);
    setUploadError(null);
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "cv":
        return "CV / Resume";
      case "akademik":
        return "Ijazah / Transkrip";
      case "sertifikat":
        return "Sertifikat";
      case "portofolio":
        return "Portofolio";
      default:
        return "Dokumen Pendukung";
    }
  };

  // Pengelompokan Dokumen Berdasarkan Jenis
  const cvDocs = documents.filter((d) => d.category === "cv");
  const academicDocs = documents.filter((d) => d.category === "akademik");
  const certDocs = documents.filter((d) => d.category === "sertifikat");
  const portfolioDocs = documents.filter((d) => d.category === "portofolio");
  const otherDocs = documents.filter((d) => d.category === "pendukung");

  return (
    <div className="space-y-8 mx-auto pb-12">
      {/* HEADER PAGE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1">
          {/* <Link
            href="/dashboard/profil"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-app-navy-700 hover:underline mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Profil
          </Link> */}
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Pusat CV & Dokumen Lamaran
          </h1>
          <p className="text-xs text-slate-500">
            Kelola berkas administratif, sertifikat, dan CV Anda untuk
            mempercepat proses melamar kerja.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2.5 bg-app-navy-700 hover:bg-app-navy-800 cursor-pointer text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center justify-center gap-2 shadow-sm shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>Unggah Dokumen Baru</span>
        </button>
      </div>

      {/* INFO VALIDASI & KETENTUAN UPLOAD */}
      <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl flex items-start gap-3">
        <Info className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
        <div className="text-xs text-teal-900 space-y-1">
          <p className="font-bold">Ketentuan & Validasi Dokumen:</p>
          <ul className="list-disc list-inside space-y-0.5 text-teal-800 text-[11px]">
            <li>
              Format berkas yang diterima: <strong>PDF, JPG, PNG</strong>.
            </li>
            <li>
              Batas ukuran maksimal per berkas: <strong>5 MB</strong>.
            </li>
            <li>
              Dokumen bertanda{" "}
              <span className="text-rose-600 font-bold">* Wajib</span> (seperti
              Ijazah & Transkrip) sangat disarankan untuk diunggah agar profil
              dilirik perekrut.
            </li>
          </ul>
        </div>
      </div>

      {/* SECTION 1: KELOMPOK CV & SURAT LAMARAN */}
      <DocumentGroupSection
        title="Daftar CV & Resume"
        description="Pilih salah satu sebagai CV Utama yang akan otomatis terlampir saat melamar."
        items={cvDocs}
        onPreview={setSelectedDocForPreview}
        onDelete={handleDeleteDoc}
        onSetMain={handleSetMainCV}
        onReplace={() => setIsUploadModalOpen(true)}
      />

      {/* SECTION 2: DOKUMEN AKADEMIK (WAJIB) */}
      <DocumentGroupSection
        title="Dokumen Akademik"
        description="Ijazah dan Transkrip Nilai resmi."
        items={academicDocs}
        onPreview={setSelectedDocForPreview}
        onDelete={handleDeleteDoc}
        onReplace={() => setIsUploadModalOpen(true)}
      />

      {/* SECTION 3: PORTOFOLIO & KARYA */}
      <DocumentGroupSection
        title="Portofolio & Hasil Karya"
        description="Berkas pendukung keahlian dan riwayat proyek yang pernah dikerjakan."
        items={portfolioDocs}
        onPreview={setSelectedDocForPreview}
        onDelete={handleDeleteDoc}
        onReplace={() => setIsUploadModalOpen(true)}
      />

      {/* SECTION 4: SERTIFIKAT & DOKUMEN PENDUKUNG LAINNYA */}
      <DocumentGroupSection
        title="Sertifikat & Dokumen Pendukung Lainnya"
        description="Surat Lamaran, Sertifikat Pelatihan, KTP, atau SKCK."
        items={[...certDocs, ...otherDocs]}
        onPreview={setSelectedDocForPreview}
        onDelete={handleDeleteDoc}
        onReplace={() => setIsUploadModalOpen(true)}
      />

      {/* ========================================================================= */}
      {/* MODAL UPLOAD / GANTI FILE */}
      {/* ========================================================================= */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">
                Unggah Dokumen Baru
              </h3>
              <button
                onClick={() => {
                  setIsUploadModalOpen(false);
                  setUploadError(null);
                  setSelectedFile(null);
                }}
              >
                <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              {/* KATEGORI DOKUMEN */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Jenis / Jenis Dokumen *
                </label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600 bg-white font-medium"
                >
                  <option value="cv">CV / Resume</option>
                  <option value="akademik">Ijazah / Transkrip Nilai</option>
                  <option value="portofolio">Portofolio</option>
                  <option value="sertifikat">Sertifikat Kompetensi</option>
                  <option value="pendukung">
                    Surat Lamaran / Dokumen Lainnya
                  </option>
                </select>
              </div>

              {/* UPLOAD BOX */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pilih Berkas (Maks. 5MB) *
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center bg-slate-50 hover:bg-slate-100/80 cursor-pointer transition-colors space-y-2"
                >
                  <Upload className="w-8 h-8 text-app-navy-600 mx-auto" />
                  <div className="text-xs font-semibold text-slate-700">
                    {selectedFile ? (
                      <span className="text-app-navy-700 font-bold">
                        {selectedFile.name}
                      </span>
                    ) : (
                      "Klik di sini untuk mengunggah file dari komputer / HP"
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Format didukung: PDF, JPG, PNG (Maksimal 5MB)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              {/* ERROR MESSAGE VALIDASI */}
              {uploadError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsUploadModalOpen(false);
                    setUploadError(null);
                    setSelectedFile(null);
                  }}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={!selectedFile}
                  className={`px-5 py-2 text-white font-bold text-xs rounded-xl transition-colors ${
                    selectedFile
                      ? "bg-app-navy-600 hover:bg-app-navy-700"
                      : "bg-slate-300 cursor-not-allowed"
                  }`}
                >
                  Unggah Berkas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL PREVIEW DOKUMEN */}
      {/* ========================================================================= */}
      {selectedDocForPreview && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-app-navy-600" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 truncate max-w-sm">
                    {selectedDocForPreview.name}
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Ukuran: {selectedDocForPreview.size} • Diunggah:{" "}
                    {selectedDocForPreview.uploadDate}
                  </p>
                </div>
              </div>
              <button onClick={() => setSelectedDocForPreview(null)}>
                <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
              </button>
            </div>

            {/* PREVIEW CONTAINER PLACEHOLDER */}
            <div className="flex-1 bg-slate-100 rounded-xl border border-slate-200 min-h-[300px] flex flex-col items-center justify-center p-6 text-center space-y-3">
              <FileCheck className="w-16 h-16 text-app-navy-600/40" />
              <div>
                <p className="text-xs font-bold text-slate-700">
                  Simulasi Tampilan Berkas PDF / Gambar
                </p>
                <p className="text-[11px] text-slate-500 max-w-xs mt-1">
                  Berkas {selectedDocForPreview.name} siap diperiksa oleh sistem
                  pendaftaran lamaran kerja.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[11px] text-slate-400">
                Format Berkas: {selectedDocForPreview.format}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    alert(`Mengunduh file ${selectedDocForPreview.name}`)
                  }
                  className="px-4 py-2 bg-app-navy-600 hover:bg-app-navy-700 text-white font-bold text-xs rounded-xl inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Unduh File
                </button>
                <button
                  onClick={() => setSelectedDocForPreview(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-50"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// SUB-KOMPONEN KELOMPOK DOKUMEN
// =========================================================================
interface DocumentGroupProps {
  title: string;
  description: string;
  items: DocumentItem[];
  onPreview: (doc: DocumentItem) => void;
  onDelete: (id: string) => void;
  onSetMain?: (id: string) => void;
  onReplace: () => void;
}

function DocumentGroupSection({
  title,
  description,
  items,
  onPreview,
  onDelete,
  onSetMain,
  onReplace,
}: DocumentGroupProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
      <div className="border-b border-slate-100 pb-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
          {title}
        </h2>
        <p className="text-[11px] text-slate-500">{description}</p>
      </div>

      {items.length === 0 ? (
        <div className="py-6 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50/50 space-y-2">
          <p className="text-xs font-medium text-slate-500">
            Belum ada berkas yang diunggah untuk kategori ini.
          </p>
          <button
            onClick={onReplace}
            className="text-xs font-bold text-app-navy-700 hover:underline inline-flex items-center gap-1"
          >
            <Upload className="w-3.5 h-3.5" /> Unggah Sekarang
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {items.map((doc) => (
            <div
              key={doc.id}
              className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                doc.isMain
                  ? "border-app-navy-300 bg-app-navy-50/30"
                  : "border-slate-200 bg-slate-50/50 hover:bg-slate-50"
              }`}
            >
              {/* DETAIL DOKUMEN */}
              <div className="flex items-start gap-3.5 overflow-hidden">
                <div className="p-2.5 bg-white border border-slate-200 rounded-xl shrink-0 text-app-navy-600 shadow-sm">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="space-y-1 overflow-hidden">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-900 truncate max-w-xs sm:max-w-md">
                      {doc.name}
                    </span>

                    {/* STATUS PENANDA */}
                    {doc.isMain && (
                      <span className="px-2 py-0.5 bg-app-navy-600 text-white font-bold text-[10px] rounded-full inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> CV Utama
                      </span>
                    )}

                    {doc.isRequired && (
                      <span className="px-2 py-0.5 bg-rose-100 text-rose-700 font-bold text-[10px] rounded-full">
                        * Wajib
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 flex-wrap">
                    <span>Jenis: {doc.categoryLabel}</span>
                    <span>•</span>
                    <span>Ukuran: {doc.size}</span>
                    <span>•</span>
                    <span>Tgl Upload: {doc.uploadDate}</span>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0 flex-wrap">
                {/* TOMBOL JADIKAN CV UTAMA */}
                {doc.category === "cv" && !doc.isMain && onSetMain && (
                  <button
                    onClick={() => onSetMain(doc.id)}
                    className="px-2.5 py-1.5 bg-white border border-slate-200 text-app-navy-700 hover:bg-app-navy-50 font-bold text-[11px] rounded-lg transition-colors inline-flex items-center gap-1"
                    title="Set sebagai CV Utama"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Jadikan Utama</span>
                  </button>
                )}

                {/* PREVIEW */}
                <button
                  onClick={() => onPreview(doc)}
                  className="p-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Lihat Preview"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>

                {/* DOWNLOAD */}
                <button
                  onClick={() => alert(`Mengunduh ${doc.name}`)}
                  className="p-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Unduh File"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>

                {/* GANTI FILE */}
                <button
                  onClick={onReplace}
                  className="p-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Ganti File"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>

                {/* HAPUS */}
                <button
                  onClick={() => onDelete(doc.id)}
                  className="p-2 bg-white border border-slate-200 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Hapus File"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

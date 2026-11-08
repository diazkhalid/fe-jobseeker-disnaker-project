/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Phone,
  Globe,
  MapPin,
  Mail,
  User,
  CheckCircle2,
  Upload,
  Plus,
  Trash2,
  ExternalLink,
  ShieldCheck,
  FileCheck,
  FileText,
  AlertCircle,
  Save,
  Sparkles,
  Heart,
  Smile,
  Coffee,
  Briefcase,
  Search,
  ChevronDown,
  Check,
} from "lucide-react";
import AddFacilityModal from "@/features/dashboard-perusahaan/components/AddFacilityModal";
import { useCompanyProfile } from "@/features/profil-perusahaan/hooks/useCompanyProfile.hook";
import { useOptions } from "@/shared/hooks/useOptions.hook";
import APP_CONFIG from "@/shared/global/app_config";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<
    "identitas" | "kontak" | "budaya" | "media" | "verifikasi"
  >("identitas");

  const { insdustryOptions } = useOptions();
  const {
    companyProfile,
    updateCompanyProfileForm,
    setUpdateCompanyProfileForm,
    handleUpdateCompanyProfile,
    companyProfilePictureFile,
    setCompanyProfilePictureFile,
    handleUpdateCompanyProfilePicture,
  } = useCompanyProfile();

  // State Searchable Dropdown Industri
  const [industrySearch, setIndustrySearch] = useState("");
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const industryRef = useRef<HTMLDivElement>(null);

  // Close dropdown industri ketika click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        industryRef.current &&
        !industryRef.current.contains(event.target as Node)
      ) {
        setIsIndustryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter industri berdasarkan input pencarian
  const filteredIndustries = (insdustryOptions || []).filter((item) =>
    item.name.toLowerCase().includes(industrySearch.toLowerCase()),
  );

  // State untuk kontrol Modal Tambah Fasilitas
  const [isFacilityModalOpen, setIsFacilityModalOpen] = useState(false);

  // State Dokumen Legalitas (Dummy sementara)
  const [legalDocuments, setLegalDocuments] = useState([
    {
      id: "nib",
      name: "NIB (Nomor Induk Berusaha)",
      desc: "Resmi diterbitkan melalui sistem OSS Indonesia",
      status: "verified",
      statusLabel: "Disetujui",
      file: "NIB_Samawa_Digital_2024.pdf",
    },
    {
      id: "akta",
      name: "Akta Pendirian PT & Perubahan",
      desc: "Akta pendirian beserta SK Kemenkumham",
      status: "verified",
      statusLabel: "Disetujui",
      file: "Akta_Pendirian_PT_Samawa.pdf",
    },
    {
      id: "npwp",
      name: "NPWP Badan Perusahaan",
      desc: "Nomor Pokok Wajib Pajak atas nama badan usaha",
      status: "waiting",
      statusLabel: "Menunggu Review",
      file: "NPWP_PT_Samawa_Digital.pdf",
    },
    {
      id: "domisili",
      name: "Surat Domisili / Bukti Alamat Kantor",
      desc: "Surat keterangan domisili gedung / kantor aktif",
      status: "empty",
      statusLabel: "Belum Diunggah",
      file: null,
    },
  ]);

  // Ambil data industri terpilih untuk ditampilkan di label UI berdasarkan industry_ids
  const selectedIndustryId = updateCompanyProfileForm.industry_ids[0];
  const selectedIndustryItem = insdustryOptions?.find(
    (item) =>
      item.id === selectedIndustryId || Number(item.id) === selectedIndustryId,
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleUpdateCompanyProfile();
    await handleUpdateCompanyProfilePicture();
  };

  const handleAddFacility = (newFacility: string) => {
    const currentFacilities = updateCompanyProfileForm.workplace_culture
      ? updateCompanyProfileForm.workplace_culture.split(",")
      : [];
    const updatedFacilities = [...currentFacilities, newFacility].join(",");
    setUpdateCompanyProfileForm({
      ...updateCompanyProfileForm,
      workplace_culture: updatedFacilities,
    });
  };

  const facilitiesList = updateCompanyProfileForm.workplace_culture
    ? updateCompanyProfileForm.workplace_culture
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="w-full space-y-6 mx-auto">
      {/* MODAL TAMBAH FASILITAS */}
      <AddFacilityModal
        isOpen={isFacilityModalOpen}
        onClose={() => setIsFacilityModalOpen(false)}
        onAddFacility={handleAddFacility}
      />

      {/* HEADER PAGE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-4">
          {/* AREA LOGO PERUSAHAAN */}
          <div className="relative w-20 h-20 rounded-2xl border border-slate-200 bg-slate-50 p-1 shrink-0 overflow-hidden group flex items-center justify-center">
            {companyProfilePictureFile ? (
              <Image
                src={URL.createObjectURL(companyProfilePictureFile)}
                alt="Preview Logo Perusahaan"
                fill
                className="object-cover"
              />
            ) : companyProfile?.profile_image_url ? (
              <Image
                src={
                  companyProfile.profile_image_url.startsWith("http")
                    ? companyProfile.profile_image_url
                    : `${APP_CONFIG.STORAGE_URL}${companyProfile.profile_image_url}`
                }
                alt="Logo Perusahaan"
                fill
                className="object-cover"
              />
            ) : (
              <span className="flex h-full flex-col justify-center text-xl font-bold items-center text-slate-500">
                {updateCompanyProfileForm.brand_name ? (
                  updateCompanyProfileForm.brand_name.charAt(0).toUpperCase()
                ) : (
                  <Building2 className="w-6 h-6" />
                )}
              </span>
            )}

            <div className="absolute inset-0 bg-slate-900/75 text-white flex flex-col items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <label className="flex items-center gap-1 text-[0.6rem] font-medium hover:text-teal-300 cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>Ganti</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setCompanyProfilePictureFile(file);
                    }
                  }}
                />
              </label>
              {companyProfilePictureFile ||
              companyProfile?.profile_image_url ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCompanyProfilePictureFile(null);
                  }}
                  className="flex items-center gap-1 text-[0.6rem] font-medium text-rose-400 hover:text-rose-300 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus</span>
                </button>
              ) : null}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900">
                {updateCompanyProfileForm.brand_name || "Nama Perusahaan"}
              </h1>
              <span className="inline-flex items-center gap-1 text-[0.65rem] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-700">
                <CheckCircle2 className="w-3 h-3 text-teal-600" />{" "}
                {companyProfile?.verification_status || "Terverifikasi"}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {selectedIndustryItem?.name ||
                updateCompanyProfileForm.business_field}{" "}
              • {updateCompanyProfileForm.city}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/perusahaan-list/preview"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Lihat Tampilan Publik</span>
          </Link>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-xs shadow-teal-600/20 transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </div>

      {/* TAB NAVIGASI PROFIL */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-px scrollbar-none">
        {[
          { id: "identitas", label: "Informasi Identitas", icon: Building2 },
          { id: "kontak", label: "Informasi Kontak", icon: Phone },
          { id: "budaya", label: "Budaya & Fasilitas", icon: Heart },
          { id: "media", label: "Media & Dokumentasi", icon: Sparkles },
          {
            id: "verifikasi",
            label: "Status Verifikasi",
            icon: ShieldCheck,
            badge: "Terverifikasi",
          },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-all ${
                isActive
                  ? "border-teal-600 text-teal-700 font-bold bg-white rounded-t-xl"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
              }`}
            >
              <Icon
                className={`w-4 h-4 ${isActive ? "text-teal-600" : "text-slate-400"}`}
              />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="px-1.5 py-0.2 text-[0.55rem] font-bold rounded-md bg-teal-100 text-teal-700">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* CONTENT SECTIONS */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* SEKSI A: INFORMASI IDENTITAS */}
        {activeTab === "identitas" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Identitas Perusahaan
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Brand Perusahaan
                </label>
                <input
                  type="text"
                  value={updateCompanyProfileForm.brand_name}
                  onChange={(e) =>
                    setUpdateCompanyProfileForm({
                      ...updateCompanyProfileForm,
                      brand_name: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Legal Perusahaan (Sesuai Akta)
                </label>
                <input
                  type="text"
                  value={updateCompanyProfileForm.legal_name}
                  onChange={(e) =>
                    setUpdateCompanyProfileForm({
                      ...updateCompanyProfileForm,
                      legal_name: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jenis Badan Usaha
                </label>
                <select
                  value={updateCompanyProfileForm.business_entity}
                  onChange={(e) =>
                    setUpdateCompanyProfileForm({
                      ...updateCompanyProfileForm,
                      business_entity: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                >
                  <option value="">Pilih Badan Usaha</option>
                  <option value="Perseroan Terbatas (PT)">
                    Perseroan Terbatas (PT)
                  </option>
                  <option value="Commanditaire Vennootschap (CV)">
                    Commanditaire Vennootschap (CV)
                  </option>
                  <option value="BUMD / BUMN">BUMD / BUMN</option>
                  <option value="Yayasan / NGO">Yayasan / NGO</option>
                  <option value="Perorangan / UMKM">Perorangan / UMKM</option>
                </select>
              </div>

              {/* INDUSTRI / BIDANG USAHA (SEARCHABLE SELECT OPTION) */}
              <div ref={industryRef} className="relative">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Industri / Bidang Usaha
                </label>
                <div
                  onClick={() => setIsIndustryOpen(!isIndustryOpen)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 flex items-center justify-between cursor-pointer focus:bg-white"
                >
                  <span
                    className={
                      selectedIndustryItem ? "text-slate-800" : "text-slate-400"
                    }
                  >
                    {selectedIndustryItem
                      ? selectedIndustryItem.name
                      : "Pilih industri / bidang usaha..."}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>

                {isIndustryOpen && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-50 overflow-y-auto p-2">
                    <div className="flex items-center px-2 py-1.5 border-b border-slate-100 mb-1 sticky top-0 bg-white">
                      <Search className="w-3.5 h-3.5 text-slate-400 mr-2" />
                      <input
                        type="text"
                        value={industrySearch}
                        onChange={(e) => setIndustrySearch(e.target.value)}
                        placeholder="Cari industri..."
                        className="w-full text-xs focus:outline-none bg-transparent"
                        autoFocus
                      />
                    </div>
                    {filteredIndustries.length > 0 ? (
                      filteredIndustries.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            setUpdateCompanyProfileForm({
                              ...updateCompanyProfileForm,
                              industry_ids: [Number(item.id)],
                            });
                            setIsIndustryOpen(false);
                            setIndustrySearch("");
                          }}
                          className={`px-3 py-2 text-xs rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between ${
                            updateCompanyProfileForm.industry_ids.includes(
                              Number(item.id),
                            )
                              ? "font-bold text-teal-600 bg-teal-50/50"
                              : "text-slate-700"
                          }`}
                        >
                          {item.name}
                          {updateCompanyProfileForm.industry_ids.includes(
                            Number(item.id),
                          ) && <Check className="w-3.5 h-3.5" />}
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-xs text-slate-400 text-center">
                        Tidak ditemukan
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tahun Berdiri
                </label>
                <input
                  type="number"
                  value={updateCompanyProfileForm.founded_year || ""}
                  onChange={(e) =>
                    setUpdateCompanyProfileForm({
                      ...updateCompanyProfileForm,
                      founded_year: Number(e.target.value),
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ukuran / Skala Perusahaan
                </label>
                <select
                  value={updateCompanyProfileForm.company_size}
                  onChange={(e) =>
                    setUpdateCompanyProfileForm({
                      ...updateCompanyProfileForm,
                      company_size: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                >
                  <option value="">Pilih Ukuran Perusahaan</option>
                  <option value="1 - 10 Karyawan">1 - 10 Karyawan</option>
                  <option value="11 - 50 Karyawan">11 - 50 Karyawan</option>
                  <option value="50 - 100 Karyawan">50 - 100 Karyawan</option>
                  <option value="100 - 500 Karyawan">100 - 500 Karyawan</option>
                  <option value="500+ Karyawan">500+ Karyawan</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Deskripsi Singkat (Ringkasan 1-2 Kalimat)
              </label>
              <textarea
                rows={2}
                value={updateCompanyProfileForm.description || ""}
                onChange={(e) =>
                  setUpdateCompanyProfileForm({
                    ...updateCompanyProfileForm,
                    description: e.target.value,
                  })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* SEKSI B: INFORMASI KONTAK */}
        {activeTab === "kontak" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Kontak & Lokasi Kantor
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Perusahaan
                </label>
                <input
                  type="email"
                  value={updateCompanyProfileForm.company_email}
                  onChange={(e) =>
                    setUpdateCompanyProfileForm({
                      ...updateCompanyProfileForm,
                      company_email: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor Telepon Kantor
                </label>
                <input
                  type="text"
                  value={updateCompanyProfileForm.company_phone}
                  onChange={(e) =>
                    setUpdateCompanyProfileForm({
                      ...updateCompanyProfileForm,
                      company_phone: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Website Resmi
                </label>
                <input
                  type="text"
                  value={updateCompanyProfileForm.website_url || ""}
                  onChange={(e) =>
                    setUpdateCompanyProfileForm({
                      ...updateCompanyProfileForm,
                      website_url: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kabupaten / Kota
                </label>
                <input
                  type="text"
                  value={updateCompanyProfileForm.city || ""}
                  onChange={(e) =>
                    setUpdateCompanyProfileForm({
                      ...updateCompanyProfileForm,
                      city: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Provinsi
                </label>
                <input
                  type="text"
                  value={updateCompanyProfileForm.province || ""}
                  onChange={(e) =>
                    setUpdateCompanyProfileForm({
                      ...updateCompanyProfileForm,
                      province: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Alamat Lengkap Kantor
              </label>
              <textarea
                rows={2}
                value={updateCompanyProfileForm.address || ""}
                onChange={(e) =>
                  setUpdateCompanyProfileForm({
                    ...updateCompanyProfileForm,
                    address: e.target.value,
                  })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div className="border-t border-slate-100 pt-4">
              <h3 className="text-xs font-bold text-slate-800 mb-3">
                Kontak Penanggung Jawab HR / Recruiter
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[0.7rem] font-medium text-slate-600 mb-1">
                    Nama Lengkap HR
                  </label>
                  <input
                    type="text"
                    value={updateCompanyProfileForm.hr_contact_name || ""}
                    onChange={(e) =>
                      setUpdateCompanyProfileForm({
                        ...updateCompanyProfileForm,
                        hr_contact_name: e.target.value,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[0.7rem] font-medium text-slate-600 mb-1">
                    Jabatan / Posisi
                  </label>
                  <input
                    type="text"
                    value={updateCompanyProfileForm.hr_contact_position || ""}
                    onChange={(e) =>
                      setUpdateCompanyProfileForm({
                        ...updateCompanyProfileForm,
                        hr_contact_position: e.target.value,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[0.7rem] font-medium text-slate-600 mb-1">
                    Email Kontak HR
                  </label>
                  <input
                    type="email"
                    value={updateCompanyProfileForm.hr_contact_email || ""}
                    onChange={(e) =>
                      setUpdateCompanyProfileForm({
                        ...updateCompanyProfileForm,
                        hr_contact_email: e.target.value,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEKSI C: PROFIL DAN BUDAYA PERUSAHAAN */}
        {activeTab === "budaya" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Profil, Visi, Misi & Budaya
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tentang Perusahaan (Lengkap)
              </label>
              <textarea
                rows={4}
                value={updateCompanyProfileForm.company_description || ""}
                onChange={(e) =>
                  setUpdateCompanyProfileForm({
                    ...updateCompanyProfileForm,
                    company_description: e.target.value,
                  })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Visi Perusahaan
                </label>
                <textarea
                  rows={3}
                  value={updateCompanyProfileForm.company_vision || ""}
                  onChange={(e) =>
                    setUpdateCompanyProfileForm({
                      ...updateCompanyProfileForm,
                      company_vision: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Misi Perusahaan
                </label>
                <textarea
                  rows={3}
                  value={updateCompanyProfileForm.company_mission || ""}
                  onChange={(e) =>
                    setUpdateCompanyProfileForm({
                      ...updateCompanyProfileForm,
                      company_mission: e.target.value,
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Budaya & Lingkungan Kerja
              </label>
              <textarea
                rows={3}
                value={updateCompanyProfileForm.workplace_culture || ""}
                onChange={(e) =>
                  setUpdateCompanyProfileForm({
                    ...updateCompanyProfileForm,
                    workplace_culture: e.target.value,
                  })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
              />
            </div>

            {/* Fasilitas Karyawan */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Fasilitas & Benefit Karyawan
              </label>
              <div className="flex flex-wrap gap-2">
                {facilitiesList.map((fac, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-medium"
                  >
                    <Coffee className="w-3.5 h-3.5 text-teal-600" />
                    <span>{fac}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = facilitiesList
                          .filter((_, i) => i !== idx)
                          .join(",");
                        setUpdateCompanyProfileForm({
                          ...updateCompanyProfileForm,
                          workplace_culture: updated,
                        });
                      }}
                      className="text-teal-600 hover:text-rose-600 ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}

                <button
                  type="button"
                  onClick={() => setIsFacilityModalOpen(true)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-dashed border-slate-300 text-slate-500 hover:text-teal-600 hover:border-teal-500 text-xs font-medium transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Fasilitas</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SEKSI D: MEDIA PERUSAHAAN */}
        {activeTab === "media" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Foto, Video Profil & Media Sosial
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Galeri Foto Kantor & Kegiatan (Maks. 5 Foto)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {companyProfile?.profile_image_url && (
                  <div className="relative aspect-video rounded-xl border border-slate-200 bg-slate-100 overflow-hidden group">
                    <Image
                      src={
                        companyProfile.profile_image_url.startsWith("http")
                          ? companyProfile.profile_image_url
                          : `${APP_CONFIG.STORAGE_URL}${companyProfile.profile_image_url}`
                      }
                      alt="Kantor 1"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Hapus foto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <label className="aspect-video rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100/80 transition-colors flex flex-col items-center justify-center text-slate-400 cursor-pointer">
                  <Upload className="w-5 h-5 mb-1 text-slate-400" />
                  <span className="text-[0.65rem] font-medium">
                    Unggah Foto
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg, image/jpg"
                    multiple
                  />
                </label>
              </div>
              <p className="text-[0.65rem] text-slate-400 mt-1.5">
                Format yang didukung: JPG, JPEG, PNG. Ukuran maksimal per foto
                5MB.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Link Video Profil (Youtube / Vimeo)
                </label>
                <input
                  type="text"
                  value={companyProfile?.profile_video_url || ""}
                  disabled
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  LinkedIn Perusahaan
                </label>
                <input
                  type="text"
                  value={companyProfile?.linkedin_url || ""}
                  disabled
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Instagram Perusahaan
                </label>
                <input
                  type="text"
                  value={companyProfile?.instagram_url || ""}
                  disabled
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* SEKSI E: STATUS VERIFIKASI */}
        {activeTab === "verifikasi" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Status Verifikasi & Legalitas Akun
                </h2>
                <p className="text-xs text-slate-500">
                  Unggah dan kelola dokumen legalitas perusahaan untuk
                  mendapatkan lencana terverifikasi resmi.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold w-fit">
                <ShieldCheck className="w-4 h-4 text-teal-600" />{" "}
                {companyProfile?.verification_status || "Terverifikasi Resmi"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider block">
                  Detail Ringkas Verifikasi
                </span>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Nomor NIB:</span>
                  <span className="font-semibold text-slate-900">
                    {updateCompanyProfileForm.nib || "Belum diisi"}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Status Keseluruhan:</span>
                  <span className="font-semibold text-teal-600 capitalize">
                    {companyProfile?.verification_status || "Unverified"}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2">
                <span className="text-[0.65rem] font-bold text-amber-800 uppercase tracking-wider block">
                  Catatan Administrator
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {
                    "Pastikan seluruh dokumen legalitas perusahaan telah sesuai agar proses verifikasi berjalan lancar."
                  }
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-800 mb-3">
                Kelengkapan Dokumen Legalitas Perusahaan
              </h3>
              <div className="space-y-3">
                {legalDocuments.map((doc, idx) => {
                  let badgeStyle = "bg-teal-100 text-teal-700 border-teal-200";
                  let IconStatus = FileCheck;

                  if (doc.status === "waiting") {
                    badgeStyle = "bg-amber-100 text-amber-700 border-amber-200";
                    IconStatus = AlertCircle;
                  } else if (doc.status === "rejected") {
                    badgeStyle = "bg-rose-100 text-rose-700 border-rose-200";
                    IconStatus = AlertCircle;
                  } else if (doc.status === "empty") {
                    badgeStyle = "bg-slate-100 text-slate-500 border-slate-200";
                    IconStatus = AlertCircle;
                  }

                  return (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-200 bg-white gap-3 transition-all hover:border-slate-300"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-teal-600 shrink-0 mt-0.5">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-xs font-bold text-slate-900">
                              {doc.name}
                            </p>
                            <span
                              className={`inline-flex items-center gap-1 text-[0.6rem] font-bold px-2 py-0.5 rounded-md border ${badgeStyle}`}
                            >
                              <IconStatus className="w-3 h-3" />{" "}
                              {doc.statusLabel}
                            </span>
                          </div>
                          <p className="text-[0.65rem] text-slate-500 mt-0.5">
                            {doc.desc} •{" "}
                            {doc.file ? (
                              <span className="text-slate-700 font-medium">
                                {doc.file}
                              </span>
                            ) : (
                              <span className="text-rose-500 font-medium italic">
                                Belum ada berkas terlampir
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        {doc.status === "empty" ? (
                          <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-teal-500 bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-semibold cursor-pointer transition-colors shadow-xs">
                            <Upload className="w-3.5 h-3.5 text-teal-600" />
                            <span>Unggah Dokumen</span>
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf,.jpg,.jpeg,.png"
                            />
                          </label>
                        ) : (
                          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer transition-colors">
                            <Upload className="w-3.5 h-3.5 text-slate-500" />
                            <span>Ganti Berkas</span>
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf,.jpg,.jpeg,.png"
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  Building2,
  DollarSign,
  Compass,
  Bell,
  Save,
  CheckCircle2,
  X,
  Plus,
  ArrowLeft,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  ChevronDown,
  Search,
  Check,
} from "lucide-react";
import {
  industriesDummyData,
  jobFieldsDummyData,
  preferredPositionsDummyData,
} from "@/shared/data/JobReferenceData";
import { useJobSeekerPreference } from "@/features/preference-pencaker/hooks/useUserPreference.hook";
import { JobSeekerPreference } from "@/features/preference-pencaker/types/UserPreference.type";

export default function JobPreferencesPage() {
  const {
    preferences,
    setPreferences,
    districtList,
    selectedDistrictsList,
    setSelectedDistrictsList,
    positionSearch,
    setPositionSearch,
    isPositionOpen,
    setIsPositionOpen,
    jobCategorySearch,
    setJobCategorySearch,
    isJobCategoryOpen,
    setIsJobCategoryOpen,
    industrySearch,
    setIndustrySearch,
    isIndustryOpen,
    setIsIndustryOpen,
    districtSearch,
    setDistrictSearch,
    isDistrictOpen,
    setIsDistrictOpen,
    districtRef,
    dropdownRef,
    filteredPositions,
    filteredJobCategories,
    filteredIndustries,
    filteredDistricts,
    handleAddPosition,
    handleRemovePosition,
    handleAddDistrict,
    handleRemoveDistrict,
    isSaved,
    optionsRef,
    isOpen,
    setIsOpen,
    jobStatuses,
    selectedStatus,
    toggleJobType,
    toggleWorkSystem,
    handleSubmit,
  } = useJobSeekerPreference();

  return (
    <div className="space-y-8 mx-auto pb-12">
      {/* BREADCRUMB & HEADER */}
      <div className="space-y-2">
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link
            href="/dashboard"
            className="hover:text-app-navy-700 transition-colors"
          >
            Dashboard
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link
            href="/dashboard/profil"
            className="hover:text-app-navy-700 transition-colors"
          >
            Profil Saya
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">
            Preferensi Pekerjaan
          </span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <SlidersHorizontal className="w-7 h-7 text-app-navy-700" />
              <span>Preferensi Pekerjaan</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Atur kriteria karir impian Anda agar sistem dapat memberikan
              rekomendasi lowongan yang presisi.
            </p>
          </div>

          <div className="self-start sm:self-auto">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center gap-2 px-5 py-2.5 bg-app-navy-700 hover:bg-app-navy-900 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-app-navy-700/10 active:scale-[0.98] cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Preferensi</span>
            </button>
          </div>
        </div>
      </div>

      {/* BANNER FUNGSI DATA PREFERENSI */}
      <div className="p-4 bg-gradient-to-r from-app-navy-800 to-app-navy-900 text-white rounded-2xl shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Personalisasi Otomatis</span>
        </div>
        <p className="text-xs text-app-navy-100 leading-relaxed">
          Data preferensi ini digunakan oleh algoritma platform untuk:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-start gap-2.5">
            <Compass className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold">Rekomendasi Lowongan</p>
              <p className="text-[10px] text-app-navy-200">
                Menampilkan karir teratas di beranda Anda.
              </p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-start gap-2.5">
            <Briefcase className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold">Personalisasi Pencarian</p>
              <p className="text-[10px] text-app-navy-200">
                Hasil filter cepat saat mencari pekerjaan.
              </p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-start gap-2.5">
            <Bell className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold">Notifikasi Relevan</p>
              <p className="text-[10px] text-app-navy-200">
                Pemberitahuan email & WhatsApp lowongan baru.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TOAST SUKSES */}
      {isSaved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold transition-all">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            Preferensi pekerjaan Anda berhasil diperbarui! Rekomendasi lowongan
            telah disesuaikan.
          </span>
        </div>
      )}

      {/* FORM UTAMA PREFERENSI */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SECTION 1: PERAN & SPESIALISASI */}
        <div
          ref={dropdownRef}
          className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm"
        >
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-app-navy-600" /> Minat & Posisi
              Pekerjaan
            </h2>
          </div>

          <div className="space-y-4">
            {/* POSISI YANG DIINGINKAN (Searchable & Multi-Select) */}
            <div className="relative">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Posisi / Jabatan Pekerjaan yang Diinginkan
              </label>

              <div
                onClick={() => setIsPositionOpen(!isPositionOpen)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600 bg-white flex items-center justify-between cursor-pointer min-h-[38px]"
              >
                <span className="text-slate-400">
                  {preferences.desiredPositions.length === 0
                    ? "Pilih atau cari posisi..."
                    : "Tambah posisi lain..."}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>

              {isPositionOpen && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto p-2">
                  <div className="flex items-center px-2 py-1.5 border-b border-slate-100 mb-1 sticky top-0 bg-white">
                    <Search className="w-3.5 h-3.5 text-slate-400 mr-2" />
                    <input
                      type="text"
                      value={positionSearch}
                      onChange={(e) => setPositionSearch(e.target.value)}
                      placeholder="Cari posisi..."
                      className="w-full text-xs focus:outline-none bg-transparent"
                      autoFocus
                    />
                  </div>
                  {filteredPositions.length > 0 ? (
                    filteredPositions.map((pos, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleAddPosition(pos)}
                        className="px-3 py-2 text-xs rounded-lg hover:bg-slate-50 cursor-pointer text-slate-700"
                      >
                        {pos}
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-xs text-slate-400 text-center">
                      Tidak ditemukan
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-2">
                {preferences.desiredPositions.map((pos, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-app-navy-50 border border-app-navy-200 text-app-navy-800 font-bold text-xs rounded-xl inline-flex items-center gap-1.5"
                  >
                    {pos}
                    <button
                      type="button"
                      onClick={() => handleRemovePosition(pos)}
                      className="text-app-navy-600 hover:text-rose-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* BIDANG & INDUSTRI */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* BIDANG PEKERJAAN */}
              <div className="relative">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Bidang Pekerjaan
                </label>
                <div
                  onClick={() => setIsJobCategoryOpen(!isJobCategoryOpen)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600 bg-white flex items-center justify-between cursor-pointer"
                >
                  <span
                    className={
                      preferences.jobCategory
                        ? "text-slate-800"
                        : "text-slate-400"
                    }
                  >
                    {preferences.jobCategory || "Pilih bidang pekerjaan..."}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>

                {isJobCategoryOpen && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto p-2">
                    <div className="flex items-center px-2 py-1.5 border-b border-slate-100 mb-1 sticky top-0 bg-white">
                      <Search className="w-3.5 h-3.5 text-slate-400 mr-2" />
                      <input
                        type="text"
                        value={jobCategorySearch}
                        onChange={(e) => setJobCategorySearch(e.target.value)}
                        placeholder="Cari bidang..."
                        className="w-full text-xs focus:outline-none bg-transparent"
                        autoFocus
                      />
                    </div>
                    {filteredJobCategories.length > 0 ? (
                      filteredJobCategories.map((cat, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setPreferences({
                              ...preferences,
                              jobCategory: cat,
                            });
                            setIsJobCategoryOpen(false);
                            setJobCategorySearch("");
                          }}
                          className={`px-3 py-2 text-xs rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between ${
                            preferences.jobCategory === cat
                              ? "font-bold text-app-navy-600 bg-app-navy-50/50"
                              : "text-slate-700"
                          }`}
                        >
                          {cat}
                          {preferences.jobCategory === cat && (
                            <Check className="w-3.5 h-3.5" />
                          )}
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

              {/* INDUSTRI PILIHAN */}
              <div className="relative">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Industri Pilihan
                </label>
                <div
                  onClick={() => setIsIndustryOpen(!isIndustryOpen)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600 bg-white flex items-center justify-between cursor-pointer"
                >
                  <span
                    className={
                      preferences.industry ? "text-slate-800" : "text-slate-400"
                    }
                  >
                    {preferences.industry || "Pilih industri..."}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>

                {isIndustryOpen && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto p-2">
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
                      filteredIndustries.map((ind, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setPreferences({ ...preferences, industry: ind });
                            setIsIndustryOpen(false);
                            setIndustrySearch("");
                          }}
                          className={`px-3 py-2 text-xs rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between ${
                            preferences.industry === ind
                              ? "font-bold text-app-navy-600 bg-app-navy-50/50"
                              : "text-slate-700"
                          }`}
                        >
                          {ind}
                          {preferences.industry === ind && (
                            <Check className="w-3.5 h-3.5" />
                          )}
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
            </div>
          </div>
        </div>

        {/* SECTION 2: LOKASI & WILAYAH */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-app-navy-600" /> Lokasi & Wilayah
              Pilihan
            </h2>
          </div>

          <div className="space-y-4">
            {/* WILAYAH / KECAMATAN */}
            <div ref={districtRef} className="relative">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kecamatan / Wilayah Spesifik
              </label>

              <div
                onClick={() => setIsDistrictOpen(!isDistrictOpen)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600 bg-white flex items-center justify-between cursor-pointer min-h-[38px] mb-2"
              >
                <span className="text-slate-400">
                  {selectedDistrictsList.length === 0
                    ? "Pilih atau cari kecamatan (contoh: Alas, Sumbawa)..."
                    : "Tambah kecamatan lain..."}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>

              {isDistrictOpen && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto p-2">
                  <div className="flex items-center px-2 py-1.5 border-b border-slate-100 mb-1 sticky top-0 bg-white">
                    <Search className="w-3.5 h-3.5 text-slate-400 mr-2" />
                    <input
                      type="text"
                      value={districtSearch}
                      onChange={(e) => setDistrictSearch(e.target.value)}
                      placeholder="Cari kecamatan..."
                      className="w-full text-xs focus:outline-none bg-transparent"
                      autoFocus
                    />
                  </div>
                  {filteredDistricts.length > 0 ? (
                    filteredDistricts.map((item) => (
                      <div
                        key={item.code}
                        onClick={() => handleAddDistrict(item)}
                        className="px-3 py-2 text-xs rounded-lg hover:bg-slate-50 cursor-pointer text-slate-700 flex justify-between items-center"
                      >
                        <span>Kec. {item.name}</span>
                        <span className="text-[10px] text-slate-400">
                          {item.code}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-xs text-slate-400 text-center">
                      Tidak ditemukan
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {selectedDistrictsList.map((item) => (
                  <span
                    key={item.code}
                    className="px-3 py-1 bg-app-navy-50 border border-app-navy-200 text-app-navy-800 font-bold text-xs rounded-xl inline-flex items-center gap-1.5"
                  >
                    Kec. {item.name}
                    <button
                      type="button"
                      onClick={() => handleRemoveDistrict(item.code)}
                      className="text-app-navy-600 hover:text-rose-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* KESEDIAAN DITEMPATKAN DI LUAR DAERAH */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kesediaan Bekerja di Luar Daerah / Relokasi
              </label>
              <select
                value={preferences.relocationStatus}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    relocationStatus: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600 bg-white"
              >
                <option value="">Pilih opsi relokasi...</option>
                <option value="Ya, siap ditempatkan di mana saja">
                  Ya, bersedia relokasi ke seluruh wilayah Indonesia
                </option>
                <option value="Hanya regional NTB">
                  Hanya bersedia di wilayah Nusa Tenggara Barat (NTB)
                </option>
                <option value="Tidak bersedia relokasi">
                  Tidak bersedia (Hanya domisili saat ini)
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 3: SKEMA KERJA & EKSPEKTASI GAJI */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-app-navy-600" /> Skema Kerja &
              Ekspektasi Gaji
            </h2>
          </div>

          <div className="space-y-6">
            {/* JENIS PEKERJAAN */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Jenis Pekerjaan
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Penuh Waktu (Full-time)",
                  "Paruh Waktu (Part-time)",
                  "Kontrak / Proyek",
                  "Magang (Internship)",
                  "Lepas / Freelance",
                ].map((type) => {
                  const isSelected = preferences.jobTypes.includes(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleJobType(type)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? "bg-app-navy-700 text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SISTEM KERJA */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Sistem Kerja (Work Arrangement)
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Kerja di Kantor (On-site)",
                  "Hibrida (Hybrid)",
                  "Kerja dari Rumah (Remote)",
                ].map((sys) => {
                  const isSelected = preferences.workSystems.includes(sys);
                  return (
                    <button
                      key={sys}
                      type="button"
                      onClick={() => toggleWorkSystem(sys)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? "bg-app-navy-700 text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {sys}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* EKSPEKTASI GAJI */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Ekspektasi Gaji Bulanan (IDR)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-400">
                    Rp
                  </span>
                  <input
                    type="text"
                    value={preferences.expectedSalaryMin}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        expectedSalaryMin: e.target.value,
                      })
                    }
                    placeholder="Gaji Minimum"
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600 font-bold text-slate-800"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Batas Bawah
                  </span>
                </div>

                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-400">
                    Rp
                  </span>
                  <input
                    type="text"
                    value={preferences.expectedSalaryMax}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        expectedSalaryMax: e.target.value,
                      })
                    }
                    placeholder="Gaji Maksimum"
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-app-navy-600 font-bold text-slate-800"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Batas Atas
                  </span>
                </div>
              </div>
            </div>

            {/* STATUS PEKERJAAN */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Status Pencarian Kerja Saat Ini
              </label>
              <div className="relative" ref={optionsRef}>
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        selectedStatus?.color || "bg-slate-300"
                      }`}
                    />
                    {selectedStatus?.label || "Pilih status pencarian kerja..."}
                  </span>
                  <span>▾</span>
                </button>

                {isOpen && (
                  <div className="absolute z-10 mt-2 w-full rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
                    {jobStatuses.map((status) => (
                      <button
                        key={status.value}
                        type="button"
                        onClick={() => {
                          setPreferences({
                            ...preferences,
                            jobStatus: status.value,
                          });
                          setIsOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs hover:bg-slate-50"
                      >
                        <span
                          className={`h-2.5 w-2.5 shrink-0 rounded-full ${status.color}`}
                        />
                        {status.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SAVE BAR */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-8 py-3 bg-app-navy-600 hover:bg-app-navy-700 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Semua Preferensi</span>
          </button>
        </div>
      </form>
    </div>
  );
}

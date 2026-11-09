"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  Search,
  MapPin,
  ShieldCheck,
  Clock,
  Building,
  Eye,
  RotateCcw,
  ChevronDown,
  Check,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useAdminCompany } from "@/features/manajemen-perusahaan-admin/hooks/useAdminCompany.hook";
import { useOptions } from "@/shared/hooks/useOptions.hook";

export default function CompaniesPage() {
  const { adminCompany, paramsFilter, setParamsFilter, paginationInfo } =
    useAdminCompany();
  const { districtOptions, insdustryOptions } = useOptions();

  // State tampilan dropdown / input lokal untuk UI
  const [industrySearch, setIndustrySearch] = useState("");
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const industryRef = useRef<HTMLDivElement>(null);

  const [locationSearch, setLocationSearch] = useState("");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);

  // Close dropdown ketika klik di luar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target as Node)
      ) {
        setIsLocationOpen(false);
      }
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

  const filteredDistricts = (districtOptions || []).filter((item) =>
    item.name.toLowerCase().includes(locationSearch.toLowerCase()),
  );

  const filteredIndustries = (insdustryOptions || []).filter((item) =>
    item.name.toLowerCase().includes(industrySearch.toLowerCase()),
  );

  const resetFilters = () => {
    setParamsFilter({
      ...paramsFilter,
      search: "",
      verification_status: "",
      industry_id: 0,
      location: "",
      page: 1,
    });
    setIndustrySearch("");
    setLocationSearch("");
  };

  // Cari nama label industri yang terpilih berdasarkan ID di paramsFilter
  const selectedIndustryItem = insdustryOptions?.find(
    (item) => item.id === paramsFilter.industry_id,
  );

  // Cari nama label lokasi yang terpilih berdasarkan code di paramsFilter
  const selectedDistrictItem = (districtOptions || []).find(
    (item) => item.code === paramsFilter.location,
  );

  const getPageNumbers = () => {
    const totalPages = paginationInfo?.total_pages || 1;
    const currentPage = paginationInfo?.page || 1;
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }
    return pages;
  };

  return (
    <div className="space-y-6 bg-slate-50/50">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-teal-600" />
            Daftar Perusahaan Terdaftar
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Kelola data mitra perusahaan, status verifikasi NIB, dan riwayat
            publikasi lowongan kerja.
          </p>
        </div>

        <div className="text-xs text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs self-start sm:self-auto">
          Total Data:{" "}
          <strong className="text-slate-900">
            {paginationInfo?.total || 0}
          </strong>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama brand atau NIB..."
              value={paramsFilter.search}
              onChange={(e) =>
                setParamsFilter({
                  ...paramsFilter,
                  search: e.target.value,
                  page: 1,
                })
              }
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500 focus:bg-white transition-all text-slate-800"
            />
          </div>

          {/* Filter Status */}
          <div>
            <select
              value={paramsFilter.verification_status}
              onChange={(e) =>
                setParamsFilter({
                  ...paramsFilter,
                  verification_status: e.target.value as any,
                  page: 1,
                })
              }
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-teal-500 transition-all"
            >
              <option value="">Semua Status Verifikasi</option>
              <option value="verified">Terverifikasi</option>
              <option value="unverified">Belum Terverifikasi</option>
            </select>
          </div>

          {/* Filter Industri (Searchable Select) */}
          <div ref={industryRef} className="relative">
            <div
              onClick={() => setIsIndustryOpen(!isIndustryOpen)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 flex items-center justify-between cursor-pointer focus:bg-white"
            >
              <span
                className={
                  selectedIndustryItem
                    ? "text-slate-800 font-medium"
                    : "text-slate-500"
                }
              >
                {selectedIndustryItem
                  ? selectedIndustryItem.name
                  : "Semua Industri"}
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
                <div
                  onClick={() => {
                    setParamsFilter({
                      ...paramsFilter,
                      industry_id: 0,
                      page: 1,
                    });
                    setIsIndustryOpen(false);
                    setIndustrySearch("");
                  }}
                  className="px-3 py-2 text-xs rounded-lg hover:bg-slate-50 cursor-pointer text-slate-700"
                >
                  Semua Industri
                </div>
                {filteredIndustries.length > 0 ? (
                  filteredIndustries.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setParamsFilter({
                          ...paramsFilter,
                          industry_id: item.id,
                          page: 1,
                        });
                        setIsIndustryOpen(false);
                        setIndustrySearch("");
                      }}
                      className={`px-3 py-2 text-xs rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between ${
                        paramsFilter.industry_id === item.id
                          ? "font-bold text-teal-600 bg-teal-50/50"
                          : "text-slate-700"
                      }`}
                    >
                      {item.name}
                      {paramsFilter.industry_id === item.id && (
                        <Check className="w-3.5 h-3.5" />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-2 text-xs text-slate-400 text-center">
                    Industri tidak ditemukan
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Filter Lokasi (Searchable Select berbasis Code) */}
          <div ref={locationRef} className="relative">
            <div
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 flex items-center justify-between cursor-pointer focus:bg-white"
            >
              <span
                className={
                  selectedDistrictItem
                    ? "text-slate-800 font-medium"
                    : "text-slate-500"
                }
              >
                {selectedDistrictItem
                  ? selectedDistrictItem.name
                  : "Semua Lokasi"}
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>

            {isLocationOpen && (
              <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-50 overflow-y-auto p-2">
                <div className="flex items-center px-2 py-1.5 border-b border-slate-100 mb-1 sticky top-0 bg-white">
                  <Search className="w-3.5 h-3.5 text-slate-400 mr-2" />
                  <input
                    type="text"
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    placeholder="Cari lokasi / district..."
                    className="w-full text-xs focus:outline-none bg-transparent"
                    autoFocus
                  />
                </div>
                <div
                  onClick={() => {
                    setParamsFilter({ ...paramsFilter, location: "", page: 1 });
                    setIsLocationOpen(false);
                    setLocationSearch("");
                  }}
                  className="px-3 py-2 text-xs rounded-lg hover:bg-slate-50 cursor-pointer text-slate-700"
                >
                  Semua Lokasi
                </div>
                {filteredDistricts.length > 0 ? (
                  filteredDistricts.map((item) => (
                    <div
                      key={item.code}
                      onClick={() => {
                        setParamsFilter({
                          ...paramsFilter,
                          location: item.code,
                          page: 1,
                        });
                        setIsLocationOpen(false);
                        setLocationSearch("");
                      }}
                      className={`px-3 py-2 text-xs rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between ${
                        paramsFilter.location === item.code
                          ? "font-bold text-teal-600 bg-teal-50/50"
                          : "text-slate-700"
                      }`}
                    >
                      {item.name}
                      {paramsFilter.location === item.code && (
                        <Check className="w-3.5 h-3.5" />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-2 text-xs text-slate-400 text-center">
                    Lokasi tidak ditemukan
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TABLE / LIST PERUSAHAAN */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[0.65rem] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Perusahaan & NIB</th>
                <th className="py-3.5 px-4">Lokasi & Wilayah</th>
                <th className="py-3.5 px-4">Status Verifikasi</th>
                <th className="py-3.5 px-4">Tanggal Bergabung</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {adminCompany.length > 0 ? (
                adminCompany.map((company) => (
                  <tr
                    key={company.profile_id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    {/* Perusahaan & NIB */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center font-bold shrink-0">
                          <Building className="w-4 h-4" />
                        </div>
                        <div>
                          <Link
                            href={`/dashboard/admin/perusahaan/${company.profile_id}`}
                            className="font-bold text-slate-900 hover:text-teal-600 transition-colors block"
                          >
                            {company.brand_name}
                          </Link>
                          <span className="text-[0.65rem] text-slate-400 font-mono">
                            NIB: {company.nib || "-"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Lokasi & Wilayah */}
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-800">
                        {company.district_name || company.city || "-"}
                      </p>
                      <p className="text-[0.65rem] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {company.city || "-"}
                      </p>
                    </td>

                    {/* Status Verifikasi */}
                    <td className="py-3.5 px-4">
                      {company.verification_status === "verified" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.65rem] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <ShieldCheck className="w-3 h-3" /> Terverifikasi
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.65rem] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3 h-3" /> Belum Terverifikasi
                        </span>
                      )}
                    </td>

                    {/* Tanggal Bergabung */}
                    <td className="py-3.5 px-4 text-slate-600">
                      {company.registered_at
                        ? new Date(company.registered_at).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )
                        : "-"}
                    </td>

                    {/* Aksi */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/admin/perusahaan/${company.profile_id}`}
                          className="p-1.5 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors flex items-center gap-1 text-[0.7rem] font-semibold"
                          title="Lihat Detail Perusahaan"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Detail</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                /* EMPTY STATE */
                <tr>
                  <td colSpan={5} className="py-12 text-center">
                    <div className="max-w-sm mx-auto space-y-3">
                      <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-200">
                        <Building className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xs font-bold text-slate-800">
                          Perusahaan Tidak Ditemukan
                        </h3>
                        <p className="text-[0.7rem] text-slate-500 leading-relaxed">
                          Tidak ada perusahaan atau instansi yang sesuai dengan
                          kriteria filter atau pencarian Anda.
                        </p>
                      </div>
                      {(paramsFilter.search ||
                        paramsFilter.verification_status !== "" ||
                        paramsFilter.industry_id !== 0 ||
                        paramsFilter.location !== "") && (
                        <button
                          onClick={resetFilters}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[0.7rem] font-bold rounded-lg transition-colors"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reset Filter</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {paginationInfo && (
          <div className="flex flex-col md:flex-row items-center justify-between px-6 py-3.5 border-t border-slate-100 bg-slate-50/40 text-[0.7rem] text-slate-500 gap-4">
            {/* Rows Per Page & Data Summary */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span>Tampilkan:</span>
                <select
                  value={paramsFilter.limit}
                  onChange={(e) =>
                    setParamsFilter({
                      ...paramsFilter,
                      limit: Number(e.target.value),
                      rows_per_page: Number(e.target.value),
                      page: 1,
                    })
                  }
                  className="px-2.5 py-1 bg-white border border-slate-200 rounded-xl text-[0.7rem] font-bold text-slate-800 focus:outline-none focus:border-teal-500 cursor-pointer shadow-2xs"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span>per halaman</span>
              </div>
              <span className="text-slate-300">|</span>
              <div>
                Total{" "}
                <strong className="text-slate-900 font-bold">
                  {paginationInfo.total}
                </strong>{" "}
                data
              </div>
            </div>

            {/* Pagination Numbers & Navigation Buttons */}
            <div className="flex items-center gap-1.5">
              {/* Tombol Previous Icon */}
              <button
                disabled={paginationInfo.page <= 1}
                onClick={() =>
                  setParamsFilter({
                    ...paramsFilter,
                    page: paginationInfo.page - 1,
                  })
                }
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-500 disabled:hover:border-slate-200 font-semibold text-slate-600 transition-all shadow-2xs cursor-pointer"
                title="Halaman Sebelumnya"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              {/* Deret Angka Halaman */}
              <div className="flex items-center gap-1">
                {getPageNumbers().map((pageItem, index) =>
                  typeof pageItem === "number" ? (
                    <button
                      key={index}
                      onClick={() =>
                        setParamsFilter({
                          ...paramsFilter,
                          page: pageItem,
                        })
                      }
                      className={`w-7 h-7 flex items-center justify-center rounded-lg text-[0.7rem] font-bold transition-all cursor-pointer ${
                        paginationInfo.page === pageItem
                          ? "bg-teal-600 text-white shadow-xs shadow-teal-600/30"
                          : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {pageItem}
                    </button>
                  ) : (
                    <span
                      key={index}
                      className="w-7 text-center text-slate-400 font-bold select-none"
                    >
                      {pageItem}
                    </span>
                  ),
                )}
              </div>

              {/* Tombol Next Icon */}
              <button
                disabled={
                  paginationInfo.page >= (paginationInfo.total_pages || 1)
                }
                onClick={() =>
                  setParamsFilter({
                    ...paramsFilter,
                    page: paginationInfo.page + 1,
                  })
                }
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-500 disabled:hover:border-slate-200 font-semibold text-slate-600 transition-all shadow-2xs cursor-pointer"
                title="Halaman Selanjutnya"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

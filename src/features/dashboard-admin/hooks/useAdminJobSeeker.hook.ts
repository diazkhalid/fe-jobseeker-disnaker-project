import { useEffect, useState } from "react";
import {
  AdminExportJobSeekerFilter,
  AdminExportJobSeekerResult,
  AdminJobSeeker,
  AdminJobSeekerDetail,
  AdminJobSeekerIndexFilter,
} from "../types/AdminJobSeeker.type";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import {
  exportAdminJobSeeker,
  getAdminJobSeekerById,
  indexAdminJobSeeker,
} from "../services/job-seeker.service";
import { useToast } from "@/shared/contexts/ToastContext";
import { useOptions } from "@/shared/hooks/useOptions.hook";
import { userGenderMap } from "@/shared/utils/userGenderMap";
import { mapPayloadToJobStatus } from "@/shared/utils/userJobMap";
import { Pagination } from "@/shared/types/pagination.type";

export function useAdminJobSeeker() {
  const [adminJobSeeker, setAdminJobSeeker] = useState<AdminJobSeeker[] | []>(
    [],
  );
  const [adminJobSeekerPagination, setAdminJobSeekerPagination] =
    useState<Pagination | null>(null);

  const [token] = useLocalStorage("access-token", null);

  const [adminJobSeekerDetail, setAdminJobSeekerDetail] =
    useState<AdminJobSeekerDetail | null>(null);

  const [adminExportJobSeekerFilter, setAdminExportJobSeekerFilter] =
    useState<AdminExportJobSeekerFilter>({
      education_level: "",
      gender: "",
      job_field_id: null,
      job_type: "",
      job_search_status: "",
      district_code: "",
      min_age: null,
      max_age: null,
      industry_id: null,
      work_arrangement: "",
      preferred_district_code: "",
      min_salary: null,
      max_salary: null,
      position_id: null,
      willing_to_relocate: null,
      is_fresh_graduate: null,
    });

  const [adminExportJobSeeker, setAdminExportJobSeeker] = useState<
    AdminExportJobSeekerResult[] | []
  >([]);

  const [exportMessage, setExportMessage] = useState<string | null>(null);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const { addToast } = useToast();

  const [filters, setFilters] = useState<AdminJobSeekerIndexFilter>({
    search: "",
    account_status: "",
    education_level: "",
    experience: "",
    district_code: "",
    registered_from: "",
    registered_to: "",
    page: 1,
    rowsPerPage: 10,
    limit: 10,
  });
  const {
    districtOptions,
    insdustryOptions,
    jobCategoryOptions,
    jobPositionOptions,
  } = useOptions();

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      const result = await indexAdminJobSeeker(token, filters);
      if (result.status !== 200) {
        return;
      }
      setAdminJobSeeker(result.data.data);
      setAdminJobSeekerPagination(result.data.pagination);
    };
    fetch();
  }, [token, filters]);

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      const result = await exportAdminJobSeeker(
        token,
        adminExportJobSeekerFilter,
      );
      if (result.status !== 200) {
        return;
      }
      setAdminExportJobSeeker(result.data.data);
    };
    fetch();
  }, [token, adminExportJobSeekerFilter]);

  const handleGetAdminJobSeekerDetail = async (token: string, id: string) => {
    if (!token) return;
    const result = await getAdminJobSeekerById(token, id);
    console.log(result);

    if (result.status !== 200) {
      addToast("Gagal mengambil detail data", "error");
      return;
    }

    setAdminJobSeekerDetail(result.data.data);
  };

  const handleExportPDF = async () => {
    if (adminExportJobSeeker.length === 0) return;

    try {
      setIsExportingPdf(true);
      setExportMessage(
        "Sedang memproses dan merender berkas PDF Laporan Dinas...",
      );

      const response = await fetch("/api/export/job-seeker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: adminExportJobSeeker,
          filter: adminExportJobSeekerFilter, // Mengirimkan state filter aktif
          admin_name: "Admin Disnakertrans",
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal mengunduh laporan PDF.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Laporan_Preferensi_Pelamar_${new Date().toISOString().slice(0, 10)}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setExportMessage("Berhasil mengunduh dokumen PDF Laporan Dinas!");
    } catch (error: any) {
      console.error("Export PDF Error:", error);
      setExportMessage("Terjadi kesalahan saat mengekspor dokumen PDF.");
    } finally {
      setIsExportingPdf(false);
      setTimeout(() => setExportMessage(null), 4000);
    }
  };

  const handleExportExcel = async () => {
    if (adminExportJobSeeker.length === 0) return;

    try {
      const XLSX = await import("xlsx");

      // ==========================================
      // 1. MAPPING DATA PELAMAR
      // ==========================================

      const applicantData = adminExportJobSeeker.map((applicant, index) => ({
        No: index + 1,
        "Nama Lengkap": applicant.FullName || "-",
        NIK: applicant.NIK || "-",
        Pendidikan: applicant.Education || "-",
        "Jenis Kelamin": userGenderMap[applicant.Gender] || "-",
        Umur: applicant.Age || 0,
        Domisili: applicant.DistrictName || "-",
        "Preferensi Tempat Kerja":
          applicant.PreferredDistricts?.join(", ") || "-",
        "Posisi yang Diinginkan":
          applicant.PreferredPositions?.join(", ") || "-",
        "Ekspektasi Gaji Minimum": applicant.MinSalary || 0,
        "Ekspektasi Gaji Maksimum": applicant.MaxSalary || 0,
        "Status Pencarian Kerja":
          mapPayloadToJobStatus(applicant.JobSearchStatus) || "Active",
      }));

      // ==========================================
      // 2. MAPPING FILTER YANG DIGUNAKAN
      // ==========================================

      const filter = adminExportJobSeekerFilter;

      const getOptionName = (
        options: { id: number; name: string }[],
        id: number | null,
      ) => options.find((item) => item.id === id)?.name || "Semua";

      const getDistrictName = (code: string) =>
        districtOptions.find((item) => item.code === code)?.name || "Semua";

      const filterData = [
        {
          Parameter: "Tanggal Export",
          Nilai: new Date().toLocaleString("id-ID"),
        },
        {
          Parameter: "Pendidikan Terakhir",
          Nilai: filter.education_level || "Semua",
        },
        {
          Parameter: "Domisili (Kecamatan)",
          Nilai: getDistrictName(filter.district_code),
        },
        {
          Parameter: "Preferensi Tempat Kerja",
          Nilai: getDistrictName(filter.preferred_district_code),
        },
        {
          Parameter: "Jenis Kelamin",
          Nilai:
            filter.gender === "male"
              ? "Laki-laki"
              : filter.gender === "female"
                ? "Perempuan"
                : "Semua",
        },
        {
          Parameter: "Umur Minimum",
          Nilai: filter.min_age ?? "Tidak ditentukan",
        },
        {
          Parameter: "Umur Maksimum",
          Nilai: filter.max_age ?? "Tidak ditentukan",
        },
        {
          Parameter: "Gaji Minimum",
          Nilai: filter.min_salary ?? "Tidak ditentukan",
        },
        {
          Parameter: "Gaji Maksimum",
          Nilai: filter.max_salary ?? "Tidak ditentukan",
        },
        {
          Parameter: "Bidang Pekerjaan",
          Nilai: getOptionName(jobCategoryOptions, filter.job_field_id),
        },
        {
          Parameter: "Industri",
          Nilai: getOptionName(insdustryOptions, filter.industry_id),
        },
        {
          Parameter: "Posisi Pekerjaan",
          Nilai: getOptionName(jobPositionOptions, filter.position_id),
        },
        {
          Parameter: "Jenis Pekerjaan",
          Nilai:
            {
              full_time: "Penuh Waktu (Full-time)",
              part_time: "Paruh Waktu (Part-time)",
              contract_project: "Kontrak / Proyek",
              internship: "Magang (Internship)",
              freelance: "Lepas / Freelance",
            }[filter.job_type] || "Semua",
        },
        {
          Parameter: "Sistem Kerja",
          Nilai:
            {
              on_site: "Kantor (On-site)",
              hybrid: "Hibrida (Hybrid)",
              remote: "Dari Rumah (Remote)",
            }[filter.work_arrangement] || "Semua",
        },
        {
          Parameter: "Kesediaan Relokasi",
          Nilai:
            filter.willing_to_relocate === null
              ? "Semua"
              : filter.willing_to_relocate
                ? "Bersedia"
                : "Tidak Bersedia",
        },
        {
          Parameter: "Status Pencarian Kerja",
          Nilai:
            {
              actively_looking: "Aktif mencari pekerjaan",
              open_to_offers: "Terbuka untuk penawaran",
            }[filter.job_search_status] || "Semua",
        },
        {
          Parameter: "Total Pelamar",
          Nilai: adminExportJobSeeker.length,
        },
      ];

      // ==========================================
      // 3. MEMBUAT WORKBOOK
      // ==========================================

      const workbook = XLSX.utils.book_new();

      // Worksheet Data Pelamar
      const applicantSheet = XLSX.utils.json_to_sheet(applicantData);

      // Worksheet Filter Export
      const filterSheet = XLSX.utils.json_to_sheet(filterData);

      // ==========================================
      // 4. MENGATUR LEBAR KOLOM
      // ==========================================

      applicantSheet["!cols"] = [
        { wch: 6 },
        { wch: 28 },
        { wch: 22 },
        { wch: 15 },
        { wch: 18 },
        { wch: 10 },
        { wch: 20 },
        { wch: 30 },
        { wch: 35 },
        { wch: 24 },
        { wch: 24 },
        { wch: 25 },
      ];

      filterSheet["!cols"] = [{ wch: 35 }, { wch: 40 }];

      // ==========================================
      // 5. MENGAKTIFKAN FILTER EXCEL
      // ==========================================

      if (applicantData.length > 0) {
        applicantSheet["!autofilter"] = {
          ref: applicantSheet["!ref"]!,
        };
      }

      // ==========================================
      // 6. MENAMBAHKAN WORKSHEET
      // ==========================================

      XLSX.utils.book_append_sheet(workbook, applicantSheet, "Data Pelamar");

      XLSX.utils.book_append_sheet(workbook, filterSheet, "Filter Export");

      // ==========================================
      // 7. DOWNLOAD EXCEL
      // ==========================================

      const fileName = `Laporan_Pelamar_${new Date()
        .toISOString()
        .slice(0, 10)}.xlsx`;

      XLSX.writeFile(workbook, fileName);
    } catch (error) {
      console.error("Export Excel Error:", error);
      alert("Gagal mengexport data ke Excel.");
    }
  };
  return {
    adminJobSeekerDetail,
    adminJobSeeker,
    setAdminJobSeeker,
    filters,
    setFilters,
    handleGetAdminJobSeekerDetail,
    adminExportJobSeeker,
    adminExportJobSeekerFilter,
    setAdminExportJobSeekerFilter,
    exportMessage,
    isExportingPdf,
    handleExportPDF,
    handleExportExcel,
    adminJobSeekerPagination,
    setAdminJobSeekerPagination,
  };
}

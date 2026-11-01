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

export function useAdminJobSeeker() {
  const [adminJobSeeker, setAdminJobSeeker] = useState<AdminJobSeeker[] | []>(
    [],
  );
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

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      const result = await indexAdminJobSeeker(token, filters);
      if (result.status !== 200) {
        return;
      }
      setAdminJobSeeker(result.data.data);
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
  };
}

import { useEffect, useState } from "react";
import {
  AdminCompanyData,
  AdminCompanyIndexParams,
} from "../types/company.type";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { useToast } from "@/shared/contexts/ToastContext";
import { indexAdminCompany } from "../services/company.service";
import { Pagination } from "@/shared/types/pagination.type";

export function useAdminCompany() {
  const [adminCompany, setAdminCompany] = useState<AdminCompanyData[] | []>([]);
  const [token] = useLocalStorage("access-token", null);
  const { addToast } = useToast();

  const [paramsFilter, setParamsFilter] = useState<AdminCompanyIndexParams>({
    search: "",
    verification_status: "",
    industry_id: 0,
    location: "",
    page: 1,
    limit: 10,
    rows_per_page: 10,
  });

  const [paginationInfo, setPaginationInfo] = useState<Pagination | null>(null);

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      const result = await indexAdminCompany(token, paramsFilter);
      if (result.status !== 200) {
        addToast("Gagal memuat data perusahaan", "warning");
        return;
      }
      setAdminCompany(result.data.data);
      setPaginationInfo(result.data.pagination);
    };
    fetch();
  }, [token, paramsFilter]);

  return {
    adminCompany,
    setAdminCompany,
    paramsFilter,
    setParamsFilter,
    paginationInfo,
    setPaginationInfo,
  };
}

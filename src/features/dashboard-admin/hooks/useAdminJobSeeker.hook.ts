import { useEffect, useState } from "react";
import {
  AdminJobSeeker,
  AdminJobSeekerDetail,
  AdminJobSeekerIndexFilter,
} from "../types/AdminJobSeeker.type";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import {
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
  return {
    adminJobSeekerDetail,
    adminJobSeeker,
    setAdminJobSeeker,
    filters,
    setFilters,
    handleGetAdminJobSeekerDetail,
  };
}

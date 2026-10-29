import { useEffect, useState } from "react";
import {
  AdminJobSeeker,
  AdminJobSeekerIndexFilter,
} from "../types/AdminJobSeeker.type";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { indexAdminJobSeeker } from "../services/job-seeker.service";

export function useAdminJobSeeker() {
  const [adminJobSeeker, setAdminJobSeeker] = useState<AdminJobSeeker[] | []>(
    [],
  );
  const [token] = useLocalStorage("access-token", null);
  const [filters, setFilters] = useState<AdminJobSeekerIndexFilter>({
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

  return { adminJobSeeker, setAdminJobSeeker, filters, setFilters };
}

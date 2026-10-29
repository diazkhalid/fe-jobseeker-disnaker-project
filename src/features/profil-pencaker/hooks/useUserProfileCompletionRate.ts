import { useEffect, useState } from "react";
import { ProfileCompletionRateData } from "../types/userProfile.type";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { getProfileCompletionRate } from "../services/profile.service";

export function useJobSeekerProfileCompletionRate() {
  const [jobSeekerProfileCompletionRate, setJobSeekerProfileCompletionRate] =
    useState<ProfileCompletionRateData | null>(null);
  const [token] = useLocalStorage("access-token", null);

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      const result = await getProfileCompletionRate(token);
      if (result.status !== 200) return;
      setJobSeekerProfileCompletionRate(result.data.data);
    };
    fetch();
  }, [token]);
  return {
    jobSeekerProfileCompletionRate,
  };
}

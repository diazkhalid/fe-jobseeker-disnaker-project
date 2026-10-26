import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import React, { useState, useEffect } from "react";
export function useJobSeekerProfile() {
  const [token] = useLocalStorage("access-token", null);
  const [jobSeekerProfile, setJobSeekerProfile] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      // const result = await
    };
    fetch();
  }, [token]);
  return {
    jobSeekerProfile,
    setJobSeekerProfile,
  };
}

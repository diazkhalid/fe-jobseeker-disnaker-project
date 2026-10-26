import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import React, { useState, useEffect } from "react";
import {
  getJobSeekerProfile,
  updateJobSeekerProfilePicture,
} from "../services/profile.service";
import { JobSeekerProfileData } from "../types/userProfile.type";
import { useToast } from "@/shared/contexts/ToastContext";
export function useJobSeekerProfile() {
  const [token] = useLocalStorage("access-token", null);
  const [triggerUpdate, setTriggerUpdate] = useState(true);
  const [jobSeekerProfile, setJobSeekerProfile] =
    useState<JobSeekerProfileData | null>(null);

  const [jobSeekerProfilePictureFile, setJobSeekerProfilePictureFile] =
    useState<File | null>(null);

  const { addToast } = useToast();

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      const result = await getJobSeekerProfile(token);
      if (result.status !== 200) {
        return;
      }

      setJobSeekerProfile(result.data.data);
    };
    fetch();
  }, [token, triggerUpdate]);

  const handleUpdateJobSeekerProfilePicture = async () => {
    if (!token) return;
    if (!jobSeekerProfilePictureFile) return;
    const payload = {
      photo: jobSeekerProfilePictureFile,
    };
    const result = await updateJobSeekerProfilePicture(token, payload);
    if (result.status !== 200) {
      addToast("Gagal mengubah foto profil", "warning");
      return;
    }
    setTriggerUpdate(!triggerUpdate);
  };

  const handleSaveChanges = async () => {
    await handleUpdateJobSeekerProfilePicture();
  };

  return {
    jobSeekerProfile,
    setJobSeekerProfile,
    jobSeekerProfilePictureFile,
    setJobSeekerProfilePictureFile,
    handleUpdateJobSeekerProfilePicture,
    handleSaveChanges,
  };
}

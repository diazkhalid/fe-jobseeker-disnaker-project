import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import React, { useState, useEffect } from "react";
import {
  getJobSeekerProfile,
  updateJobSeekerProfile,
  updateJobSeekerProfilePicture,
} from "../services/profile.service";
import {
  JobSeekerProfileData,
  UpdateJobSeekerProfileDto,
} from "../types/userProfile.type";
import { useToast } from "@/shared/contexts/ToastContext";
import { Districts } from "@/shared/types/districtsList.type";
import { getDistrictOptions } from "@/shared/services/options.service";
export function useJobSeekerProfile() {
  const [token] = useLocalStorage("access-token", null);
  const [triggerUpdate, setTriggerUpdate] = useState(true);
  const [jobSeekerProfile, setJobSeekerProfile] =
    useState<JobSeekerProfileData | null>(null);

  const [jobSeekerProfilePictureFile, setJobSeekerProfilePictureFile] =
    useState<File | null>(null);

  const { addToast } = useToast();

  const [districtsList, setDistrictsList] = useState<Districts[] | null>(null);

  const [updateJobSeekerProfileForm, setUpdateJobSeekerProfileForm] =
    useState<UpdateJobSeekerProfileDto>({
      full_name: "",
      phone: "",
      date_of_birth: null,
      birth_place: null,
      gender: null,
      address: null,
      // province_code: null,
      province_name: null,
      regency_code: null,
      regency_name: null,
      district_code: null,
      district_name: null,
      // village_code: null,
      village_name: null,
      postal_code: null,
      highest_education: null,
      headline: null,
      summary: null,
      profile_photo_url: null,
      portfolio_url: null,
      linkedin_url: null,
      github_url: null,
      template_code: null,
    });

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      const result = await getJobSeekerProfile(token);
      if (result.status !== 200) {
        return;
      }

      setJobSeekerProfile(result.data.data);
      const { created_at, updated_at, ...profileData } = result.data.data;
      setUpdateJobSeekerProfileForm(profileData);
    };
    fetch();
  }, [token, triggerUpdate]);

  useEffect(() => {
    const fetch = async () => {
      const result = await getDistrictOptions();
      if (result.status !== 200) {
        return;
      }
      setDistrictsList(result.data.data);
    };
    fetch();
  }, []);

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

  const handleChangeUpdateJobSeekerProfileForm = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    let newValue: string | number | boolean | File | null = value;

    if (e.target instanceof HTMLInputElement) {
      switch (type) {
        case "checkbox":
          newValue = e.target.checked;
          break;

        case "number":
          newValue = value === "" ? "" : Number(value);
          break;

        case "file":
          newValue = e.target.files?.[0] ?? null;
          break;

        default:
          newValue = value;
      }
    }

    setUpdateJobSeekerProfileForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmitUpdateJobSeekerProfile = async () => {
    if (!token) return;

    const result = await updateJobSeekerProfile(
      token,
      updateJobSeekerProfileForm,
    );
    if (result.status !== 200) {
      addToast("Gagal mengubah data", "warning");
      return;
    }
    addToast("Berhasil mengubah data", "success");
    setTriggerUpdate(!triggerUpdate);
  };

  const handleSaveChanges = async () => {
    if (jobSeekerProfilePictureFile) {
      await handleUpdateJobSeekerProfilePicture();
    }

    await handleSubmitUpdateJobSeekerProfile();
  };

  return {
    jobSeekerProfile,
    setJobSeekerProfile,
    jobSeekerProfilePictureFile,
    setJobSeekerProfilePictureFile,
    handleUpdateJobSeekerProfilePicture,
    handleSaveChanges,
    updateJobSeekerProfileForm,
    setUpdateJobSeekerProfileForm,
    handleSubmitUpdateJobSeekerProfile,
    handleChangeUpdateJobSeekerProfileForm,
    districtsList,
  };
}

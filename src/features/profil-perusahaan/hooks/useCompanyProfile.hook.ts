import { useEffect, useState } from "react";
import {
  CompanyProfileData,
  UpdateCompanyProfileDto,
} from "../types/companyProfile.type";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import {
  getCompanyProfile,
  updateCompanyProfile,
  updateCompanyProfilePicture,
} from "../services/profile.service";
import { useToast } from "@/shared/contexts/ToastContext";

export function useCompanyProfile() {
  const [companyProfile, setCompanyProfile] =
    useState<CompanyProfileData | null>(null);

  const [companyProfilePictureFile, setCompanyProfilePictureFile] =
    useState<File | null>(null);

  const [updateCompanyProfileForm, setUpdateCompanyProfileForm] =
    useState<UpdateCompanyProfileDto>({
      brand_name: "",
      company_email: "",
      company_phone: "",
      business_field: "",
      description: "",
      website_url: "",
      nib: "",
      address: "",
      city: "",
      province: "",
      district_code: "",
      legal_name: "",
      business_entity: "",
      founded_year: 2021,
      company_size: "",
      hr_contact_name: "",
      hr_contact_position: "",
      hr_contact_email: "",
      industry_ids: [],
      workplace_culture: "",
      company_description: "",
      company_vision: "",
      company_mission: "",
      profile_video_url: "",
      linkedin_url: "",
      instagram_url: "",
    });

  const [token] = useLocalStorage("access-token", null);
  const { addToast } = useToast();
  const [triggerUpdate, setTriggerUpdate] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      const result = await getCompanyProfile(token);
      console.log(result);

      if (result.status !== 200) return;

      const profileData: CompanyProfileData = result.data.data;
      setCompanyProfile(profileData);

      // Masukkan data getCompanyProfile ke dalam form update
      setUpdateCompanyProfileForm({
        brand_name: profileData.brand_name || "",
        company_email: profileData.company_email || "",
        company_phone: profileData.company_phone || "",
        business_field: profileData.business_field || "",
        description: profileData.description || "",
        website_url: profileData.website_url || "",
        nib: profileData.nib || "",
        address: profileData.address || "",
        city: profileData.city || "",
        province: profileData.province || "",
        district_code: profileData.district_code || "",
        legal_name: profileData.legal_name || "",
        business_entity: profileData.business_entity || "",
        founded_year: profileData.founded_year || new Date().getFullYear(),
        company_size: profileData.company_size || "",
        hr_contact_name: profileData.hr_contact_name || "",
        hr_contact_position: profileData.hr_contact_position || "",
        hr_contact_email: profileData.hr_contact_email || "",
        // Mengubah array objek industries menjadi array id (number)
        industry_ids: profileData.industries
          ? profileData.industries.map((ind) => Number(ind.id))
          : [],
        workplace_culture: profileData.workplace_culture || "",
        company_description: profileData.company_description || "",
        company_vision: profileData.company_vision || "",
        company_mission: profileData.company_mission || "",
        profile_video_url: profileData.profile_video_url || "",
        linkedin_url: profileData.linkedin_url || "",
        instagram_url: profileData.instagram_url || "",
      });
    };
    fetch();
  }, [token, triggerUpdate]);

  const handleUpdateCompanyProfile = async () => {
    if (!token) return;
    const result = await updateCompanyProfile(token, updateCompanyProfileForm);
    if (result.status !== 200) {
      addToast("Gagal mengubah profil", "warning");
      return;
    }
    addToast("Berhasil mengubah profil", "success");
    setTriggerUpdate(!triggerUpdate);
  };

  const handleUpdateCompanyProfilePicture = async () => {
    if (!token) return;
    if (!companyProfilePictureFile) return;
    const payload = {
      photo: companyProfilePictureFile,
    };
    const result = await updateCompanyProfilePicture(token, payload);
    if (result.status !== 200) {
      addToast("Gagal mengubah foto profil", "warning");
      return;
    }
    setTriggerUpdate(!triggerUpdate);
  };

  return {
    companyProfile,
    updateCompanyProfileForm,
    setUpdateCompanyProfileForm,
    handleUpdateCompanyProfile,
    companyProfilePictureFile,
    setCompanyProfilePictureFile,
    handleUpdateCompanyProfilePicture,
  };
}

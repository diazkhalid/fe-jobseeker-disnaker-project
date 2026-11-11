import { CompanyVerificationStatus } from "@/features/manajemen-perusahaan-admin/types/company.type";

interface Industry {
  id: string;
  name: string;
}

export interface CompanyProfileData {
  id: number;
  user_id: number;
  brand_name: string;
  company_email: string;
  company_phone: string;
  business_field: string;
  description: string | null;
  website_url: string | null;
  nib: string | null;
  address: string | null;
  city: string | null;
  province: string | null;
  verification_status: CompanyVerificationStatus;
  verification_notes: string;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
  district_code: string | null;
  legal_name: string | null;
  business_entity: string | null;
  founded_year: number | null;
  company_size: string | null;
  hr_contact_name: string | null;
  hr_contact_position: string | null;
  hr_contact_email: string | null;
  workplace_culture: string | null;
  company_description: string | null;
  company_vision: string | null;
  company_mission: string | null;
  profile_image_url: string | null;
  profile_video_url: string | null;
  linkedin_url: string | null;
  instagram_url: string | null;
  industries: Industry[];
}

export interface UpdateCompanyProfileDto {
  brand_name: string;
  company_email: string;
  company_phone: string;
  business_field: string;
  description: string;
  website_url: string;
  nib: string;
  address: string;
  city: string;
  province: string;
  district_code: string;
  legal_name: string;
  business_entity: string;
  founded_year: number;
  company_size: string;
  hr_contact_name: string;
  hr_contact_position: string;
  hr_contact_email: string;
  industry_ids: number[];
  workplace_culture: string;
  company_description: string;
  company_vision: string;
  company_mission: string;
  profile_video_url: string;
  linkedin_url: string;
  instagram_url: string;
}

export interface UpdateCompanyProfilePictureDto {
  photo: File;
}

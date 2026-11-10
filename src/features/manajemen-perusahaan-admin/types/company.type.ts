export interface AdminCompanyData {
  profile_id: number;
  user_id: number;
  brand_name: string;
  nib: string;
  industries: string[];
  district_code: string;
  district_name: string;
  city: string;
  verification_status: "verified" | "unverified";
  registered_at: string;
}

export interface AdminCompanyIndexParams {
  search: string;
  verification_status: "verified" | "unverified" | "";
  industry_id: number;
  location: string;
  page: number;
  limit: number;
  rows_per_page: number;
}

export interface CompanyAccountData {
  user_id: number;
  full_name: string;
  email: string;
  phone: string;
  status: string;
  registered_at: string;
}

export interface CompanyIndustryData {
  id: number;
  name: string;
}

export interface CompanyProfileDetailData {
  id: number;
  user_id: number;
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
  verification_status: "verified" | "unverified";
  verified_at: string | null;
  created_at: string;
  updated_at: string;
  district_code: string;
  district_name: string;
  legal_name: string;
  business_entity: string;
  founded_year: number;
  company_size: string;
  hr_contact_name: string;
  hr_contact_position: string;
  hr_contact_email: string;
  workplace_culture: string;
  company_description: string;
  company_vision: string;
  company_mission: string;
  profile_image_url: string;
  profile_video_url: string;
  linkedin_url: string;
  instagram_url: string;
  industries: CompanyIndustryData[];
}

export interface CompanyDocumentData {
  id: number;
  category_id: number;
  document_name: string;
  code: string;
  original_filename: string;
  file_url: string;
  mime_type: string;
  file_size_bytes: number;
  review_status: "pending_review" | "approved" | "rejected";
  is_current: boolean;
  uploaded_at: string;
  reviewed_by: number | null;
  reviewed_at: string | null;
  admin_note: string | null;
  valid_until: string | null;
}

export interface CompanyProfilePhoto {
  id: number;
  company_profile_id: number;
  photo_url: string;
  display_order: number;
}

export interface CompanyFacilityData {
  id: number;
  facility_name: string;
  display_order: number;
  benefit_category: string;
  icon_key: string;
}

export interface AdminCompanyDetail {
  account: CompanyAccountData;
  profile: CompanyProfileDetailData;
  documents: CompanyDocumentData[];
  photos: CompanyProfilePhoto[];
  facilities: CompanyFacilityData[];
}

export interface AdminCompanyDocumentReviewDto {
  review_status: "approved" | "rejected" | "pending_review";
  admin_note: string;
}

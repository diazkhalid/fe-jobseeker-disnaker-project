export interface CompanyProfileGalleryData {
  id: number;
  company_profile_id: number;
  photo_url: string;
  display_order: number;
}

export interface CreateCompanyProfileGalleryDto {
  photo: File[];
}

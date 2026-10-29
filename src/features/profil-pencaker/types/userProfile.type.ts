export interface JobSeekerProfileData {
  id: number;
  full_name: string;
  phone: string;
  user_id: number;
  date_of_birth: string | null;
  birth_place: string | null;
  gender: string | null;
  address: string | null;
  // province_code: string | null;
  province_name: string | null;
  regency_code: string | null;
  regency_name: string | null;
  district_code: string | null;
  district_name: string | null;
  // village_code: string | null;
  village_name: string | null;
  postal_code: string | null;
  highest_education: string | null;
  headline: string | null;
  summary: string | null;
  profile_photo_url: string | null;
  portfolio_url: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  created_at: string;
  updated_at: string;
  template_code: string | null;
}

export type UpdateJobSeekerProfileDto = Omit<
  JobSeekerProfileData,
  "id" | "user_id" | "created_at" | "updated_at"
>;

export interface UpdateJobSeekerProfilePictureDto {
  photo: File;
}

export interface MissingDataAlert {
  id: number;
  label: string;
  category: string;
}

export interface ProfileCompletionRateData {
  profile_completeness: number;
  missing_data_alerts: MissingDataAlert[];
}

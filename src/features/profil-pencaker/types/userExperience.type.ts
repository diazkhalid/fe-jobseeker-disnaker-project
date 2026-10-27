export interface CreateJobSeekerExperienceDto {
  company_name: string;
  job_title: string;
  employment_type: string;
  location: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  description: string;
  display_order: number;
  responsibilities: string;
  achievements: string;
}

export interface JobSeekerExperienceData {
  id: number;
  company_name: string;
  job_title: string;
  employment_type: string;
  location: string;
  start_date: number;
  end_date: number | null;
  is_current: boolean;
  description: string;
  display_order: number;
  created_at: string;
  updated_at: string;
  job_seeker_profile_id: number;
  responsibilities: string;
  achievements: string;
}

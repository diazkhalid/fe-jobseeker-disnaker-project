export interface CreateJobSeekerEducationDto {
  institution: string;
  degree: string;
  major: string;
  start_date: string;
  end_date: string;
  grade: string;
  display_order: number;
}

export interface JobSeekerEducationData {
  id: number;
  institution: string;
  degree: string;
  major: string;
  start_date: number;
  end_date: number;
  grade: string;
  display_order: number;
  created_at: string;
  updated_at: string;
  job_seeker_profile_id: number;
}

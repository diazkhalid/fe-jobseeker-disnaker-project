export interface CreateJobSeekerCertificationDto {
  name: string;
  issuer: string;
  issue_date: string;
  certificate_file_url: File;
}

export interface JobSeekerCertificationData {
  id: number;
  name: string;
  issuer: string;
  issue_date: string;
  display_order: number;
  created_at: string;
  updated_at: string;
  job_seeker_profile_id: number;
  certificate_file_url: string | null;
}

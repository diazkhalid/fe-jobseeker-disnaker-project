export interface CreateJobSeekerSkillDto {
  skill_category: string;
  skill_name: string;
  proficiency_level: string;
  display_order: number;
}

export interface JobSeekerSkillData {
  id: number;
  skill_category: string;
  skill_name: string;
  proficiency_level: string;
  display_order: number;
  created_at: string;
  updated_at: string;
  job_seeker_profile_id: number;
}

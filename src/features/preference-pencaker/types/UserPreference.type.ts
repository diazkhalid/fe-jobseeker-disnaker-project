import { OptionItem } from "@/shared/types/option.type";

export type WorkSystem = "on_site" | "remote" | "hybrid";

export interface JobSeekerPreference {
  desiredPositions: OptionItem[]; // Diubah menjadi array objek
  jobCategory: OptionItem | null;
  industry: OptionItem | null;
  jobTypes: string[];
  workSystems: WorkSystem[];
  expectedSalaryMin: string;
  expectedSalaryMax: string;
  relocationStatus: string;
  jobStatus: string;
}

export interface JobSeekerPreferenceDto {
  job_field_id: number | null;
  industry_id: number | null;
  preferred_position_id: number[];
  preferred_district_codes: string[];
  job_types: string[];
  work_arrangements: WorkSystem[];
  willing_to_relocate: boolean;
  min_salary: number;
  max_salary: number;
  job_search_status: string;
}

export interface JobSeekerPreferenceData {
  user_id: number;
  job_field_id: number;
  job_field: string;
  industry_id: number;
  industry: string;
  preferred_positions: PreferredPosition[];
  preferred_districts: PreferredDistrict[];
  job_types: string[];
  work_arrangements: WorkSystem[];
  willing_to_relocate: boolean;
  min_salary: number;
  max_salary: number;
  job_search_status: string;
  created_at: string;
  updated_at: string;
}

export interface PreferredPosition {
  id: number;
  name: string;
  display_order: number;
}

export interface PreferredDistrict {
  code: string;
  name: string;
  display_order: number;
}

import { OptionItem } from "@/shared/types/option.type";

export type WorkSystem = "on_site" | "remote" | "hybrid";

export interface JobSeekerPreference {
  desiredPositions: OptionItem[];
  industries: OptionItem[];
  jobTypes: string[];
  workSystems: WorkSystem[];
  expectedSalaryMin: string;
  expectedSalaryMax: string;
  relocationStatus: string;
  jobStatus: string;
}

export interface JobSeekerPreferenceDto {
  industry_id: number[];
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
  job_field_id?: number | null;
  job_field?: string | null;
  preferred_industries: PreferredIndustry[];
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

export interface PreferredIndustry {
  id: number;
  name: string;
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

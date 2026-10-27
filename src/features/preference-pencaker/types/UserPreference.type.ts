export interface JobSeekerPreference {
  desiredPositions: string[];
  jobCategory: string;
  industry: string;
  jobTypes: string[];
  workSystems: string[];
  expectedSalaryMin: string;
  expectedSalaryMax: string;
  relocationStatus: string;
  jobStatus: string;
}

export interface JobSeekerPreferenceDto {
  job_field: string;
  industry: string;
  preferred_positions: string[];
  preferred_district_codes: string[];
  job_types: string[];
  work_arrangements: string[];
  willing_to_relocate: boolean;
  min_salary: number;
  max_salary: number;
  job_search_status: string;
}

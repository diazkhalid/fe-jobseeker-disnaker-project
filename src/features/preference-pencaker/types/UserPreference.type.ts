export interface OptionItem {
  id: number;
  name: string;
}

export interface JobSeekerPreference {
  desiredPositions: OptionItem[]; // Diubah menjadi array objek
  jobCategory: OptionItem | null;
  industry: OptionItem | null;
  jobTypes: string[];
  workSystems: string[];
  expectedSalaryMin: string;
  expectedSalaryMax: string;
  relocationStatus: string;
  jobStatus: string;
}

export interface JobSeekerPreferenceDto {
  job_field: number | null; // Atau number jika backend meminta ID
  industry: number | null; // Atau number jika backend meminta ID
  preferred_positions: number[]; // Bisa string[] atau number[] (ID) tergantung backend
  preferred_district_codes: string[];
  job_types: string[];
  work_arrangements: string[];
  willing_to_relocate: boolean;
  min_salary: number;
  max_salary: number;
  job_search_status: string;
}

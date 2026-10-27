export interface CreateJobSeekerDocumentDto {
  category_id: number;
  file: File | null;
}

export interface JobSeekerDocumentData {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  size: string;
  sizeInMB: number;
  uploadDate: string;
  isMain: boolean;
  isRequired: boolean;
  fileUrl: string;
  format: string;
}

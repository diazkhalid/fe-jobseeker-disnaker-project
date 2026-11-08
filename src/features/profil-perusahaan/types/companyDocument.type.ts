export interface CompanyDocumentData {
  id: number;
  company_profile_id: number;
  category_id: number;
  original_filename: string;
  file_url: string;
  mime_type: string;
  file_size_bytes: number;
  review_status: "pending_review" | "approved" | "rejected";
  is_current: boolean;
  uploaded_at: string;
  reviewed_by: number | null;
  reviewed_at: string | null;
  admin_note: string | null;
  valid_until: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateCompanyDocumentDto {
  category_id: number;
  file: File | null;
}

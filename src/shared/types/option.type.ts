export interface OptionItem {
  id: number;
  name: string;
}

export interface MajorOptionItem {
  id: number;
  nama_jurusan: string;
  jenjang: string | null;
}

export interface MajorOptionFilter {
  jenjang: string;
}

export interface DocumentCategory {
  id: number;
  name: string;
  applies_to: "company" | "individual";
  is_required: boolean;
  allows_multiple: boolean;
  allows_primary: boolean;
  display_order: number;
}

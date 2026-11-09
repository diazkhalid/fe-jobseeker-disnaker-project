import { useEffect, useState } from "react";
import {
  CompanyProfileGalleryData,
  CreateCompanyProfileGalleryDto,
} from "../types/companyGallery.type";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { useToast } from "@/shared/contexts/ToastContext";
import {
  createCompanyGallery,
  deleteCompanyGallery,
  getCompanyGallery,
} from "../services/gallery.service";

export function useCompanyGallery() {
  const [companyGallery, setCompanyGallery] = useState<
    CompanyProfileGalleryData[] | []
  >([]);
  const [companyGalleryForm, setCompanyGalleryForm] =
    useState<CreateCompanyProfileGalleryDto>({
      photo: [],
    });

  const [token] = useLocalStorage("access-token", null);
  const { addToast } = useToast();
  const [triggerUpdate, setTriggerUpdate] = useState(false);

  const handleAddPhotos = (files: FileList | null) => {
    if (!files) return;

    setCompanyGalleryForm((prev) => ({
      ...prev,
      photo: [...prev.photo, ...Array.from(files)],
    }));
  };

  const handleRemovePhoto = (index: number) => {
    setCompanyGalleryForm((prev) => ({
      ...prev,
      photo: prev.photo.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      const result = await getCompanyGallery(token);
      if (result.status !== 200) return;
      setCompanyGallery(result.data.data);
    };
    fetch();
  }, [token, triggerUpdate]);

  const handleCreateCompanyGallery = async () => {
    if (!token || companyGalleryForm.photo.length === 0) return;
    const result = await createCompanyGallery(token, companyGalleryForm);
    if (result.status !== 201) {
      addToast("Gagal menambahkan foto galeri", "warning");
      return;
    }
    // Kosongkan file lokal setelah berhasil upload
    setCompanyGalleryForm({ photo: [] });
    setTriggerUpdate(!triggerUpdate);
    addToast("Foto galeri berhasil diunggah", "success");
  };

  const handleDeleteCompanyGallery = async (id: number) => {
    if (!token) return;
    const result = await deleteCompanyGallery(token, id.toString());
    if (result.status !== 200) {
      addToast("Gagal menghapus foto galeri", "warning");
      return;
    }
    setTriggerUpdate(!triggerUpdate);
  };

  return {
    companyGallery,
    setCompanyGallery,
    companyGalleryForm,
    handleAddPhotos,
    handleRemovePhoto,
    handleCreateCompanyGallery,
    handleDeleteCompanyGallery,
  };
}

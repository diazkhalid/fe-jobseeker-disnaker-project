import { useEffect, useState } from "react";
import {
  CompanyFacilityData,
  UpdateCompanyFacilityItemDto,
} from "../types/companyFacility.type";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { useToast } from "@/shared/contexts/ToastContext";
import {
  deleteCompanyFacility,
  getCompanyFacility,
  updateCompanyFacility,
} from "../services/facility.service";

export function useCompanyFacility() {
  const [companyFacilities, setCompanyFacilities] = useState<
    CompanyFacilityData[] | []
  >([]);
  const [updateCompanyFacilityForm, setUpdateCompanyFacilityForm] = useState<
    UpdateCompanyFacilityItemDto[] | []
  >([]);

  const [token] = useLocalStorage("access-token", null);
  const { addToast } = useToast();
  const [triggerUpdate, setTriggerUpdate] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      const result = await getCompanyFacility(token);
      if (result.status !== 200) return;
      setCompanyFacilities(result.data.data);
      setUpdateCompanyFacilityForm(result.data.data);
    };
    fetch();
  }, [token, triggerUpdate]);

  const handleUpdateCompanyFacility = async (
    customFacilities?: UpdateCompanyFacilityItemDto[],
  ) => {
    if (!token) return;
    const updateCompanyFacilityFormPayload = {
      facilities: customFacilities || updateCompanyFacilityForm,
    };

    const result = await updateCompanyFacility(
      token,
      updateCompanyFacilityFormPayload,
    );
    if (result.status !== 200) {
      addToast("Gagal menyimpan fasilitas", "warning");
      return;
    }
    setTriggerUpdate((prev) => !prev);
  };

  const handleDeleteCompanyFacility = async (id: number) => {
    if (!token) return;

    const result = await deleteCompanyFacility(token, id.toString());
    if (result.status !== 200) {
      addToast("Gagal menghapus fasilitas", "warning");
      return;
    }
    setTriggerUpdate((prev) => !prev);
  };

  // Handler Tambah Fasilitas yang aman dari infinite loop
  const handleAddFacility = async (
    newFacilityItem: UpdateCompanyFacilityItemDto,
  ) => {
    const updatedFacilities = [
      ...updateCompanyFacilityForm,
      {
        ...newFacilityItem,
        display_order: updateCompanyFacilityForm.length + 1,
      },
    ];

    setUpdateCompanyFacilityForm(updatedFacilities);
    // Langsung kirim payload terbaru ke backend tanpa via useEffect
    await handleUpdateCompanyFacility(updatedFacilities);
  };

  return {
    companyFacilities,
    updateCompanyFacilityForm,
    setUpdateCompanyFacilityForm,
    handleUpdateCompanyFacility,
    handleDeleteCompanyFacility,
    handleAddFacility,
  };
}

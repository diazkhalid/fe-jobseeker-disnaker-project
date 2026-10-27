import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import {
  createJobSeekerEducation,
  deleteJobSeekerEducation,
  getJobSeekerEducation,
} from "../services/education.service";
import {
  CreateJobSeekerEducationDto,
  JobSeekerEducationData,
} from "../types/userEducation.type";
import { useToast } from "@/shared/contexts/ToastContext";
import { useConfirm } from "@/shared/contexts/ConfirmDialogContext";

export function useJobSeekerEducation() {
  const [jobSeekerEducation, setJobSeekerEducation] = useState<
    JobSeekerEducationData[] | []
  >([]);
  const [token] = useLocalStorage("access-token", null);
  const [createJobSeekerEducationForm, setCreateJobSeekerEducationForm] =
    useState<CreateJobSeekerEducationDto>({
      institution: "",
      degree: "",
      major: "",
      start_date: "",
      end_date: "",
      grade: "",
      display_order: 0,
    });

  const [triggerUpdate, setTriggerUpdate] = useState(true);

  const { addToast } = useToast();
  const confirm = useConfirm();

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      const result = await getJobSeekerEducation(token);
      if (result.status !== 200) {
        return;
      }
      setJobSeekerEducation(result.data.data);
    };
    fetch();
  }, [token, triggerUpdate]);

  const resetCreateJobSeekerEducationForm = () => {
    setCreateJobSeekerEducationForm({
      institution: "",
      degree: "",
      major: "",
      start_date: "",
      end_date: "",
      grade: "",
      display_order: 0,
    });
  };

  const handleChangeCreateJobSeekerEducationForm = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    let newValue: string | number | boolean | File | null = value;

    if (e.target instanceof HTMLInputElement) {
      switch (type) {
        case "checkbox":
          newValue = e.target.checked;
          break;

        case "number":
          newValue = value === "" ? "" : Number(value);
          break;

        case "file":
          newValue = e.target.files?.[0] ?? null;
          break;

        default:
          newValue = value;
      }
    }

    setCreateJobSeekerEducationForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleCreateJobSeekerEducation = async () => {
    if (!token) return;
    const result = await createJobSeekerEducation(
      token,
      createJobSeekerEducationForm,
    );
    if (result.status !== 201) {
      addToast("Gagal menambahkan riwayat pendidikan!", "warning");
      return;
    }
    addToast("Berhasil menambahkan riwayat pendidikan!", "success");
    setTriggerUpdate(!triggerUpdate);
  };

  const handleDeleteJobSeekerEducation = async (id: string) => {
    if (!token) return;
    const confirmation = await confirm(
      "Lanjutkan menghapus?",
      "Menghapus Riwayat Pendidikan",
    );
    if (!confirmation) return;
    const result = await deleteJobSeekerEducation(token, id);
    if (result.status !== 200) {
      addToast("Gagal menghapus riwayat pendidikan!", "warning");
      return;
    }
    addToast("Berhasil menghapus riwayat pendidikan!", "success");
    setTriggerUpdate(!triggerUpdate);
  };

  return {
    jobSeekerEducation,
    setJobSeekerEducation,
    createJobSeekerEducationForm,
    setCreateJobSeekerEducationForm,
    handleChangeCreateJobSeekerEducationForm,
    handleCreateJobSeekerEducation,
    resetCreateJobSeekerEducationForm,
    handleDeleteJobSeekerEducation,
  };
}

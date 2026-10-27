import { useEffect, useState } from "react";
import {
  CreateJobSeekerExperienceDto,
  JobSeekerExperienceData,
} from "../types/userExperience.type";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { useToast } from "@/shared/contexts/ToastContext";
import { useConfirm } from "@/shared/contexts/ConfirmDialogContext";
import {
  createJobSeekerExperience,
  deleteJobSeekerExperience,
  getJobSeekerExperience,
} from "../services/experience.service";

export function useJobSeekerExperience() {
  const [jobSeekerExperience, setJobSeekerExperience] = useState<
    JobSeekerExperienceData[] | []
  >([]);

  const [token] = useLocalStorage("access-token", null);

  const [triggerUpdate, setTriggerUpdate] = useState(true);

  const { addToast } = useToast();
  const confirm = useConfirm();

  const [createJobSeekerExperienceForm, setCreateJobSeekerExperienceForm] =
    useState<CreateJobSeekerExperienceDto>({
      company_name: "",
      job_title: "",
      employment_type: "",
      location: "",
      start_date: "",
      end_date: "",
      is_current: false,
      description: "",
      display_order: 0,
      responsibilities: "",
      achievements: "",
    });

  const resetCreateJobSeekerExperienceForm = () => {
    setCreateJobSeekerExperienceForm({
      company_name: "",
      job_title: "",
      employment_type: "",
      location: "",
      start_date: "",
      end_date: "",
      is_current: false,
      description: "",
      display_order: 0,
      responsibilities: "",
      achievements: "",
    });
  };

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      const result = await getJobSeekerExperience(token);
      if (result.status !== 200) {
        return;
      }
      console.log(result);

      setJobSeekerExperience(result.data.data);
    };
    fetch();
  }, [token, triggerUpdate]);

  const handleChangeCreateJobSeekerExperienceForm = (
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

    setCreateJobSeekerExperienceForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleCreateJobSeekerExperience = async () => {
    if (!token) return;
    const result = await createJobSeekerExperience(
      token,
      createJobSeekerExperienceForm,
    );
    if (result.status !== 201) {
      addToast("Gagal menambahkan pengalaman!", "warning");
      return;
    }
    addToast("Berhasil menambahkan pengalaman!", "success");
    setTriggerUpdate(!triggerUpdate);
  };

  const handleDeleteJobSeekerExperience = async (id: string) => {
    if (!token) return;
    const confirmation = await confirm(
      "Lanjutkan menghapus?",
      "Menghapus Pengalaman",
    );
    if (!confirmation) return;
    const result = await deleteJobSeekerExperience(token, id);
    if (result.status !== 200) {
      addToast("Gagal menghapus pengalaman!", "warning");
      return;
    }
    addToast("Berhasil menghapus pengalaman!", "success");
    setTriggerUpdate(!triggerUpdate);
  };

  return {
    jobSeekerExperience,
    setJobSeekerExperience,
    createJobSeekerExperienceForm,
    setCreateJobSeekerExperienceForm,
    handleChangeCreateJobSeekerExperienceForm,
    handleCreateJobSeekerExperience,
    handleDeleteJobSeekerExperience,
    resetCreateJobSeekerExperienceForm,
  };
}

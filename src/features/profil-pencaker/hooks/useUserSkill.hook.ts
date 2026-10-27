import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { useToast } from "@/shared/contexts/ToastContext";
import { useConfirm } from "@/shared/contexts/ConfirmDialogContext";
import {
  CreateJobSeekerSkillDto,
  JobSeekerSkillData,
} from "../types/userSkill.type";
import {
  createJobSeekerSkill,
  deleteJobSeekerSkill,
  getJobSeekerSkill,
} from "../services/skill.service";

export function useJobSeekerSkill() {
  const [jobSeekerSkill, setJobSeekerSkill] = useState<
    JobSeekerSkillData[] | []
  >([]);
  const [token] = useLocalStorage("access-token", null);
  const [createJobSeekerSkillForm, setCreateJobSeekerSkillForm] =
    useState<CreateJobSeekerSkillDto>({
      skill_category: "",
      skill_name: "",
      proficiency_level: "",
      display_order: 0,
    });

  const [triggerUpdate, setTriggerUpdate] = useState(true);

  const { addToast } = useToast();
  const confirm = useConfirm();

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      const result = await getJobSeekerSkill(token);
      if (result.status !== 200) {
        return;
      }
      setJobSeekerSkill(result.data.data);
    };
    fetch();
  }, [token, triggerUpdate]);

  const resetCreateJobSeekerSkillForm = () => {
    setCreateJobSeekerSkillForm({
      skill_category: "",
      skill_name: "",
      proficiency_level: "",
      display_order: 0,
    });
  };

  const handleChangeCreateJobSeekerSkillForm = (
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

    setCreateJobSeekerSkillForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleCreateJobSeekerSkill = async () => {
    if (!token) return;
    const result = await createJobSeekerSkill(token, createJobSeekerSkillForm);
    if (result.status !== 201) {
      addToast("Gagal menambahkan keahlian!", "warning");
      return;
    }
    addToast("Berhasil menambahkan keahlian!", "success");
    setTriggerUpdate(!triggerUpdate);
  };

  const handleDeleteJobSeekerSkill = async (id: string) => {
    if (!token) return;
    const confirmation = await confirm(
      "Lanjutkan menghapus?",
      "Menghapus keahlian",
    );
    if (!confirmation) return;
    const result = await deleteJobSeekerSkill(token, id);
    if (result.status !== 200) {
      addToast("Gagal menghapus keahlian!", "warning");
      return;
    }
    addToast("Berhasil menghapus keahlian!", "success");
    setTriggerUpdate(!triggerUpdate);
  };

  return {
    jobSeekerSkill,
    setJobSeekerSkill,
    createJobSeekerSkillForm,
    setCreateJobSeekerSkillForm,
    handleChangeCreateJobSeekerSkillForm,
    handleCreateJobSeekerSkill,
    resetCreateJobSeekerSkillForm,
    handleDeleteJobSeekerSkill,
  };
}

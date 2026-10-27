import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { useToast } from "@/shared/contexts/ToastContext";
import { useConfirm } from "@/shared/contexts/ConfirmDialogContext";
import {
  CreateJobSeekerCertificationDto,
  JobSeekerCertificationData,
} from "../types/userCertification.type";
import {
  createJobSeekerCertification,
  deleteJobSeekerCertification,
  getJobSeekerCertification,
} from "../services/certification.service";

export function useJobSeekerCertification() {
  const [jobSeekerCertification, setJobSeekerCertification] = useState<
    JobSeekerCertificationData[] | []
  >([]);
  const [token] = useLocalStorage("access-token", null);
  const [
    createJobSeekerCertificationForm,
    setCreateJobSeekerCertificationForm,
  ] = useState<CreateJobSeekerCertificationDto>({
    name: "",
    issuer: "",
    issue_date: "",
    certificate_file_url: null as unknown as File,
  });

  const [triggerUpdate, setTriggerUpdate] = useState(true);

  const { addToast } = useToast();
  const confirm = useConfirm();

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      const result = await getJobSeekerCertification(token);
      if (result.status !== 200) {
        return;
      }
      setJobSeekerCertification(result.data.data);
    };
    fetch();
  }, [token, triggerUpdate]);

  const resetCreateJobSeekerCertificationForm = () => {
    setCreateJobSeekerCertificationForm({
      name: "",
      issuer: "",
      issue_date: "",
      certificate_file_url: null as unknown as File,
    });
  };

  const handleChangeCreateJobSeekerCertificationForm = (
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

    setCreateJobSeekerCertificationForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleCreateJobSeekerCertification = async () => {
    if (!token) return;
    const result = await createJobSeekerCertification(
      token,
      createJobSeekerCertificationForm,
    );
    if (result.status !== 201) {
      addToast("Gagal menambahkan sertifikat!", "warning");
      return;
    }
    addToast("Berhasil menambahkan sertifikat!", "success");
    setTriggerUpdate(!triggerUpdate);
  };

  const handleDeleteJobSeekerCertification = async (id: string) => {
    if (!token) return;
    const confirmation = await confirm(
      "Lanjutkan menghapus?",
      "Menghapus sertifikat",
    );
    if (!confirmation) return;
    const result = await deleteJobSeekerCertification(token, id);
    if (result.status !== 200) {
      addToast("Gagal menghapus sertifikat!", "warning");
      return;
    }
    addToast("Berhasil menghapus sertifikat!", "success");
    setTriggerUpdate(!triggerUpdate);
  };

  return {
    jobSeekerCertification,
    setJobSeekerCertification,
    createJobSeekerCertificationForm,
    setCreateJobSeekerCertificationForm,
    handleChangeCreateJobSeekerCertificationForm,
    handleCreateJobSeekerCertification,
    resetCreateJobSeekerCertificationForm,
    handleDeleteJobSeekerCertification,
  };
}

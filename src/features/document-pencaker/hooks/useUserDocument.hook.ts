import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { useToast } from "@/shared/contexts/ToastContext";
import { useConfirm } from "@/shared/contexts/ConfirmDialogContext";
import {
  CreateJobSeekerDocumentDto,
  JobSeekerDocumentData,
} from "../types/userDocument.type";
import {
  createJobSeekerDocument,
  deleteJobSeekerDocument,
  getJobSeekerDocument,
  updateJobSeekerDocumentPrimary,
} from "../services/document.service";
import { JobSeekerDocumentCategoryData } from "../types/documentCategory.type";
import { getJobSeekerDocumentCategories } from "../services/documentCategory.service";

export function useJobSeekerDocument() {
  const [jobSeekerDocument, setJobSeekerDocument] = useState<
    JobSeekerDocumentData[] | []
  >([]);
  const [cvDocs, setCvDocs] = useState<JobSeekerDocumentData[] | []>([]);
  const [academicDocs, setAcademincDocs] = useState<
    JobSeekerDocumentData[] | []
  >([]);
  const [certDocs, setCertDocs] = useState<JobSeekerDocumentData[] | []>([]);
  const [portofolioDocs, setPortofolioDocs] = useState<
    JobSeekerDocumentData[] | []
  >([]);
  const [otherDocs, setOtherDocs] = useState<JobSeekerDocumentData[] | []>([]);
  const [token] = useLocalStorage("access-token", null);
  const [createJobSeekerDocumentForm, setCreateJobSeekerDocumentForm] =
    useState<CreateJobSeekerDocumentDto>({
      category_id: 0,
      file: null,
    });

  const [documentCategories, setDocumentCategories] = useState<
    JobSeekerDocumentCategoryData[] | []
  >([]);

  const [triggerUpdate, setTriggerUpdate] = useState(true);

  const { addToast } = useToast();
  const confirm = useConfirm();

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      const result = await getJobSeekerDocument(token);
      if (result.status !== 200) {
        return;
      }
      setJobSeekerDocument(result.data.data);
      const cvDocs = result.data.data.filter(
        (d: JobSeekerDocumentData) => d.category === "cv",
      );
      const academicDocs = result.data.data.filter(
        (d: JobSeekerDocumentData) => d.category === "akademik",
      );
      const certDocs = result.data.data.filter(
        (d: JobSeekerDocumentData) => d.category === "sertifikat",
      );
      const portfolioDocs = result.data.data.filter(
        (d: JobSeekerDocumentData) => d.category === "portofolio",
      );
      const otherDocs = result.data.data.filter(
        (d: JobSeekerDocumentData) => d.category === "pendukung",
      );

      setCvDocs(cvDocs);
      setAcademincDocs(academicDocs);
      setCertDocs(certDocs);
      setPortofolioDocs(portfolioDocs);
      setOtherDocs(otherDocs);
    };
    fetch();
  }, [token, triggerUpdate]);

  useEffect(() => {
    const fetch = async () => {
      const result = await getJobSeekerDocumentCategories();
      if (result.status !== 200) {
        return;
      }
      setDocumentCategories(result.data.data);
    };
    fetch();
  }, []);

  const resetCreateJobSeekerDocumentForm = () => {
    setCreateJobSeekerDocumentForm({
      category_id: 0,
      file: null,
    });
  };

  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const ALLOWED_FILE_TYPES = ["application/pdf"];
  const handleChangeCreateJobSeekerDocumentForm = (
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
        case "file": {
          const file = e.target.files?.[0] ?? null;
          if (!file) {
            newValue = null;
            break;
          }
          if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            addToast("Format file tidak valid. Gunakan PDF.", "warning");
            e.target.value = "";
            return;
          }
          if (file.size > MAX_FILE_SIZE) {
            addToast("Ukuran file maksimal 5 MB.", "warning");
            e.target.value = "";
            return;
          }
          newValue = file;
          break;
        }
        default:
          newValue = value;
      }
    }
    setCreateJobSeekerDocumentForm((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleCreateJobSeekerDocument = async () => {
    if (!token) return;

    const result = await createJobSeekerDocument(
      token,
      createJobSeekerDocumentForm,
    );
    if (result.status !== 201) {
      addToast("Gagal menambahkan dokumen!", "warning");
      return;
    }
    addToast("Berhasil menambahkan dokumen!", "success");
    setTriggerUpdate(!triggerUpdate);
  };

  const handleUpdateJobSeekerDocumentPrimary = async (id: string) => {
    if (!token) return;
    // const confirmation = await confirm(
    //   "Lanjutkan mengubah?",
    //   "Mengubah Dokumen",
    // );
    // if (!confirmation) return;
    const result = await updateJobSeekerDocumentPrimary(token, id);
    if (result.status !== 200) {
      addToast("Gagal mengubah dokumen!", "warning");
      return;
    }
    // addToast("Berhasil mengubah dokumen!", "success");
    setTriggerUpdate(!triggerUpdate);
  };

  const handleDeleteJobSeekerDocument = async (id: string) => {
    if (!token) return;
    const confirmation = await confirm(
      "Lanjutkan menghapus?",
      "Menghapus Dokumen",
    );
    if (!confirmation) return;
    const result = await deleteJobSeekerDocument(token, id);
    if (result.status !== 200) {
      addToast("Gagal menghapus dokumen!", "warning");
      return;
    }
    addToast("Berhasil menghapus dokumen!", "success");
    setTriggerUpdate(!triggerUpdate);
  };

  return {
    jobSeekerDocument,
    setJobSeekerDocument,
    createJobSeekerDocumentForm,
    setCreateJobSeekerDocumentForm,
    handleChangeCreateJobSeekerDocumentForm,
    handleCreateJobSeekerDocument,
    resetCreateJobSeekerDocumentForm,
    handleDeleteJobSeekerDocument,
    handleUpdateJobSeekerDocumentPrimary,
    cvDocs,
    portofolioDocs,
    certDocs,
    academicDocs,
    otherDocs,
    documentCategories,
  };
}

import { useEffect, useState } from "react";
import {
  CompanyDocumentData,
  CreateCompanyDocumentDto,
} from "../types/companyDocument.type";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import {
  createCompanyDocument,
  getCompanyDocumentByAuth,
} from "../services/document.service";
import { useToast } from "@/shared/contexts/ToastContext";

export function useCompanyDocument() {
  const [companyDocument, setCompanyDocument] = useState<
    CompanyDocumentData[] | []
  >([]);

  //   const [companyDocumentFile, setCompanyDocumentFile] = useState<File | null>(
  //     null,
  //   );

  const [token] = useLocalStorage("access-token", null);
  const { addToast } = useToast();
  const [triggerUpdate, setTriggerUpdate] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      const result = await getCompanyDocumentByAuth(token);
      if (result.status !== 200) return;
      setCompanyDocument(result.data.data);
    };
    fetch();
  }, [token, triggerUpdate]);

  const handleUploadCompanyDocument = async (
    documentCaategoryId: number,
    file: File,
  ) => {
    if (!token) return;
    const payload = {
      category_id: documentCaategoryId,
      file,
    };
    const result = await createCompanyDocument(token, payload);
    if (result.status !== 201) {
      addToast("Gagal mengunggah file", "warning");
      return;
    }
    addToast("Berhasil mengunggah file", "success");
    setTriggerUpdate(!triggerUpdate);
  };

  return {
    companyDocument,
    setCompanyDocument,
    // companyDocumentFile,
    // setCompanyDocumentFile,
    handleUploadCompanyDocument,
  };
}

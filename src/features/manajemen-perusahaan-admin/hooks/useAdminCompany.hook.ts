import { useEffect, useState } from "react";
import {
  AdminCompanyData,
  AdminCompanyDetail,
  AdminCompanyDocumentReviewDto,
  AdminCompanyIndexParams,
  CompanyDocumentData,
} from "../types/company.type";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { useToast } from "@/shared/contexts/ToastContext";
import {
  detailAdminCompany,
  indexAdminCompany,
  reviewAdminCompanyDocument,
} from "../services/company.service";
import { Pagination } from "@/shared/types/pagination.type";

export function useAdminCompany() {
  const [adminCompany, setAdminCompany] = useState<AdminCompanyData[] | []>([]);
  const [adminCompanyDetail, setAdminCompanyDetail] =
    useState<AdminCompanyDetail | null>(null);
  const [companyDocumentReviewForm, setCompanyDocumentReviewForm] =
    useState<AdminCompanyDocumentReviewDto>({
      review_status: "pending_review",
      admin_note: "",
    });

  const [token] = useLocalStorage("access-token", null);
  const { addToast } = useToast();
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [selectedDocument, setSelectedDocument] =
    useState<CompanyDocumentData | null>(null);

  const [paramsFilter, setParamsFilter] = useState<AdminCompanyIndexParams>({
    search: "",
    verification_status: "",
    industry_id: 0,
    location: "",
    page: 1,
    limit: 10,
    rows_per_page: 10,
  });

  const [paginationInfo, setPaginationInfo] = useState<Pagination | null>(null);

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      const result = await indexAdminCompany(token, paramsFilter);
      if (result.status !== 200) {
        addToast("Gagal memuat data perusahaan", "warning");
        return;
      }
      setAdminCompany(result.data.data);
      setPaginationInfo(result.data.pagination);
    };
    fetch();
  }, [token, paramsFilter, triggerUpdate]);

  const handleGetCompanyDetail = async (token: string, id: string) => {
    if (!token) return;
    if (!id) return;
    const result = await detailAdminCompany(token, id);

    if (result.status !== 200) return;
    setAdminCompanyDetail(result.data.data);
  };

  const handleReviewCompanyDocument = async (id: string) => {
    if (!token) return;
    const result = await reviewAdminCompanyDocument(
      token,
      id,
      companyDocumentReviewForm,
    );
    if (result.status !== 200) {
      addToast("Gagal mengubah status dokumen!", "warning");
      return;
    }
    addToast("Berhasil mengubah status", "success");
    setTriggerUpdate(!triggerUpdate);
  };

  const handleSetSelectedDocument = (id: number) => {
    const doc = adminCompanyDetail?.documents.find((d) => d.id === id);
    if (doc) {
      setSelectedDocument(doc);
    }
  };

  useEffect(() => {
    setCompanyDocumentReviewForm({
      review_status: selectedDocument?.review_status ?? "pending_review",
      admin_note: selectedDocument?.admin_note ?? "",
    });
  }, [selectedDocument]);

  return {
    adminCompany,
    setAdminCompany,
    paramsFilter,
    setParamsFilter,
    paginationInfo,
    setPaginationInfo,
    adminCompanyDetail,
    handleGetCompanyDetail,
    companyDocumentReviewForm,
    setCompanyDocumentReviewForm,
    handleReviewCompanyDocument,
    handleSetSelectedDocument,
  };
}

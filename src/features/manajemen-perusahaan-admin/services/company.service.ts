import API_ENDPOINTS from "@/shared/global/api_endpoints";
import { handleServiceError } from "@/shared/utils/handleServiceError";
import axios from "axios";
import {
  AdminCompanyDocumentReviewDto,
  AdminCompanyIndexParams,
  AdminCompanyVerificationDto,
} from "../types/company.type";

export async function indexAdminCompany(
  token: string,
  params: AdminCompanyIndexParams,
) {
  try {
    const response = await axios.get(API_ENDPOINTS.ADMIN.COMPANY.INDEX, {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function detailAdminCompany(token: string, id: string) {
  try {
    const response = await axios.get(API_ENDPOINTS.ADMIN.COMPANY.DETAIL(id), {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function reviewAdminCompanyDocument(
  token: string,
  id: string,
  data: AdminCompanyDocumentReviewDto,
) {
  try {
    const response = await axios.put(
      API_ENDPOINTS.ADMIN.COMPANY.DOCUMENT_REVIEW(id),
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function verificationAdminCompany(
  token: string,
  id: string,
  data: AdminCompanyVerificationDto,
) {
  try {
    const response = await axios.put(
      API_ENDPOINTS.ADMIN.COMPANY.VERIFICATION(id),
      data,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

import API_ENDPOINTS from "@/shared/global/api_endpoints";
import { handleServiceError } from "@/shared/utils/handleServiceError";
import axios from "axios";
import { CreateCompanyDocumentDto } from "../types/companyDocument.type";

export async function getCompanyDocumentByAuth(token: string) {
  try {
    const response = await axios.get(
      API_ENDPOINTS.COMPANY.PROFILE.DOCUMENT.GET_BY_AUTH,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function createCompanyDocument(
  token: string,
  data: CreateCompanyDocumentDto,
) {
  try {
    const formData = new FormData();
    formData.append("category_id", data.category_id.toString());
    formData.append("file", data.file ?? "");
    const response = await axios.post(
      API_ENDPOINTS.COMPANY.PROFILE.DOCUMENT.CREATE,
      formData,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

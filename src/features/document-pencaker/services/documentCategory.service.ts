import API_ENDPOINTS from "@/shared/global/api_endpoints";
import { handleServiceError } from "@/shared/utils/handleServiceError";
import axios from "axios";

export async function getJobSeekerDocumentCategories() {
  try {
    const response = await axios.get(API_ENDPOINTS.OPTIONS.DOCUMENT_CATEGORY);
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

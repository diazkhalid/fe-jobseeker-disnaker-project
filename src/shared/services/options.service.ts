import axios from "axios";
import { handleServiceError } from "../utils/handleServiceError";
import API_ENDPOINTS from "../global/api_endpoints";

export async function getDistrictOptions() {
  try {
    const response = await axios.get(API_ENDPOINTS.OPTIONS.DISTRICTS);
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

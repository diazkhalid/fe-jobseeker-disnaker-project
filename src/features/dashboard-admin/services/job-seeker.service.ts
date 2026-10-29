import API_ENDPOINTS from "@/shared/global/api_endpoints";
import { handleServiceError } from "@/shared/utils/handleServiceError";
import axios from "axios";
import { AdminJobSeekerIndexFilter } from "../types/AdminJobSeeker.type";

export async function indexAdminJobSeeker(
  token: string,
  filters: AdminJobSeekerIndexFilter | null,
) {
  try {
    const response = await axios.get(API_ENDPOINTS.ADMIN.JOB_SEEKER.INDEX, {
      headers: { Authorization: `Bearer ${token}` },
      params: filters,
    });
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function getAdminJobSeekerById(token: string, id: string) {
  try {
    const response = await axios.get(
      API_ENDPOINTS.ADMIN.JOB_SEEKER.DETAIL(id),
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

export async function exportAdminJobSeeker(token: string, data: any) {
  try {
    const response = await axios.post(
      API_ENDPOINTS.ADMIN.JOB_SEEKER.EXPORT,
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

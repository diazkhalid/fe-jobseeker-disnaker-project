import API_ENDPOINTS from "@/shared/global/api_endpoints";
import { handleServiceError } from "@/shared/utils/handleServiceError";
import axios from "axios";
import { CreateJobSeekerDocumentDto } from "../types/userDocument.type";

export async function getJobSeekerDocument(token: string) {
  try {
    const response = await axios.get(
      API_ENDPOINTS.JOB_SEEKER.DOCUMENT.FIND_BY_AUTH,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function createJobSeekerDocument(
  token: string,
  data: CreateJobSeekerDocumentDto,
) {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    const response = await axios.post(
      API_ENDPOINTS.JOB_SEEKER.DOCUMENT.CREATE,
      formData,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function deleteJobSeekerDocument(token: string, id: string) {
  try {
    const response = await axios.delete(
      API_ENDPOINTS.JOB_SEEKER.DOCUMENT.DELETE(id),
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function updateJobSeekerDocumentPrimary(
  token: string,
  id: string,
) {
  try {
    const formData = new FormData();
    formData.append("is_primary", "true");
    const response = await axios.put(
      API_ENDPOINTS.JOB_SEEKER.DOCUMENT.UPDATE(id),
      formData,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

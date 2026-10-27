import API_ENDPOINTS from "@/shared/global/api_endpoints";
import { handleServiceError } from "@/shared/utils/handleServiceError";
import axios from "axios";
import { CreateJobSeekerCertificationDto } from "../types/userCertification.type";

export async function getJobSeekerCertification(token: string) {
  try {
    const response = await axios.get(
      API_ENDPOINTS.JOB_SEEKER.CERTIFICATION.FIND_BY_AUTH,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function createJobSeekerCertification(
  token: string,
  data: CreateJobSeekerCertificationDto,
) {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    const response = await axios.post(
      API_ENDPOINTS.JOB_SEEKER.CERTIFICATION.CREATE,
      formData,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function deleteJobSeekerCertification(token: string, id: string) {
  try {
    const response = await axios.delete(
      API_ENDPOINTS.JOB_SEEKER.CERTIFICATION.DELETE(id),
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

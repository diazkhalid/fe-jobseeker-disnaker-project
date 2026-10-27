import API_ENDPOINTS from "@/shared/global/api_endpoints";
import { handleServiceError } from "@/shared/utils/handleServiceError";
import axios from "axios";
import { CreateJobSeekerEducationDto } from "../types/userEducation.type";

export async function getJobSeekerEducation(token: string) {
  try {
    const response = await axios.get(
      API_ENDPOINTS.JOB_SEEKER.EDUCATION.FIND_BY_AUTH,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function createJobSeekerEducation(
  token: string,
  data: CreateJobSeekerEducationDto,
) {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    const response = await axios.post(
      API_ENDPOINTS.JOB_SEEKER.EDUCATION.CREATE,
      formData,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function deleteJobSeekerEducation(token: string, id: string) {
  try {
    const response = await axios.delete(
      API_ENDPOINTS.JOB_SEEKER.EDUCATION.DELETE(id),
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

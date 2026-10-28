import API_ENDPOINTS from "@/shared/global/api_endpoints";
import { handleServiceError } from "@/shared/utils/handleServiceError";
import axios from "axios";
import { JobSeekerPreferenceDto } from "../types/UserPreference.type";

export async function getJobSeekerPreference(token: string) {
  try {
    const response = await axios.get(
      API_ENDPOINTS.JOB_SEEKER.PREFERENCES.FIND_BY_AUTH,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function createJobSeekerPreference(
  token: string,
  data: JobSeekerPreferenceDto,
) {
  try {
    const response = await axios.put(
      API_ENDPOINTS.JOB_SEEKER.PREFERENCES.UPDATE,
      data,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

import API_ENDPOINTS from "@/shared/global/api_endpoints";
import { handleServiceError } from "@/shared/utils/handleServiceError";
import axios from "axios";
import { CreateJobSeekerSkillDto } from "../types/userSkill.type";

export async function getJobSeekerSkill(token: string) {
  try {
    const response = await axios.get(
      API_ENDPOINTS.JOB_SEEKER.SKILL.FIND_BY_AUTH,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function createJobSeekerSkill(
  token: string,
  data: CreateJobSeekerSkillDto,
) {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    const response = await axios.post(
      API_ENDPOINTS.JOB_SEEKER.SKILL.CREATE,
      formData,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function deleteJobSeekerSkill(token: string, id: string) {
  try {
    const response = await axios.delete(
      API_ENDPOINTS.JOB_SEEKER.SKILL.DELETE(id),
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

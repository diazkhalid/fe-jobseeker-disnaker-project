import API_ENDPOINTS from "@/shared/global/api_endpoints";
import { handleServiceError } from "@/shared/utils/handleServiceError";
import axios from "axios";
import {
  UpdateJobSeekerProfileDto,
  UpdateJobSeekerProfilePictureDto,
} from "../types/userProfile.type";

export async function getJobSeekerProfile(token: string) {
  try {
    const response = await axios.get(
      API_ENDPOINTS.JOB_SEEKER.PROFILE.GET_BY_AUTH,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function updateJobSeekerProfile(
  token: string,
  data: UpdateJobSeekerProfileDto,
) {
  try {
    const formData = new FormData();
    //   formData.append("photo", data.photo);

    const response = await axios.put(
      API_ENDPOINTS.JOB_SEEKER.PROFILE.UPDATE_PICTURE,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function updateJobSeekerProfilePicture(
  token: string,
  data: UpdateJobSeekerProfilePictureDto,
) {
  try {
    const formData = new FormData();
    formData.append("photo", data.photo);

    const response = await axios.put(
      API_ENDPOINTS.JOB_SEEKER.PROFILE.UPDATE_PICTURE,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

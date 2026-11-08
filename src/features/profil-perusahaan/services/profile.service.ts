import API_ENDPOINTS from "@/shared/global/api_endpoints";
import { handleServiceError } from "@/shared/utils/handleServiceError";
import axios from "axios";
import {
  UpdateCompanyProfileDto,
  UpdateCompanyProfilePictureDto,
} from "../types/companyProfile.type";

export async function getCompanyProfile(token: string) {
  try {
    const response = await axios.get(
      API_ENDPOINTS.COMPANY.PROFILE.GET_BY_AUTH,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function updateCompanyProfile(
  token: string,
  data: UpdateCompanyProfileDto,
) {
  try {
    const response = await axios.put(
      API_ENDPOINTS.COMPANY.PROFILE.GET_BY_AUTH,
      data,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function updateCompanyProfilePicture(
  token: string,
  data: UpdateCompanyProfilePictureDto,
) {
  try {
    const formData = new FormData();
    formData.append("photo", data.photo);

    const response = await axios.put(
      API_ENDPOINTS.COMPANY.PROFILE.UPDATE_PICTURE,
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

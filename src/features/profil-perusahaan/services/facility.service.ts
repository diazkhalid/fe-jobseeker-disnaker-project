import API_ENDPOINTS from "@/shared/global/api_endpoints";
import { handleServiceError } from "@/shared/utils/handleServiceError";
import axios from "axios";
import { UpdateCompanyFacilitiesDto } from "../types/companyFacility.type";

export async function getCompanyFacility(token: string) {
  try {
    const response = await axios.get(
      API_ENDPOINTS.COMPANY.PROFILE.FACILITY.GET,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function updateCompanyFacility(
  token: string,
  data: UpdateCompanyFacilitiesDto,
) {
  try {
    const response = await axios.put(
      API_ENDPOINTS.COMPANY.PROFILE.FACILITY.UPDATE,
      data,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function deleteCompanyFacility(token: string, id: string) {
  try {
    const response = await axios.delete(
      API_ENDPOINTS.COMPANY.PROFILE.FACILITY.DELETE(id),
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

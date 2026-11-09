import API_ENDPOINTS from "@/shared/global/api_endpoints";
import { handleServiceError } from "@/shared/utils/handleServiceError";
import axios from "axios";
import { CreateCompanyProfileGalleryDto } from "../types/companyGallery.type";

export async function getCompanyGallery(token: string) {
  try {
    const response = await axios.get(
      API_ENDPOINTS.COMPANY.PROFILE.GALLERY.GET,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function createCompanyGallery(
  token: string,
  data: CreateCompanyProfileGalleryDto,
) {
  try {
    const formData = new FormData();
    data.photo.forEach((photo) => {
      formData.append("photo[]", photo);
    });
    const response = await axios.post(
      API_ENDPOINTS.COMPANY.PROFILE.GALLERY.CREATE,
      formData,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function deleteCompanyGallery(token: string, id: string) {
  try {
    const response = await axios.delete(
      API_ENDPOINTS.COMPANY.PROFILE.GALLERY.DELETE(id),
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (error) {
    console.log(error);
    return handleServiceError(error);
  }
}

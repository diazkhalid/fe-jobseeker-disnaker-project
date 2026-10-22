import API_ENDPOINTS from "@/shared/global/api_endpoints";
import { handleServiceError } from "@/shared/utils/handleServiceError";
import axios from "axios";
import { loginDto, registerDto } from "../types/authDto.type";

export async function register(data: registerDto) {
  try {
    const formData = new FormData();
    formData.append("full_name", data.full_name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("password", data.password);
    formData.append("account_type", data.account_type);
    formData.append("terms_accepted", data.terms_accepted ? "true" : "false");
    formData.append(
      "privacy_accepted",
      data.privacy_accepted ? "true" : "false",
    );
    const response = await axios.post(API_ENDPOINTS.AUTH.REGISTER, formData);

    return response;
  } catch (error: any) {
    console.log(error);
    return handleServiceError(error);
  }
}

export async function login(data: loginDto) {
  try {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, formData);
    return response;
  } catch (error: any) {
    console.log(error);
    return handleServiceError(error);
  }
}

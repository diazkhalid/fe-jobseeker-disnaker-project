import APP_CONFIG from "./app_config";

const baseURL = APP_CONFIG.API_BASE_URL;
const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${baseURL}/auth/register`,
    LOGIN: `${baseURL}/auth/login`,
    ME: `${baseURL}/me`,
  },
};

export default API_ENDPOINTS;

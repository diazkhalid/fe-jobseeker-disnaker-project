import APP_CONFIG from "./app_config";

const baseURL = APP_CONFIG.API_BASE_URL;
const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${baseURL}/auth/register`,
    LOGIN: `${baseURL}/auth/login`,
    ME: `${baseURL}/me`,
  },
  OPTIONS: {
    DISTRICTS: `${baseURL}/option/districts`,
  },
  JOB_SEEKER: {
    PROFILE: {
      GET_BY_ID: (id: string) => `${baseURL}/profiles/${id}`,
      GET_BY_AUTH: `${baseURL}/profiles/me`,
      UPDATE: `${baseURL}/profiles/me`,
      UPDATE_PICTURE: `${baseURL}/profiles/me/photo`,
      DELETE_PICTURE: `${baseURL}/profiles/me/photo`,
    },
    EDUCATION: {
      CREATE: `${baseURL}/educations`,
      FIND_BY_AUTH: `${baseURL}/educations`,
      UPDATE: (id: string) => `${baseURL}/educations/${id}`,
      DELETE: (id: string) => `${baseURL}/educations/${id}`,
    },
  },
};

export default API_ENDPOINTS;

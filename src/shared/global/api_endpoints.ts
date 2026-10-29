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
    DOCUMENT_CATEGORY: `${baseURL}/option/category_documents`,
    INDUSTRY: `${baseURL}/option/industries`,
    JOB_CATEGORY: `${baseURL}/option/job-fields`,
    JOB_POSITION: `${baseURL}/option/positions`,
  },
  JOB_SEEKER: {
    PROFILE: {
      GET_BY_ID: (id: string) => `${baseURL}/profiles/${id}`,
      GET_BY_AUTH: `${baseURL}/profiles/me`,
      UPDATE: `${baseURL}/profiles/me`,
      UPDATE_PICTURE: `${baseURL}/profiles/me/photo`,
      DELETE_PICTURE: `${baseURL}/profiles/me/photo`,
      COMPLETION: `${baseURL}/profiles/completeness`,
      TOGGLE_FRESH_GRADUATE: `${baseURL}/profiles/me/fresh-graduate`,
    },
    EDUCATION: {
      CREATE: `${baseURL}/educations`,
      FIND_BY_AUTH: `${baseURL}/educations`,
      UPDATE: (id: string) => `${baseURL}/educations/${id}`,
      DELETE: (id: string) => `${baseURL}/educations/${id}`,
    },
    EXPERIENCE: {
      CREATE: `${baseURL}/experiences`,
      FIND_BY_AUTH: `${baseURL}/experiences`,
      UPDATE: (id: string) => `${baseURL}/experiences/${id}`,
      DELETE: (id: string) => `${baseURL}/experiences/${id}`,
    },
    SKILL: {
      CREATE: `${baseURL}/skills`,
      FIND_BY_AUTH: `${baseURL}/skills`,
      UPDATE: (id: string) => `${baseURL}/skills/${id}`,
      DELETE: (id: string) => `${baseURL}/skills/${id}`,
    },
    CERTIFICATION: {
      CREATE: `${baseURL}/certifications`,
      FIND_BY_AUTH: `${baseURL}/certifications`,
      UPDATE: (id: string) => `${baseURL}/certifications/${id}`,
      DELETE: (id: string) => `${baseURL}/certifications/${id}`,
    },
    DOCUMENT: {
      CREATE: `${baseURL}/documents`,
      FIND_BY_AUTH: `${baseURL}/documents`,
      UPDATE: (id: string) => `${baseURL}/documents/${id}`,
      DELETE: (id: string) => `${baseURL}/documents/${id}`,
    },
    PREFERENCES: {
      FIND_BY_AUTH: `${baseURL}/job-preferences`,
      UPDATE: `${baseURL}/job-preferences`,
    },
  },
};

export default API_ENDPOINTS;

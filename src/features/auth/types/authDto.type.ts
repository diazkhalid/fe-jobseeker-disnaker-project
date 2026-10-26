import { ACCOUNT_TYPE } from "@/shared/types/accountType.type";

export interface RegisterDto {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  account_type: ACCOUNT_TYPE;
  terms_accepted: boolean;
  privacy_accepted: boolean;
}

export interface LoginDto {
  email: string;
  password: string;
}

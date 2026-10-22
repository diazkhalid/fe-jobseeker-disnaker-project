import { ACCOUNT_TYPE } from "@/shared/types/account_type.type";

export interface registerDto {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  account_type: ACCOUNT_TYPE;
  terms_accepted: boolean;
  privacy_accepted: boolean;
}

export interface loginDto {
  email: string;
  password: string;
}

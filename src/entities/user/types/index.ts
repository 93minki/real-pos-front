export interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  store_name: string;
  store_address: string;
  phone_number: string;
}

export interface SigninFormData {
  email: string;
  password: string;
}

export interface UserInfo {
  id: number;
  email: string;
  store_name: string;
  store_address: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
}

export type UserInfoType = {
  id: string;
  email: string;
  store_name: string;
  phone: string;
  created_at: string;
  updated_at: string;
};

export type UserInfoResponseType = {
  success: boolean;
  error?: string;
  data: UserInfoType;
};

export type UpdateUserInfoType = {
  store_name?: string;
  password?: string;
  phone?: string;
};

export type UpdateUserInfoResponseType = {
  success: boolean;
  error?: string;
  data: UserInfoType;
};

export type DeleteAccountResponseType = {
  success: boolean;
  error?: string;
  data: {
    code: string;
    message: string;
  };
};

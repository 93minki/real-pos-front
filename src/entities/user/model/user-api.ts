import { SigninFormData, SignupFormData } from "../types";

export const userAPI = {
  signup: async (data: SignupFormData) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("회원가입에 실패했습니다.");
    }

    return response.json();
  },

  signin: async (data: SigninFormData) => {
    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("로그인에 실패했습니다.");
    }

    return response.json();
  },
};

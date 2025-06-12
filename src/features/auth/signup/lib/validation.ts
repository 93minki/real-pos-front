import { z } from "zod";

export const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, "이메일을 입력해주세요")
      .email("올바른 이메일 형식이 아닙니다"),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "비밀번호는 대소문자, 숫자, 특수문자를 포함해야 합니다"
      ),
    confirmPassword: z.string().min(1, "비밀번호를 다시 입력해주세요"),
    store_name: z.string().min(2, "상호명은 최소 2자 이상이어야 합니다"),
    store_address: z.string().min(5, "상세한 주소를 입력해주세요"),
    phone_number: z
      .string()
      .min(9, "전화번호를 올바르게 입력해주세요")
      .regex(/^\d{4}-\d{4}$/, "전화번호 형식이 올바르지 않습니다"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

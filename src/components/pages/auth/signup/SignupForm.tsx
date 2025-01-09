"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const signupSchema = z
  .object({
    email: z.string().email("유효한 이메일 주소를 입력해주세요"),
    name: z.string().min(2, "이름은 2글자 이상이어야 합니다."),
    password: z.string().min(4, "비밀번호는 4자 이상이어야 합니다"),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    console.log(data);
  };

  return (
    <form
      className="flex flex-col gap-2 items-center w-[500px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        id="email"
        type="email"
        placeholder="email"
        className="border rounded-md p-2 w-full"
        {...register("email")}
      />
      {errors.email && <span>{errors.email.message}</span>}
      <input
        id="name"
        type="text"
        placeholder="name"
        className="border rounded-md p-2 w-full"
        {...register("name")}
      />
      {errors.name && <span>{errors.name.message}</span>}
      <input
        id="password"
        type="password"
        placeholder="password"
        className="border rounded-md p-2 w-full"
        {...register("password")}
      />
      {errors.password && <span>{errors.password.message}</span>}
      <input
        id="passwordConfirm"
        type="password"
        placeholder="password confirm"
        className="border rounded-md p-2 w-full"
        {...register("passwordConfirm")}
      />
      {errors.passwordConfirm && <span>{errors.passwordConfirm.message}</span>}
      <Button type="submit">회원가입</Button>
    </form>
  );
};

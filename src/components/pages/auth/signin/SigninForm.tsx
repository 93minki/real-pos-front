"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const signinSchema = z.object({
  email: z.string().email("유효한 이메일 주소를 입력해주세요"),
  password: z.string().min(4, "비밀번호는 4자 이상이어야 합니다."),
});

type SigninFormData = z.infer<typeof signinSchema>;

export const SigninForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, submitCount },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninFormData) => {
    const response = await fetch("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    if (result.code === "OK") {
      localStorage.setItem("accessToken", result.data.accessToken);
      router.push("/");
    } else {
      alert(result.message || "로그인에 실패했습니다.");
    }
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
        id="password"
        type="password"
        placeholder="password"
        className="border rounded-md p-2 w-full"
        {...register("password")}
      />
      {errors.password && <span>{errors.password.message}</span>}
      <Button type="submit">로그인</Button>
    </form>
  );
};

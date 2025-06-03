"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const signupSchema = z
  .object({
    email: z.string().email("유효한 이메일 주소를 입력해주세요"),
    password: z.string().min(4, "비밀번호는 4자 이상이어야 합니다"),
    passwordConfirm: z.string(),
    storeName: z.string().min(1, "가게 이름은 1글자 이상이어야 합니다."),
    phone: z
      .string()
      .regex(
        /^010-\d{4}-\d{4}$/,
        "전화번호 형식이 올바르지 않습니다. 예: 010-1234-5678"
      )
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export const SignupForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    const phone = phoneNumber ? `010-${phoneNumber}` : "";
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ ...data, phone }),
    });
    const result = await response.json();

    if (result.data.code === "OK") {
      router.push("/signin");
    } else {
      alert(result.message || "회원가입에 실패했습니다.");
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
        id="storeName"
        type="text"
        placeholder="storeName"
        className="border rounded-md p-2 w-full"
        {...register("storeName")}
      />
      {errors.storeName && <span>{errors.storeName.message}</span>}
      <div className="flex w-full">
        <span className="flex items-center px-2 bg-gray-100 border border-r-0 rounded-l-md">
          010
        </span>
        <input
          id="phone"
          type="text"
          placeholder="1234-5678"
          className="border rounded-r-md p-2 w-full"
          maxLength={9}
          value={phoneNumber}
          onChange={(e) => {
            let value = e.target.value.replace(/\D/g, "");
            if (value.length > 4) {
              value = value.slice(0, 4) + "-" + value.slice(4, 8);
            }
            setPhoneNumber(value.slice(0, 9));
          }}
        />
      </div>
      {errors.phone && <span>{errors.phone.message}</span>}
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

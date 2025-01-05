import { SignupForm } from "@/components/pages/auth/signup/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 ">
      <div className="text-lg bold">회원가입</div>
      <SignupForm />
      <Link href={"/signin"}>
        <button>로그인 페이지로 이동</button>
      </Link>
    </div>
  );
}

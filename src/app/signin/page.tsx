import { SigninForm } from "@/components/pages/auth/signin/SigninForm";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="text-lg bold">로그인</div>
      <SigninForm />
      <Link href={"/signup"}>
        <button>회원가입 페이지로 이동</button>
      </Link>
    </div>
  );
}

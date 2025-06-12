import { SigninForm } from "@/features";
import Link from "next/link";

export const SigninView = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8ED] via-[#FDEACA] to-[#F3E8D0] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 로고/헤더 영역 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#AF794B] to-[#6E4E39] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#6E4E39] mb-2">환영합니다</h1>
          <p className="text-[#AF794B] text-lg">계정에 로그인하세요</p>
        </div>

        {/* 폼 카드 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8 mb-6">
          <SigninForm />
        </div>

        {/* 회원가입 링크 */}
        <div className="text-center">
          <p className="text-[#6E4E39] mb-4">아직 계정이 없으신가요?</p>
          <Link href="/signup">
            <button className="w-full bg-gradient-to-r from-[#AF794B] to-[#6E4E39] hover:from-[#9a6b3f] hover:to-[#5a3d2e] text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg">
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                새 계정 만들기
              </span>
            </button>
          </Link>
        </div>

        {/* 데코레이션 요소 */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#AF794B]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#6E4E39]/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

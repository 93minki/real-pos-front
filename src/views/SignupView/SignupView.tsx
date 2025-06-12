"use client";
import { SignupForm } from "@/features";
import Link from "next/link";

export const SignupView = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8ED] via-[#FDEACA] to-[#F3E8D0] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 로고/헤더 영역 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#6E4E39] to-[#AF794B] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
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
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#6E4E39] mb-2">
            계정 만들기
          </h1>
          <p className="text-[#AF794B] text-lg">새로운 여정을 시작하세요</p>
        </div>

        {/* 폼 카드 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8 mb-6">
          <SignupForm />
        </div>

        {/* 로그인 링크 */}
        <div className="text-center">
          <p className="text-[#6E4E39] mb-4">이미 계정이 있으신가요?</p>
          <Link href="/signin">
            <button className="w-full bg-white/60 backdrop-blur-sm hover:bg-white/80 text-[#6E4E39] font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg border border-[#AF794B]/20">
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
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                기존 계정으로 로그인
              </span>
            </button>
          </Link>
        </div>

        {/* 데코레이션 요소 */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-[#6E4E39]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#AF794B]/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

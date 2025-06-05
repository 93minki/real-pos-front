// 유저 정보가 보여지는 곳
// 유저의 이메일, 스토어 이름, 핸드폰 번호 등 개인 정보가 보여진다.
// 비밀번호 변경 기능도 있어야 함.
// 회원 탈퇴 기능도 있어야 함.
"use client";

import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { UserResponseType } from "@/lib/UserResponseType";
import { useQuery } from "@tanstack/react-query";
import { Mail, Phone, Settings, Shield, Store, User } from "lucide-react";
import DeleteAccount from "./DeleteAccount";
import UpdateProfile from "./UpdateProfile";

const UserProfile = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const fetchData = await fetchWithAuth("/api/user");
      const response: { data: UserResponseType } = await fetchData.json();
      return response.data;
    },
  });

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen pt-20 bg-[#F2F2F0] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6E4E39]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-[#F2F2F0] px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">프로필 관리</h1>
          <p className="text-gray-600">계정 정보를 확인하고 관리하세요</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 프로필 정보 카드 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* 헤더 */}
              <div className="bg-gradient-to-r from-[#6E4E39] to-[#AF794B] px-6 py-8">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {data?.store_name}
                    </h2>
                    <p className="text-[#F2F2F0]">사장님 계정</p>
                  </div>
                </div>
              </div>

              {/* 정보 섹션 */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 이메일 */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm font-semibold">이메일</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg px-4 py-3">
                      <p className="text-gray-900 font-medium">{data?.email}</p>
                    </div>
                  </div>

                  {/* 가게 이름 */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Store className="w-4 h-4" />
                      <span className="text-sm font-semibold">가게 이름</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg px-4 py-3">
                      <p className="text-gray-900 font-medium">
                        {data?.store_name}
                      </p>
                    </div>
                  </div>

                  {/* 전화번호 */}
                  <div className="space-y-2 md:col-span-2">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm font-semibold">전화번호</span>
                    </div>
                    <div className="bg-gray-50 rounded-lg px-4 py-3">
                      <p className="text-gray-900 font-medium">
                        등록된 전화번호가 없습니다
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 액션 카드 */}
          <div className="space-y-4">
            {/* 설정 카드 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-[#AF794B]/20 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-[#6E4E39]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">계정 설정</h3>
                  <p className="text-sm text-gray-600">정보 수정</p>
                </div>
              </div>
              <UpdateProfile />
            </div>

            {/* 보안 카드 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">계정 보안</h3>
                  <p className="text-sm text-gray-600">계정 관리</p>
                </div>
              </div>
              <DeleteAccount />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

// 여기서 유저의 비밀번호, 핸드폰 번호 등을 변경할 수 있어야 함.
// Shadcn/ui Dialog 사용
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { UserResponseType } from "@/lib/UserResponseType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Edit3, Save, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const updateProfileSchema = z
  .object({
    storeName: z.string().optional(),
    password: z.string().optional(),
    passwordConfirm: z.string().optional(),
    phone: z.string().optional(),
  })
  .refine(
    (data) => {
      // 비밀번호가 입력되었을 때만 확인 필드 검증
      if (data.password && data.password.length > 0) {
        if (!data.passwordConfirm || data.password !== data.passwordConfirm) {
          return false;
        }
        if (data.password.length < 4) {
          return false;
        }
      }
      return true;
    },
    {
      message:
        "비밀번호는 4자 이상이어야 하며, 비밀번호 확인과 일치해야 합니다",
      path: ["passwordConfirm"],
    }
  )
  .refine(
    (data) => {
      // 전화번호가 입력되었을 때만 형식 검증
      if (data.phone && data.phone.length > 0) {
        return /^010-\d{4}-\d{4}$/.test(data.phone);
      }
      return true;
    },
    {
      message: "전화번호 형식이 올바르지 않습니다. 예: 010-1234-5678",
      path: ["phone"],
    }
  )
  .refine(
    (data) => {
      // 가게 이름이 입력되었을 때만 길이 검증
      if (data.storeName && data.storeName.length > 0) {
        return data.storeName.length >= 1;
      }
      return true;
    },
    {
      message: "가게 이름은 1글자 이상이어야 합니다",
      path: ["storeName"],
    }
  );

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

const UpdateProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
  });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const fetchData = await fetchWithAuth("/api/user");
      const response: { data: UserResponseType } = await fetchData.json();
      return response.data;
    },
  });

  const passwordValue = watch("password");

  const onSubmit = async (formData: UpdateProfileFormData) => {
    try {
      // 빈 값들을 필터링해서 변경된 필드만 전송
      const updateData: any = {};

      if (
        formData.storeName &&
        formData.storeName.trim() !== "" &&
        formData.storeName !== data?.store_name
      ) {
        updateData.store_name = formData.storeName.trim();
      }

      if (formData.password && formData.password.trim() !== "") {
        updateData.password = formData.password;
      }

      if (formData.phone && formData.phone.trim() !== "") {
        updateData.phone = formData.phone.trim();
      }

      // 변경할 데이터가 없으면 알림 후 종료
      if (Object.keys(updateData).length === 0) {
        alert("변경할 정보가 없습니다.");
        return;
      }

      const response = await fetch("/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      const result = await response.json();

      if (response.status === 200) {
        alert("회원정보 수정이 완료되었습니다.");
        setIsOpen(false);
        reset();
        // 사용자 정보 다시 조회
        window.location.reload();
      } else {
        alert(result.error || "회원정보 수정에 실패했습니다.");
      }
    } catch (error) {
      alert("회원정보 수정 중 오류가 발생했습니다.");
    }
  };

  if (isLoading || isFetching) {
    return <div className="animate-pulse h-10 bg-gray-200 rounded-lg"></div>;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-[#6E4E39] hover:bg-[#AF794B] text-white rounded-lg transition-colors">
          <Edit3 className="w-4 h-4 mr-2" />
          정보 수정
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md mx-auto bg-white rounded-2xl border-0 shadow-2xl">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900 text-center">
            회원정보 수정
          </DialogTitle>
          <p className="text-sm text-gray-600 text-center mt-2">
            변경하고 싶은 정보만 입력해주세요
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* 가게 이름 */}
          <div className="space-y-2">
            <Label
              htmlFor="storeName"
              className="text-sm font-semibold text-gray-700"
            >
              가게 이름 <span className="text-gray-400">(선택사항)</span>
            </Label>
            <input
              id="storeName"
              {...register("storeName")}
              placeholder={data?.store_name || "가게 이름을 입력해주세요"}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#AF794B] focus:border-transparent transition-all outline-none"
            />
            {errors.storeName && (
              <p className="text-red-500 text-sm flex items-center">
                <X className="w-4 h-4 mr-1" />
                {errors.storeName.message}
              </p>
            )}
          </div>

          {/* 비밀번호 */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-semibold text-gray-700"
            >
              새 비밀번호 <span className="text-gray-400">(선택사항)</span>
            </Label>
            <input
              id="password"
              type="password"
              {...register("password")}
              placeholder="변경할 비밀번호를 입력해주세요"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#AF794B] focus:border-transparent transition-all outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm flex items-center">
                <X className="w-4 h-4 mr-1" />
                비밀번호는 4자 이상이어야 합니다
              </p>
            )}
          </div>

          {/* 비밀번호 확인 - 비밀번호가 입력되었을 때만 표시 */}
          {passwordValue && passwordValue.length > 0 && (
            <div className="space-y-2">
              <Label
                htmlFor="passwordConfirm"
                className="text-sm font-semibold text-gray-700"
              >
                비밀번호 확인 <span className="text-red-500">*</span>
              </Label>
              <input
                id="passwordConfirm"
                type="password"
                {...register("passwordConfirm")}
                placeholder="비밀번호를 다시 입력해주세요"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#AF794B] focus:border-transparent transition-all outline-none"
              />
              {errors.passwordConfirm && (
                <p className="text-red-500 text-sm flex items-center">
                  <X className="w-4 h-4 mr-1" />
                  {errors.passwordConfirm.message}
                </p>
              )}
            </div>
          )}

          {/* 핸드폰 번호 */}
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-sm font-semibold text-gray-700"
            >
              핸드폰 번호 <span className="text-gray-400">(선택사항)</span>
            </Label>
            <input
              id="phone"
              {...register("phone")}
              placeholder="010-1234-5678"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#AF794B] focus:border-transparent transition-all outline-none"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm flex items-center">
                <X className="w-4 h-4 mr-1" />
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* 버튼 그룹 */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              취소
            </Button>
            <Button
              type="submit"
              className="flex-1 py-3 bg-[#6E4E39] hover:bg-[#AF794B] text-white rounded-lg transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              저장
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfile;

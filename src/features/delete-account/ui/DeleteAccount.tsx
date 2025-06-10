"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteAccount } from "@/entities";
import { AlertTriangle, Trash2, X } from "lucide-react";

export const DeleteAccount = () => {
  const mutation = useDeleteAccount();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          회원탈퇴
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md mx-auto bg-white rounded-2xl border-0 shadow-2xl">
        <AlertDialogHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <AlertDialogTitle className="text-2xl font-bold text-gray-900">
            회원탈퇴
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="text-center space-y-3 pb-6">
          <p className="text-gray-600 text-lg">
            정말로 회원탈퇴를 하시겠습니까?
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-2">
            <p className="text-red-800 font-semibold text-sm">⚠️ 주의사항</p>
            <ul className="text-red-700 text-sm space-y-1 text-left">
              <li>• 모든 데이터가 영구적으로 삭제됩니다</li>
              <li>• 삭제된 데이터는 복구할 수 없습니다</li>
              <li>• 동일한 이메일로 재가입이 불가능합니다</li>
            </ul>
          </div>
        </AlertDialogDescription>
        <AlertDialogFooter className="flex space-x-3">
          <AlertDialogCancel className="flex-1 py-3 rounded-lg border border-[#6E4E39] text-[#6E4E39] hover:bg-[#AF794B]/10 transition-colors">
            <X className="w-4 h-4 mr-2" />
            취소
          </AlertDialogCancel>
          <Button
            onClick={() => mutation.mutateAsync()}
            className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

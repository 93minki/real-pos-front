import { useConfirmOrder } from "@/entities";

interface ConfirmOrderButtonProps {
  orderId: string;
}

export const ConfirmOrderButton = ({ orderId }: ConfirmOrderButtonProps) => {
  const mutation = useConfirmOrder();

  const clickHandler = async () => {
    mutation.mutate(orderId);
  };

  return (
    <button
      className="w-full bg-gradient-to-r from-[#6E4E39] to-[#AF794B] hover:from-[#5a3d2e] hover:to-[#9a6b3f] py-3 px-4 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
      onClick={clickHandler}
      disabled={mutation.isPending}
    >
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
          d="M5 13l4 4L19 7"
        />
      </svg>
      {mutation.isPending ? "처리중..." : "완료"}
    </button>
  );
};

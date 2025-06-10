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
      className="w-full bg-[#6E4E39] py-2 px-4 rounded-lg text-white"
      onClick={() => {
        clickHandler();
      }}
    >
      완료
    </button>
  );
};

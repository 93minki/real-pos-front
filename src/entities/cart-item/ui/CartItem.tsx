interface CartItemProps {
  id: number;
  name: string;
  quantity: number;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
}

export const CartItem = ({
  id,
  name,
  quantity,
  onIncrease,
  onDecrease,
}: CartItemProps) => {
  return (
    <div className="flex justify-center items-center relative bg-white rounded-lg">
      <div className="flex-grow-[3] basis-[60%] max-w-[60%] min-w-[60%] py-2 px-4">
        <span className="text-lg font-semibold">{name}</span>
      </div>
      <div className="flex-grow-[7] basis-[40%] max-w-[40%] min-w-[40%] py-2 px-4 flex gap-4">
        <button
          className="border px-2 rounded-lg border-[#FDEACA]"
          onClick={() => onDecrease(id)}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className="border px-2 rounded-lg bg-[#AF794B] text-white border-transparent"
          onClick={() => onIncrease(id)}
        >
          +
        </button>
      </div>
    </div>
  );
};

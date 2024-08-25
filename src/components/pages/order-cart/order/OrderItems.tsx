interface OrderItemsProps {
  name: string;
  quantity: number;
  upCount: (name: string) => void;
  downCount: (name: string) => void;
  deleteItem: (name: string) => void;
}

export const OrderItems = ({
  name,
  quantity,
  upCount,
  downCount,
  deleteItem,
}: OrderItemsProps) => {
  return (
    <div className="flex justify-center items-center relative bg-white rounded-lg">
      <div className="flex-grow-[3] basis-[60%] max-w-[60%] min-w-[60%] py-2 px-4">
        <span className="text-lg font-semibold">{name}</span>
      </div>
      <div className="flex-grow-[7] basis-[40%] max-w-[40%] min-w-[40%] py-2 px-4 flex gap-4">
        <button
          className="border px-2 rounded-lg  border-[#FDEACA]"
          onClick={() => {
            downCount(name);
          }}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className="border px-2 rounded-lg bg-[#AF794B] text-white border-transparent"
          onClick={() => {
            upCount(name);
          }}
        >
          +
        </button>
        {/* NOTE 삭제 버튼 활용 여부는 생각좀 해봐야 함. */}
        {/* <SquareX
          className="absolute left-0 top-1/2"
          onClick={() => {
            deleteItem(name);
          }}
        /> */}
      </div>
    </div>
  );
};

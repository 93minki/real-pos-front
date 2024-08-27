interface OrderListProps {
  yearMonthDate: string;
}

export const OrderList = ({ yearMonthDate }: OrderListProps) => {
  return (
    // 주문 내역
    <div>
      {/* 개별 주문 아이템 */}
      <div>{yearMonthDate}</div>
    </div>
  );
};

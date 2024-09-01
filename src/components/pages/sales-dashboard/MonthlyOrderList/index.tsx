"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { OrderItem } from "../../order-manage/type/OrderItem";
import { Calendar } from "./Calendar";
import { OrderList } from "./OrderList";

export const MonthlyOrderList = () => {
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [date, setDate] = useState(0);

  useEffect(() => {
    const today = new Date();
    setYear(today.getFullYear());
    setMonth(today.getMonth() + 1);
    setDate(today.getDate());
  }, []);

  // 여기서 오늘 날짜를 구해야 할 것 같은데?

  const { isPending, error, data, isLoading } = useQuery({
    queryKey: [`month-order-${year}-${month}`],
    queryFn: async () => {
      console.log("usequery year, month", year, month);
      const response = await fetch(`/api/order/filter?month=${year}-${month}`);
      const data: { success: boolean; data: OrderItem[] } =
        await response.json();

      return data.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex gap-4">
      <Calendar
        year={year}
        setYear={setYear}
        month={month}
        setMonth={setMonth}
        date={date}
        setDate={setDate}
      />
      <OrderList
        year={year}
        month={month}
        date={date}
        monthOrderData={data || []}
      />
    </div>
  );
};

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

  const targetDate = (year: number, month: number, date: number) => {
    setYear(year);
    setMonth(month);
    setDate(date);
  };

  useEffect(() => {
    const today = new Date();
    setYear(today.getFullYear());
    setMonth(today.getMonth() + 1);
    setDate(today.getDate());
  }, []);

  // 여기서 오늘 날짜를 구해야 할 것 같은데?

  const { isPending, error, data, isLoading } = useQuery({
    queryKey: ["month-order"],
    queryFn: async (yearMonth) => {
      const today = new Date();

      const response = await fetch(
        `/api/order/filter?month=${today.getFullYear()}-${today.getMonth() + 1}`
      );
      const data: { success: boolean; data: OrderItem[] } =
        await response.json();

      return data.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex gap-4">
      <Calendar targetDate={targetDate} />
      <OrderList
        year={year}
        month={month}
        date={date}
        monthOrderData={data || []}
      />
    </div>
  );
};

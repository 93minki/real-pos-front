"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { OrderItem } from "../../order-manage/type/OrderItem";
import { Calendar } from "./Calendar";
import { OrderList } from "./OrderList";
import { OrderPieChart } from "./OrderPieChart";

const fetchMonthOrder = async (year: number, month: number) => {
  const response = await fetch(`api/order/filter?month=${year}-${month}`);
  const responseData: { success: boolean; data: OrderItem[] } =
    await response.json();

  return responseData.data;
};

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

  const { isPending, error, data, isLoading, isError } = useQuery({
    queryKey: [`month-order`, year, month],
    queryFn: () => fetchMonthOrder(year, month),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.toString()}</div>;

  return (
    <div className="flex">
      <div className="flex flex-col gap-4 ">
        <Calendar
          year={year}
          setYear={setYear}
          month={month}
          setMonth={setMonth}
          date={date}
          setDate={setDate}
        />
        <div>
          <OrderPieChart monthOrderData={data || []} />
        </div>
      </div>
      <OrderList
        year={year}
        month={month}
        date={date}
        monthOrderData={data || []}
      />
    </div>
  );
};

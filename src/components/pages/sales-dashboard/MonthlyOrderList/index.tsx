"use client";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { OrderListItems } from "../../order-manage/type/OrderItem";
import { Calendar } from "./Calendar";
import { OrderList } from "./OrderList";
import { OrderPieChart } from "./OrderPieChart";

const fetchMonthOrder = async (year: number, month: number) => {
  const response = await fetchWithAuth(
    `/api/order/monthly?year=${year}&month=${month}`
  );
  const responseData: { success: boolean; data: OrderListItems[] } =
    await response.json();
  console.log("responseData", responseData.data);
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
    <div className="grid grid-cols-[auto,1fr] grid-rows-[3fr,7fr] gap-4 w-full">
      <div className="">
        <Calendar
          year={year}
          setYear={setYear}
          month={month}
          setMonth={setMonth}
          date={date}
          setDate={setDate}
        />
      </div>
      <div className="row-span-2 w-full ">
        <OrderList
          year={year.toString().padStart(4, "0")}
          month={month.toString().padStart(2, "0")}
          date={date.toString().padStart(2, "0")}
          monthOrderData={data || []}
        />
      </div>
      <OrderPieChart monthOrderData={data || []} />
    </div>
  );
};

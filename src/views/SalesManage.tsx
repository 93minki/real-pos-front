"use client";
import { useMonthlyOrderList } from "@/entities";
import { Calendar, ConfirmedOrderList, OrderPieChart } from "@/widgets";
import { useEffect, useState } from "react";

const SalesManage = () => {
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [date, setDate] = useState(0);

  useEffect(() => {
    const today = new Date();
    setYear(today.getFullYear());
    setMonth(today.getMonth() + 1);
    setDate(today.getDate());
  }, []);

  const { data: orderList } = useMonthlyOrderList(year, month);

  const completedOrders =
    orderList?.filter((order) => order.status === "COMPLETED") || [];

  return (
    <div className="grid grid-cols-[auto,1fr] grid-rows-[3fr,7fr] gap-4 w-full h-full">
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
        <ConfirmedOrderList orders={completedOrders || []} />
      </div>
      <OrderPieChart monthOrderData={completedOrders || []} />
    </div>
  );
};

export default SalesManage;

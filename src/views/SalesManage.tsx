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

  const monthlyOrderList = orderList?.filter(
    (order) => order.status === "COMPLETED"
  );
  const selectedDayOrderList = monthlyOrderList?.filter((order) => {
    const orderDate = new Date(order.updated_at).getDate();
    return orderDate === date;
  });

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
        <ConfirmedOrderList
          orders={selectedDayOrderList || []}
          layout="expanded"
        />
      </div>
      <OrderPieChart monthOrderData={monthlyOrderList || []} />
    </div>
  );
};

export default SalesManage;

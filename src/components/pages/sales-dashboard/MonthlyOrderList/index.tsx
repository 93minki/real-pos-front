"use client";
import { useState } from "react";
import { Calendar } from "./Calendar";
import { OrderList } from "./OrderList";

export const MonthlyOrderList = () => {
  const [yearMonthDate, setYearMonthDate] = useState("");

  const targetDate = (year: number, month: number, date: number) => {
    console.log("year", year, "month", month, "date", date);
    setYearMonthDate(`${year}-${month}-${date}`);
  };

  return (
    <div>
      <Calendar targetDate={targetDate} />
      <OrderList yearMonthDate={yearMonthDate} />
    </div>
  );
};

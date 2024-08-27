"use client";
import { useEffect } from "react";
import { MonthlyOrderList } from "./MonthlyOrderList";

export const Dashboard = () => {
  const fetchAllData = async () => {
    const response = await fetch(`http://localhost:8080/order`);
    const data = await response.json();

    console.log("data", data);
  };

  const fetchDateFilter = async () => {
    const response = await fetch(`/api/order/filter?date=2024-07`);
    const data = await response.json();

    console.log("data", data.data);
  };

  useEffect(() => {
    // fetchAllData();
    // fetchDateFilter();
  });

  return (
    <div className="p-32">
      <div className="w-[500px]">
        <MonthlyOrderList />
      </div>
    </div>
  );
};

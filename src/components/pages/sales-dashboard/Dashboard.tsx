"use client";
import { useEffect } from "react";
import { Calendar } from "./Calendar";

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
    fetchAllData();
    fetchDateFilter();
  });

  return (
    <div>
      <Calendar />
    </div>
  );
};

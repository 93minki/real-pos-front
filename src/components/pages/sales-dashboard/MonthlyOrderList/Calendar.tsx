"use client";
import { SquareChevronLeft, SquareChevronRight } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface CalendarProps {
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
  month: number;
  setMonth: Dispatch<SetStateAction<number>>;
  date: number;
  setDate: Dispatch<SetStateAction<number>>;
}

export const Calendar = ({
  year,
  setYear,
  month,
  setMonth,
  date,
  setDate,
}: CalendarProps) => {
  const [, setStartDate] = useState<Date>();
  const [, setLastDate] = useState<Date>();
  const [dayArray, setDayArray] = useState<string[]>([]);

  useEffect(() => {
    const start = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);

    setStartDate(start);
    setLastDate(last);

    const indentCount = start.getDay();
    const days = Array.from({ length: last.getDate() }, (_, i) =>
      (i + 1).toString()
    );
    setDayArray(days);

    for (let i = 0; i < indentCount; i++) {
      days.unshift(" ");
    }
  }, [year, month]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center px-16">
        <SquareChevronLeft
          onClick={() => {
            // 0 ~ 11
            if (month < 1) {
              setYear((prev) => prev - 1);
              setMonth(11);
            } else {
              setMonth((prev) => prev - 1);
            }
          }}
        />
        <span>
          {year}년 {month}월
        </span>
        <SquareChevronRight
          onClick={() => {
            if (month > 10) {
              setYear((prev) => prev + 1);
              setMonth(0);
            } else {
              setMonth((prev) => prev + 1);
            }
          }}
        />
      </div>

      <div className="grid grid-cols-7 gap-1 justify-center">
        {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
          <div
            key={index}
            className={`text-center ${index === 0 ? "text-red-500" : ""}`}
          >
            {day}
          </div>
        ))}
        {dayArray.map((arr, i) => {
          return (
            <button
              key={i}
              className={`border aspect-square`}
              onClick={() => {
                setDate(+arr);
              }}
            >
              <span
                className={`w-full h-full flex justify-center items-center ${
                  date === +arr ? "bg-red-300 border rounded-full" : ""
                }`}
              >
                {arr}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

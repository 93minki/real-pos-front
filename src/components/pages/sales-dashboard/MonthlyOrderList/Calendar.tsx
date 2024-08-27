"use client";
import { SquareChevronLeft, SquareChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface CalendarProps {
  targetDate: (year: number, month: number, date: number) => void;
}

export const Calendar = ({ targetDate }: CalendarProps) => {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectDate, setSelectDate] = useState(today.getDate());

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
              targetDate(year - 1, 12, selectDate);
            } else {
              setMonth((prev) => prev - 1);
              targetDate(year, month, selectDate);
            }
          }}
        />
        <span>
          {year}년 {month + 1}월
        </span>
        <SquareChevronRight
          onClick={() => {
            if (month > 10) {
              setYear((prev) => prev + 1);
              setMonth(0);
              targetDate(year + 1, 1, selectDate);
            } else {
              setMonth((prev) => prev + 1);
              targetDate(year, month + 2, selectDate);
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
                setSelectDate(+arr);
                targetDate(year, month + 1, +arr);
              }}
            >
              <span
                className={`w-full h-full flex justify-center items-center ${
                  selectDate === +arr ? "bg-red-300 border rounded-full" : ""
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

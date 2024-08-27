"use client";
import { SquareChevronLeft, SquareChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { parseDay } from "./utils";

// 31일 까지  -> 1, 3, 5, 7, 8, 10, 12
// 30일 까지 -> 4, 6, 9, 11
// 28일 까지 -> 2

export const Calendar = () => {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [day, setDay] = useState(today.getDay());
  const [date, setDate] = useState(today.getDate());

  const [startDate, setStartDate] = useState<Date>();
  const [lastDate, setLastDate] = useState<Date>();

  useEffect(() => {
    setStartDate(new Date(year, month, 1));
    setLastDate(new Date(year, month + 1, 0));
  }, [year, month]);

  console.log("year", year, "month", month, "day", day, "date", date);

  console.log(
    "first",
    parseDay(startDate?.getDay().toString()!),
    startDate?.getDate()
  );
  console.log(
    "last",
    parseDay(lastDate?.getDay().toString()!),
    lastDate?.getDate()
  );

  // 1일이 토요일이다? 앞에 공백 6개 있음
  //

  const indentCount = startDate?.getDay();
  const range = () =>
    Array.from({ length: lastDate?.getDate()! }, (_, i) => (i + 1).toString());
  const testArr = range();
  for (let i = 0; i < indentCount!; i++) {
    testArr.unshift(" ");
  }
  console.log("testArr", testArr);

  return (
    <div>
      <div className="flex justify-between items-center px-16">
        <SquareChevronLeft
          onClick={() => {
            setMonth((prev) => prev - 1);
          }}
        />
        <span>
          {year}년 {month + 1}월
        </span>
        <SquareChevronRight
          onClick={() => {
            setMonth((prev) => prev + 1);
          }}
        />
      </div>

      <div className="grid grid-cols-7">
        <div>일</div>
        <div>월</div>
        <div>화</div>
        <div>수</div>
        <div>목</div>
        <div>금</div>
        <div>토</div>
        {testArr.map((arr) => {
          return <div className="border">{arr}</div>;
        })}
      </div>
    </div>
  );
};

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const trimOrderTime = (isoStringDate: Date) => {
  // Date 객체로 변환
  const date = new Date(isoStringDate);

  // 시간, 분, 초 추출
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // 분과 초가 한 자리일 경우 앞에 0 추가
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();

  // 결과 문자열 반환
  return `${hours}:${formattedMinutes}:${formattedSeconds}`;
};

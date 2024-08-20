import { OrderItems } from "@/store/order-store";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calcTotalPrice(orderItems: OrderItems[]) {
  const totalPrice = orderItems.reduce((acc, cur) => {
    return acc + cur.price * cur.quantity;
  }, 0);
  return totalPrice;
}

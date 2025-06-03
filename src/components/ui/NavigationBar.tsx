"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logout } from "../pages/auth/logout/Logout";

export default function NavigationBar() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/signin" || pathname === "/signup") {
    return null;
  }

  return (
    <nav className="w-full bg-white shadow flex items-center px-8 py-3 gap-4 fixed top-0 left-0 z-50">
      <div className="flex gap-2">
        <Link
          href="/"
          className="px-4 py-2 rounded font-semibold hover:bg-gray-100 transition"
        >
          메뉴화면
        </Link>
        <Link
          href="/order-manage"
          className="px-4 py-2 rounded font-semibold hover:bg-gray-100 transition"
        >
          주문관리
        </Link>
        <Link
          href="/sales-dashboard"
          className="px-4 py-2 rounded font-semibold hover:bg-gray-100 transition"
        >
          매출관리
        </Link>
      </div>
      <div className="flex-1"></div>
      <Logout />
    </nav>
  );
}

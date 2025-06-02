import { Dashboard } from "@/components/pages/sales-dashboard/Dashboard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen items-center justify-between p-24 bg-[#F2F2F0]">
      <div className="absolute top-6 right-6 flex gap-2">
        <Link href="/">
          <Button>메뉴화면</Button>
        </Link>
        <Link href="/sales-dashboard">
          <Button>매출관리</Button>
        </Link>
      </div>
      <div className="flex w-full gap-16">
        <Dashboard />
      </div>
    </main>
  );
}

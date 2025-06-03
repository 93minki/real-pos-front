import { MonthlyOrderList } from "@/components/pages/sales-dashboard/MonthlyOrderList";

export default function DashboardPage() {
  return (
    <main className="flex h-screen items-center p-24 bg-[#F2F2F0]">
      <MonthlyOrderList />
    </main>
  );
}

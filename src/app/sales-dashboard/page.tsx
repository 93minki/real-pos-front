import { Dashboard } from "@/components/pages/sales-dashboard/Dashboard";

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen items-center justify-between p-24 bg-[#F2F2F0]">
      <div className="flex w-full gap-16">
        <Dashboard />
      </div>
    </main>
  );
}

import OrderManage from "@/views/OrderManage";

export default function OrderManagePage() {
  return (
    <main className="flex h-screen w-full items-start p-24 bg-[#F2F2F0] gap-4">
      {/* <div className="flex w-full h-full gap-4">
        <OrderList />
        <OrderHistory />
      </div> */}
      <OrderManage />
    </main>
  );
}

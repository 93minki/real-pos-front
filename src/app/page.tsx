"use client";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col justify-center items-center">
        API Test
        <button
          onClick={async () => {
            const fetchData = await fetch("/api/menu");
            const response = await fetchData.json();
          }}
        >
          Get Menus
        </button>
      </div>
    </main>
  );
}

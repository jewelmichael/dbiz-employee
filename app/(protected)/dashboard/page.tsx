// app/(protected)/dashboard/page.tsx

import LogoutButton from "@/app/components/logout";

export default function DashboardPage() {
  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <LogoutButton />
      </div>
    </main>
  );
}

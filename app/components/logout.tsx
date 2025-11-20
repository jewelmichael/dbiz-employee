// app/ui/LogoutButton.tsx
"use client";

import { useTransition } from "react";
import { logout } from "@/app/actions/auth";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={() => {
        startTransition(() => {
          logout();
        });
      }}
    >
      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-400 disabled:opacity-50"
      >
        {isPending ? "Logging out..." : "Logout"}
      </button>
    </form>
  );
}

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
      >
        {isPending ? "Logging out..." : "Logout"}
      </button>
    </form>
  );
}

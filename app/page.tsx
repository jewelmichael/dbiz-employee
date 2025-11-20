// app/page.tsx
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/app/lib/auth";

export const runtime = "nodejs";

export default async function Home() {
  // Read the session cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (token) {
    try {
      // If token is valid -> go to dashboard
      await verifySessionToken(token);
      redirect("/dashboard");
    } catch {
      // Invalid/expired token -> ignore and send to signin
    }
  }

  // No token or invalid token -> go to signin
  redirect("/signin");
}

// app/(auth)/login/page.tsx
"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  login,
} from "@/app/actions/auth";
import type { LoginFormState } from "@/app/lib/definitions";
import Error from "@/app/components/error";

const initialLoginState: LoginFormState = {
  errors: undefined,
  message: undefined,
};

export default function LoginForm() {
  const [state, action, pending] = useActionState<LoginFormState, FormData>(
    login,
    initialLoginState
  );

  return (
    <>
      {/* Logo */}
      <div className="mb-8">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600/80">
          <span className="h-6 w-6 rounded-full bg-indigo-300/80" />
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        Sign in to your account
      </h2>
      <p className="mt-2 text-sm text-slate-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-indigo-400 hover:text-indigo-300 font-bold"
        >
          Create one
        </Link>
      </p>

      {state?.errors?.general && (
        <div className="mt-4">
          {state.errors.general.map((msg) => (
            <Error key={msg}>{msg}</Error>
          ))}
        </div>
      )}

      <form className="mt-8 space-y-6" action={action}>
        {/* EMAIL */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-300"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            className="mt-2 block w-full rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="you@example.com"
          />
          {state?.errors?.email && (
            <Error>{state.errors.email[0]}</Error>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-300"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="mt-2 block w-full rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {state?.errors?.password && (
            <Error>{state.errors.password[0]}</Error>
          )}
        </div>

        <button
          disabled={pending}
          type="submit"
          className="w-full rounded-md bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition disabled:opacity-50"
        >
          {pending ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </>
  );
}

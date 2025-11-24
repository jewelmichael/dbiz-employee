// app/(auth)/signup/page.tsx
"use client";

import { signup } from "@/app/actions/auth";
import { useActionState, useEffect, useState } from "react";
import Toast from "@/app/components/toast";
import Error from "@/app/components/error";
import Link from "next/link";
import type { FormState } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";

const initialState: FormState = {
  errors: undefined,
  message: undefined,
};

export default function SignupForm() {
  const [state, action, isPending] = useActionState<FormState, FormData>(
    signup,
    initialState
  );
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (state?.message === "Signup successful!") {
      setShowToast(true);
      const t = setTimeout(() => {
        setShowToast(false)
        router.push("/signin");
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [state?.message, router]);

  return (
    <>
      {/* Logo */}
      <div className="mb-8">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600/80">
          <span className="h-6 w-6 rounded-full bg-indigo-300/80" />
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        Create your account
      </h2>
      <p className="mt-2 text-sm text-slate-400">
        Already a member?{" "}
        <Link
          href="/signin"
          className="text-indigo-400 hover:text-indigo-300 font-bold"
        >
          Let&apos;s sign in
        </Link>
      </p>

      {showToast && (
        <Toast message={state?.message ?? "Signup successful!"} />
      )}

      <form className="mt-8 space-y-6" action={action}>
        {/* NAME */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-300"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            placeholder="Name"
            className="mt-2 block w-full rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {state?.errors?.name && (
            <Error>{state.errors.name[0]}</Error>
          )}
        </div>

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
            placeholder="you@example.com"
            className="mt-2 block w-full rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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

          {Array.isArray(state?.errors?.password) && (
            <div className="mt-2">
              <p className="text-sm font-medium">Password must:</p>
              <ul className="list-disc ml-5">
                {state.errors.password.map((err) => (
                  <li key={err}>
                    <Error>- {err}</Error>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* SUBMIT */}
        <button
          disabled={isPending}
          type="submit"
          className="w-full rounded-md bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition disabled:opacity-50"
        >
          {isPending ? "Processing..." : "Sign Up"}
        </button>
      </form>
    </>
  );
}

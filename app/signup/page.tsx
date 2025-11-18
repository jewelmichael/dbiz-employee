// src/app/signup/page.tsx
"use client";

import { useState } from "react";

export default function SignupPage() {
    const [status, setStatus] = useState<null | string>(null);

    return (
        <main className="min-h-screen flex items-center justify-center">
            <form
                action="/api/signup"
                method="POST"
                onSubmit={async (e) => {
                    e.preventDefault();
                    setStatus("Submitting...");

                    const form = e.currentTarget;
                    const formData = new FormData(form);

                    const res = await fetch("/api/signup", {
                        method: "POST",
                        body: formData, // this is your FormData
                    });

                    const data = await res.json();

                    if (!res.ok) {
                        setStatus(data.error || "Error");
                    } else {
                        setStatus("Signup successful!");
                        form.reset();
                    }
                }}
                className="flex flex-col gap-4 border p-6 rounded w-full max-w-sm"
            >
                <h1 className="text-2xl font-semibold">Sign up</h1>

                <input
                    name="name"
                    placeholder="Name"
                    className="border rounded px-3 py-2"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border rounded px-3 py-2"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border rounded px-3 py-2"
                    required
                />

                <button
                    type="submit"
                    className="border rounded px-3 py-2 font-medium"
                >
                    Create account
                </button>

                {status && <p className="text-sm mt-2">{status}</p>}
            </form>
        </main>
    );
}

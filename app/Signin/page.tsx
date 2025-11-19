import Link from "next/link";


export default function SigninForm() {
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
        Not a member?{" "}
        <Link href="/Signup" className="text-indigo-400 hover:text-indigo-300 font-bold">
          Lets create one
        </Link>
      </p>

      <form className="mt-8 space-y-6">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-300"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="mt-2 block w-full rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm
                           text-slate-100 placeholder:text-slate-500 shadow-sm
                           focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="you@example.com"
          />
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-300"
            >
              Password
            </label>
            <button
              type="button"
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300"
            >
              Forgot password?
            </button>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="mt-2 block w-full rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm
                           text-slate-100 placeholder:text-slate-500 shadow-sm
                           focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Remember me */}
        <div className="flex items-center justify-between">
          <label className="inline-flex items-center gap-2 text-xs text-slate-400">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-indigo-500
                             focus:ring-indigo-500 focus:ring-offset-slate-900"
            />
            Remember me
          </label>
        </div>

        {/* Primary button */}
        <button
          type="submit"
          className="w-full rounded-md bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition"
        >
          Sign in
        </button>
      </form>
    </>
  );
}

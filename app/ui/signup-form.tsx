'use client'

import { signup } from '@/app/actions/auth'
import { useActionState } from 'react'
import Error from './error'

const initialState = {
  ok: null,
  errors: {},
}

export default function SignupForm() {
  const [state, action, isPending] = useActionState(signup, undefined)

  return (
    <form action={action}>
      {/* NAME */}
      <div className='mb-2'>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          placeholder="Name"
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {state?.errors?.name && <Error>{state.errors.name}</Error>}
      </div>

      {/* EMAIL */}
      <div className='mb-2'>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          placeholder="Email"
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {state?.errors?.email && <Error>{state.errors.email}</Error>}
      </div>

      {/* PASSWORD */}
      <div className='mb-2'>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />

        {Array.isArray(state?.errors?.password) && (
          <div className='mt-2'>
            <p className="text-sm font-medium">Password must:</p>
            <ul className="list-disc ml-5">
              {state.errors.password.map((err: string) => (
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
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition duration-150"
      >
        {isPending ? "Processing..." : "Sign Up"}
      </button>
    </form>
  )
}
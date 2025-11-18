'use client'

import { signup } from '@/app/actions/auth'
import { useActionState } from 'react'
import Error from './error'

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)

  return (
    <form action={action}>
      <div className='mb-2'>
        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Name" className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        {state?.errors?.name && <Error>{state.errors.name}</Error>}
      </div>

      <div className='mb-2'>
        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="Email" className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        {state?.errors?.email && <Error>{state.errors.email}</Error>}
      </div>

      <div className='mb-2'>
        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="password">Password</label>
        <input id="password" name="password" type="password" className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
        {state?.errors?.password && (
          <div className='mb-2'>
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}><Error>- {error}</Error></li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button disabled={pending} type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition duration-150">
        Sign Up
      </button>
    </form>
  )
}
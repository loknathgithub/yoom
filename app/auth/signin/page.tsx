"use client"
import { authOptions } from "@/auth"

export default function SignInPage() {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="p-6 rounded-lg shadow bg-white">
        <h1 className="text-xl font-bold mb-4">Sign in</h1>
        <button
          onClick={() => authOptions.signIn("google", { callbackUrl: "/" })}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Sign in with Google
        </button>
      </div>
    </main>
  )
}
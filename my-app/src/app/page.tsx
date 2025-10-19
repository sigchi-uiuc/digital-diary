"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

export default function Home() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Digital Diary
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {session ? (
                <>
                  <span className="text-gray-700">
                    Welcome, {session.user?.username || session.user?.email}!
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8 text-center">
            {session ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Welcome to your Digital Diary!
                </h2>
                <p className="text-gray-600">
                  You are successfully signed in as {session.user?.username || session.user?.email}
                </p>
                <div className="mt-6 space-y-4">
                  <p className="text-gray-500">
                    Your diary features are ready to use. Start creating entries and documenting your thoughts!
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <h3 className="text-lg font-medium text-blue-900">
                      Next Steps
                    </h3>
                    <ul className="mt-2 text-sm text-blue-700 space-y-1">
                      <li>• Create your first journal entry</li>
                      <li>• Set up your profile preferences</li>
                      <li>• Explore the diary features</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Welcome to Digital Diary
                </h2>
                <p className="text-gray-600">
                  Please sign in to access your personal diary and start documenting your thoughts.
                </p>
                <div className="mt-6 flex justify-center space-x-4">
                  <Link
                    href="/auth/signin"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-sm font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="bg-white hover:bg-gray-50 text-gray-900 px-6 py-3 rounded-md text-sm font-medium border border-gray-300"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

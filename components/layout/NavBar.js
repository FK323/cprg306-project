"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function NavBar() {
  const pathname = usePathname();
  const { user, logOut } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-primary">
              CineTrack
            </Link>
          </div>

          {/* Navigation links*/}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/"
                  ? "bg-gray-100 text-primary"
                  : "text-gray-700 hover:bg-gray-50 hover:text-primary"
              }`}
            >
              Home
            </Link>

            <Link
              href="/movies/search"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/movies/search"
                  ? "bg-gray-100 text-primary"
                  : "text-gray-700 hover:bg-gray-50 hover:text-primary"
              }`}
            >
              Search
            </Link>

            {user && (
              <Link
                href="/watchlist"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/watchlist"
                    ? "bg-gray-100 text-primary"
                    : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                }`}
              >
                Watchlist
              </Link>
            )}
          </div>

          {/* Authentication section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="hidden md:inline text-sm text-gray-600">
                  {user.displayName}
                </span>
                <button
                  onClick={logOut}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className={`px-3 py-2 rounded-md text-sm font-medium bg-primary text-white hover:bg-primary-dark ${
                  pathname === "/auth/signin" ? "bg-primary-dark" : ""
                }`}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu*/}
        <div className="md:hidden flex justify-center py-3 border-t border-gray-200">
          <div className="flex space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 text-sm ${
                pathname === "/" ? "text-primary font-medium" : "text-gray-700"
              }`}
            >
              Home
            </Link>

            <Link
              href="/movies/search"
              className={`px-3 py-2 text-sm ${
                pathname === "/movies/search"
                  ? "text-primary font-medium"
                  : "text-gray-700"
              }`}
            >
              Search
            </Link>

            {user && (
              <Link
                href="/watchlist"
                className={`px-3 py-2 text-sm ${
                  pathname === "/watchlist"
                    ? "text-primary font-medium"
                    : "text-gray-700"
                }`}
              >
                Watchlist
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

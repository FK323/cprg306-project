"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function NavBar() {
  const pathname = usePathname();
  const { user, logOut } = useAuth();

  return (
    <nav className="bg-white text-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-4 sm:mb-0">
          <Link href="/" className="text-xl font-bold text-[#00539C]">
            CineTrack
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className={`px-3 py-2 rounded hover:bg-gray-100 ${
              pathname === "/" ? "bg-gray-100 text-[#00539C] font-medium" : ""
            }`}
          >
            Home
          </Link>

          <Link
            href="/movies/search"
            className={`px-3 py-2 rounded hover:bg-gray-100 ${
              pathname === "/movies/search"
                ? "bg-gray-100 text-[#00539C] font-medium"
                : ""
            }`}
          >
            Search
          </Link>

          {user && (
            <Link
              href="/watchlist"
              className={`px-3 py-2 rounded hover:bg-gray-100 ${
                pathname === "/watchlist"
                  ? "bg-gray-100 text-[#00539C] font-medium"
                  : ""
              }`}
            >
              Watchlist
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm hidden md:inline text-gray-600">
                {user.displayName}
              </span>
              <button
                onClick={logOut}
                className="px-3 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className={`px-3 py-2 rounded bg-[#00539C] hover:bg-[#003d73] text-white ${
                pathname === "/auth/signin" ? "bg-[#003d73]" : ""
              }`}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

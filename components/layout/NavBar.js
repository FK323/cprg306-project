// components/layout/NavBar.js
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function NavBar() {
  const pathname = usePathname();
  const { user, logOut } = useAuth();

  return (
    <nav className="bg-slate-900 text-white p-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-4 sm:mb-0">
          <Link href="/" className="text-xl font-bold">
            CineTrack
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className={`px-3 py-2 rounded hover:bg-slate-700 ${
              pathname === "/" ? "bg-slate-700" : ""
            }`}
          >
            Home
          </Link>

          <Link
            href="/movies/search"
            className={`px-3 py-2 rounded hover:bg-slate-700 ${
              pathname === "/movies/search" ? "bg-slate-700" : ""
            }`}
          >
            Search
          </Link>

          {user && (
            <Link
              href="/watchlist"
              className={`px-3 py-2 rounded hover:bg-slate-700 ${
                pathname === "/watchlist" ? "bg-slate-700" : ""
              }`}
            >
              Watchlist
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm hidden md:inline">
                {user.displayName}
              </span>
              <button
                onClick={logOut}
                className="px-3 py-2 rounded bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className={`px-3 py-2 rounded bg-blue-600 hover:bg-blue-700 ${
                pathname === "/auth/signin" ? "bg-blue-700" : ""
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

"use client";

// app/movies/[id]/error.js
import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-3xl font-bold text-white mb-4">
        Something went wrong
      </h1>
      <p className="text-slate-300 mb-8 max-w-md">
        We encountered an error while trying to load this movie.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-md font-medium"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}

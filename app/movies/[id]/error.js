"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Something went wrong
      </h1>
      <p className="text-gray-600 mb-8 max-w-md">
        We encountered an error while trying to load this movie.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-[#00539C] hover:bg-[#003d73] text-white rounded-md font-medium"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md font-medium"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}

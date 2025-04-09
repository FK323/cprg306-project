"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 max-w-lg w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-8">
            We encountered an error while trying to load this movie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-md font-medium transition-colors duration-200"
            >
              Try again
            </button>
            <Link
              href="/"
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md font-medium transition-colors duration-200"
            >
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

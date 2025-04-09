"use client";

import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "../../lib/tmdb";

export default function MovieCard({ movie }) {
  if (!movie) return null;

  const { id, title, poster_path, release_date, vote_average } = movie;

  const releaseYear = release_date
    ? new Date(release_date).getFullYear()
    : "N/A";
  const posterUrl = getImageUrl(poster_path);
  const rating = vote_average ? (vote_average / 2).toFixed(1) : "N/A";

  return (
    <Link href={`/movies/${id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 h-full transition-transform duration-200 hover:shadow-lg hover:scale-105">
        {/* Movie poster*/}
        <div className="relative aspect-[2/3] bg-gray-100">
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={`${title} poster`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          ) : (
            <div className="bg-gray-200 h-full flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>

        {/* Movie details*/}
        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-800 mb-2 truncate">
            {title}
          </h3>

          <div className="flex justify-between items-center">
            <div className="text-gray-600">{releaseYear}</div>
            <div className="flex items-center bg-gray-100 px-2 py-1 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-yellow-500 mr-1"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-800 font-medium">{rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

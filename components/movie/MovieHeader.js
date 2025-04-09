import Image from "next/image";
import { getImageUrl } from "../../lib/tmdb";
import WatchlistButton from "../ui/WatchlistButton";
import StarRating from "../ui/StarRating";

export default function MovieHeader({ movie }) {
  const {
    id,
    title,
    release_date,
    runtime,
    genres,
    poster_path,
    backdrop_path,
    vote_average,
  } = movie;

  const releaseYear = release_date
    ? new Date(release_date).getFullYear()
    : "N/A";
  const formattedRuntime = runtime
    ? `${Math.floor(runtime / 60)}h ${runtime % 60}m`
    : "N/A";
  const genreList = genres?.map((g) => g.name).join(", ") || "N/A";
  const rating = vote_average ? (vote_average / 2).toFixed(1) : "N/A";

  const posterUrl = getImageUrl(poster_path);
  const backdropUrl = getImageUrl(backdrop_path, "original");

  return (
    <div className="relative py-8 mb-8 bg-gray-50">
      {/* Backdrop Image with Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50">
        {backdropUrl && (
          <div className="absolute inset-0 opacity-20">
            <Image
              src={backdropUrl}
              alt={`${title} backdrop`}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Movie Poster*/}
          <div className="flex-shrink-0 w-full md:w-72 lg:w-80">
            <div className="bg-white p-2 rounded-lg shadow-md border border-gray-200 overflow-hidden">
              {posterUrl ? (
                <Image
                  src={posterUrl}
                  alt={`${title} poster`}
                  width={300}
                  height={450}
                  className="w-full h-auto rounded"
                />
              ) : (
                <div className="bg-gray-200 h-96 flex items-center justify-center rounded">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
            </div>
          </div>

          {/* Movie Info*/}
          <div className="flex-grow">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {title}
            </h1>

            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                <div className="flex items-center">
                  <span className="font-medium text-gray-800 mr-2">
                    Released:
                  </span>
                  <span>{releaseYear}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-800 mr-2">
                    Runtime:
                  </span>
                  <span>{formattedRuntime}</span>
                </div>
                <div className="md:col-span-2 flex items-start">
                  <span className="font-medium text-gray-800 mr-2">
                    Genres:
                  </span>
                  <span>{genreList}</span>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-yellow-500 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-800 font-medium">{rating}</span>
                  <span className="text-gray-500 ml-1">/5</span>
                </div>
              </div>
            </div>

            {/* Action buttons*/}
            <div className="flex flex-col sm:flex-row gap-4">
              <WatchlistButton movieId={id.toString()} />
              <div>
                <StarRating movieId={id.toString()} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

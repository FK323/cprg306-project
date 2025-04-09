import Image from "next/image";
import { getMovieDetails, getTrailerUrl, getImageUrl } from "../../../lib/tmdb";
import MovieHeader from "../../../components/movie/MovieHeader";

export default async function MovieDetailsPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const movie = await getMovieDetails(id);

  // Find trailer video if available
  const trailer = movie.videos?.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  // Get up to 10 cast members
  const cast = movie.credits?.cast.slice(0, 10) || [];

  return (
    <div>
      {/* Movie header with backdrop and poster */}
      <MovieHeader movie={movie} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/*Synopsis & Cast */}
          <div className="lg:col-span-2">
            {/* Synopsis Section*/}
            <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 pb-3 border-b border-gray-100">
                Synopsis
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {movie.overview || "No synopsis available."}
              </p>
            </section>

            {/* Cast Section*/}
            <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 pb-3 border-b border-gray-100">
                Cast
              </h2>
              {cast.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {cast.map((person) => (
                    <div
                      key={person.id}
                      className="bg-white rounded-lg overflow-hidden text-center shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="aspect-[2/3] bg-gray-200 relative">
                        {person.profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                            alt={person.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-gray-500">No image</span>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="font-medium text-gray-800 truncate">
                          {person.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {person.character}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No cast information available.</p>
              )}
            </section>
          </div>

          {/* Right column: Trailer */}
          <div>
            <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 pb-3 border-b border-gray-100">
                Trailer
              </h2>
              {trailer ? (
                <div
                  className="relative bg-gray-100 rounded-lg overflow-hidden shadow-sm border border-gray-200"
                  style={{ height: "315px" }}
                >
                  <iframe
                    src={getTrailerUrl(trailer.key)}
                    title={`${movie.title} Trailer`}
                    width="100%"
                    height="100%"
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
                  <p className="text-gray-500">No trailer available.</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

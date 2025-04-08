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
      <MovieHeader movie={movie} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: Synopsis & Cast */}
          <div className="lg:col-span-2">
            {/* Synopsis Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Synopsis</h2>
              <p className="text-slate-300">
                {movie.overview || "No synopsis available."}
              </p>
            </section>

            {/* Cast Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Cast</h2>
              {cast.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {cast.map((person) => (
                    <div
                      key={person.id}
                      className="bg-slate-800 rounded overflow-hidden text-center"
                    >
                      <div className="aspect-[2/3] bg-slate-700 relative">
                        {person.profile_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                            alt={person.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-slate-500">No image</span>
                          </div>
                        )}
                      </div>
                      <div className="p-2">
                        <p className="font-medium text-white truncate">
                          {person.name}
                        </p>
                        <p className="text-sm text-slate-400 truncate">
                          {person.character}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400">No cast information available.</p>
              )}
            </section>
          </div>

          {/* Right column: Trailer */}
          <div>
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Trailer</h2>
              {trailer ? (
                <div
                  className="relative bg-slate-800 rounded overflow-hidden"
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
                <div className="bg-slate-800 rounded p-4 text-center">
                  <p className="text-slate-400">No trailer available.</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

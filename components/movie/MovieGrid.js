import MovieCard from "./MovieCard";

export default function MovieGrid({ movies, title }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
        <div className="bg-white p-8 rounded shadow border border-gray-200 text-center text-gray-500">
          No movies found
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {title && (
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

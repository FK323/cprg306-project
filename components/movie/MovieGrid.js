// components/movie/MovieGrid.js
import MovieCard from "./MovieCard";

export default function MovieGrid({ movies, title }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
        <div className="bg-slate-800 p-8 rounded text-center text-slate-400">
          No movies found
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {title && <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

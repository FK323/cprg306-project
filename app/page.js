// app/page.js
import Link from "next/link";
import MovieGrid from "../components/movie/MovieGrid";
import SearchBar from "../components/ui/SearchBar";
import { getTrendingMovies, getTopRatedMovies } from "../lib/tmdb";

export default async function HomePage() {
  // Fetch trending and top-rated movies
  const trendingMovies = await getTrendingMovies();
  const topRatedMovies = await getTopRatedMovies();

  return (
    <div>
      <section className="mb-10">
        <h1 className="text-3xl font-bold mb-6 text-white">Discover Movies</h1>
        <p className="text-slate-300 mb-6">
          Search for your favorite movies, create a watchlist, and keep track of
          what you&apos;ve watched.
        </p>

        <div className="mb-8">
          <SearchBar />
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Trending Now</h2>
          <Link
            href="/movies/search?sort=trending"
            className="text-blue-400 hover:text-blue-300"
          >
            View all
          </Link>
        </div>

        <MovieGrid movies={trendingMovies.slice(0, 5)} />
      </section>

      <section className="mb-10">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Top Rated</h2>
          <Link
            href="/movies/search?sort=top_rated"
            className="text-blue-400 hover:text-blue-300"
          >
            View all
          </Link>
        </div>

        <MovieGrid movies={topRatedMovies.slice(0, 5)} />
      </section>
    </div>
  );
}

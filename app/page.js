import Link from "next/link";
import MovieGrid from "../components/movie/MovieGrid";
import SearchBar from "../components/ui/SearchBar";
import { getTrendingMovies, getTopRatedMovies } from "../lib/tmdb";

export default async function HomePage() {
  // Fetch trending and top-rated movies
  const trendingMovies = await getTrendingMovies();
  const topRatedMovies = await getTopRatedMovies();

  return (
    <div className="content-container">
      {/* Header section */}
      <section className="section">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Discover Movies
        </h1>

        {/* Search bar*/}
        <div className="mb-12">
          <SearchBar />
        </div>
      </section>

      {/* Trending movies section */}
      <section className="section">
        <div className="flex justify-between items-center mb-6">
          <h2 className="section-heading mb-0">Trending Now</h2>
          <Link
            href="/movies/search?sort=trending"
            className="text-primary hover:text-primary-dark font-medium transition-colors duration-200"
          >
            View all
          </Link>
        </div>

        <MovieGrid movies={trendingMovies.slice(0, 5)} />
      </section>

      {/* Top Rated movies section */}
      <section className="section">
        <div className="flex justify-between items-center mb-6">
          <h2 className="section-heading mb-0">Top Rated</h2>
          <Link
            href="/movies/search?sort=top_rated"
            className="text-primary hover:text-primary-dark font-medium transition-colors duration-200"
          >
            View all
          </Link>
        </div>

        <MovieGrid movies={topRatedMovies.slice(0, 5)} />
      </section>
    </div>
  );
}

// app/movies/search/page.js
import SearchBar from "../../../components/ui/SearchBar";
import MovieGrid from "../../../components/movie/MovieGrid";
import {
  searchMovies,
  getTrendingMovies,
  getTopRatedMovies,
} from "../../../lib/tmdb";

export default async function SearchPage({ searchParams }) {
  const { query, year, genre, sort } = searchParams;

  let movies = [];
  let title = "";

  // Handle different search scenarios
  if (sort === "trending") {
    movies = await getTrendingMovies();
    title = "Trending Movies";
  } else if (sort === "top_rated") {
    movies = await getTopRatedMovies();
    title = "Top Rated Movies";
  } else if (query || year || genre) {
    movies = await searchMovies({ query, year, genre });

    // Create a descriptive title based on search parameters
    const terms = [];
    if (query) terms.push(`"${query}"`);
    if (year) terms.push(`from ${year}`);
    if (genre) {
      // Normally we would resolve genre ID to name here
      // For simplicity, we'll just use the ID in this example
      terms.push(`in genre ${genre}`);
    }

    title = `Search Results ${terms.join(" ")}`;
  } else {
    // Default to trending if no search params
    movies = await getTrendingMovies();
    title = "Trending Movies";
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-white">Search Movies</h1>

      <div className="mb-8">
        <SearchBar initialValues={{ query, year, genre }} />
      </div>

      <MovieGrid movies={movies} title={title} />
    </div>
  );
}

import SearchBar from "../../../components/ui/SearchBar";
import MovieGrid from "../../../components/movie/MovieGrid";
import {
  searchMovies,
  getTrendingMovies,
  getTopRatedMovies,
} from "../../../lib/tmdb";

export default async function SearchPage({ searchParams }) {
  const { query, year, genre, sort } = searchParams;

  console.log("Search params received:", { query, year, genre, sort });

  let movies = [];
  let title = "";

  if (sort === "trending") {
    movies = await getTrendingMovies();
    title = "Trending Movies";
  } else if (sort === "top_rated") {
    movies = await getTopRatedMovies();
    title = "Top Rated Movies";
  } else if (query || year || genre) {
    console.log("Searching with params:", { query, year, genre });

    try {
      movies = await searchMovies({ query, year, genre });
      console.log(`Found ${movies.length} results`);
    } catch (error) {
      console.error("Error searching movies:", error);
      movies = [];
    }

    const terms = [];
    if (query) terms.push(`"${query}"`);
    if (year) terms.push(`from ${year}`);
    if (genre) {
      terms.push(`in genre ${genre}`);
    }

    title = `Search Results ${terms.join(" ")}`;
  } else {
    movies = await getTrendingMovies();
    title = "Trending Movies";
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Search Movies</h1>

      <div className="mb-8">
        <SearchBar initialValues={{ query, year, genre }} />
      </div>

      <MovieGrid movies={movies} title={title} />
    </div>
  );
}

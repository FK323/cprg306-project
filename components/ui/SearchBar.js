"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getGenres } from "../../lib/tmdb";

export default function SearchBar({ initialValues = {} }) {
  const [query, setQuery] = useState(initialValues.query || "");
  const [year, setYear] = useState(initialValues.year || "");
  const [genre, setGenre] = useState(initialValues.genre || "");
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Generate year options
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 80 }, (_, i) => currentYear - i);

  // Fetch genres when component mounts
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreList = await getGenres();
        setGenres(genreList);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Build query string
    const params = new URLSearchParams();
    if (query) params.append("query", query);
    if (year) params.append("year", year);
    if (genre) params.append("genre", genre);

    router.push(`/movies/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md border border-gray-200"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Movie Title Input */}
        <div>
          <label
            htmlFor="query"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Movie Title
          </label>
          <input
            type="text"
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie..."
            className="w-full p-2 rounded bg-white text-gray-800 border border-gray-300 focus:border-[#00539C] focus:outline-none"
          />
        </div>

        {/* Genre Dropdown */}
        <div>
          <label
            htmlFor="genre"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Genre
          </label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full p-2 rounded bg-white text-gray-800 border border-gray-300 focus:border-[#00539C] focus:outline-none"
          >
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        {/* Year Dropdown */}
        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Release Year
          </label>
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full p-2 rounded bg-white text-gray-800 border border-gray-300 focus:border-[#00539C] focus:outline-none"
          >
            <option value="">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-[#00539C] hover:bg-[#003d73] text-white rounded font-medium focus:outline-none focus:ring-2 focus:ring-[#00539C] focus:ring-opacity-50 disabled:opacity-70"
        >
          {isLoading ? "Searching..." : "Search Movies"}
        </button>
      </div>
    </form>
  );
}

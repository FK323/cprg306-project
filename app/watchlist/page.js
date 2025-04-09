"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import MovieGrid from "../../components/movie/MovieGrid";
import { getMovieDetails } from "../../lib/tmdb";

export default function WatchlistPage() {
  const { user, loading } = useAuth();
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/auth/signin";
      return;
    }

    const fetchWatchlistMovies = async () => {
      if (user && user.watchlist && user.watchlist.length > 0) {
        setIsLoading(true);
        try {
          const moviePromises = user.watchlist.map((id) => getMovieDetails(id));
          const movies = await Promise.all(moviePromises);
          setWatchlistMovies(movies);
        } catch (error) {
          console.error("Error fetching watchlist movies:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setWatchlistMovies([]);
        setIsLoading(false);
      }
    };

    if (user) {
      fetchWatchlistMovies();
    }
  }, [user, loading]);

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your watchlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Watchlist</h1>

      {watchlistMovies.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center border border-gray-200">
          <h2 className="text-xl font-medium text-gray-800 mb-4">
            Your watchlist is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Start adding movies to your watchlist to keep track of what you want
            to watch.
          </p>
          <Link
            href="/"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
          >
            Discover Movies
          </Link>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <MovieGrid movies={watchlistMovies} />
        </div>
      )}
    </div>
  );
}

// lib/tmdb.js
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

/**
 * Fetches trending movies for the week
 * @returns {Promise<Array>} Array of trending movies
 */
export async function getTrendingMovies() {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  const data = await response.json();
  return data.results;
}

/**
 * Fetches top-rated movies
 * @returns {Promise<Array>} Array of top-rated movies
 */
export async function getTopRatedMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch top-rated movies");
  }

  const data = await response.json();
  return data.results;
}

/**
 * Fetches movie details by ID
 * @param {string} id - Movie ID
 * @returns {Promise<Object>} Movie details
 */
export async function getMovieDetails(id) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return response.json();
}

/**
 * Searches for movies based on query parameters
 * @param {Object} params - Search parameters
 * @returns {Promise<Array>} Search results
 */
export async function searchMovies(params = {}) {
  const { query, year, genre } = params;
  let url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${
    query || ""
  }`;

  if (year) {
    url += `&primary_release_year=${year}`;
  }

  if (genre) {
    url += `&with_genres=${genre}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to search movies");
  }

  const data = await response.json();
  return data.results;
}

/**
 * Fetches all available movie genres
 * @returns {Promise<Array>} Array of genres
 */
export async function getGenres() {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch genres");
  }

  const data = await response.json();
  return data.genres;
}

/**
 * Gets the full image URL for TMDb images
 * @param {string} path - Image path
 * @param {string} size - Image size (w500, original, etc.)
 * @returns {string} Full image URL
 */
export function getImageUrl(path, size = "w500") {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

/**
 * Gets the YouTube URL for a trailer
 * @param {string} key - YouTube video key
 * @returns {string} YouTube embed URL
 */
export function getTrailerUrl(key) {
  return `https://www.youtube.com/embed/${key}`;
}

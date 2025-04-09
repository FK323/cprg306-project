"use client";

import { useState, useEffect } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";

export default function WatchlistButton({ movieId, movieData }) {
  const { user } = useAuth();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user && user.watchlist) {
      setIsInWatchlist(user.watchlist.includes(movieId));
    }
  }, [user, movieId]);

  const handleToggleWatchlist = async () => {
    if (!user) {
      // Redirect to sign in page if user is not authenticated
      window.location.href = "/auth/signin";
      return;
    }

    setIsUpdating(true);

    try {
      const userRef = doc(db, "users", user.uid);

      if (isInWatchlist) {
        // Remove from watchlist
        await updateDoc(userRef, {
          watchlist: arrayRemove(movieId),
        });
        setIsInWatchlist(false);
      } else {
        // Add to watchlist
        await updateDoc(userRef, {
          watchlist: arrayUnion(movieId),
        });
        setIsInWatchlist(true);
      }
    } catch (error) {
      console.error("Error updating watchlist:", error);
      alert("Failed to update watchlist. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <button
      onClick={handleToggleWatchlist}
      disabled={isUpdating}
      className={`flex items-center justify-center px-6 py-3 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-200 ${
        isInWatchlist
          ? "bg-red-500 hover:bg-red-600 focus:ring-red-300 text-white"
          : "bg-primary hover:bg-primary-dark focus:ring-primary-light text-white"
      } disabled:opacity-70`}
    >
      {isUpdating ? (
        "Updating..."
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 mr-2"
          >
            {isInWatchlist ? (
              <path
                fillRule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                clipRule="evenodd"
              />
            )}
          </svg>
          {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </>
      )}
    </button>
  );
}

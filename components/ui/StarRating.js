"use client";

import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";

export default function StarRating({ movieId }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user && user.ratings && user.ratings[movieId]) {
      setRating(user.ratings[movieId]);
    } else {
      setRating(0);
    }
  }, [user, movieId]);

  const handleRating = async (value) => {
    if (!user) {
      // Redirect to sign in if not authenticated
      window.location.href = "/auth/signin";
      return;
    }

    setIsUpdating(true);

    try {
      const userRef = doc(db, "users", user.uid);

      // Update the rating for this movie
      await updateDoc(userRef, {
        [`ratings.${movieId}`]: value,
      });

      setRating(value);
    } catch (error) {
      console.error("Error updating rating:", error);
      alert("Failed to update rating. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
      <div className="flex items-center justify-center mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={isUpdating}
            onClick={() => handleRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="focus:outline-none p-1"
            aria-label={`Rate ${star} stars out of 5`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`w-8 h-8 ${
                star <= (hover || rating) ? "text-yellow-500" : "text-gray-300"
              } transition-colors duration-150`}
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        ))}
      </div>

      <div className="text-center text-sm text-gray-600 font-medium">
        {rating > 0 ? `Your rating: ${rating}/5` : "Rate this movie"}
      </div>
    </div>
  );
}

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

export default function SignInPage() {
  const { user, loading, signInWithGithub } = useAuth();
  const router = useRouter();

  // Redirect if user is already signed in
  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  const handleGithubSignIn = async () => {
    try {
      await signInWithGithub();
      router.push("/");
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 border border-gray-200">
        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Sign in with</span>
          </div>
        </div>

        {/* Sign-in button*/}
        <div>
          <button
            onClick={handleGithubSignIn}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-md"
          >
            <span className="font-medium">GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
}

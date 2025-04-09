import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 max-w-lg w-full">
          <div className="text-4xl font-bold text-gray-800 mb-2">404</div>
          <h1 className="text-2xl font-semibold text-gray-700 mb-6">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-md font-medium transition-colors duration-200"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}

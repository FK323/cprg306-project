import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "../components/layout/NavBar";
import { AuthProvider } from "../context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CineTrack - Track Your Favorite Movies",
  description:
    "CineTrack helps you discover, track, and manage your favorite movies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-background text-text min-h-screen flex flex-col`}
      >
        <AuthProvider>
          {/* Navigation bar */}
          <NavBar />

          {/* Main content area*/}
          <main className="flex-grow">{children}</main>

          {/* Footer*/}
          <footer className="py-8 bg-background-light border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-text-light text-sm">
              <p>
                CineTrack &copy; {new Date().getFullYear()}. Movie data provided
                by TMDb.
              </p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}

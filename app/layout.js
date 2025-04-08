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
        className={`${inter.className} bg-white text-gray-800 min-h-screen`}
      >
        <AuthProvider>
          <NavBar />
          <main className="container mx-auto px-4 py-8">{children}</main>
          <footer className="mt-auto py-6 bg-gray-100">
            <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
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

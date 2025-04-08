// app/layout.js
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
        className={`${inter.className} bg-slate-900 text-white min-h-screen`}
      >
        <AuthProvider>
          <NavBar />
          <main className="container mx-auto px-4 py-8">{children}</main>
          <footer className="mt-auto py-6 bg-slate-800">
            <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
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

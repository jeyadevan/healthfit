import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HealthFit - Workout Consistency Tracker",
  description: "Track your workout consistency and build healthy fitness habits with HealthFit",
  keywords: "workout tracker, fitness, consistency, health, exercise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen`}>
        <div className="flex flex-col min-h-screen">

          <header className="bg-white shadow-sm border-b border-gray-200">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <h1 className="text-2xl font-bold text-gray-900">
                      <span className="text-blue-600">Health</span>
                      <span className="text-green-600">Fit</span>
                    </h1>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link
                      href="/dashboard"
                      className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/workouts"
                      className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Workouts
                    </Link>
                    <Link
                      href="/progress"
                      className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Progress
                    </Link>
                    <Link
                      href="/profile"
                      className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Profile
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
          </header>                 
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <div className="text-center text-gray-500 text-sm">
                © 2024 HealthFit. Built for consistent fitness tracking.
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

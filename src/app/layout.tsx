import type { Metadata } from "next";
import { Red_Hat_Text } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Link from "next/link";
import NotificationDropdown from '@/components/dashboard/NotificationDropdown';

// Initialize Red Hat Text only for the title
const redHat = Red_Hat_Text({ 
  subsets: ['latin'],
  weight: ['300'], // Light weight for a sleek look
});

export const metadata: Metadata = {
  title: "NueX Dashboard",
  description: "Interior Design Project Management Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <div className="flex h-screen bg-white">
          {/* Sidebar nav */}
          <nav className="w-20 h-screen bg-white border-r border-gray-100 flex flex-col items-center py-4 space-y-6">
            {/* Logo */}
            <Link href="/" className="w-12 h-12 flex items-center justify-center text-blue-600">
              <Image 
                src="/logo.svg"
                alt="NueX Logo"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </Link>

            {/* Nav Items with reduced spacing */}
            <div className="flex flex-col space-y-4">
              <Link 
                href="/"
                className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </Link>

              <Link 
                href="/projects"
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-gray-50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </Link>

              <Link 
                href="/tasks"
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-gray-50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </Link>

              <Link 
                href="/messages"
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-gray-50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </Link>
            </div>
          </nav>

          {/* Main content area with single header */}
          <div className="flex-1">
            <header className="h-16 border-b border-gray-100 px-4 flex items-center justify-between bg-white">
              <div className="flex items-center space-x-4">
                <h1 className={`${redHat.className} text-2xl font-light tracking-[0.2em] text-[#2B3A4A]`}>
                  NUEX
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <NotificationDropdown />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors">
                  New Project
                </button>
              </div>
            </header>
            
            <main className="p-4 overflow-auto" style={{ height: 'calc(100vh - 64px)' }}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

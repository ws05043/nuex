import type { Metadata } from "next";
import { Red_Hat_Text } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Link from "next/link";
import NotificationButton from '@/components/dashboard/NotificationButton';
import Version from '@/components/dashboard/Version';
import VersionTooltip from '@/components/dashboard/VersionTooltip';

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="w-16 bg-white border-r border-gray-100 flex flex-col items-center py-4">
            {/* Logo - removed version from here */}
            <div className="mb-8">
              <img src="/logo.svg" alt="NUEX" className="w-8 h-8" />
            </div>

            {/* Navigation */}
            <nav className="flex flex-col items-center space-y-4">
              <Link href="#" className="p-2 text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Link>
              <Link href="#" className="p-2 text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>
              <Link href="#" className="p-2 text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </Link>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8">
              {/* NUEX text with version tooltip */}
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-gray-900">NUEX</h1>
                <VersionTooltip />
              </div>
              
              <NotificationButton />
            </div>

            {/* Page Content */}
            <div className="bg-gray-50">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

import { Header } from "@/components/Header";
import { Providers } from "@/components/providers/Providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactElement } from "react";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  title: "Superhero Roster",
  description: "Browse heroes and villains with filters, search, and favorites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactElement {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-hero-light font-body text-hero-primary antialiased dark:bg-hero-dark dark:text-hero-light">
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:inline-block focus:h-auto focus:w-auto focus:overflow-visible focus:rounded-lg focus:bg-hero-secondary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-hero-accent"
          >
            Skip to main content
          </a>
          <Header />
          <main
            id="main-content"
            tabIndex={-1}
            className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 outline-none"
          >
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

// CONFLICT: scaffold used Geist fonts; plan specifies Inter-style heading/body via CSS variables — using Inter for both.
import { Header } from "@/components/Header";
import { Providers } from "@/components/providers/Providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactElement } from "react";
import "./globals.css";

const interBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const interHeading = Inter({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
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
    <html
      lang="en"
      className={`${interBody.variable} ${interHeading.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-hero-light font-body text-hero-primary antialiased dark:bg-hero-dark dark:text-hero-light">
        <Providers>
          <Header />
          <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calcul salaire",
  description: "Calculateur de salaire pour les vacations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer className="text-gray-300 text-center text-xs mt-14">
          <p>© 2026 Laetitia Piat. Tous droits réservés.</p>
          <p>
            <Link href="/mentions-legales" className="underline">
              Mentions légales
            </Link>
          </p>
        </footer>
      </body>
    </html>
  );
}

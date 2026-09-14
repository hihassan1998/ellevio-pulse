import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "EllevioPulse – Interaktiv Eldata & AI Kundportal",
  description: "Visualisering och analys av elområden SE1–SE4 i Sverige med OpenAI gpt-4o-mini",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className="antialiased font-sans">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="border-t border-gray-200 bg-white py-6 mt-12 text-center text-xs text-gray-500">
          <p>© 2026 EllevioPulse Showcase Project | Byggd av Hassan Hussain för Ellevio Ansökan</p>
        </footer>
      </body>
    </html>
  );
}

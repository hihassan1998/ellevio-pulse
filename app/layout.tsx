import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import DisclaimerBanner from "@/components/DisclaimerBanner";

export const metadata: Metadata = {
  title: "EllevioPulse – Interaktiv Eldata & AI Kundportal",
  description: "Visualisering och analys av elområden SE1–SE4 i Sverige av Hassan Hussain",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className="antialiased font-sans bg-[#f2f1f0] text-[#2c2827]">
        {/* Top Disclaimer Banner */}
        <DisclaimerBanner />

        {/* Ellevio Header */}
        <Header />

        {/* Main Content */}
        <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-[#e5e3e1] bg-white py-6 mt-12 text-center text-xs text-[#757575]">
          <p>© 2026 EllevioPulse Showcase Project | Utvecklad av Hassan Hussain</p>
        </footer>
      </body>
    </html>
  );
}

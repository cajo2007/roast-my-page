import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Roast My Landing Page",
    template: "%s | Roast My Landing Page",
  },
  description:
    "Get a sharp, specific, actionable critique of your landing page. Built for SaaS founders who want real feedback, not compliments.",
  keywords: [
    "landing page review",
    "conversion rate optimization",
    "CRO audit",
    "landing page feedback",
    "startup landing page",
  ],
  openGraph: {
    title: "Roast My Landing Page",
    description:
      "Stop guessing why your landing page isn't converting. Get a brutally honest, actionable roast.",
    type: "website",
    // TODO: Add OG image — generate dynamic share cards for roast results
  },
  twitter: {
    card: "summary_large_image",
    title: "Roast My Landing Page",
    description:
      "Sharp, specific, actionable landing page audits for SaaS founders.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

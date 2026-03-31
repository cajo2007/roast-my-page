import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
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
    default: "Roast Your Page",
    template: "%s | Roast Your Page",
  },
  description:
    "Get a sharp, specific, actionable critique of your landing page. Built for SaaS founders who want real feedback, not compliments.",
  metadataBase: new URL("https://roastyourpage.com"),
  alternates: {
    canonical: "https://roastyourpage.com",
  },
  keywords: [
    "landing page review",
    "conversion rate optimization",
    "CRO audit",
    "landing page feedback",
    "startup landing page",
  ],
  openGraph: {
    title: "Roast Your Page",
    description:
      "Stop guessing why your landing page isn't converting. Get a brutally honest, actionable roast.",
    type: "website",
    url: "https://roastyourpage.com",
    // TODO: Add OG image — generate dynamic share cards for roast results
  },
  twitter: {
    card: "summary_large_image",
    title: "Roast Your Page",
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
    <ClerkProvider>
      <html lang="en" className={inter.variable}>
        <body className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

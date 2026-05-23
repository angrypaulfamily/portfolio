import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Keith Paul — UI/UX Designer",
  description:
    "UI/UX Designer with 5+ years of experience in web design, Shopify, branding, and AI-powered workflows. Available for work. Remote / Bangkok.",
  keywords: ["UI/UX Designer", "Web Design", "Shopify", "Branding", "AI Design", "Bangkok"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${font.variable} grain`}>
      <body className="min-h-screen flex flex-col font-sans bg-[#0a0a0a] text-white">
        <CustomCursor />
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

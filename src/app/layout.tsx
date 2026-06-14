import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, DM_Mono } from "next/font/google";
import "./globals.css";
import NavbarConditional from "@/components/NavbarConditional";
import FooterConditional from "@/components/FooterConditional";
import NavbarSpacer from "@/components/NavbarSpacer";
import CustomCursorConditional from "@/components/CustomCursorConditional";
import { Analytics } from "@vercel/analytics/next";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm",
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
    <html lang="en" className={`${font.variable} ${spaceGrotesk.variable} ${dmMono.variable} grain`}>
      <body className="min-h-screen flex flex-col font-sans bg-[#0a0a0a] text-white">
        <CustomCursorConditional />
        <NavbarConditional />
        <main className="flex-1"><NavbarSpacer />{children}</main>
        <FooterConditional />
        <Analytics />
      </body>
    </html>
  );
}

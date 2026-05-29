import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";

const noto = Noto_Sans({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-kp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KonsaPhone — Ab pata chalega",
  description:
    "Confused between phones? Priya help karegi! Free side-by-side comparison aur personalized recommendation in Hinglish.",
  keywords: ["phone comparison", "best phone India", "mobile comparison", "Priya AI", "KonsaPhone"],
};

export default function KonsaPhoneLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${noto.variable} konsaphone-root`}>
      <style>{`
        .konsaphone-root {
          font-family: var(--font-kp), 'Noto Sans', sans-serif;
          background: #FFF8F0;
          min-height: 100vh;
          color: #1a1a1a;
        }
        .konsaphone-root * {
          box-sizing: border-box;
        }
      `}</style>
      {children}
    </div>
  );
}

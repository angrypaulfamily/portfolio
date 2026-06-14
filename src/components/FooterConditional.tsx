"use client";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterConditional() {
  const p = usePathname();
  return p === "/" ? null : <Footer />;
}

"use client";
import { usePathname } from "next/navigation";

export default function NavbarSpacer() {
  const p = usePathname();
  return p === "/" ? null : <div className="h-16" />;
}

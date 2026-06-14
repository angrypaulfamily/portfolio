"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarConditional() {
  const p = usePathname();
  return p === "/" ? null : <Navbar />;
}

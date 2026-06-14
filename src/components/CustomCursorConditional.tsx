"use client";
import { usePathname } from "next/navigation";
import CustomCursor from "./CustomCursor";

export default function CustomCursorConditional() {
  const p = usePathname();
  // Disable the dark-theme custom cursor on the white experimental home page
  return p === "/" ? null : <CustomCursor />;
}

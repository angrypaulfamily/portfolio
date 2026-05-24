"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(true); // assume touch until proven otherwise
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number>(0);

  // Dot: raw position, no spring
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Ring: very stiff spring — snappy, barely any lag
  const ringX = useSpring(dotX, { stiffness: 800, damping: 60, mass: 0.4 });
  const ringY = useSpring(dotY, { stiffness: 800, damping: 60, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsTouch(!mq.matches);

    if (!mq.matches) return;

    const move = (e: MouseEvent) => {
      rafRef.current = requestAnimationFrame(() => {
        dotX.set(e.clientX);
        dotY.set(e.clientY);
      });
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovering(!!el.closest("a, button, [data-cursor]"));
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [dotX, dotY, visible]);

  if (isTouch) return null;

  return (
    <>
      {/* Ring */}
      <motion.div
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 44 : 28,
          height: hovering ? 44 : 28,
          opacity: visible ? 1 : 0,
          borderColor: hovering ? "#caff00" : "rgba(255,255,255,0.35)",
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[99999]"
      />
      {/* Dot */}
      <motion.div
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 6 : 5,
          height: hovering ? 6 : 5,
          opacity: visible ? 1 : 0,
          backgroundColor: hovering ? "#caff00" : "#ffffff",
        }}
        transition={{ duration: 0.1 }}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999]"
      />
    </>
  );
}

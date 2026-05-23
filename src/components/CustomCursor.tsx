"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  const sx = useSpring(mx, { stiffness: 500, damping: 40 });
  const sy = useSpring(my, { stiffness: 500, damping: 40 });

  const trailX = useSpring(mx, { stiffness: 120, damping: 30 });
  const trailY = useSpring(my, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isInteractive = el.closest("a, button, [data-cursor]");
      setHovering(!!isInteractive);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [mx, my, visible]);

  return (
    <>
      {/* Trail ring */}
      <motion.div
        style={{ x: trailX, y: trailY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 52 : clicking ? 18 : 36,
          height: hovering ? 52 : clicking ? 18 : 36,
          opacity: visible ? 1 : 0,
          borderColor: hovering ? "#caff00" : "rgba(255,255,255,0.4)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[99999] mix-blend-difference"
      />
      {/* Dot */}
      <motion.div
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 8 : clicking ? 12 : 6,
          height: hovering ? 8 : clicking ? 12 : 6,
          opacity: visible ? 1 : 0,
          backgroundColor: hovering ? "#caff00" : "#ffffff",
        }}
        transition={{ type: "spring", stiffness: 700, damping: 35 }}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999]"
      />
    </>
  );
}

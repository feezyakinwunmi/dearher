"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ThemeTokens } from "@/lib/types";

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function Confetti({ theme, count = 90 }: { theme: ThemeTokens; count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: rand(0, 100),
        delay: rand(0, 0.6),
        duration: rand(2.2, 3.6),
        size: rand(6, 12),
        rotate: rand(0, 360),
        color: [theme.a, theme.b, theme.c, "#ffffff"][i % 4],
        round: i % 2 === 0,
      })),
    [count, theme]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: "-5%",
            width: p.size,
            height: p.size * 1.6,
            background: p.color,
            borderRadius: p.round ? "50%" : "2px",
          }}
          initial={{ y: 0, rotate: 0, opacity: 1 }}
          animate={{ y: "105vh", rotate: p.rotate + 540, opacity: 0.9 }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}

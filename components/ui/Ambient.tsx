"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { ThemeTokens } from "@/lib/types";

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function Ambient({ theme, dense = false }: { theme: ThemeTokens; dense?: boolean }) {
  const items = useMemo(
    () =>
      Array.from({ length: dense ? 22 : 12 }).map((_, i) => ({
        id: i,
        left: rand(0, 100),
        delay: rand(0, 10),
        duration: rand(14, 24),
        size: rand(10, 22),
        drift: rand(-40, 40),
        kind: i % 3 === 0 ? "heart" : i % 3 === 1 ? "petal" : "spark",
      })),
    [dense]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((it) => (
        <motion.div
          key={it.id}
          className="absolute"
          style={{ left: `${it.left}%`, top: "100%" }}
          initial={{ y: 0, opacity: 0, rotate: 0 }}
          animate={{ y: "-110vh", x: it.drift, opacity: [0, 1, 1, 0], rotate: 180 }}
          transition={{ duration: it.duration, delay: it.delay, repeat: Infinity, ease: "linear" }}
        >
          {it.kind === "heart" && <Heart size={it.size} fill={theme.a} color={theme.a} style={{ opacity: 0.35 }} />}
          {it.kind === "spark" && <Sparkles size={it.size} color={theme.c} style={{ opacity: 0.4 }} />}
          {it.kind === "petal" && (
            <div
              style={{
                width: it.size,
                height: it.size * 0.7,
                borderRadius: "70% 30% 70% 30%",
                background: `linear-gradient(135deg, ${theme.b}, ${theme.a})`,
                opacity: 0.35,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

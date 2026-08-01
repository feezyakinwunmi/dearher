"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Link } from "lucide-react";
import { SurpriseData, ThemeTokens } from "@/lib/types";
import Ambient from "@/components/ui/Ambient";
import Confetti from "@/components/ui/Confetti";

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function FallingPetals({ theme }: { theme: ThemeTokens }) {
  const petals = useMemo(
    () =>
      Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        left: rand(0, 100),
        delay: rand(0, 1.2),
        duration: rand(3, 5),
        size: rand(10, 20),
      })),
    []
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: "-5%",
            width: p.size,
            height: p.size * 0.7,
            borderRadius: "70% 30% 70% 30%",
            background: `linear-gradient(135deg, ${theme.b}, ${theme.a})`,
          }}
          initial={{ y: 0, rotate: 0, opacity: 0.9 }}
          animate={{ y: "105vh", rotate: 200, x: [0, 20, -20, 0] }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}

function Fireflies({ theme }: { theme: ThemeTokens }) {
  const flies = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        left: rand(0, 100),
        top: rand(0, 100),
        delay: rand(0, 3),
        duration: rand(3, 6),
      })),
    []
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      {flies.map((f) => (
        <motion.div
          key={f.id}
          className="absolute rounded-full"
          style={{ left: `${f.left}%`, top: `${f.top}%`, width: 4, height: 4, background: theme.c, boxShadow: `0 0 10px 3px ${theme.c}` }}
          animate={{ opacity: [0, 1, 0], y: [0, -20, 0], x: [0, 12, -8, 0] }}
          transition={{ duration: f.duration, delay: f.delay, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

export default function FinalScreen({ data, theme, id }: { data: SurpriseData; theme: ThemeTokens; id: string }) {
  const [burst, setBurst] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setBurst(false), 3800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      <Ambient theme={theme} dense />
      {burst && data.ending === "confetti" && <Confetti theme={theme} />}
      {burst && data.ending === "petals" && <FallingPetals theme={theme} />}
      {data.ending === "fireflies" && <Fireflies theme={theme} />}
      <Heart size={40} fill={theme.a} color={theme.a} className="dh-heartbeat" />
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-8 max-w-lg font-display text-2xl sm:text-4xl font-medium leading-tight text-[#F4E7D3]"
      >
        Thank you for making every day brighter.
        <br />
        <span style={{ color: theme.a, fontStyle: "italic" }}>Happy Girlfriend&apos;s Day.</span>
      </motion.h2>
      <Link
    href={`/response/${id}`}
    className="rounded-full px-6 py-3 bg-pink-600 text-white"
>
    Leave a reply ❤️
</Link>
      <p className="mt-10 text-xs uppercase tracking-[0.3em] text-[#8B8186]">Created with love, by {data.yourName}</p>
    </div>
  );
}

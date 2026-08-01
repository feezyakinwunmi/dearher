"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { SurpriseData, ThemeTokens } from "@/lib/types";
import GlassCard from "@/components/ui/GlassCard";
import { PrimaryButton } from "@/components/ui/Buttons";

const REASONS = [
  "The way you laugh at your own jokes before you finish telling them.",
  "You remember the small things I mention once, in passing.",
  "You make hard days feel survivable, just by being around.",
  "Your particular kind of stubborn, which I will never admit I love.",
  "You're the first person I want to tell anything to.",
  "You make ordinary Tuesdays feel worth showing up for.",
];

export default function ReasonsScreen({
  theme,
  onNext,
}: {
  data: SurpriseData;
  theme: ThemeTokens;
  onNext: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative">
      <h2 className="mb-10 font-display text-2xl font-medium text-center text-[#F4E7D3]">Reasons I love you</h2>
      <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
        {REASONS.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <GlassCard theme={theme} className="p-5 h-full">
              <Heart size={14} color={theme.a} className="mb-2" />
              <p className="text-sm leading-relaxed text-[#F0E4D8]">{r}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
      <PrimaryButton theme={theme} onClick={onNext} className="mt-10">
        Continue <ArrowRight size={15} />
      </PrimaryButton>
    </div>
  );
}

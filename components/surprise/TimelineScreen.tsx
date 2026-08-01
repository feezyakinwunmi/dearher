"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SurpriseData, ThemeTokens } from "@/lib/types";
import { PrimaryButton } from "@/components/ui/Buttons";

export default function TimelineScreen({
  data,
  theme,
  onNext,
}: {
  data: SurpriseData;
  theme: ThemeTokens;
  onNext: () => void;
}) {
  const events = [
    { title: "The day we met", desc: "It started small — it always does." },
    { title: "A favorite memory", desc: data.memory || "Every inside joke that only we understand." },
    { title: "Right now", desc: `${data.herName}, still here, still choosing this.` },
    { title: "What's next", desc: "Everything we haven't gotten to yet." },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative">
      <h2 className="mb-12 font-display text-2xl font-medium text-[#F4E7D3]">Our story so far</h2>
      <div className="relative max-w-md w-full">
        <div className="absolute left-[7px] top-2 bottom-2 w-px" style={{ background: `linear-gradient(${theme.a}, ${theme.b})` }} />
        {events.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="relative pl-8 pb-10 last:pb-0"
          >
            <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full" style={{ background: theme.a, boxShadow: `0 0 12px ${theme.a}` }} />
            <div className="text-xs uppercase tracking-widest mb-1" style={{ color: theme.a }}>{e.title}</div>
            <div className="text-sm text-[#F0E4D8]">{e.desc}</div>
          </motion.div>
        ))}
      </div>
      <PrimaryButton theme={theme} onClick={onNext} className="mt-6">
        Continue <ArrowRight size={15} />
      </PrimaryButton>
    </div>
  );
}

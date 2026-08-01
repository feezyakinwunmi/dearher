"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { SurpriseData, ThemeTokens } from "@/lib/types";
import GlassCard from "@/components/ui/GlassCard";
import { PrimaryButton } from "@/components/ui/Buttons";

const FONT_STACKS: Record<string, string> = {
  Fraunces: '"Fraunces", Georgia, serif',
  Manrope: '"Manrope", sans-serif',
};

export default function LetterScreen({
  data,
  theme,
  onNext,
}: {
  data: SurpriseData;
  theme: ThemeTokens;
  onNext: () => void;
}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const idxRef = useRef(0);

  useEffect(() => {
    const text = data.letter;
    const id = setInterval(() => {
      idxRef.current += 1;
      setDisplayed(text.slice(0, idxRef.current));
      if (idxRef.current >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, 22);
    return () => clearInterval(id);
  }, [data.letter]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 relative">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-xl">
        <GlassCard theme={theme} className="p-8 sm:p-12">
          <Mail size={20} color={theme.a} className="mb-6" />
          <p
            className="whitespace-pre-line text-[15px] sm:text-base leading-loose text-[#F4E7D3]"
            style={{ fontFamily: FONT_STACKS[data.font] }}
          >
            {displayed}
            {!done && <span className="dh-caret">|</span>}
          </p>
          {done && (
            <div className="mt-8 flex justify-end">
              <PrimaryButton theme={theme} onClick={onNext}>
                Keep going <ArrowRight size={15} />
              </PrimaryButton>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}

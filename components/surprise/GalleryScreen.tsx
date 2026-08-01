"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Image as ImageIcon } from "lucide-react";
import { SurpriseData, ThemeTokens } from "@/lib/types";
import GlassCard from "@/components/ui/GlassCard";
import { PrimaryButton } from "@/components/ui/Buttons";

export default function GalleryScreen({
  data,
  theme,
  onNext,
}: {
  data: SurpriseData;
  theme: ThemeTokens;
  onNext: () => void;
}) {
  const [i, setI] = useState(0);
  const photos = data.photos.length ? data.photos : null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative">
      <h2 className="mb-8 font-display text-2xl font-medium text-[#F4E7D3]">A few of my favorites</h2>
      <GlassCard theme={theme} className="relative w-full max-w-md aspect-[4/5] overflow-hidden flex items-center justify-center">
        {photos ? (
          <AnimatePresence mode="wait">
            <motion.img
              key={i}
              src={photos[i]}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover"
              alt=""
            />
          </AnimatePresence>
        ) : (
          <div className="text-center px-8 text-[#8B8186]">
            <ImageIcon size={30} className="mx-auto mb-3" />
            <p className="text-sm">No photos added — this is where your gallery would shine.</p>
          </div>
        )}
      </GlassCard>
      {photos && photos.length > 1 && (
        <div className="mt-4 flex gap-2">
          {photos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className="w-2 h-2 rounded-full"
              style={{ background: idx === i ? theme.a : "rgba(255,255,255,0.25)" }}
            />
          ))}
        </div>
      )}
      <PrimaryButton theme={theme} onClick={onNext} className="mt-10">
        Continue <ArrowRight size={15} />
      </PrimaryButton>
    </div>
  );
}

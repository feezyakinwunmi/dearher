"use client";

import { useState } from "react";
import { ArrowRight, Film, UtensilsCrossed, Waves, Coffee, MapPin, Sparkles } from "lucide-react";
import { ThemeTokens } from "@/lib/types";
import { PrimaryButton, GhostButton } from "@/components/ui/Buttons";

const DATE_OPTIONS = [
  { id: "movie", label: "Movie Night", icon: Film },
  { id: "dinner", label: "Dinner", icon: UtensilsCrossed },
  { id: "beach", label: "Beach", icon: Waves },
  { id: "coffee", label: "Coffee", icon: Coffee },
  { id: "picnic", label: "Picnic", icon: MapPin },
  { id: "custom", label: "Custom Date", icon: Sparkles },
];

export default function DateQuestion({ theme, onNext }: { theme: ThemeTokens; onNext: () => void }) {
  const [showDates, setShowDates] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);

  if (showDates) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative">
        <h2 className="mb-10 font-display text-2xl font-medium text-[#F4E7D3]">Pick a date</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg">
          {DATE_OPTIONS.map((d) => (
            <button
              key={d.id}
              onClick={() => setPicked(d.id)}
              className="flex flex-col items-center gap-2 rounded-xl border p-5"
              style={{ borderColor: picked === d.id ? theme.a : "rgba(255,255,255,0.14)", background: picked === d.id ? `${theme.a}14` : "transparent" }}
            >
              <d.icon size={20} color={theme.a} />
              <span className="text-xs text-[#F0E4D8]">{d.label}</span>
            </button>
          ))}
        </div>
        <PrimaryButton theme={theme} onClick={onNext} className="mt-10" disabled={!picked}>
          Lock it in <ArrowRight size={15} />
        </PrimaryButton>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative">
      <h2 className="max-w-md font-display text-2xl sm:text-3xl font-medium text-[#F4E7D3]">Can I take you on a date?</h2>
      <div className="mt-10 flex gap-4">
        <PrimaryButton theme={theme} onClick={() => setShowDates(true)}>YES</PrimaryButton>
        <GhostButton theme={theme} onClick={onNext}>Maybe later</GhostButton>
      </div>
    </div>
  );
}

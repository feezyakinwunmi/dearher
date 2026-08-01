"use client";

import { useState } from "react";
import { Heart, ArrowRight } from "lucide-react";
import { SurpriseData, ThemeTokens } from "@/lib/types";
import { PrimaryButton } from "@/components/ui/Buttons";

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function ProposalQuestion({
  data,
  theme,
  onYes,
}: {
  data: SurpriseData;
  theme: ThemeTokens;
  onYes: () => void;
}) {
  const [noClicks, setNoClicks] = useState(0);
  const [noPos, setNoPos] = useState<{ top: string; left: string; scale: number } | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);

  const handleNo = () => {
    const next = noClicks + 1;
    setNoClicks(next);
    if (next === 1) setMessage("Are you sure? ❤️");
    else if (next === 2) setMessage("I'll give you another chance 😂");
    else if (next >= 3 && next < 7) {
      setMessage(null);
      setNoPos({
        top: `${rand(15, 70)}%`,
        left: `${rand(10, 80)}%`,
        scale: Math.max(0.35, 1 - (next - 2) * 0.14),
      });
    } else {
      // A truly repeated "no" is respected — move forward gently, no trickery.
      setAccepted(true);
    }
  };

  if (accepted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative">
        <p className="max-w-sm font-display text-lg text-[#F4E7D3]">
          Okay — noted, and no hard feelings. Whatever you choose, I&apos;m glad you opened this.
        </p>
        <PrimaryButton theme={theme} onClick={onYes} className="mt-8">
          Continue anyway <ArrowRight size={15} />
        </PrimaryButton>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      <h2 className="max-w-md font-display text-2xl sm:text-3xl font-medium text-[#F4E7D3]">
        Will you continue being my girlfriend, {data.herName}?
      </h2>
      {message && <p className="mt-4 text-sm" style={{ color: theme.a }}>{message}</p>}
      <div className="relative mt-10 w-full max-w-xs h-16">
        <PrimaryButton theme={theme} onClick={onYes} className="absolute left-1/2 -translate-x-[110%]">
          YES <Heart size={15} />
        </PrimaryButton>
        <button
          onClick={handleNo}
          className="absolute rounded-full px-6 py-3.5 text-sm font-semibold border transition-all duration-300 text-[#F4E7D3]"
          style={
            noPos
              ? { position: "fixed", top: noPos.top, left: noPos.left, transform: `scale(${noPos.scale})`, borderColor: "rgba(255,255,255,0.2)" }
              : { left: "50%", transform: "translateX(10%)", borderColor: "rgba(255,255,255,0.2)" }
          }
        >
          NO 🥺
        </button>
      </div>
    </div>
  );
}

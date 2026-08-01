"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { Heart } from "lucide-react";
import { ThemeTokens, MusicName } from "@/lib/types";
import { playChime } from "@/lib/audio";
import Ambient from "@/components/ui/Ambient";

export default function Envelope({
  theme,
  music,
  onOpen,
}: {
  theme: ThemeTokens;
  music: MusicName;
  onOpen: () => void;
}) {
  const [opening, setOpening] = useState(false);
  const flapRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (opening) return;
    setOpening(true);
    playChime(music);

    const tl = gsap.timeline({ onComplete: () => setTimeout(onOpen, 250) });
    tl.to(bodyRef.current, { x: -6, duration: 0.08, yoyo: true, repeat: 3, ease: "power1.inOut" })
      .to(sealRef.current, { opacity: 0, scale: 0.6, duration: 0.3 }, "-=0.1")
      .to(flapRef.current, { rotateX: 180, duration: 1, ease: "back.inOut(1.4)" }, "-=0.1")
      .to(bodyRef.current, { y: -10, opacity: 0.0, duration: 0.5, ease: "power2.in" }, "-=0.2");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-6">
      <Ambient theme={theme} />
      <p className="mb-8 text-xs uppercase tracking-[0.3em]" style={{ color: theme.a }}>
        A letter, sealed for you
      </p>
      <button onClick={handleClick} className="relative" style={{ perspective: 800 }}>
        <div
          ref={bodyRef}
          className="relative w-64 h-44 sm:w-80 sm:h-52 rounded-lg"
          style={{ background: `linear-gradient(155deg, ${theme.b}, ${theme.a})`, boxShadow: `0 25px 60px -15px ${theme.a}80` }}
        >
          <div
            ref={flapRef}
            className="absolute inset-x-0 top-0 origin-top"
            style={{
              height: "55%",
              background: `linear-gradient(160deg, ${theme.a}, ${theme.b})`,
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transformStyle: "preserve-3d",
            }}
          />
          <div
            ref={sealRef}
            className="absolute rounded-full flex items-center justify-center"
            style={{
              width: 46,
              height: 46,
              left: "50%",
              top: "48%",
              transform: "translate(-50%,-50%)",
              background: `linear-gradient(135deg, ${theme.c}, ${theme.a})`,
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            <Heart size={18} color={theme.ink} fill={theme.ink} />
          </div>
        </div>
      </button>
      <p className="mt-10 text-sm animate-pulse" style={{ color: "#C9BFC2" }}>Tap the envelope to open</p>
    </div>
  );
}

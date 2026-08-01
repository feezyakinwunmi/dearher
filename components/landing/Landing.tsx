"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, ArrowRight, Play, ChevronDown, Mail,
  Feather, LayoutTemplate, Palette, Wand2,
} from "lucide-react";
import { ThemeTokens } from "@/lib/types";
import { TEMPLATES } from "@/lib/templates";
import Ambient from "@/components/ui/Ambient";
import GlassCard from "@/components/ui/GlassCard";
import { PrimaryButton, GhostButton } from "@/components/ui/Buttons";

const FAQS = [
  { q: "Does this need an account?", a: "No sign-up. The wizard runs entirely in your browser." },
  { q: "Will she need to install anything?", a: "No — she just opens the link and the page plays itself." },
  { q: "Can I edit the letter after generating it?", a: "Yes, every generated or template letter is fully editable before you finish." },
  { q: "Is my page private?", a: "The page is encoded into the link itself rather than stored on a server — anyone with the link can open it, but it isn't listed or searchable anywhere." },
];

const FEATURES = [
  { icon: Feather, title: "Write, or let us", desc: "Pen your own letter, or answer five prompts and we'll write it for you." },
  { icon: LayoutTemplate, title: "Eight templates", desc: "From playful to devoted — every template is a real, finished letter you can reshape." },
  { icon: Palette, title: "Made to match her", desc: "Five color moods, two typefaces, an ending animation, up to five photos." },
  { icon: Wand2, title: "A page that performs", desc: "Envelope, letter, gallery, timeline, and a question worth asking — staged like a short film." },
];

export default function Landing({
  theme,
  onCreate,
  onDemo,
}: {
  theme: ThemeTokens;
  onCreate: () => void;
  onDemo: () => void;
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="relative">
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <Ambient theme={theme} dense />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(60% 50% at 50% 0%, ${theme.a}22, transparent 60%), radial-gradient(50% 40% at 80% 100%, ${theme.b}1a, transparent 60%)`,
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs tracking-[0.2em] uppercase"
          style={{ borderColor: "rgba(255,255,255,0.15)", color: theme.c }}
        >
          <Sparkles size={13} /> Girlfriend&apos;s Day, done properly
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-4xl font-display text-[2.6rem] leading-[1.08] sm:text-6xl sm:leading-[1.05] font-medium"
        >
          Create the most unforgettable{" "}
          <span style={{ color: theme.a, fontStyle: "italic" }}>Girlfriend&apos;s Day</span> surprise.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 max-w-xl text-base sm:text-lg text-[#C9BFC2]"
        >
          Build a beautiful, personalized love page in under two minutes.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <PrimaryButton theme={theme} onClick={onCreate}>
            Create Mine <ArrowRight size={16} />
          </PrimaryButton>
          <GhostButton theme={theme} onClick={onDemo}>
            <Play size={15} /> See Demo
          </GhostButton>
        </motion.div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="absolute bottom-8"
          style={{ color: theme.a, opacity: 0.6 }}
        >
          <ChevronDown size={22} />
        </motion.div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 py-28">
        <h2 className="text-center font-display text-3xl sm:text-4xl font-medium mb-3">
          Everything a love letter deserves
        </h2>
        <p className="text-center mb-16 text-[#9C9096]">Four small tools. One unforgettable page.</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <GlassCard theme={theme} className="p-6 h-full">
                <f.icon size={22} color={theme.a} />
                <h3 className="mt-4 font-semibold text-[#F4E7D3]">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#A79DA1]">{f.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center font-display text-3xl sm:text-4xl font-medium mb-12">
          Eight moods to start from
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
          {TEMPLATES.map((t) => (
            <GlassCard key={t.id} theme={theme} className="min-w-[220px] snap-start p-5 shrink-0">
              <span className="text-xs uppercase tracking-widest" style={{ color: theme.a }}>{t.tag}</span>
              <h3 className="mt-2 font-display font-semibold text-[#F4E7D3]">{t.name}</h3>
              <p className="mt-3 text-xs leading-relaxed line-clamp-4 text-[#96898D]">
                {t.letter("her", "you")}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-5xl px-6 py-20 text-center">
        <GlassCard theme={theme} className="p-12">
          <Mail size={34} color={theme.a} className="mx-auto" />
          <h2 className="mt-6 font-display text-2xl sm:text-3xl font-medium">
            She opens a sealed envelope. The rest unfolds itself.
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-sm text-[#A79DA1]">
            A letter that types itself out, a gallery of your photos, a timeline of your memories,
            and one question, asked properly.
          </p>
          <div className="mt-8 flex justify-center">
            <PrimaryButton theme={theme} onClick={onDemo}>
              <Play size={15} /> Watch the demo
            </PrimaryButton>
          </div>
        </GlassCard>
      </section>

      <section className="relative mx-auto max-w-3xl px-6 py-20 pb-32">
        <h2 className="text-center font-display text-3xl font-medium mb-10">Questions, answered</h2>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div key={i} className="rounded-xl border overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-sm font-medium text-[#F4E7D3]">{f.q}</span>
                <ChevronDown
                  size={16}
                  style={{ color: theme.a, transform: open === i ? "rotate(180deg)" : "none", transition: "transform .25s" }}
                />
              </button>
              {open === i && <div className="px-5 pb-4 text-sm text-[#A79DA1]">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, ArrowRight, Feather, Wand2, LayoutTemplate, Palette,
  Type as TypeIcon, Music, Image as ImageIcon, Sparkles, Camera, X,
  Heart, Check, Copy,
} from "lucide-react";
import { THEMES, THEME_NAMES } from "@/lib/themes";
import { TEMPLATES } from "@/lib/templates";
import { CreationMethod, EndingName, FontName, MusicName, SurpriseData, ThemeName } from "@/lib/types";
import Ambient from "@/components/ui/Ambient";
import GlassCard from "@/components/ui/GlassCard";
import { PrimaryButton } from "@/components/ui/Buttons";
import { uploadImage } from "@/lib/cloudinary";


const FONTS: Record<FontName, string> = {
  Fraunces: '"Fraunces", Georgia, serif',
  Manrope: '"Manrope", sans-serif',
};

const STEP_LABELS = ["Method", "Content", "Customize", "Review", "Share"];

export default function Wizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState<CreationMethod | null>(null);
  const [templateId, setTemplateId] = useState(TEMPLATES[0].id);
  const [themeName, setThemeName] = useState<ThemeName>("Rose Gold");
  const [font, setFont] = useState<FontName>("Fraunces");
  const [photos, setPhotos] = useState<string[]>([]);
  const [ending, setEnding] = useState<EndingName>("confetti");
  const [music, setMusic] = useState<MusicName>("soft-chimes");
  const [copied, setCopied] = useState(false);
const [shareUrl, setShareUrl] = useState("");
const [creating, setCreating] = useState(false);
const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    herName: "",
    yourName: "",
    duration: "",
    memory: "",
    words: "",
    dream: "",
    letter: "",
  });

  const theme = THEMES[themeName];
  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const generatedLetter = () => {
    const words = form.words || "radiant, steady, unstoppable";
    return `${form.herName || "My love"},

${form.duration ? `For ${form.duration}, you've` : "You've"} made ordinary days feel like something worth keeping. I still think about ${form.memory || "the little moment that first made me sure about you"} — it's one of my favorites.

You are ${words}, and somehow you make it look effortless. I want ${form.dream || "a future we build slowly, together"}, with you, on purpose, every time.

Happy Girlfriend's Day.
— ${form.yourName || "Me"}`;
  };

  const finalLetter = () => {
    if (method === "own") return form.letter;
    if (method === "template") {
      const t = TEMPLATES.find((t) => t.id === templateId)!;
      return t.letter(form.herName || "You", form.yourName || "Me");
    }
    return generatedLetter();
  };

 const handlePhotoUpload = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const files = Array.from(e.target.files || []).slice(0, 5 - photos.length);

  if (!files.length) return;

  setUploading(true);

  try {
    const uploadedUrls = await Promise.all(
      files.map((file) => uploadImage(file))
    );

    setPhotos((prev) => [...prev, ...uploadedUrls]);
  } catch (err) {
    console.error(err);
    alert("Failed to upload one or more images.");
  } finally {
    setUploading(false);
  }
};

  const canAdvance = () => {
    if (step === 0) return !!method;
    if (step === 1) {
      if (method === "own") return form.letter.trim().length > 0;
      if (method === "template") return !!templateId;
      if (method === "generate") return !!(form.herName && form.yourName);
    }
    return true;
  };

  const surpriseData = (): SurpriseData => ({
    herName: form.herName || "You",
    yourName: form.yourName || "Me",
    letter: finalLetter(),
    memory: form.memory,
    photos,
    theme: themeName,
    font,
    ending,
    music,
  });



async function createShareLink() {
  try {
    setCreating(true);

    const res = await fetch("/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(surpriseData()),
    });

    if (!res.ok) {
      throw new Error("Couldn't save surprise");
    }

    const result = await res.json();

    const url = `${window.location.origin}/view/${result.id}`;

    setShareUrl(url);

    return url;
  } catch (err) {
    console.error(err);
    alert("Something went wrong creating the share link.");
    return "";
  } finally {
    setCreating(false);
  }
}






  return (
    <div className="relative min-h-screen px-6 py-16">
      <Ambient theme={theme} />
      <div className="relative mx-auto max-w-2xl">
        <button onClick={() => router.push("/")} className="mb-8 inline-flex items-center gap-1 text-xs text-[#A79DA1]">
          <ArrowLeft size={13} /> Back home
        </button>

        <div className="mb-10 flex items-center gap-2">
          {STEP_LABELS.map((s, i) => (
            <div key={i} className="flex-1">
              <div
                className="h-1 rounded-full transition-all duration-500"
                style={{ background: i <= step ? `linear-gradient(90deg, ${theme.a}, ${theme.b})` : "rgba(255,255,255,0.1)" }}
              />
              <div className="mt-2 text-[10px] uppercase tracking-wider" style={{ color: i === step ? theme.a : "#6B6266" }}>
                {s}
              </div>
            </div>
          ))}
        </div>

        <GlassCard theme={theme} className="p-8">
          {step === 0 && (
            <div className="space-y-3">
              <h2 className="font-display text-2xl font-medium mb-6 text-[#F4E7D3]">How do you want to start?</h2>
              {[
                { id: "own" as const, icon: Feather, title: "Write my own letter", desc: "Full control, blank page." },
                { id: "generate" as const, icon: Wand2, title: "Generate for me", desc: "Answer five prompts, we write it." },
                { id: "template" as const, icon: LayoutTemplate, title: "Use a ready-made template", desc: "Eight finished letters to edit." },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setMethod(opt.id)}
                  className="w-full flex items-center gap-4 rounded-xl border p-4 text-left transition-all"
                  style={{
                    borderColor: method === opt.id ? theme.a : "rgba(255,255,255,0.12)",
                    background: method === opt.id ? `${theme.a}14` : "transparent",
                  }}
                >
                  <opt.icon size={20} color={theme.a} />
                  <div>
                    <div className="font-medium text-sm text-[#F4E7D3]">{opt.title}</div>
                    <div className="text-xs text-[#9C9096]">{opt.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 1 && method === "own" && (
            <div>
              <h2 className="font-display text-2xl font-medium mb-6 text-[#F4E7D3]">Write your letter</h2>
              <input placeholder="Her name" className="dh-input mb-3" value={form.herName} onChange={(e) => update("herName", e.target.value)} />
              <input placeholder="Your name" className="dh-input mb-3" value={form.yourName} onChange={(e) => update("yourName", e.target.value)} />
              <textarea placeholder="Dear..." rows={8} className="dh-input" value={form.letter} onChange={(e) => update("letter", e.target.value)} />
            </div>
          )}

          {step === 1 && method === "generate" && (
            <div>
              <h2 className="font-display text-2xl font-medium mb-6 text-[#F4E7D3]">Tell us about her</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <input placeholder="Girlfriend's name" className="dh-input" value={form.herName} onChange={(e) => update("herName", e.target.value)} />
                <input placeholder="Your name" className="dh-input" value={form.yourName} onChange={(e) => update("yourName", e.target.value)} />
              </div>
              <input placeholder="Relationship duration (e.g. 2 years)" className="dh-input mt-3" value={form.duration} onChange={(e) => update("duration", e.target.value)} />
              <textarea placeholder="A favorite memory together" rows={3} className="dh-input mt-3" value={form.memory} onChange={(e) => update("memory", e.target.value)} />
              <input placeholder="Three words that describe her" className="dh-input mt-3" value={form.words} onChange={(e) => update("words", e.target.value)} />
              <input placeholder="A future dream together" className="dh-input mt-3" value={form.dream} onChange={(e) => update("dream", e.target.value)} />
            </div>
          )}

          {step === 1 && method === "template" && (
            <div>
              <h2 className="font-display text-2xl font-medium mb-6 text-[#F4E7D3]">Pick a template</h2>
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                <input placeholder="Her name" className="dh-input" value={form.herName} onChange={(e) => update("herName", e.target.value)} />
                <input placeholder="Your name" className="dh-input" value={form.yourName} onChange={(e) => update("yourName", e.target.value)} />
              </div>
              <div className="grid sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTemplateId(t.id)}
                    className="text-left rounded-xl border p-4"
                    style={{
                      borderColor: templateId === t.id ? theme.a : "rgba(255,255,255,0.12)",
                      background: templateId === t.id ? `${theme.a}14` : "transparent",
                    }}
                  >
                    <span className="text-[10px] uppercase tracking-widest" style={{ color: theme.a }}>{t.tag}</span>
                    <div className="font-medium text-sm mt-1 text-[#F4E7D3]">{t.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-display text-2xl font-medium mb-6 text-[#F4E7D3]">Customize</h2>

              <div className="mb-6">
                <label className="dh-label"><Palette size={13} /> Theme</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {THEME_NAMES.map((name) => (
                    <button
                      key={name}
                      onClick={() => setThemeName(name)}
                      className="rounded-full px-4 py-2 text-xs font-medium border"
                      style={{
                        borderColor: theme.a,
                        background: name === themeName ? `linear-gradient(135deg, ${THEMES[name].a}, ${THEMES[name].b})` : "transparent",
                        color: name === themeName ? THEMES[name].ink : "#F4E7D3",
                      }}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="dh-label"><TypeIcon size={13} /> Font</label>
                <div className="flex gap-2 mt-2">
                  {(Object.keys(FONTS) as FontName[]).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFont(f)}
                      className="rounded-full px-4 py-2 text-xs border"
                      style={{ fontFamily: FONTS[f], borderColor: font === f ? theme.a : "rgba(255,255,255,0.15)", color: font === f ? theme.a : "#F4E7D3" }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="dh-label"><Music size={13} /> Music mood</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {([
                    { id: "soft-chimes", label: "Soft chimes" },
                    { id: "warm-piano", label: "Warm piano" },
                    { id: "none", label: "No music" },
                  ] as { id: MusicName; label: string }[]).map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMusic(m.id)}
                      className="rounded-full px-4 py-2 text-xs border"
                      style={{ borderColor: music === m.id ? theme.a : "rgba(255,255,255,0.15)", color: music === m.id ? theme.a : "#F4E7D3" }}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-[#7A7075]">
                  Plays as a short generated chime — swap in a real audio file later if you want an actual song.
                </p>
              </div>

              <div className="mb-6">
                <label className="dh-label"><ImageIcon size={13} /> Photos (up to 5)</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {photos.map((p, i) => (
                    <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p} className="w-full h-full object-cover" alt="" />
                      <button
                        onClick={() => setPhotos((ps) => ps.filter((_, idx) => idx !== i))}
                        className="absolute top-0.5 right-0.5 bg-black/60 rounded-full p-0.5"
                      >
                        <X size={10} color="#fff" />
                      </button>
                    </div>
                  ))}
                  {photos.length < 5 && (
                    <label className="w-16 h-16 rounded-lg border border-dashed flex items-center justify-center cursor-pointer" style={{ borderColor: "rgba(255,255,255,0.25)" }}>
                      <Camera size={16} color={theme.a} />
<input
  type="file"
  accept="image/*"
  multiple
  disabled={uploading}
  className="hidden"
  onChange={handlePhotoUpload}
/>                    </label>
                  )}
                </div>
                {uploading && <p className="mt-2 text-[11px] text-[#7A7075]">Uploading images...</p>}
                {photos.length > 0 && (
                  <p className="mt-2 text-[11px] text-[#7A7075]">
                    Photos are securely uploaded and won`&apos;`t make your share link longer.
                  </p>
                )}
              </div>

              <div>
                <label className="dh-label"><Sparkles size={13} /> Ending animation</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {([
                    { id: "confetti", label: "Confetti" },
                    { id: "petals", label: "Falling petals" },
                    { id: "fireflies", label: "Fireflies" },
                  ] as { id: EndingName; label: string }[]).map((e) => (
                    <button
                      key={e.id}
                      onClick={() => setEnding(e.id)}
                      className="rounded-full px-4 py-2 text-xs border"
                      style={{ borderColor: ending === e.id ? theme.a : "rgba(255,255,255,0.15)", color: ending === e.id ? theme.a : "#F4E7D3" }}
                    >
                      {e.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-display text-2xl font-medium mb-6 text-[#F4E7D3]">One last look</h2>
              <div
                className="rounded-xl p-5 border whitespace-pre-line text-sm leading-relaxed text-[#F4E7D3]"
                style={{ borderColor: "rgba(255,255,255,0.12)", fontFamily: FONTS[font] }}
              >
                {finalLetter()}
              </div>
              <p className="mt-4 text-xs text-[#9C9096]">
                {photos.length} photo{photos.length === 1 ? "" : "s"} added · {themeName} theme · Ending: {ending}
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="text-center">
              <Heart size={28} color={theme.a} fill={theme.a} className="mx-auto mb-4" />
              <h2 className="font-display text-2xl font-medium mb-2 text-[#F4E7D3]">Your page is ready</h2>
              <p className="text-sm text-[#A79DA1] mb-6">Send her this link — it opens straight into the envelope.</p>
              <div className="flex items-center gap-2 rounded-xl border p-2 pl-4" style={{ borderColor: "rgba(255,255,255,0.14)" }}>
                <span className="flex-1 truncate text-left text-xs text-[#C9BFC2]">
                  {creating ? "Generating..." : shareUrl || "Click Generate Link"}
                </span>
                <button
                  onClick={async () => {
                    let url = shareUrl;

                    if (!url) {
                      url = await createShareLink();
                    }

                    if (!url) return;

                    await navigator.clipboard.writeText(url);

                    setCopied(true);

                    setTimeout(() => setCopied(false), 1800);
                  }}
                  disabled={creating}
                  className="shrink-0 rounded-lg px-3 py-2 text-xs font-medium flex items-center gap-1.5"
                  style={{ background: `linear-gradient(135deg, ${theme.a}, ${theme.b})`, color: theme.ink }}
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
             <div className="mt-6 flex justify-center gap-3 flex-wrap">

  <button
    onClick={async () => {
      let url = shareUrl;

      if (!url) {
        url = await createShareLink();
      }

      if (!url) return;

      window.open(url, "_blank");
    }}
    className="text-sm px-5 py-2.5 rounded-full border"
    style={{
      borderColor: "rgba(255,255,255,0.18)",
      color: "#F4E7D3",
    }}
  >
    Preview
  </button>

  <button
    onClick={async () => {
      let url = shareUrl;

      if (!url) {
        url = await createShareLink();
      }

      if (!url) return;

      const id = url.split("/").pop();

      router.push(`/dashboard/${id}`);
    }}
    className="text-sm px-5 py-2.5 rounded-full"
    style={{
      background: `linear-gradient(135deg, ${theme.a}, ${theme.b})`,
      color: theme.ink,
    }}
  >
    View Responses
  </button>

  <button
    onClick={() => router.push("/")}
    className="text-sm px-5 py-2.5 rounded-full border"
    style={{
      borderColor: "rgba(255,255,255,0.18)",
      color: "#F4E7D3",
    }}
  >
    Done
  </button>

</div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="text-sm px-4 py-2"
              style={{ color: step === 0 || step === 4 ? "transparent" : "#A79DA1", pointerEvents: step === 0 || step === 4 ? "none" : "auto" }}
            >
              ← Back
            </button>
            {step < 4 && (
              <PrimaryButton 
                theme={theme} 
disabled={!canAdvance() || creating || uploading}                onClick={async () => {
                  if (!canAdvance()) return;

                  if (step === 3) {
                    await createShareLink();
                  }

                  setStep((s) => s + 1);
                }}
              >
                {step === 3 ? "Generate Share Link" : "Continue"} <ArrowRight size={15} />
              </PrimaryButton>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
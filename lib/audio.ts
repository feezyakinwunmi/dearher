import { MusicName } from "./types";

const CHORDS: Record<Exclude<MusicName, "none">, number[]> = {
  "soft-chimes": [523.25, 659.25, 783.99],
  "warm-piano": [392.0, 493.88, 587.33],
};

export function playChime(music: MusicName) {
  if (music === "none") return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioCtx();
    const notes = CHORDS[music];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = music === "warm-piano" ? "triangle" : "sine";
      osc.frequency.value = freq;
      gain.gain.value = 0;
      osc.connect(gain);
      gain.connect(ctx.destination);
      const start = ctx.currentTime + i * 0.18;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.06, start + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 1.2);
      osc.start(start);
      osc.stop(start + 1.3);
    });
  } catch {
    // Web Audio unsupported — fail silently, the visual still plays.
  }
}

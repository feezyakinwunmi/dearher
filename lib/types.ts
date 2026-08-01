export type ThemeName = "Rose Gold" | "Pink" | "Purple" | "Midnight" | "Sunset";
export type FontName = "Fraunces" | "Manrope";
export type EndingName = "confetti" | "petals" | "fireflies";
export type MusicName = "soft-chimes" | "warm-piano" | "none";
export type CreationMethod = "own" | "generate" | "template";

export interface ThemeTokens {
  a: string;
  b: string;
  c: string;
  ink: string;
  panel: string;
}

export interface SurpriseData {
  herName: string;
  yourName: string;
  letter: string;
  memory?: string;
  photos: string[];
  theme: ThemeName;
  font: FontName;
  ending: EndingName;
  music: MusicName;
}


export interface ResponseData {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}
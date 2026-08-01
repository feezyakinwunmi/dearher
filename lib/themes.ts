import { ThemeName, ThemeTokens } from "./types";

/**
 * Design tokens. Ground: near-black aubergine (#170F1C), not the
 * common cream/terracotta AI default. Rose Gold is the flagship
 * theme; the other four shift the accent pair while keeping the
 * same dark, glassy ground so the app never looks templated.
 */
export const THEMES: Record<ThemeName, ThemeTokens> = {
  "Rose Gold": { a: "#D9A57C", b: "#E79AA2", c: "#F3CB86", ink: "#170F1C", panel: "#2E1B37" },
  Pink: { a: "#E98CA0", b: "#F2B6C4", c: "#F6D3DE", ink: "#1B0F16", panel: "#33202B" },
  Purple: { a: "#9C7BD9", b: "#C9A7E8", c: "#6F5AC4", ink: "#120E1E", panel: "#241A3A" },
  Midnight: { a: "#7C93D9", b: "#3F4E8C", c: "#C9D4F2", ink: "#0A0E1C", panel: "#161B30" },
  Sunset: { a: "#E9835E", b: "#F2A86B", c: "#F6CE73", ink: "#1C0F0C", panel: "#331C15" },
};

export const THEME_NAMES = Object.keys(THEMES) as ThemeName[];

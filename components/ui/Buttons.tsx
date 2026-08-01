"use client";

import { ThemeTokens } from "@/lib/types";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  theme: ThemeTokens;
}

export function PrimaryButton({ children, theme, className = "", style = {}, ...rest }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-sm tracking-wide disabled:opacity-40 disabled:pointer-events-none ${className}`}
      style={{
        background: `linear-gradient(135deg, ${theme.a}, ${theme.b})`,
        color: theme.ink,
        boxShadow: `0 10px 30px -8px ${theme.a}80`,
        ...style,
      }}
      {...(rest as any)}
    >
      {children}
    </motion.button>
  );
}

export function GhostButton({ children, theme, className = "", ...rest }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium border transition-all duration-300 hover:bg-white/5 ${className}`}
      style={{ borderColor: "rgba(255,255,255,0.18)", color: "#F4E7D3" }}
      {...rest}
    >
      {children}
    </button>
  );
}

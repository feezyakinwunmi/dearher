import { ThemeTokens } from "@/lib/types";
import { ReactNode, CSSProperties } from "react";

export default function GlassCard({
  children,
  theme,
  className = "",
  style = {},
}: {
  children: ReactNode;
  theme: ThemeTokens;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`rounded-2xl border ${className}`}
      style={{
        background: "rgba(255,255,255,0.05)",
        borderColor: "rgba(255,255,255,0.10)",
        backdropFilter: "blur(18px)",
        boxShadow: `0 8px 40px -12px ${theme.a}33`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

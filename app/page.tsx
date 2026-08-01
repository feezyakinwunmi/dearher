"use client";

import { useRouter } from "next/navigation";
import Landing from "@/components/landing/Landing";
import { THEMES } from "@/lib/themes";
import { DEMO_DATA } from "@/lib/demo";
import { encodeShareData } from "@/lib/encode";

export default function HomePage() {
  const router = useRouter();
  const theme = THEMES["Rose Gold"];

  const onDemo = () => {
    router.push(`/view?d=${encodeShareData(DEMO_DATA)}`);
  };

  return (
    <main style={{ background: theme.ink }} className="min-h-screen">
      <Landing theme={theme} onCreate={() => router.push("/create")} onDemo={onDemo} />
    </main>
  );
}

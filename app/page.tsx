"use client";

import { useRouter } from "next/navigation";
import Landing from "@/components/landing/Landing";
import { THEMES } from "@/lib/themes";
import { DEMO_DATA } from "@/lib/demo";

export default function HomePage() {
  const router = useRouter();
  const theme = THEMES["Rose Gold"];

  const onDemo = async () => {
    try {
      const res = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(DEMO_DATA),
      });

      if (!res.ok) throw new Error("Couldn't create demo link");

      const { id } = await res.json();

      router.push(`/view/${id}`);
    } catch (err) {
      console.error(err);
      alert("Something went wrong loading the demo.");
    }
  };

  return (
    <main style={{ background: theme.ink }} className="min-h-screen">
      <Landing theme={theme} onCreate={() => router.push("/create")} onDemo={onDemo} />
    </main>
  );
}

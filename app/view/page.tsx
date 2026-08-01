"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { decodeShareData } from "@/lib/encode";
import SurpriseExperience from "@/components/surprise/SurpriseExperience";

function ViewInner() {
  const params = useSearchParams();
  const encoded = params.get("d");
  const data = encoded ? decodeShareData(encoded) : null;

  if (!data) {
    return (
      <main className="min-h-screen bg-[#170F1C] flex flex-col items-center justify-center px-6 text-center text-[#F4E7D3]">
        <h1 className="font-display text-2xl mb-3">This link isn&apos;t quite right</h1>
        <p className="text-sm text-[#A79DA1] max-w-sm mb-6">
          The page data in this link couldn&apos;t be read — it may have been cut off when it was shared.
        </p>
        <Link href="/" className="text-sm underline text-[#D9A57C]">Back to DearHer</Link>
      </main>
    );
  }

  return (
    <main>
      <SurpriseExperience data={data} />
    </main>
  );
}

export default function ViewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#170F1C]" />}>
      <ViewInner />
    </Suspense>
  );
}

import { list } from "@vercel/blob";
import { notFound } from "next/navigation";
import SurpriseExperience from "@/components/surprise/SurpriseExperience";
import { SurpriseData } from "@/lib/types";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ViewPage({ params }: Props) {
  const { id } = await params;

  const { blobs } = await list({
    prefix: `surprises/${id}.json`,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  const blob = blobs.find(
    (b) => b.pathname === `surprises/${id}.json`
  );

  if (!blob) {
    console.log("Blob not found:", id);
    notFound();
  }

  const res = await fetch(blob.downloadUrl, {
    headers: {
      Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Blob fetch failed:", res.status);
    notFound();
  }

  const data: SurpriseData = await res.json();

  return (
    <main>
      <SurpriseExperience
        data={data}
        id={id}
      />
    </main>
  );
}
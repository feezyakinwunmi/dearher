"use client";

import { useState } from "react";
import { THEMES } from "@/lib/themes";
import { SurpriseData } from "@/lib/types";
import Envelope from "./Envelope";
import LetterScreen from "./LetterScreen";
import GalleryScreen from "./GalleryScreen";
import ReasonsScreen from "./ReasonsScreen";
import TimelineScreen from "./TimelineScreen";
import ProposalQuestion from "./ProposalQuestion";
import DateQuestion from "./DateQuestion";
import FinalScreen from "./FinalScreen";

const STAGE_COUNT = 8;

export default function SurpriseExperience({ data, id }: { data: SurpriseData; id: string; }) {
  const [stage, setStage] = useState(0);
  const theme = THEMES[data.theme];
  const next = () => setStage((s) => Math.min(STAGE_COUNT - 1, s + 1));

  return (
    <div style={{ background: theme.ink }} className="min-h-screen">
      {stage === 0 && <Envelope theme={theme} music={data.music} onOpen={next} />}
      {stage === 1 && <LetterScreen data={data} theme={theme} onNext={next} />}
      {stage === 2 && <GalleryScreen data={data} theme={theme} onNext={next} />}
      {stage === 3 && <ReasonsScreen data={data} theme={theme} onNext={next} />}
      {stage === 4 && <TimelineScreen data={data} theme={theme} onNext={next} />}
      {stage === 5 && <ProposalQuestion data={data} theme={theme} onYes={next} />}
      {stage === 6 && <DateQuestion theme={theme} onNext={next} />}
      {stage === 7 && <FinalScreen
    data={data}
    theme={theme}
    id={id}
/>}
    </div>
  );
}

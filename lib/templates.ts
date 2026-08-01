export interface LetterTemplate {
  id: string;
  name: string;
  tag: string;
  letter: (herName: string, yourName: string) => string;
}

export const TEMPLATES: LetterTemplate[] = [
  {
    id: "sweet",
    name: "Sweet Romance",
    tag: "Soft & tender",
    letter: (n1, n2) =>
      `${n1}, some people spend their whole lives waiting for a feeling like this. I found it the day I found you. Every ordinary Tuesday became something worth remembering, simply because you were in it. Thank you for being the softest, warmest place I know.\n\n— ${n2}`,
  },
  {
    id: "funny",
    name: "Funny Couple",
    tag: "Playful & light",
    letter: (n1, n2) =>
      `${n1}, I've dated my job, my group chat, and occasionally my bed for way too long — none of them text back like you do. You put up with my terrible jokes, my worse singing, and you still chose to stay. That's either true love or a really long con, and either way, I'm in.\n\n— ${n2}`,
  },
  {
    id: "futurewife",
    name: "Future Wife",
    tag: "Deep & devoted",
    letter: (n1, n2) =>
      `${n1}, I don't say this lightly: I can see it. Slow mornings, a home that sounds like both our laughs, growing older next to the same person on purpose. I'm not in a rush, but I am certain — of you, of us, of the life I want to keep building.\n\n— ${n2}`,
  },
  {
    id: "soulmate",
    name: "Soulmate",
    tag: "Fated & quiet",
    letter: (n1, n2) =>
      `${n1}, there's a version of this where we never meet, and I feel sorry for that version of me. Being known the way you know me — the good parts, the difficult ones, all of it — has made me a softer, braver person. You didn't complete me. You just felt like home.\n\n— ${n2}`,
  },
  {
    id: "longdistance",
    name: "Long Distance",
    tag: "Miles apart, close anyway",
    letter: (n1, n2) =>
      `${n1}, the time zones never agree and the miles are not kind, but somehow you still feel closer than people I see every day. Every "good morning" that's actually your goodnight is a small act of choosing each other, over and over. I'd cross all of it, again and again, for you.\n\n— ${n2}`,
  },
  {
    id: "bestfriend",
    name: "Best Friend",
    tag: "Warm & easy",
    letter: (n1, n2) =>
      `${n1}, before anything else, you're my favorite person to talk to about absolutely nothing. The easiest laugh, the safest secrets, the person I call first with good news and bad. Falling for my best friend was supposed to be complicated. With you, it was the easiest thing I've ever done.\n\n— ${n2}`,
  },
  {
    id: "classic",
    name: "Classic Love Letter",
    tag: "Timeless & formal",
    letter: (n1, n2) =>
      `My dearest ${n1},\n\nI write this letter the old way, because some feelings deserve more than a message that disappears in a scroll. You have my whole and undivided admiration — today, and on every day after this one.\n\nYours, completely and always,\n${n2}`,
  },
  {
    id: "minimal",
    name: "Minimal",
    tag: "Few words, all true",
    letter: (n1, n2) => `${n1} — you are the best part of my everyday. Happy Girlfriend's Day.\n\n— ${n2}`,
  },
];

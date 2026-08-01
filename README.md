# DearHer

A personalized Girlfriend's Day surprise page builder. Next.js 15 (App Router),
TypeScript, Tailwind CSS, Framer Motion, GSAP, Lucide icons. No backend, no
database — everything runs client-side.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To build for production:

```bash
npm run build
npm run start
```

## How it's structured

- `app/page.tsx` — landing page
- `app/create/page.tsx` — the creation wizard
- `app/view/page.tsx` — the recipient's experience, reading page data from the `?d=` URL param
- `components/landing`, `components/wizard`, `components/surprise` — the three main flows
- `components/ui` — shared primitives (buttons, glass panels, ambient/confetti effects)
- `lib/` — themes, letter templates, types, the share-link encoder, and the chime sound

## The "shareable link," honestly

There's no database, so a link can't point at data stored on a server — instead,
the whole page (letter text, theme, chosen photos) is JSON-encoded and packed into
the `?d=` query parameter itself (`lib/encode.ts`). Opening the link decodes it
back into the same page, on any device, with nothing to host.

The trade-off: photos are stored as base64 data URLs, so a page with several
photos produces a long link. The wizard's last step estimates the link length and
warns if it's getting long enough that some messaging apps might truncate it.

**For a production version:** upload photos to real storage (S3, Cloudinary,
Vercel Blob, etc.) and put the resulting image URLs into `photos` instead of data
URLs. The link then stays short regardless of photo count, and you'd probably also
want a real backend/database at that point so links can be short IDs rather than
carrying the full payload.

## Known simplifications from the original brief

- **Music** is a short generated chime (Web Audio), not real audio tracks —
  licensed songs would need actual audio files and a way to host them.
- **shadcn/ui** isn't wired in as a CLI-scaffolded component library; buttons and
  cards are small custom components in `components/ui` built directly with
  Tailwind, to the same visual standard.
- Photos and other inputs live in React state for the session (or in the URL for
  a shared link) — there is intentionally no `localStorage`/database persistence.

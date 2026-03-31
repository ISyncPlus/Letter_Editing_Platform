# Letter Editing Platform

Rich letterhead editor with TinyMCE content, live A4 preview, PDF export via @react-pdf/renderer, inline images, and draft management with toasts.

## Features
- Compose letters with rich text (TinyMCE) and embedded images (inlined for PDF export).
- A4 preview and matching downloadable PDF using @react-pdf/renderer and react-pdf-html.
- Configurable letterhead, stamp, and signature assets (neutral placeholders served from `public`).
- Drafts saved to local storage with delete confirmation and react-toastify notifications.
- Tailwind-powered layout; Lucide/react-icons for UI controls.

## Prerequisites
- Node.js 18+ and npm.

## Installation
```bash
npm install
```

## Running the app (dev)
```bash
npm run dev
```
Then open the printed URL (default `http://localhost:5173`).

## Build for production
```bash
npm run build
```

## Preview production build
```bash
npm run preview
```

## Lint
```bash
npm run lint
```

## Usage
1. Open the editor and set your letterhead, stamp, and signature images (defaults: `/letterhead-placeholder.svg`, `/stamp-placeholder.svg`, `/signature-placeholder.svg` in `public`).
2. Write or paste letter content in the editor (TinyMCE supports images, formatting, lists, and headings).
3. Watch the A4 preview update live.
4. Download as PDF; images are inlined and the PDF mirrors the preview layout.
5. Save drafts to local storage; delete with confirmation (success/failure toasts via react-toastify).

## Asset notes
- Place your custom `letterhead-placeholder.svg`, `stamp-placeholder.svg`, and `signature-placeholder.svg` under `public/` to override defaults (rename if you prefer different filenames, but keep the references aligned in code).
- Ensure transparent PNGs or SVGs for best results on the letterhead.

## Troubleshooting
- If the dev server fails to start, clear `.vite` cache: remove `node_modules/.vite` and rerun `npm run dev`.
- PDF layout issues (overflow or assets missing): confirm images exist under `public/` and reduce overly large content or images inside the editor.

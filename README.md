# Tapasya Pateriya · Portfolio

Personal site: React interfaces and the Java services behind them.

Built with Vite, React 18, Tailwind CSS 3, Framer Motion, Phosphor icons and Geist. Contact form uses EmailJS.

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into build/
npm run lint
```

## Editing content

All copy lives in [`src/data/content.js`](src/data/content.js), taken from the resume in
[`public/Tapasya_Pateriya_Resume.pdf`](public/Tapasya_Pateriya_Resume.pdf). When the resume changes, update both.

## Deploy

Vercel picks up `vercel.json` (framework `vite`, output `build/`, SPA rewrite so `/work/:slug` routes load directly).

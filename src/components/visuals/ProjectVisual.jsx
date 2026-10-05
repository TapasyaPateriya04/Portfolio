import { memo, useEffect, useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { LockSimpleIcon, PencilSimpleIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react";
import { useSpotlight } from "../../hooks/useSpotlight.js";

// Code-built illustrations. They show the shape of each system, not real data.

function useTicker(ms, length, active) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!active) return undefined;
    const id = setInterval(() => setI((n) => (n + 1) % length), ms);
    return () => clearInterval(id);
  }, [ms, length, active]);
  return i;
}

const ROLES = ["super admin", "support admin", "finance admin", "client admin", "account admin", "account user"];

const PrismVisual = memo(function PrismVisual() {
  const reduce = useReducedMotion();
  const active = useTicker(1400, ROLES.length, !reduce);
  const bars = [38, 52, 44, 61, 57, 72, 66, 80, 76, 88];
  return (
    <div className="grid min-h-[17rem] grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-3 p-4 sm:gap-4 sm:p-6">
      <div className="surface flex flex-col p-3">
        <p className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
          <LockSimpleIcon size={11} weight="bold" aria-hidden="true" /> RBAC
        </p>
        <ul className="relative space-y-1">
          {ROLES.map((r, i) => (
            <li key={r} className="relative rounded-md px-2 py-1 font-mono text-[10px] sm:text-[11px]">
              {active === i && (
                <motion.span
                  layoutId="prism-role"
                  className="absolute inset-0 rounded-md bg-accent/15 ring-1 ring-accent/40"
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                />
              )}
              <span className={`relative ${active === i ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-500"}`}>{r}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex min-w-0 flex-col gap-3">
        <div className="surface p-3">
          <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">Clients onboarded</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">49+</p>
        </div>
        <div className="surface flex flex-1 flex-col p-3">
          <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">Wallet activity</p>
          <div className="mt-2 flex flex-1 items-end gap-1">
            {bars.map((h, i) => (
              <motion.span
                key={i}
                className="flex-1 origin-bottom rounded-sm bg-zinc-300 dark:bg-zinc-700"
                style={{ height: `${h}%` }}
                animate={reduce ? undefined : { scaleY: [1, 0.82, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
              >
                {i === bars.length - 1 && <span className="block h-full w-full rounded-sm bg-accent" />}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

const WEIGHTS = [
  { key: "ats", label: "ATS", w: 0.35, cls: "bg-accent" },
  { key: "exp", label: "Exp", w: 0.3, cls: "bg-accent/60" },
  { key: "sem", label: "Semantic", w: 0.25, cls: "bg-accent/35" },
  { key: "fresh", label: "Fresh", w: 0.1, cls: "bg-zinc-400 dark:bg-zinc-600" },
];

// Component scores per job across three refreshes; rows are ranked by the weighted total.
const JOBS = [
  { id: "a", title: "Backend Engineer", src: "Greenhouse", s: [[0.9, 0.8, 0.85, 0.9], [0.9, 0.8, 0.85, 0.3], [0.9, 0.8, 0.85, 0.6]] },
  { id: "b", title: "Java Developer", src: "Lever", s: [[0.82, 0.9, 0.7, 0.6], [0.82, 0.9, 0.7, 1], [0.82, 0.9, 0.7, 0.5]] },
  { id: "c", title: "Full-stack Engineer", src: "RemoteOK", s: [[0.7, 0.6, 0.8, 1], [0.7, 0.6, 0.8, 0.9], [0.95, 0.7, 0.9, 1]] },
  { id: "d", title: "React Developer", src: "Arbeitnow", s: [[0.55, 0.7, 0.6, 0.8], [0.55, 0.7, 0.6, 0.8], [0.55, 0.7, 0.6, 0.8]] },
];
const total = (s) => s.reduce((sum, v, i) => sum + v * WEIGHTS[i].w, 0);

const JobHuntVisual = memo(function JobHuntVisual() {
  const reduce = useReducedMotion();
  const frame = useTicker(2600, 3, !reduce);
  const ranked = JOBS.map((j) => ({ ...j, scores: j.s[frame], total: total(j.s[frame]) })).sort((a, b) => b.total - a.total);
  return (
    <div className="flex flex-col justify-center p-4 sm:p-6">
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
        {WEIGHTS.map((w) => (
          <span key={w.key} className="inline-flex items-center gap-1 font-mono text-[10px] text-zinc-500">
            <span className={`h-2 w-2 rounded-sm ${w.cls}`} />
            {w.label} {w.w.toFixed(2)}
          </span>
        ))}
      </div>
      <LayoutGroup>
        <ol className="space-y-2">
          {ranked.map((j, rank) => {
            return (
              <motion.li
                layout
                key={j.id}
                transition={{ type: "spring", stiffness: 200, damping: 26 }}
                className="surface flex items-center gap-3 px-3 py-2"
              >
                <span className="w-4 font-mono text-[11px] text-zinc-400">{rank + 1}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate text-xs font-medium text-zinc-800 dark:text-zinc-200">{j.title}</p>
                    <span className="font-mono text-[10px] text-zinc-500">{j.src}</span>
                  </div>
                  <div className="mt-1.5 flex h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                    {j.scores.map((v, i) => (
                      <span key={i} className={WEIGHTS[i].cls} style={{ width: `${v * WEIGHTS[i].w * 100}%` }} />
                    ))}
                  </div>
                </div>
                <span className="w-9 text-right font-mono text-[11px] text-zinc-700 dark:text-zinc-300">{j.total.toFixed(2)}</span>
              </motion.li>
            );
          })}
        </ol>
      </LayoutGroup>
    </div>
  );
});

const PEOPLE = [
  { n: "Meher Kulkarni", r: "Engineering" },
  { n: "Ishaan Bedi", r: "Finance" },
  { n: "Rhea Thakkar", r: "People Ops" },
  { n: "Kabir Malhotra", r: "Design" },
];
const OPS = [
  { Icon: PlusIcon, label: "POST" },
  { Icon: PencilSimpleIcon, label: "PUT" },
  { Icon: TrashIcon, label: "DELETE" },
];

const EmsVisual = memo(function EmsVisual() {
  const reduce = useReducedMotion();
  const row = useTicker(1300, PEOPLE.length, !reduce);
  const op = OPS[row % OPS.length];
  return (
    <div className="flex flex-col justify-center p-4 sm:p-6">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">/employees</span>
        <motion.span
          key={op.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 font-mono text-[10px] text-accent"
        >
          <op.Icon size={10} weight="bold" aria-hidden="true" /> {op.label}
        </motion.span>
      </div>
      <div className="surface overflow-hidden">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] border-b border-zinc-200 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:border-zinc-800">
          <span>Name</span>
          <span>Dept</span>
        </div>
        <ul>
          {PEOPLE.map((p, i) => (
            <li
              key={p.n}
              className={`grid grid-cols-[minmax(0,1fr)_auto] items-center px-3 py-2 text-xs transition-colors duration-300 ${
                i === row ? "bg-accent/10" : ""
              }`}
            >
              <span className="truncate text-zinc-800 dark:text-zinc-200">{p.n}</span>
              <span className="font-mono text-[10px] text-zinc-500">{p.r}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-3 truncate font-mono text-[10px] text-zinc-500">
        Authorization: Bearer <span className="text-zinc-400 dark:text-zinc-600">eyJhbGciOi…</span>
      </p>
    </div>
  );
});

const visuals = {
  prism: { V: PrismVisual, url: "prism · client portal" },
  jobhunt: { V: JobHuntVisual, url: "localhost:8501" },
  ems: { V: EmsVisual, url: "ems-roan-eta.vercel.app" },
};

// A browser window around each illustration, so the projects read as products.
export default function ProjectVisual({ kind, className = "", interactive = true }) {
  const { V, url } = visuals[kind] || {};
  const onPointerMove = useSpotlight();
  return (
    <div
      aria-hidden="true"
      onPointerMove={interactive ? onPointerMove : undefined}
      className={`${interactive ? "spotlight" : ""} group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-zinc-100/70 shadow-[0_24px_48px_-28px_rgb(9_9_11/0.35)] dark:border-zinc-800 dark:bg-zinc-900/60 dark:shadow-[0_24px_48px_-28px_rgb(0_0_0/0.8)] ${className}`}
    >
      <div className="relative flex items-center gap-3 border-b border-zinc-200 bg-white/60 px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-950/40">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        </span>
        <span className="mx-auto flex max-w-[60%] items-center gap-1.5 truncate rounded-md bg-zinc-100 px-3 py-1 font-mono text-[10px] text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
          <LockSimpleIcon size={10} className="shrink-0" />
          <span className="truncate">{url}</span>
        </span>
        <span className="w-[42px]" />
      </div>
      <div className="relative grid flex-1 place-items-center">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative w-full max-w-2xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]">
          {V && <V />}
        </div>
      </div>
    </div>
  );
}

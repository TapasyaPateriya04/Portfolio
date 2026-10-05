import { memo, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { CheckCircleIcon, CircleNotchIcon, ClockIcon } from "@phosphor-icons/react";

// Illustrative only: a Spring endpoint and the React screen that calls it.
const CODE = [
  [["@RestController", "ann"]],
  [["@RequestMapping", "ann"], ["(", "p"], ['"/api/batches"', "str"], [")", "p"]],
  [["class ", "kw"], ["BatchController", "type"], [" {", "p"]],
  [],
  [["  @PreAuthorize", "ann"], ["(", "p"], ["\"hasRole('CLIENT_ADMIN')\"", "str"], [")", "p"]],
  [["  @PostMapping", "ann"]],
  [["  ResponseEntity", "type"], ["<", "p"], ["Batch", "type"], ["> ", "p"], ["submit", "fn"], ["(", "p"]],
  [["      @Valid @RequestBody ", "ann"], ["BatchRequest", "type"], [" req) {", "p"]],
  [["    return ", "kw"], ["ResponseEntity", "type"], [".", "p"], ["accepted", "fn"], ["()", "p"]],
  [["        .", "p"], ["body", "fn"], ["(batches.", "p"], ["enqueue", "fn"], ["(req));", "p"]],
  [["  }", "p"]],
  [["}", "p"]],
];

const TOTAL = CODE.reduce((n, line) => n + line.reduce((m, [t]) => m + t.length, 0) + 1, 0);

// Split the code into what is visible after `count` typed characters.
function visibleLines(count) {
  let left = count;
  let caretPlaced = false;
  return CODE.map((line) => {
    const parts = [];
    for (const [text, kind] of line) {
      if (left <= 0) break;
      const shown = text.slice(0, left);
      left -= shown.length;
      parts.push([shown, kind]);
    }
    const lineDone = left > 0;
    if (lineDone) left -= 1;
    const caret = !caretPlaced && !lineDone;
    if (caret) caretPlaced = true;
    return { parts, caret };
  });
}

const tone = {
  ann: "text-amber-700 dark:text-amber-300/90",
  kw: "text-accent",
  str: "text-sky-700 dark:text-sky-300/90",
  type: "text-zinc-900 dark:text-zinc-100",
  fn: "text-rose-700 dark:text-rose-300/90",
  p: "text-zinc-500 dark:text-zinc-400",
};

const TypedCode = memo(function TypedCode({ animate }) {
  // start part-way through so the editor is never empty on first paint
  const [count, setCount] = useState(animate ? Math.round(TOTAL * 0.45) : TOTAL);

  useEffect(() => {
    if (!animate) return undefined;
    let n = Math.round(TOTAL * 0.45);
    let timer;
    const tick = () => {
      n += 2;
      setCount(Math.min(n, TOTAL));
      if (n < TOTAL) timer = setTimeout(tick, 28);
      else
        timer = setTimeout(() => {
          n = Math.round(TOTAL * 0.45);
          tick();
        }, 5200);
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [animate]);

  return (
    <pre className="overflow-hidden font-mono text-[11px] leading-[1.7] sm:text-[12.5px]">
      <code>
        {visibleLines(count).map(({ parts, caret }, li) => (
          <div key={li} className="flex min-h-[1.7em] whitespace-pre">
            <span className="mr-4 inline-block w-4 select-none text-right text-zinc-400 dark:text-zinc-600">{li + 1}</span>
            <span>
              {parts.map(([text, kind], ti) => (
                <span key={ti} className={tone[kind]}>
                  {text}
                </span>
              ))}
              {caret && <span className="caret ml-px inline-block h-[1.1em] w-[2px] translate-y-[2px] bg-accent" />}
            </span>
          </div>
        ))}
      </code>
    </pre>
  );
});

const STATES = [
  { label: "queued", Icon: ClockIcon, cls: "text-zinc-500 dark:text-zinc-400" },
  { label: "processing", Icon: CircleNotchIcon, cls: "text-amber-600 dark:text-amber-300", spin: true },
  { label: "done", Icon: CheckCircleIcon, cls: "text-accent" },
];

const rows = [
  { name: "batch-0412", rows: "1,284 rows" },
  { name: "batch-0413", rows: "312 rows" },
  { name: "batch-0414", rows: "2,067 rows" },
];

const BatchPreview = memo(function BatchPreview({ animate }) {
  const [step, setStep] = useState(animate ? 0 : 6);

  useEffect(() => {
    if (!animate) return undefined;
    const id = setInterval(() => setStep((s) => (s + 1) % 8), 1100);
    return () => clearInterval(id);
  }, [animate]);

  return (
    <div className="space-y-1.5">
      {rows.map((r, i) => {
        // rows advance one after another; step 7 resets the board
        const st = STATES[step === 7 ? 0 : Math.max(0, Math.min(2, step - i * 2))];
        return (
          <div
            key={r.name}
            className="flex items-center justify-between rounded-lg border border-zinc-200/80 bg-zinc-50 px-2.5 py-2 dark:border-zinc-800 dark:bg-zinc-950/60"
          >
            <div className="min-w-0">
              <p className="truncate font-mono text-[11px] text-zinc-800 dark:text-zinc-200">{r.name}</p>
              <p className="font-mono text-[10px] text-zinc-500">{r.rows}</p>
            </div>
            <motion.span
              key={st.label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`inline-flex items-center gap-1 font-mono text-[10px] ${st.cls}`}
            >
              <st.Icon size={12} weight="bold" className={st.spin ? "animate-spin" : ""} />
              {st.label}
            </motion.span>
          </div>
        );
      })}
    </div>
  );
});

export default function HeroVisual() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 100, damping: 20 });
  const sy = useSpring(my, { stiffness: 100, damping: 20 });
  const backX = useTransform(sx, (v) => v * -10);
  const backY = useTransform(sy, (v) => v * -8);
  const frontX = useTransform(sx, (v) => v * 16);
  const frontY = useTransform(sy, (v) => v * 12);
  const rotY = useTransform(sx, (v) => v * 4);
  const rotX = useTransform(sy, (v) => v * -4);

  useEffect(() => {
    if (reduce) return undefined;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return undefined;
    const onMove = (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set(Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 1.2))));
      my.set(Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 1.2))));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  const animate = !reduce;

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[34rem] [perspective:1200px]" aria-hidden="true">
      <motion.div style={{ x: backX, y: backY, rotateX: rotX, rotateY: rotY }} className="surface overflow-hidden shadow-[0_30px_60px_-30px_rgb(9_9_11/0.35)]">
        <div className="flex items-center gap-2 border-b border-zinc-200 px-4 py-2.5 dark:border-zinc-800">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <span className="ml-3 rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-[11px] text-zinc-600 dark:bg-zinc-800/70 dark:text-zinc-300">
            BatchController.java
          </span>
          <span className="hidden font-mono text-[11px] text-zinc-400 sm:inline">BatchScreen.jsx</span>
        </div>
        <div className="px-4 pb-[10.5rem] pt-4 sm:pb-20">
          <TypedCode animate={animate} />
        </div>
      </motion.div>

      <motion.div
        style={{ x: frontX, y: frontY }}
        className="glass absolute -bottom-6 right-3 w-[min(15.5rem,72%)] rounded-2xl p-3 sm:-bottom-8 sm:-right-6"
      >
        <div className="mb-2.5 flex items-center justify-between">
          <p className="text-xs font-medium text-zinc-800 dark:text-zinc-100">Batch requests</p>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-500">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            live
          </span>
        </div>
        <BatchPreview animate={animate} />
      </motion.div>
    </div>
  );
}

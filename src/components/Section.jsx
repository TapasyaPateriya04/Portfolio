import Reveal from "./Reveal.jsx";

export default function Section({ id, index, eyebrow, title, intro, children, className = "" }) {
  return (
    <section
      id={id}
      tabIndex={-1}
      aria-labelledby={`${id}-title`}
      className={`page scroll-mt-24 py-20 outline-none sm:py-28 ${className}`}
    >
      <Reveal className="mb-12 grid gap-4 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-10">
        <p className="eyebrow pt-2">
          <span className="text-accent">{index}</span> / {eyebrow}
        </p>
        <div>
          <h2 id={`${id}-title`} className="text-3xl font-semibold tracking-tighter text-zinc-900 sm:text-4xl dark:text-zinc-50">
            {title}
          </h2>
          {intro && <p className="mt-4 max-w-[60ch] leading-relaxed text-zinc-600 dark:text-zinc-400">{intro}</p>}
        </div>
      </Reveal>
      {children}
    </section>
  );
}

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skillGroups } from "../data/content.js";
import { useSpotlight } from "../hooks/useSpotlight.js";
import Section from "./Section.jsx";
import Reveal from "./Reveal.jsx";
import SkillIcon from "./SkillIcon.jsx";

const tile = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 160, damping: 20 } },
};

function SkillTile({ skill }) {
  const onPointerMove = useSpotlight();
  return (
    <motion.li variants={tile} className="h-full">
      <div
        onPointerMove={onPointerMove}
        className="spotlight group flex h-full items-center gap-3.5 rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 dark:border-zinc-800/80 dark:bg-zinc-900/40"
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-700 transition-[color,transform] duration-300 group-hover:scale-105 group-hover:text-accent dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-300">
          <SkillIcon name={skill.icon} size={20} />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">{skill.name}</span>
          {skill.note && (
            <span className="mt-0.5 block text-xs leading-snug text-zinc-500 dark:text-zinc-400">
              {skill.note}
            </span>
          )}
        </span>
      </div>
    </motion.li>
  );
}

export default function Skills() {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const tabs = useRef([]);
  const group = skillGroups.find((g) => g.id === activeId);

  const onKeyDown = (e, i) => {
    const last = skillGroups.length - 1;
    const keys = {
      ArrowRight: i === last ? 0 : i + 1,
      ArrowDown: i === last ? 0 : i + 1,
      ArrowLeft: i === 0 ? last : i - 1,
      ArrowUp: i === 0 ? last : i - 1,
      Home: 0,
      End: last,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = keys[e.key];
    setActiveId(skillGroups[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <Section
      id="skills"
      index="02"
      eyebrow="Skills"
      title="Frontend first, with the backend to support it."
      intro="Grouped by where each one sits in a product. Everything here comes from my internship and project work."
    >
      <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-10">
        <div
          role="tablist"
          aria-label="Skill categories"
          className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 lg:flex-col lg:flex-nowrap lg:gap-0.5 lg:overflow-visible"
        >
          {skillGroups.map((g, i) => {
            const selected = g.id === activeId;
            return (
              <button
                key={g.id}
                ref={(el) => (tabs.current[i] = el)}
                id={`tab-${g.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`panel-${g.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(g.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`relative flex shrink-0 items-center justify-between gap-3 rounded-full px-4 py-2 text-left text-sm transition-colors lg:rounded-xl lg:py-2.5 ${
                  selected
                    ? "text-zinc-50 dark:text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-900/[0.04] hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.04] dark:hover:text-zinc-100"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="skill-tab"
                    className="absolute inset-0 -z-10 rounded-full bg-zinc-900 lg:rounded-xl dark:bg-zinc-100"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="font-medium">{g.label}</span>
                <span className={`font-mono text-[11px] tabular-nums ${selected ? "opacity-60" : "opacity-50"}`}>
                  {String(g.items.length).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>

        <div
          id={`panel-${group.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${group.id}`}
          className="min-h-[20rem] sm:min-h-[17rem]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={group.id}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
              variants={{ show: { transition: { staggerChildren: 0.04 } } }}
            >
              <motion.p variants={tile} className="mb-5 text-sm text-zinc-500 dark:text-zinc-400">
                {group.blurb}
              </motion.p>
              <ul className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 xl:grid-cols-3">
                {group.items.map((skill) => (
                  <SkillTile key={skill.name} skill={skill} />
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </Section>
  );
}

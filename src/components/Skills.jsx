import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skillGroups } from "../data/content.js";
import Section from "./Section.jsx";
import Reveal from "./Reveal.jsx";
import SkillIcon from "./SkillIcon.jsx";

export default function Skills() {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const tabs = useRef([]);
  const group = skillGroups.find((g) => g.id === activeId);

  const onKeyDown = (e, i) => {
    const last = skillGroups.length - 1;
    let next = null;
    if (e.key === "ArrowRight") next = i === last ? 0 : i + 1;
    if (e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActiveId(skillGroups[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <Section
      id="skills"
      index="02"
      eyebrow="Skills"
      title="The tools I reach for."
      intro="Everything here is something I have used in internship or project work and listed on my resume."
    >
      <Reveal>
        <div
          role="tablist"
          aria-label="Skill categories"
          className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
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
                className={`relative shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${
                  selected
                    ? "text-zinc-50 dark:text-zinc-900"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="skill-tab"
                    className="absolute inset-0 -z-10 rounded-full bg-zinc-900 dark:bg-zinc-100"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{g.label}</span>
                <span className={`relative ml-1.5 font-mono text-[11px] ${selected ? "opacity-60" : "opacity-50"}`}>
                  {g.items.length}
                </span>
              </button>
            );
          })}
        </div>

        <div
          id={`panel-${group.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${group.id}`}
          className="mt-6 min-h-[13rem]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={group.id}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              variants={{ show: { transition: { staggerChildren: 0.035 } } }}
            >
              {group.items.map((skill) => (
                <motion.li
                  key={skill.name}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 140, damping: 18 } },
                  }}
                  className="group relative"
                >
                  <div
                    tabIndex={skill.note ? 0 : undefined}
                    aria-describedby={skill.note ? `note-${skill.icon}` : undefined}
                    className="surface flex h-full items-center gap-3 px-4 py-4 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-zinc-300 dark:hover:border-zinc-700"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-zinc-100 text-zinc-700 transition-colors group-hover:text-accent dark:bg-zinc-800/70 dark:text-zinc-300">
                      <SkillIcon name={skill.icon} size={20} />
                    </span>
                    <span className="min-w-0 text-sm font-medium leading-tight text-zinc-800 dark:text-zinc-200">
                      {skill.name}
                    </span>
                  </div>
                  {skill.note && (
                    <span
                      id={`note-${skill.icon}`}
                      role="tooltip"
                      className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[14rem] -translate-x-1/2 translate-y-1 rounded-lg bg-zinc-900 px-2.5 py-1.5 text-center font-mono text-[11px] text-zinc-100 opacity-0 shadow-lg transition-[opacity,transform] duration-150 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-zinc-100 dark:text-zinc-900"
                    >
                      {skill.note}
                    </span>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </Reveal>
    </Section>
  );
}

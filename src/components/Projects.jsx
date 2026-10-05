import { Link } from "react-router-dom";
import { ArrowRightIcon, LockSimpleIcon } from "@phosphor-icons/react";
import { featured, moreProjects } from "../data/content.js";
import Section from "./Section.jsx";
import Reveal from "./Reveal.jsx";
import ExternalLink from "./ExternalLink.jsx";
import ProjectVisual from "./visuals/ProjectVisual.jsx";

function Featured({ project, flip }) {
  return (
    <article className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <Reveal className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <Link
          to={`/work/${project.slug}`}
          tabIndex={-1}
          aria-hidden="true"
          className="block rounded-[1.75rem] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1"
        >
          <ProjectVisual kind={project.visual} className="min-h-[20rem] sm:aspect-[16/11]" />
        </Link>
      </Reveal>
      <Reveal delay={0.06} className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <p className="eyebrow">{project.kicker}</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
          {project.title}
        </h3>
        <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">{project.blurb}</p>

        <dl className="mt-6 flex items-baseline gap-3 border-t border-zinc-200 pt-5 dark:border-zinc-800">
          <dt className="sr-only">{project.stat.label}</dt>
          <dd className="font-mono text-3xl font-medium tracking-tight text-accent">{project.stat.value}</dd>
          <dd className="text-sm text-zinc-500 dark:text-zinc-400" aria-hidden="true">
            {project.stat.label}
          </dd>
        </dl>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Stack">
          {project.stack.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link to={`/work/${project.slug}`} className="btn-primary group">
            Read case study
            <ArrowRightIcon size={15} weight="bold" className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          {project.links.map((l) => (
            <ExternalLink key={l.href} link={l} compact />
          ))}
          {project.privateNote && (
            <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
              <LockSimpleIcon size={13} aria-hidden="true" />
              {project.privateNote}
            </span>
          )}
        </div>
      </Reveal>
    </article>
  );
}

export default function Projects() {
  return (
    <Section
      id="work"
      index="04"
      eyebrow="Projects"
      title="Selected work."
      intro="Three projects I can talk about in depth. Each has a case study covering what I built and how."
    >
      <div className="space-y-24 sm:space-y-28">
        {featured.map((p, i) => (
          <Featured key={p.slug} project={p} flip={i % 2 === 1} />
        ))}
      </div>

      <div className="mt-28">
        <Reveal>
          <h3 className="eyebrow">More projects</h3>
        </Reveal>
        <ul className="mt-6 divide-y divide-zinc-200 border-y border-zinc-200 md:-mx-4 dark:divide-zinc-800 dark:border-zinc-800">
          {moreProjects.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              delay={i * 0.05}
              className="grid gap-3 py-7 transition-colors md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)_auto] md:gap-8 md:px-4 md:hover:bg-zinc-900/[0.025] dark:md:hover:bg-white/[0.025]"
            >
              <div>
                <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                  {p.title}
                  {p.note && <span className="ml-2 font-mono text-[11px] font-normal text-zinc-500">{p.note}</span>}
                </h4>
                <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-zinc-500">{p.stack.join(" · ")}</p>
              </div>
              <p className="max-w-[62ch] text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">{p.text}</p>
              <div className="flex gap-4 md:flex-col md:items-end md:gap-2">
                {p.links.map((l) => (
                  <ExternalLink key={l.href} link={l} compact />
                ))}
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}

import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon, LockSimpleIcon } from "@phosphor-icons/react";
import { featured } from "../data/content.js";
import ProjectVisual from "../components/visuals/ProjectVisual.jsx";
import ExternalLink from "../components/ExternalLink.jsx";
import Reveal from "../components/Reveal.jsx";
import NotFound from "./NotFound.jsx";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";

export default function CaseStudy() {
  const { slug } = useParams();
  const index = featured.findIndex((p) => p.slug === slug);
  const project = featured[index];
  useDocumentMeta(project ? `${project.title} case study` : undefined, project?.blurb);

  if (!project) return <NotFound />;
  const { caseStudy: cs } = project;
  const next = featured[(index + 1) % featured.length];

  return (
    <article className="page pb-24 pt-28 sm:pt-32">
      <Link
        to={{ pathname: "/", hash: "#work" }}
        className="group inline-flex items-center gap-1.5 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        <ArrowLeftIcon size={14} weight="bold" className="transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
        All projects
      </Link>

      <motion.header
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end"
      >
        <div className="lg:col-span-7">
          <p className="eyebrow">{project.kicker}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tighter text-zinc-900 sm:text-5xl dark:text-zinc-50">
            {project.title}
          </h1>
          <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">{cs.overview}</p>
        </div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-zinc-200 pt-6 text-sm lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 dark:border-zinc-800">
          <div className="col-span-2">
            <dt className="eyebrow">Role</dt>
            <dd className="mt-1.5 leading-relaxed text-zinc-700 dark:text-zinc-300">{cs.role}</dd>
          </div>
          {project.period && (
            <div>
              <dt className="eyebrow">When</dt>
              <dd className="mt-1.5 text-zinc-700 dark:text-zinc-300">{project.period}</dd>
            </div>
          )}
          <div>
            <dt className="eyebrow">{project.stat.label}</dt>
            <dd className="mt-1.5 font-mono text-xl text-accent">{project.stat.value}</dd>
          </div>
          <div className="col-span-2">
            <dt className="eyebrow">Stack</dt>
            <dd className="mt-2 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
        className="mt-12"
      >
        <ProjectVisual kind={project.visual} className="min-h-[18rem] sm:aspect-[21/10]" />
      </motion.div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {project.links.map((l) => (
          <ExternalLink key={l.href} link={l} />
        ))}
        {project.privateNote && (
          <span className="inline-flex items-center gap-1.5 text-sm text-zinc-500">
            <LockSimpleIcon size={14} aria-hidden="true" />
            {project.privateNote}
          </span>
        )}
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-12">
        <div className="space-y-12 lg:col-span-8">
          {cs.sections.map((s, i) => (
            <Reveal key={s.heading} as="section" className="grid gap-3 sm:grid-cols-[3rem_minmax(0,1fr)]">
              <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">{s.heading}</h2>
                <p className="mt-3 max-w-[65ch] leading-relaxed text-zinc-600 dark:text-zinc-400">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            {cs.metrics?.length > 0 && (
              <Reveal className="surface p-6">
                <h2 className="eyebrow">Numbers</h2>
                <dl className="mt-4 divide-y divide-zinc-200 dark:divide-zinc-800">
                  {cs.metrics.map((m) => (
                    <div key={m.label} className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="text-sm text-zinc-600 dark:text-zinc-400">{m.label}</dt>
                      <dd className="font-mono text-sm text-zinc-900 dark:text-zinc-100">
                        {m.from && <span className="text-zinc-400 dark:text-zinc-500">{m.from} → </span>}
                        <span className="text-accent">{m.to}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}
            {cs.outcomes?.length > 0 && (
              <Reveal className="surface p-6">
                <h2 className="eyebrow">Outcomes</h2>
                <ul className="mt-4 space-y-3">
                  {cs.outcomes.map((o) => (
                    <li key={o} className="flex gap-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                      <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {o}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </aside>
      </div>

      <nav aria-label="Next case study" className="mt-24 border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <Link to={`/work/${next.slug}`} className="group flex items-center justify-between gap-6">
          <span>
            <span className="eyebrow block">Next case study</span>
            <span className="mt-2 block text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
              {next.title}
            </span>
          </span>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-zinc-300 transition-[transform,border-color] group-hover:translate-x-1 group-hover:border-accent dark:border-zinc-700">
            <ArrowRightIcon size={18} weight="bold" aria-hidden="true" />
          </span>
        </Link>
      </nav>
    </article>
  );
}

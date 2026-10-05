import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, CaretDownIcon, MapPinIcon } from "@phosphor-icons/react";
import { experience } from "../data/content.js";
import Section from "./Section.jsx";
import Reveal from "./Reveal.jsx";

function Entry({ job, index, open, onToggle }) {
  const panelId = `exp-panel-${index}`;
  return (
    <li className="relative pl-8 sm:pl-12">
      <span className="absolute bottom-0 left-[7px] top-2 w-px bg-zinc-200 sm:left-[11px] dark:bg-zinc-800" aria-hidden="true" />
      <span
        className={`absolute left-0 top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full border sm:left-1 ${
          open ? "border-accent bg-accent/15" : "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950"
        }`}
        aria-hidden="true"
      >
        <span className={`h-[5px] w-[5px] rounded-full ${open ? "bg-accent" : "bg-zinc-400 dark:bg-zinc-600"}`} />
      </span>

      <div className="pb-12">
        <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_auto] md:items-baseline md:gap-6">
          <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {job.company}
            {job.companyNote && (
              <span className="ml-2 align-middle font-mono text-xs font-normal text-zinc-500">{job.companyNote}</span>
            )}
          </h3>
          <p className="font-mono text-xs text-zinc-500 md:text-right">{job.period}</p>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">
          <span className="font-medium text-zinc-700 dark:text-zinc-300">{job.role}</span>
          <span className="inline-flex items-center gap-1">
            <MapPinIcon size={14} aria-hidden="true" />
            {job.place}
          </span>
        </div>
        <p className="mt-4 max-w-[65ch] leading-relaxed text-zinc-700 dark:text-zinc-300">{job.summary}</p>

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full text-sm font-medium text-zinc-900 dark:text-zinc-100"
        >
          {open ? "Hide details" : "Show details"}
          <CaretDownIcon
            size={14}
            weight="bold"
            className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>

        <div
          id={panelId}
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
          inert={open ? undefined : ""}
        >
          <div className="overflow-hidden">
            <ul className="mt-5 max-w-[68ch] space-y-3">
              {job.points.map((p) => (
                <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  <span className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Stack">
              {job.stack.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
            {job.caseStudy && (
              <Link
                to={`/work/${job.caseStudy}`}
                className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent"
              >
                Read the Prism case study
                <ArrowRightIcon size={14} weight="bold" className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Experience() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <Section
      id="experience"
      index="03"
      eyebrow="Experience"
      title="Where I've shipped."
      intro="Two internships: one owning a product end to end, one building the frontend of an early-stage startup."
    >
      <Reveal as="ol" className="md:ml-[calc(14rem+2.5rem)]">
        {experience.map((job, i) => (
          <Entry
            key={job.company}
            job={job}
            index={i}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </Reveal>
    </Section>
  );
}

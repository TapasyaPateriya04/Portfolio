import { GraduationCapIcon, TrophyIcon } from "@phosphor-icons/react";
import { about, profile } from "../data/content.js";
import Section from "./Section.jsx";
import Reveal from "./Reveal.jsx";
import photo720 from "../assets/tapasya-720.webp";
import photo420 from "../assets/tapasya-420.webp";

function List({ title, items }) {
  return (
    <div>
      <h3 className="eyebrow mb-4">{title}</h3>
      <ul className="divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800/80 dark:border-zinc-800/80">
        {items.map((text) => (
          <li key={text} className="flex gap-3 py-3.5 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            <span className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function About() {
  const { education, achievements } = about;
  return (
    <Section
      id="about"
      index="01"
      eyebrow="About"
      title="Backend logic, and the screens people use it through."
      intro="I'm a Computer Science graduate who likes owning a feature end to end: the data model, the API, the access rules and the interface on top. Most of my work so far is Java and Spring Boot on the server and React on the client."
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-14">
        <Reveal className="mx-auto w-full max-w-[19rem] lg:mx-0">
          <figure className="relative">
            <div className="overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
              <img
                src={photo720}
                srcSet={`${photo420} 420w, ${photo720} 720w`}
                sizes="(min-width: 1024px) 19rem, 80vw"
                width="720"
                height="900"
                loading="lazy"
                decoding="async"
                alt={`Portrait of ${profile.name}`}
                className="aspect-[4/5] h-auto w-full object-cover"
              />
            </div>
            <figcaption className="glass absolute -bottom-4 left-4 right-4 flex items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 text-xs">
              <span className="font-medium text-zinc-900 dark:text-zinc-100">{profile.name}</span>
              <span className="font-mono text-zinc-500 dark:text-zinc-400">Java · React</span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="grid gap-10">
          <div className="grid gap-10 md:grid-cols-2">
            <Reveal>
              <List title="What I build" items={about.build} />
            </Reveal>
            <Reveal delay={0.08}>
              <List title="What I care about" items={about.care} />
            </Reveal>
          </div>

          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
            <Reveal className="surface p-6">
              <GraduationCapIcon size={22} weight="duotone" className="text-accent" aria-hidden="true" />
              <h3 className="mt-4 font-medium text-zinc-900 dark:text-zinc-100">{education.degree}</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{education.school}</p>
              <p className="mt-4 font-mono text-xs text-zinc-500">
                {education.period} · {education.place}
              </p>
            </Reveal>
            <Reveal delay={0.08} className="surface p-6">
              <TrophyIcon size={22} weight="duotone" className="text-accent" aria-hidden="true" />
              <ul className="mt-4 space-y-5">
                {achievements.map((a) => (
                  <li key={a.title}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{a.title}</h3>
                      <span className="font-mono text-xs text-zinc-500">{a.meta}</span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{a.text}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}

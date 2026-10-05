import { motion } from "framer-motion";
import { ArrowDownIcon, DownloadSimpleIcon } from "@phosphor-icons/react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { profile } from "../data/content.js";
import HeroVisual from "./visuals/HeroVisual.jsx";
import Magnetic from "./Magnetic.jsx";

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

const iconLink =
  "grid h-10 w-10 place-items-center rounded-full text-zinc-600 transition-colors hover:bg-zinc-900/5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-100";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="page relative grid min-h-[100dvh] grid-cols-1 items-center gap-16 pb-20 pt-32 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-10 lg:pb-16 lg:pt-28">
        <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.08 }}>
          <motion.p variants={item} className="eyebrow flex items-center gap-2">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
            {profile.role}
          </motion.p>
          <motion.h1
            id="hero-title"
            variants={item}
            className="mt-6 max-w-[18ch] text-4xl font-semibold leading-[1.02] tracking-tighter text-zinc-900 sm:text-5xl md:text-6xl dark:text-zinc-50"
          >
            I build React interfaces and the <span className="text-accent">Java services</span> behind them.
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 max-w-[56ch] text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400"
          >
            I&apos;m {profile.name}. At Cars24 I owned Prism, a B2B microservice portal for the company&apos;s
            enterprise data services, from zero to full delivery: Spring Boot services with 6-role access control on one
            side, React dashboards on the other. 49+ B2B clients were onboarded by the end of my internship.
          </motion.p>
          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href="#work" className="btn-primary">
                View my work
                <ArrowDownIcon size={16} weight="bold" aria-hidden="true" />
              </a>
            </Magnetic>
            <a href={profile.resume} download className="btn-ghost">
              <DownloadSimpleIcon size={16} weight="bold" aria-hidden="true" />
              Download resume
            </a>
            <span className="mx-1 hidden h-6 w-px bg-zinc-300 sm:block dark:bg-zinc-800" aria-hidden="true" />
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" className={iconLink}>
              <FaGithub size={19} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className={iconLink}>
              <FaLinkedin size={19} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.25 }}
          className="pb-8 lg:pb-0"
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}

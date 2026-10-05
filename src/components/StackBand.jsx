import { stackBand } from "../data/content.js";
import SkillIcon from "./SkillIcon.jsx";

function Row({ hidden }) {
  return (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {stackBand.map((s) => (
        <li key={s.name} className="flex items-center gap-2.5 whitespace-nowrap text-sm text-zinc-500 dark:text-zinc-400">
          <SkillIcon name={s.icon} size={18} className="text-zinc-400 dark:text-zinc-500" />
          {s.name}
        </li>
      ))}
    </ul>
  );
}

// Endless band of the core stack. The list renders twice so the CSS loop is seamless;
// the copy is hidden from assistive tech.
export default function StackBand() {
  return (
    <div className="border-y border-zinc-200/80 dark:border-zinc-900">
      <div className="page flex items-center gap-6 py-5">
        <p className="eyebrow hidden shrink-0 md:block">Core stack</p>
        <div className="marquee min-w-0 flex-1 overflow-hidden">
          <div className="marquee-track flex w-max">
            <Row />
            <Row hidden />
          </div>
        </div>
      </div>
    </div>
  );
}

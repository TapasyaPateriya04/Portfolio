import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { FaGithub } from "react-icons/fa6";

export default function ExternalLink({ link, compact = false, small = false }) {
  const Icon = link.kind === "github" ? FaGithub : ArrowUpRightIcon;
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className={
        compact
          ? "inline-flex items-center gap-1.5 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          : `btn-ghost ${small ? "btn-sm" : ""}`
      }
    >
      <Icon size={14} aria-hidden="true" />
      {link.label}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

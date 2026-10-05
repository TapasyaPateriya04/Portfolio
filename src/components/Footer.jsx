import { Link } from "react-router-dom";
import { navLinks, profile } from "../data/content.js";

const elsewhere = [
  { label: "GitHub", href: profile.github, external: true },
  { label: "LinkedIn", href: profile.linkedin, external: true },
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "Resume", href: profile.resume, external: true },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-900">
      <div className="page grid gap-10 py-12 sm:grid-cols-[minmax(0,1.4fr)_auto_auto] sm:gap-16">
        <div>
          <p className="font-medium text-zinc-900 dark:text-zinc-100">{profile.name}</p>
          <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            React interfaces and the Java services behind them.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow mb-3">Sections</p>
          <ul className="grid gap-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.id}>
                <Link
                  to={{ pathname: "/", hash: `#${l.id}` }}
                  className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="eyebrow mb-3">Elsewhere</p>
          <ul className="grid gap-2 text-sm">
            {elsewhere.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="page">
        <p className="border-t border-zinc-200 py-6 text-xs text-zinc-500 dark:border-zinc-900">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}

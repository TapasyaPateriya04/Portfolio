import { profile } from "../data/content.js";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-900">
      <div className="page flex flex-col gap-3 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between dark:text-zinc-400">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          <li>
            <a className="link-underline" href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a className="link-underline" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a className="link-underline" href={`mailto:${profile.email}`}>
              Email
            </a>
          </li>
          <li>
            <a className="link-underline" href={profile.resume} target="_blank" rel="noreferrer">
              Resume
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

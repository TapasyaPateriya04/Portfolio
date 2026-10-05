import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRightIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import { navLinks, profile } from "../data/content.js";
import { useTheme } from "../hooks/useTheme.js";
import { useActiveSection } from "../hooks/useActiveSection.js";
import ThemeToggle from "./ThemeToggle.jsx";

const sectionIds = navLinks.map((l) => l.id);

export default function Nav() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const active = useActiveSection(sectionIds, onHome);
  const { theme, toggle } = useTheme();
  // the menu belongs to the page it was opened on, so navigating closes it
  const [openOn, setOpenOn] = useState(null);
  const open = openOn === pathname;
  const setOpen = useCallback((value) => setOpenOn(value ? pathname : null), [pathname]);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef(null);
  const sheet = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(
    (restoreFocus = true) => {
      setOpen(false);
      if (restoreFocus) menuButton.current?.focus();
    },
    [setOpen]
  );

  // Mobile sheet: lock scroll, trap focus, close on Escape.
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = sheet.current?.querySelector("a,button");
    first?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab" || !sheet.current) return;
      const items = [menuButton.current, ...sheet.current.querySelectorAll("a,button")];
      const idx = items.indexOf(document.activeElement);
      if (e.shiftKey && idx <= 0) {
        e.preventDefault();
        items[items.length - 1].focus();
      } else if (!e.shiftKey && idx === items.length - 1) {
        e.preventDefault();
        items[0].focus();
      }
    };
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close, setOpen]);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4">
      <nav
        aria-label="Primary"
        className={`glass mx-auto flex max-w-3xl items-center justify-between gap-2 rounded-full py-1.5 pl-4 pr-1.5 transition-[background-color] duration-300 ${
          scrolled ? "" : "dark:bg-zinc-900/40"
        }`}
      >
        <Link
          to="/"
          className="flex items-center gap-2 rounded-full font-mono text-sm font-semibold tracking-tight"
          aria-label={`${profile.name}, home`}
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span>
            Tapasya<span className="text-zinc-400 dark:text-zinc-500"> Pateriya</span>
          </span>
        </Link>

        <ul className="hidden items-center md:flex">
          {navLinks.map((link) => {
            const isActive = onHome && active === link.id;
            return (
              <li key={link.id} className="relative">
                <Link
                  to={{ pathname: "/", hash: `#${link.id}` }}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative block rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "text-zinc-900 dark:text-zinc-50"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-zinc-900/[0.06] dark:bg-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          <ThemeToggle theme={theme} onToggle={toggle} />
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1 rounded-full bg-zinc-900 px-3.5 py-1.5 text-sm font-medium text-zinc-50 transition-transform active:scale-[0.97] sm:inline-flex dark:bg-zinc-100 dark:text-zinc-900"
          >
            Resume
            <ArrowUpRightIcon size={14} weight="bold" aria-hidden="true" />
          </a>
          <button
            ref={menuButton}
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full text-zinc-700 hover:bg-zinc-900/5 md:hidden dark:text-zinc-300 dark:hover:bg-white/10"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => (open ? close() : setOpen(true))}
          >
            {open ? <XIcon size={18} weight="bold" /> : <ListIcon size={18} weight="bold" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 -z-10 bg-zinc-950/30 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => close(false)}
              aria-hidden="true"
            />
            <motion.div
              key="sheet"
              id="mobile-menu"
              ref={sheet}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="glass mx-auto mt-2 max-w-3xl rounded-3xl p-2 md:hidden"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            >
              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i }}
                  >
                    <Link
                      to={{ pathname: "/", hash: `#${link.id}` }}
                      onClick={() => close(false)}
                      className="flex items-center justify-between rounded-2xl px-4 py-3 text-base text-zinc-800 hover:bg-zinc-900/5 dark:text-zinc-200 dark:hover:bg-white/5"
                    >
                      {link.label}
                      {onHome && active === link.id && (
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                      )}
                    </Link>
                  </motion.li>
                ))}
                <li className="mt-1 border-t border-zinc-900/10 pt-2 dark:border-white/10">
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium text-zinc-900 hover:bg-zinc-900/5 dark:text-zinc-50 dark:hover:bg-white/5"
                  >
                    Resume (PDF)
                    <ArrowUpRightIcon size={16} weight="bold" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

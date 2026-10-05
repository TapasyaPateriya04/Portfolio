import { AnimatePresence, motion } from "framer-motion";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";

export default function ThemeToggle({ theme, onToggle }) {
  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Light theme" : "Dark theme"}
      className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full text-zinc-600 transition-colors hover:bg-zinc-900/5 hover:text-zinc-900 active:scale-95 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-100"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 12, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -12, opacity: 0, rotate: 40 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="grid place-items-center"
        >
          {dark ? <SunIcon size={18} weight="bold" /> : <MoonIcon size={18} weight="bold" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

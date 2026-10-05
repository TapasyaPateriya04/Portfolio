import { useCallback } from "react";

// Feeds pointer position into CSS vars for `.spotlight`, without re-rendering.
export function useSpotlight() {
  return useCallback((e) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);
}

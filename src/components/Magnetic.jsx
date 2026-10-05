import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

// Pulls its child a few pixels toward the pointer. Pointer devices only; motion values keep it off the render path.
export default function Magnetic({ children, strength = 0.25, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 150, damping: 15, mass: 0.2 });
  const y = useSpring(useMotionValue(0), { stiffness: 150, damping: 15, mass: 0.2 });

  const onMove = (e) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span ref={ref} style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset} className={`inline-flex ${className}`}>
      {children}
    </motion.span>
  );
}

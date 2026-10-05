import { motion } from "framer-motion";

export default function Reveal({ as = "div", delay = 0, y = 16, className, children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

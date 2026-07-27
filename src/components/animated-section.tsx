"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

type FadeInCardProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

// Strong Apple-style ease-out (emil-design-eng): fast start, gentle settle.
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export function AnimatedSection({
  children,
  className,
  id,
}: AnimatedSectionProps) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
    >
      {children}
    </motion.section>
  );
}

export function FadeInCard({
  children,
  className,
  delay = 0,
}: FadeInCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: reduce ? 0 : delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

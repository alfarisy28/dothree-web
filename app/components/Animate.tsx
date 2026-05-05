"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type AnimateProps = {
  children: ReactNode;
  delay?: number;
  type?: "up" | "left" | "right" | "zoom";
};

const variants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  },
  left: {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  },
  right: {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  },
};

export default function Animate({
  children,
  delay = 0,
  type = "up",
}: AnimateProps) {
  return (
    <motion.div
      variants={variants[type]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
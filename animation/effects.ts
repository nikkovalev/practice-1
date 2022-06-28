import { MotionProps } from "framer-motion";

export const FADE_IN: MotionProps = {
  initial: {
    opacity: 0,
  },
  whileInView: { opacity: 1 },
  transition: { duration: 0.7 },
  viewport: { amount: 0.2, once: true },
};

export const BACK_IN_RIGHT: MotionProps = {
  initial: {
    opacity: 0,
    x: 100,
    scale: 0.8,
  },
  whileInView: { opacity: 1, x: 0, scale: 1 },
  transition: { type: "spring", duration: 1.4, damping: 9 },
  viewport: { once: true },
};

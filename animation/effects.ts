import { MotionProps } from "framer-motion";

export const BACK_IN_RIGHT: MotionProps = {
  initial: {
    opacity: 0,
    x: 100,
    scale: 0.6,
  },
  whileInView: { opacity: 1, x: 0, scale: 1 },
  transition: { type: "spring", duration: 1.1, damping: 5 },
  viewport: { amount: "all", once: true },
};

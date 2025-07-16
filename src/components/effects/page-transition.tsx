"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initialState"
        animate="animateState"
        exit="exitState"
        transition={{
          duration: 0.5,
        }}
        variants={{
          initialState: {
            opacity: 0,
            clipPath: "circle(0% at 50% 50%)",
          },
          animateState: {
            opacity: 1,
            clipPath: "circle(150% at 50% 50%)",
          },
          exitState: {
            opacity: 0,
            clipPath: "circle(0% at 50% 50%)",
          },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Alternative slide transition
export function SlidePageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "-100%", opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
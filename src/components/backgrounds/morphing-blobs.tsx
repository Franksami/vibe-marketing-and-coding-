"use client";

import { motion } from "framer-motion";

export function MorphingBlobs() {
  return (
    <div className="fixed inset-0 -z-40 overflow-hidden">
      {/* Blob 1 */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px]"
        animate={{
          x: [0, 100, -100, 0],
          y: [0, -100, 100, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut" as const,
        }}
      >
        <motion.div
          className="w-full h-full rounded-full bg-gradient-to-br from-slate-200/20 to-slate-300/20 blur-3xl"
          animate={{
            borderRadius: [
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "30% 60% 70% 40% / 50% 60% 30% 60%",
              "60% 40% 30% 70% / 60% 30% 70% 40%",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        />
      </motion.div>

      {/* Blob 2 */}
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px]"
        animate={{
          x: [0, -150, 150, 0],
          y: [0, 150, -150, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut" as const,
          delay: 5,
        }}
      >
        <motion.div
          className="w-full h-full rounded-full bg-gradient-to-tl from-slate-300/20 to-slate-400/20 blur-3xl"
          animate={{
            borderRadius: [
              "30% 70% 70% 30% / 30% 30% 70% 70%",
              "70% 30% 30% 70% / 70% 70% 30% 30%",
              "30% 70% 70% 30% / 30% 30% 70% 70%",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        />
      </motion.div>

      {/* Blob 3 - Center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px]"
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear" as const,
        }}
      >
        <motion.div
          className="w-full h-full rounded-full bg-gradient-to-r from-slate-200/10 via-slate-300/10 to-slate-200/10 blur-3xl"
          animate={{
            borderRadius: [
              "50% 50% 50% 50% / 50% 50% 50% 50%",
              "40% 60% 60% 40% / 60% 40% 40% 60%",
              "50% 50% 50% 50% / 50% 50% 50% 50%",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        />
      </motion.div>

      {/* Interactive blob that follows mouse (we'll add this later) */}
      <motion.div
        className="absolute w-[400px] h-[400px] pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut" as const,
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-radial from-slate-400/15 to-transparent blur-2xl" />
      </motion.div>
    </div>
  );
}
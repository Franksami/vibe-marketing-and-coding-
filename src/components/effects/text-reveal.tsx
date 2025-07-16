"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  type?: "word" | "letter" | "line";
}

export function TextReveal({ 
  children, 
  className = "",
  delay = 0,
  duration = 0.5,
  type = "word"
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const splitText = () => {
    if (type === "letter") {
      return children.split("");
    } else if (type === "line") {
      return children.split("\n");
    } else {
      return children.split(" ");
    }
  };

  const textArray = splitText();

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: duration / textArray.length,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      style={{ display: "inline-block" }}
      variants={container}
      initial="hidden"
      animate={controls}
      className={className}
    >
      {textArray.map((text, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ 
            display: "inline-block",
            transformOrigin: "bottom",
            transformStyle: "preserve-3d",
          }}
        >
          {text}
          {type !== "letter" && index < textArray.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Glitch text effect component
export function GlitchText({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span 
        className="absolute top-0 left-0 text-slate-400 animate-glitch-1"
        aria-hidden="true"
      >
        {children}
      </span>
      <span 
        className="absolute top-0 left-0 text-slate-600 animate-glitch-2"
        aria-hidden="true"
      >
        {children}
      </span>
      <style jsx>{`
        @keyframes glitch-1 {
          0%, 100% { 
            text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
              -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
              0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
            transform: translate(0);
          }
          20% {
            text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
              -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
              0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
            transform: translate(-0.05em, -0.025em);
          }
          40% {
            text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
              -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
              0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
            transform: translate(0.05em, 0.025em);
          }
          60% {
            text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
              -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
              0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
            transform: translate(-0.05em, -0.025em);
          }
          80% {
            text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
              -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
              0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
            transform: translate(0);
          }
        }
        .animate-glitch-1 {
          animation: glitch-1 2s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
        }
        .animate-glitch-2 {
          animation: glitch-1 3s infinite reverse;
          clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
        }
      `}</style>
    </span>
  );
}
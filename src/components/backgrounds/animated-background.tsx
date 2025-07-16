"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animated particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Move particles
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 116, 139, ${particle.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Animated gradient mesh */}
      <div className="fixed inset-0 -z-50 overflow-hidden">
        <motion.div
          className="absolute -inset-[10px] opacity-30"
          animate={{
            background: [
              "radial-gradient(800px circle at 100% 200px, rgba(100, 116, 139, 0.1), transparent 40%)",
              "radial-gradient(800px circle at 0% 300px, rgba(148, 163, 184, 0.1), transparent 40%)",
              "radial-gradient(800px circle at 50% 50%, rgba(100, 116, 139, 0.1), transparent 40%)",
              "radial-gradient(800px circle at 100% 200px, rgba(100, 116, 139, 0.1), transparent 40%)",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating geometric shapes */}
      <div className="fixed inset-0 -z-40 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
          >
            <div
              className={`
                ${i % 3 === 0 ? "w-20 h-20" : i % 3 === 1 ? "w-32 h-32" : "w-16 h-16"}
                ${i % 2 === 0 ? "rounded-full" : "rounded-lg rotate-45"}
                bg-gradient-to-br from-slate-200/5 to-slate-300/5
                backdrop-blur-sm
                border border-slate-200/10
              `}
            />
          </motion.div>
        ))}
      </div>

      {/* Interactive particles canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-30 pointer-events-none"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Mouse-following gradient orb */}
      <motion.div
        className="fixed w-96 h-96 -z-20 pointer-events-none"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-radial from-slate-400/10 via-transparent to-transparent blur-3xl" />
      </motion.div>

      {/* Noise texture overlay */}
      <div 
        className="fixed inset-0 -z-10 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />
    </>
  );
}
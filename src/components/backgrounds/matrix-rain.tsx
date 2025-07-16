"use client";

import { useEffect, useRef } from "react";

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix characters
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");

    const fontSize = 10;
    const columns = canvas.width / fontSize;

    // Array to store drops position
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100);
    }

    // Drawing function
    function draw() {
      if (!ctx || !canvas) return;

      // Black background with transparency for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Orange text (Anthropic/Claude orange)
      ctx.fillStyle = "#FF6B35";
      ctx.font = fontSize + "px monospace";

      // Loop through drops
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        
        // Draw character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top when it reaches bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment drop position
        drops[i]++;
      }
    }

    // Animation loop
    const intervalId = setInterval(draw, 35);

    // Cleanup
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full opacity-5 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
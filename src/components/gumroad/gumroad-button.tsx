"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShoppingCart, Download, Sparkles } from "lucide-react";
import { useState } from "react";

interface GumroadButtonProps {
  productUrl: string;
  productId: string;
  text?: string;
  price?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
  isFree?: boolean;
}

export function GumroadButton({
  productUrl,
  productId,
  text = "Buy Now",
  price,
  variant = "default",
  size = "default",
  className = "",
  isFree = false,
}: GumroadButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    // Track conversion event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'begin_checkout', {
        currency: 'USD',
        value: price ? parseFloat(price.replace('$', '')) : 0,
        items: [{
          item_id: productId,
          item_name: text,
          price: price ? parseFloat(price.replace('$', '')) : 0,
          quantity: 1
        }]
      });
    }

    // Open Gumroad overlay or redirect
    if (typeof window !== 'undefined' && window.GumroadOverlay) {
      window.GumroadOverlay.show({ url: productUrl });
    } else {
      window.open(productUrl, '_blank');
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Button
        variant={variant}
        size={size}
        onClick={handleClick}
        className={`gumroad-button relative overflow-hidden ${className}`}
      >
        <motion.span
          className="flex items-center gap-2"
          animate={{ x: isHovered ? -2 : 0 }}
        >
          {isFree ? (
            <Download className="w-4 h-4" />
          ) : (
            <ShoppingCart className="w-4 h-4" />
          )}
          {text}
          {price && !isFree && (
            <span className="font-bold ml-1">{price}</span>
          )}
        </motion.span>

        {/* Hover effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-cyan-600/20"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "0%" : "-100%" }}
          transition={{ duration: 0.3 }}
        />

        {/* Sparkle effect for free items */}
        {isFree && (
          <Sparkles className="absolute top-1 right-1 w-3 h-3 text-yellow-500 animate-pulse" />
        )}
      </Button>
    </motion.div>
  );
}

// Gumroad overlay script component
export function GumroadScript() {
  return (
    <script
      src="https://gumroad.com/js/gumroad.js"
      async
      defer
    />
  );
}
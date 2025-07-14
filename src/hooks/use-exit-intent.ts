import { useState, useEffect } from "react";

interface UseExitIntentOptions {
  delay?: number; // Delay before activating (ms)
  cookieName?: string; // Cookie to check if already shown
  cookieDays?: number; // Days until cookie expires
}

export function useExitIntent(options: UseExitIntentOptions = {}) {
  const {
    delay = 10000,
    cookieName = "exitIntentComplete",
    cookieDays = 30,
  } = options;

  const [shouldShow, setShouldShow] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Check if already shown via cookie
    const hasCompleted = document.cookie.includes(`${cookieName}=true`);
    if (hasCompleted) {
      return;
    }

    // Check session storage
    const shownThisSession = sessionStorage.getItem("exitIntentShown");
    if (shownThisSession) {
      return;
    }

    let timeoutId: NodeJS.Timeout;

    // Desktop exit intent
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggered) {
        timeoutId = setTimeout(() => {
          setShouldShow(true);
          setHasTriggered(true);
          sessionStorage.setItem("exitIntentShown", "true");
        }, 100);
      }
    };

    // Mobile exit intent
    let lastScrollY = window.scrollY;
    let lastScrollTime = Date.now();
    let rapidScrollCount = 0;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const timeDiff = currentTime - lastScrollTime;
      const scrollDiff = lastScrollY - currentScrollY;
      
      if (timeDiff > 0 && timeDiff < 200) { // Quick scroll
        const scrollSpeed = Math.abs(scrollDiff) / timeDiff;
        
        // Detect rapid upward scroll
        if (scrollDiff > 50 && scrollSpeed > 1) {
          rapidScrollCount++;
          
          // Trigger after 2 rapid scrolls up near top of page
          if (rapidScrollCount >= 2 && currentScrollY < 200 && !hasTriggered) {
            setShouldShow(true);
            setHasTriggered(true);
            sessionStorage.setItem("exitIntentShown", "true");
          }
        } else {
          // Reset count if not scrolling up rapidly
          rapidScrollCount = 0;
        }
      }
      
      lastScrollY = currentScrollY;
      lastScrollTime = currentTime;
    };

    // Tab visibility change (switching tabs)
    const handleVisibilityChange = () => {
      if (document.hidden && !hasTriggered && window.scrollY > 500) {
        setShouldShow(true);
        setHasTriggered(true);
        sessionStorage.setItem("exitIntentShown", "true");
      }
    };

    // Set up listeners after delay
    const setupTimeout = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("scroll", handleScroll, { passive: true });
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(setupTimeout);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [hasTriggered, delay, cookieName]);

  const dismiss = () => {
    setShouldShow(false);
    
    // Set cookie to prevent showing again
    const expires = new Date();
    expires.setDate(expires.getDate() + cookieDays);
    document.cookie = `${cookieName}=true; expires=${expires.toUTCString()}; path=/`;
  };

  return {
    shouldShow,
    dismiss,
  };
}
export const exitIntentVariants = {
  powerPack: {
    title: "Wait! Don't Leave Empty-Handed 🎁",
    description: "Get our exclusive Cursor Power Pack with 10 advanced rules that will instantly level up your AI coding game.",
    offer: "Cursor Power Pack",
    benefits: [
      "10 Advanced Cursor Rules (normally $47)",
      "AI Prompt Cheat Sheet",
      "Component Generation Templates",
      "Debugging Workflow Guide"
    ],
    cta: "Send Me The Power Pack →"
  },
  
  miniCourse: {
    title: "Before You Go... 🚀",
    description: "Get our FREE 5-day email course: 'Master Cursor in One Week' - the fastest way to 10x your coding speed.",
    offer: "5-Day Email Course",
    benefits: [
      "Day 1: Setting up the perfect workflow",
      "Day 2: Mastering AI prompts",
      "Day 3: Building full features in minutes",
      "Day 4: Debugging like a pro",
      "Day 5: Advanced techniques"
    ],
    cta: "Start The Free Course →"
  },
  
  discount: {
    title: "Special Offer Just for You! 💰",
    description: "Leave now and pay $499... or grab your exclusive 20% discount and join for just $399!",
    offer: "20% Discount",
    benefits: [
      "Save $100 on Vibe Academy",
      "Valid for next 48 hours only",
      "Includes all founding member benefits",
      "30-day money-back guarantee"
    ],
    cta: "Claim My Discount →"
  },
  
  community: {
    title: "Join 10,000+ Developers 👥",
    description: "Get instant access to our private community where members share tips, templates, and get help 24/7.",
    offer: "Community Access",
    benefits: [
      "Exclusive Slack community",
      "Weekly live coding sessions",
      "Member-only resources",
      "Direct access to instructors"
    ],
    cta: "Join The Community Free →"
  }
};

// Helper to get random variant for A/B testing
export function getRandomVariant() {
  const variants = Object.keys(exitIntentVariants);
  const randomIndex = Math.floor(Math.random() * variants.length);
  return exitIntentVariants[variants[randomIndex] as keyof typeof exitIntentVariants];
}

// Helper to get variant by name
export function getVariant(name: keyof typeof exitIntentVariants) {
  return exitIntentVariants[name];
}
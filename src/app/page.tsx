import { Navigation } from "@/components/landing/navigation";
import { HeroDark } from "@/components/landing/hero-dark";
import { ProblemSectionDark } from "@/components/landing/problem-section-dark";
import { BusinessModelsDark } from "@/components/landing/business-models-dark";
import { ServiceTiersDark } from "@/components/landing/service-tiers-dark";
import { CoursePreviewDark } from "@/components/landing/course-preview-dark";
import { TechStackDark } from "@/components/landing/tech-stack-dark";
import { TestimonialsDark } from "@/components/landing/testimonials-dark";
import { FAQDark } from "@/components/landing/faq-dark";
import { CTADark } from "@/components/landing/cta-dark";
import { ExitIntentPopup } from "@/components/popups/exit-intent-popup";
import { OrganizationSchema } from "@/components/schema/OrganizationSchema";
import { CourseSchema } from "@/components/schema/CourseSchema";
import { FreeProductDark } from "@/components/landing/free-product-dark";
import { MatrixRain } from "@/components/backgrounds/matrix-rain";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <OrganizationSchema />
      <CourseSchema 
        name="AI Transformation Business System"
        description="The ONLY system that lets you build ANY online business model in hours using AI - without writing code. Go from zero to $10K/month in 30 days."
        url="https://thevibelaunch.ai/courses/ai-transformation-business"
        price="297"
        educationalLevel="Beginner"
        duration="PT30D"
        teaches={[
          "Build businesses with AI without coding",
          "7 proven online business models",
          "Claude Code and Cursor mastery",
          "Client acquisition strategies",
          "Service delivery automation",
          "Scaling to $10K/month"
        ]}
      />
      <MatrixRain />
      <Navigation />
      <main className="flex-1 bg-black">
        <HeroDark />
        <ProblemSectionDark />
        <FreeProductDark />
        <BusinessModelsDark />
        <CoursePreviewDark />
        <ServiceTiersDark />
        <TechStackDark />
        <TestimonialsDark />
        <FAQDark />
        <CTADark />
      </main>
      <ExitIntentPopup />
    </div>
  );
}
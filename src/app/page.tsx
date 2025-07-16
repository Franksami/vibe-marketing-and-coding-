import { Navigation } from "@/components/landing/navigation";
import { Hero3D } from "@/components/landing/hero-3d";
import { ProblemSection } from "@/components/landing/problem-section";
import { BusinessModelsSection } from "@/components/landing/business-models-section";
import { ServiceTiersSection } from "@/components/landing/service-tiers-section";
import { CoursePreviewSection } from "@/components/landing/course-preview-section";
import { TechStackSection } from "@/components/landing/tech-stack-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { FAQSection } from "@/components/landing/faq-section";
import { CTASection } from "@/components/landing/cta-section";
import { ExitIntentPopup } from "@/components/popups/exit-intent-popup";
import { OrganizationSchema } from "@/components/schema/OrganizationSchema";
import { CourseSchema } from "@/components/schema/CourseSchema";
import { FreeProductCTA } from "@/components/landing/free-product-cta";

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
      <Navigation />
      <main className="flex-1">
        <Hero3D />
        <ProblemSection />
        <FreeProductCTA />
        <BusinessModelsSection />
        <CoursePreviewSection />
        <ServiceTiersSection />
        <TechStackSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <ExitIntentPopup />
    </div>
  );
}
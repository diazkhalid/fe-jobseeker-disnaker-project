import CategorySection from "@/features/landing/components/CategorySection";
import FAQSection from "@/features/landing/components/FAQSection";
import FeaturedCompaniesSection from "@/features/landing/components/FeaturedCompaniesSection";
import HeroSection from "@/features/landing/components/Hero";
import JobsByLocationSection from "@/features/landing/components/JobsByLocationSection";
import LatestJobsSection from "@/features/landing/components/LatestJobSection";
import QuickAccessSection from "@/features/landing/components/QuickAccessSection";
import WhyUsSection from "@/features/landing/components/WhyUsSection";

export default function Home() {
  return (
    <div className="relative top-16">
      <HeroSection></HeroSection>
      <QuickAccessSection></QuickAccessSection>
      <LatestJobsSection></LatestJobsSection>
      <CategorySection></CategorySection>
      <JobsByLocationSection></JobsByLocationSection>
      <FeaturedCompaniesSection></FeaturedCompaniesSection>
      <WhyUsSection></WhyUsSection>
      <FAQSection></FAQSection>
    </div>
  );
}

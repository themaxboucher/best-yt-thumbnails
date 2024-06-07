import FilterBar from "@/components/filter-bar";
import HeroSection from "@/components/layout/hero-section";
import NoUserContent from "@/components/layout/no-user-content";
import SectionLarge from "@/components/layout/section-large";

export default function ThumbnailsLayout({ children }) {
  return (
    <>
      <NoUserContent>
        <HeroSection />
      </NoUserContent>
      <SectionLarge>
        <FilterBar />
        {children}
      </SectionLarge>
    </>
  );
}

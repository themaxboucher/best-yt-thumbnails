import FilterBar from "@/components/filter-bar";
import HeroSection from "@/components/hero-section";

export default function ThumbnailsLayout({ children }) {
  return (
    <>
      {false && <HeroSection />}
      <section className="mx-auto w-full max-w-[82rem] px-10 py-16 flex flex-col justify-start items-center gap-8">
        <FilterBar />
        {children}
      </section>
    </>
  );
}

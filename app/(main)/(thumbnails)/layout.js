import FilterBar from "@/components/filter-bar";
import HeroSection from "@/components/layout/hero-section";
import NoUserContent from "@/components/layout/no-user-content";

export default function ThumbnailsLayout({ children }) {
  return (
    <>
      <NoUserContent>
        <HeroSection />
      </NoUserContent>
      <section className="mx-auto w-full max-w-[82rem] px-10 py-16 flex flex-col justify-start items-center gap-8">
        <FilterBar />
        {children}
      </section>
    </>
  );
}

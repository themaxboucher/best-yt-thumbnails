export default function SectionLarge({ children }) {
  return (
    <section className="mx-auto w-full max-w-[82rem] sm:px-10 px-5 py-16 flex flex-col justify-start items-center gap-8">
      {children}
    </section>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mx-auto w-full px-10 py-16 border-t border-slate-100">
      <div className="flex flex-col justify-start items-start gap-5 max-w-sm">
        <div className="font-semibold text-slate-950">Best YT Thumbnails</div>
        <p>
          Find inspiration for your videos next thumbnail from 100+ of the best
          YouTube thumbnail examples from various niches.
        </p>
      </div>
      <Link href="/submit">Submit</Link>
      <Link href="/terms">Terms</Link>
    </footer>
  );
}

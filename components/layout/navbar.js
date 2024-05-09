import Link from "next/link";
import NavMenu from "../nav-menu";

export default function Navbar() {
  return (
    <header className="w-full border-b border-slate-100 bg-white">
      <div className="flex justify-between items-center px-8 py-4">
        <Link href="/">
          <div className="font-semibold text-slate-950">Best YT Thumbnails</div>
        </Link>
        <div className="flex justify-center items-center gap-5">
          <NavMenu />
        </div>
      </div>
    </header>
  );
}

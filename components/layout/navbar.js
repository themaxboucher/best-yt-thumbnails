import Link from "next/link";
import NavMenu from "../nav-menu";
import Logo from "../logo";

export default function Navbar() {
  return (
    <header className="w-full border-b border-slate-100 bg-white">
      <div className="flex justify-between items-center px-8 py-4">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex justify-center items-center gap-5">
          <NavMenu />
        </div>
      </div>
    </header>
  );
}

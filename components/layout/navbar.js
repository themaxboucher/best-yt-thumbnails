import Link from "next/link";
import NavMenu from "../nav-menu";
import Logo from "../logo";

export default function Navbar() {
  return (
    <header className="w-full border-b border-slate-100 bg-white relative">
      <div className="absolute -bottom-[1px] w-full h-[1px] mx-auto lg:mx-0 opacity-20 bg-[linear-gradient(to_right,#4ade80,#60a5fa,#c084fc,#f472b6,#f87171,#fb923c,#facc15)]"></div>
      <div className="absolute -z-10 inset-0 w-full h-full mx-auto lg:mx-0 opacity-10 blur-md bg-[linear-gradient(to_right,#4ade80,#60a5fa,#c084fc,#f472b6,#f87171,#fb923c,#facc15)]"></div>
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

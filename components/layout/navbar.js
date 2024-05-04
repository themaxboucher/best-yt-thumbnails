import Link from "next/link";
import Button from "../ui/button";
import ButtonGroup from "../ui/button-group";
import NavMenu from "../nav-menu";

export default function Navbar() {
  return (
    <header className="w-full border-b border-slate-100 bg-white">
      <div className="flex justify-between items-center px-8 py-4">
        <Link href="/">
          <div className="font-semibold text-slate-950">Best YT Thumbnails</div>
        </Link>
        <div className="flex justify-center items-center gap-5">
          <ButtonGroup>
            <Button path="/auth/login" secondary>
              Log in
            </Button>
            <Button path="/auth/join">Sign up</Button>
          </ButtonGroup>
          <NavMenu />
        </div>
      </div>
    </header>
  );
}

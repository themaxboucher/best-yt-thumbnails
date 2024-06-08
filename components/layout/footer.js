import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mx-auto w-full px-5 sm:px-10 py-6 border-t border-slate-100 bg-slate-50/20">
      <div className="flex justify-center sm:justify-start items-center gap-x-8 gap-y-2 flex-wrap">
        <p className="text-sm">
          Made by{" "}
          <a
            href="https://www.maxboucher.com/"
            className="text-slate-900 font-medium hover:text-slate-700 ease-out duration-300"
          >
            Max Boucher
          </a>
        </p>
        {/*
        <div className="flex justify-center items-center gap-4">
          <Link
            href="/"
            className="text-sm text-slate-600 hover:text-slate-900 ease-out duration-300"
          >
            Privacy
          </Link>
          <Link
            href="/"
            className="text-sm text-slate-600 hover:text-slate-900 ease-out duration-300"
          >
            Terms
          </Link>
          <Link
            href="/"
            className="text-sm text-slate-600 hover:text-slate-900 ease-out duration-300"
          >
            Copyright
          </Link>
        </div>
         */}
      </div>
    </footer>
  );
}

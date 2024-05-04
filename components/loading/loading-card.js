import LoadingTag from "./loading-tag";

export default function LoadingCard() {
  return (
    <div className="w-full max-w-72 min-w-48 flex flex-col gap-2 relative animate-pulse">
      <div className="relative rounded-lg overflow-hidden group">
        <div className="aspect-video object-cover bg-slate-100 bg-gradient-to-t from-slate-100 to-transparent"></div>
      </div>
      <div className="flex justify-between items-center">
        <div className="relative w-full overflow-hidden">
          <div className="flex justify-start items-center gap-1 no-scrollbar overflow-x-scroll scroll-smooth h-7 w-full pr-5">
            <LoadingTag />
            <LoadingTag />
            <LoadingTag />
            <LoadingTag />
            <LoadingTag />
          </div>
          <div className="absolute w-5 z-10 right-0 top-0 bottom-0 h-full bg-gradient-to-r from-transparent to-white to-75%"></div>
        </div>
        <div className="flex justify-end items-center gap-3 w-min h-full">
          <div className="bg-slate-100 size-5 rounded-full"></div>
          <div className="bg-slate-100 size-5 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

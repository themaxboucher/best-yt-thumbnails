export default function ThemeOption({ setting }) {
  const currentTheme = "Light";
  return (
    <button className="group flex flex-col gap-2">
      <div
        className={`overflow-hidden w-12 h-9 rounded-md group-focus:ring-2 group-focus:ring-blue-400 ${
          currentTheme === setting && "ring-2 ring-blue-400"
        }`}
      >
        {setting === "Light" && (
          <div className="bg-slate-50 relative size-full">
            <div className="bg-white border border-slate-100 w-14 h-10 rounded-md absolute top-2 left-2 p-2 flex flex-col gap-1">
              <div className="flex justify-start items-center gap-[0.15rem] overflow-hidden">
                <div className="h-1 w-5 rounded-sm bg-green-100"></div>
                <div className="h-1 w-5 rounded-sm bg-yellow-100"></div>
                <div className="h-1 w-5 rounded-sm bg-orange-100"></div>
                <div className="h-1 w-5 rounded-sm bg-blue-100"></div>
              </div>
              <div className="flex gap-1 overflow-hidden">
                <div className="aspect-video object-cover h-3 bg-slate-100 rounded-sm"></div>
                <div className="aspect-video object-cover h-3 bg-slate-100 rounded-sm"></div>
              </div>
            </div>
          </div>
        )}

        {setting === "Dark" && (
          <div className="bg-zinc-900 relative size-full">
            <div className="bg-zinc-950 border border-zinc-800 w-14 h-10 rounded-md absolute top-2 left-2 p-2 flex flex-col gap-1">
              <div className="flex justify-start items-center gap-[0.15rem] overflow-hidden">
                <div className="h-1 w-5 rounded-sm bg-green-800"></div>
                <div className="h-1 w-5 rounded-sm bg-yellow-800"></div>
                <div className="h-1 w-5 rounded-sm bg-orange-800"></div>
                <div className="h-1 w-5 rounded-sm bg-blue-800"></div>
              </div>
              <div className="flex gap-1 overflow-hidden">
                <div className="aspect-video object-cover h-3 bg-zinc-900 rounded-sm"></div>
                <div className="aspect-video object-cover h-3 bg-zinc-900 rounded-sm"></div>
              </div>
            </div>
          </div>
        )}
        {setting === "System" && (
          <div className="relative overflow-hidden size-full flex">
            <div className="bg-slate-50 w-1/2 h-full relative">
              <div className="bg-white border border-slate-100 w-14 h-10 rounded-md absolute top-2 left-1 p-2 flex flex-col gap-1">
                <div className="flex justify-start items-center gap-[0.15rem] overflow-hidden">
                  <div className="h-1 w-5 rounded-sm bg-green-100"></div>
                  <div className="h-1 w-5 rounded-sm bg-yellow-100"></div>
                  <div className="h-1 w-5 rounded-sm bg-orange-100"></div>
                  <div className="h-1 w-5 rounded-sm bg-blue-100"></div>
                </div>
                <div className="flex gap-1 overflow-hidden">
                  <div className="aspect-video object-cover h-3 bg-slate-100 rounded-sm"></div>
                  <div className="aspect-video object-cover h-3 bg-slate-100 rounded-sm"></div>
                </div>
              </div>
            </div>
            <div className="bg-zinc-900 w-1/2 h-full relative">
              <div className="bg-zinc-950 border border-zinc-800 w-14 h-10 rounded-md absolute top-2 left-1 p-2 flex flex-col gap-1">
                <div className="flex justify-start items-center gap-[0.15rem] overflow-hidden">
                  <div className="h-1 w-5 rounded-sm bg-green-800"></div>
                  <div className="h-1 w-5 rounded-sm bg-yellow-800"></div>
                  <div className="h-1 w-5 rounded-sm bg-orange-800"></div>
                  <div className="h-1 w-5 rounded-sm bg-blue-800"></div>
                </div>
                <div className="flex gap-1 overflow-hidden">
                  <div className="aspect-video object-cover h-3 bg-zinc-900 rounded-sm"></div>
                  <div className="aspect-video object-cover h-3 bg-zinc-900 rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <span className="text-xs text-slate-500">{setting}</span>
    </button>
  );
}

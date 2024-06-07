export default function GridWrapper({ children }) {
  return (
    <div className="flex flex-col justify-start items-center w-full">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 auto-rows-auto gap-6 w-full">
        {children}
      </div>
    </div>
  );
}

import { IoPlay } from "react-icons/io5";

export default function Logo() {
  return (
    <div className="relative flex justify-center items-center w-[2.35rem] h-8 scale-90">
      <div className="h-5 w-7 rounded-md bg-blue-200/90 absolute top-0 left-0 skew-y-[-6deg] border border-blue-400 shadow shadow-blue-400"></div>
      <div className="h-5 w-7 rounded-md bg-yellow-200/90 absolute top-[0.3rem] left-[0.3rem] skew-y-[-6deg] border border-yellow-400 shadow shadow-yellow-400"></div>
      <div className="h-5 w-7 rounded-md bg-red-300/90 absolute top-[0.6rem] left-[0.6rem] skew-y-[-6deg] flex justify-center items-center border border-red-400 shadow shadow-red-400">
        <IoPlay className="size-3 text-white/90 translate-x-[0.07rem]" />
      </div>
    </div>
  );
}

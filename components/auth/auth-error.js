import { IoWarning } from "react-icons/io5";

export default function AuthError({ error }) {
  return (
    <div className="mt-3 py-2 px-3 font-medium border border-red-200 bg-red-100 text-sm rounded-md flex justify-center items-center">
      <div className="flex justify-center items-center gap-2 text-xs text-red-500">
        <IoWarning className="size-4" />
        <span>{error.message}</span>
      </div>
    </div>
  );
}

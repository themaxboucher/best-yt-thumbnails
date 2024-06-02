import Image from "next/image";

export default function AccountHeader({ user }) {
  return (
    <div className="flex justify-start items-center gap-4 py-8 w-full">
      <div className="min-w-14 size-14 sm:size-16 rounded-full shadow-inner relative overflow-hidden border-2 border-slate-100">
        <Image
          src={user.photoURL}
          alt={user.displayName}
          fill
          className="absolute inset-0 size-full"
        />
      </div>
      <div>
        <p className="text-slate-900 text-lg font-semibold truncate">
          {user.displayName}
        </p>
        <p className="text-sm truncate">{user.email}</p>
      </div>
    </div>
  );
}

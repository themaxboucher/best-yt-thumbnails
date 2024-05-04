"use client"; // Error components must be Client Components

import error from "@/public/error.gif";
import Image from "next/image";

export default function Error() {
  return (
    <main className="flex justify-center items-center gap-2 h-screen">
      <div className="flex flex-col justify-start items-center gap-6">
        <Image
          src={error}
          alt="Drunk Boston Dynamics"
          width={480}
          height={270}
          className="rounded-lg"
          priority
        />
        <div className="text-center">
          <h3>Error</h3>
          <p>An error occured.</p>
        </div>
      </div>
    </main>
  );
}

import Button from "@/components/ui/button";
import lostJohnTravolta from "@/public/john-travolta-lost.gif";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="flex justify-center items-center gap-2 h-screen">
      <div className="flex flex-col justify-start items-center gap-6">
        <div className="text-center">
          <h3>404</h3>
          <p>Page not found.</p>
        </div>
        <Button path="/">Go home</Button>
      </div>
      <Image
        src={lostJohnTravolta}
        alt="Lost John Travolta"
        width={198}
        height={187}
      />
    </main>
  );
}

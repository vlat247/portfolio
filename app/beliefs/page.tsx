import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Things I believe in",
  description: "Some of the core principles and ideas I believe in.",
};

export default function Beliefs() {
  return (
    <main className="min-h-screen p-8 md:p-12 max-w-2xl mx-auto pt-16 md:pt-24 pb-32">
      <h1 className="text-xl md:text-2xl font-normal tracking-wide text-[var(--color-text)] mb-4">
        Things I believe in
      </h1>
      
      <div className="space-y-4 text-lg leading-snug text-[var(--color-text)]">
        <h2 className="font-medium mb-4">
          <Link href="/" className="hover:opacity-70 transition-opacity italic">
            Vladislav Solomonov
          </Link>
        </h2>
        
        <p>
          Coming soon...
        </p>
      </div>
    </main>
  );
}

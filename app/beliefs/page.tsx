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
        
        <div className="pt-4 space-y-8">
          <section>
            <h3 className="text-xl font-medium mb-3">We are the blacksmiths of our own fate</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>You don't need to know exactly where you're going to start moving.</li>
              <li>Your circumstances matter, but they don't have to define you.</li>
              <li>Most lives are built through small decisions rather than one grand plan.</li>
              <li>Take responsibility for what you can change.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-medium mb-3">You cannot step into the same river twice</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Everything changes, including you.</li>
              <li>Some things are meant to be remembered, not repeated.</li>
              <li>Growth sometimes means leaving things behind.</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Journey to Independence",
  description: "Vladislav Solomonov's thoughts and goals on achieving personal, financial, and intellectual independence.",
};

export default function Independence() {
  return (
    <main className="min-h-screen p-8 md:p-12 max-w-2xl mx-auto pt-16 md:pt-24 pb-32">
      <h1 className="text-xl md:text-2xl font-normal tracking-wide text-[var(--color-text)] mb-4">
        My Journey to Independence
      </h1>
      
      <div className="space-y-6 text-lg leading-relaxed text-[var(--color-text)]">
        <h2 className="font-medium mb-6">
          <Link href="/life" className="hover:opacity-70 transition-opacity italic text-sm text-gray-400">
            ← Back to Life in 5 Minutes
          </Link>
        </h2>

        <p>
          Independence is something every person builds during their lifetime. For me, it started once I turned 15.
        </p>

        <div className="space-y-2 pt-2">
          <h3 className="text-lg font-medium text-gray-200">The Astana Chapter</h3>
          <p>
            To truly earn my own way in life, I made the decision to stay in Astana. Initially, I rented an apartment with a friend. When he was accepted into nFactorial and I wasn't, our paths diverged. But instead of turning back, I decided to stay and face it. Right now, I am living in a hostel, working shifts as a barista to pay the bills, and spending every spare moment learning programming and shipping code.
          </p>
        </div>
      </div>
    </main>
  );
}

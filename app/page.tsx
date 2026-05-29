import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vladislav Solomonov - Developer & Student",
  description: "Personal website of Vladislav Solomonov, a developer and Mathematics student at Nazarbayev University.",
};

export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-12 max-w-2xl mx-auto pt-16 md:pt-24 pb-32">
      <h1 className="text-xl md:text-2xl font-normal tracking-wide text-[var(--color-text)] mb-8">
        Vladislav Solomonov
      </h1>
      
      <div className="space-y-4 text-lg leading-snug text-[var(--color-text)]">
        <p>
          I'm <a href="https://github.com/vlat247" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400 decoration-1 underline-offset-3 hover:decoration-gray-500 transition-opacity">developer</a> and <Link href="/life" className="underline decoration-gray-400 decoration-1 underline-offset-3 hover:decoration-gray-500 transition-opacity">student at Nazarbayev University</Link>, majoring in Mathematics. I'm 18 years old and started coding in summer '25.
        </p>

        <p>
          My life's goal is simple: experience and learn as much as possible.
        </p>

        <p>Some of interesing things</p>

        <ul className="list-disc pl-6 space-y-2">
          <li><Link href="/life" className="hover:opacity-70 transition-opacity underline decoration-gray-400 decoration-1 underline-offset-3 hover:decoration-gray-500">My life in 5 minutes</Link></li>
          <li>Things I believe in</li>
          <li><Link href="/music" className="hover:opacity-70 transition-opacity underline decoration-gray-400 decoration-1 underline-offset-3 hover:decoration-gray-500">Music taste</Link></li>
        </ul>

        <p>
          You can read my writing or check out my projects, or follow me online. <a href="mailto:voddooo247@gmail.com" className="underline decoration-gray-400 decoration-1 underline-offset-3 hover:decoration-gray-500 transition-opacity">Reach out</a> if interested.
        </p>
      </div>
    </main>
  );
}

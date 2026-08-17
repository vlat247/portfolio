import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Art",
  description: "A collection of my artwork.",
};

export default function Art() {
  return (
    <main className="min-h-screen p-8 md:p-12 max-w-2xl mx-auto pt-16 md:pt-24 pb-32">
      <h1 className="text-xl md:text-2xl font-normal tracking-wide text-[var(--color-text)] mb-4">
        My art
      </h1>
      
      <div className="space-y-4 text-lg leading-snug text-[var(--color-text)]">
        <h2 className="font-medium mb-4">
          <Link href="/" className="hover:opacity-70 transition-opacity italic">
            Vladislav Solomonov
          </Link>
        </h2>
        
        <ul className="list-none space-y-2 pt-2">
          <li>
            <a 
              href="https://vision247.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="underline decoration-gray-400 decoration-1 underline-offset-3 hover:decoration-gray-500 transition-opacity focus:outline-none"
            >
              Vision247
            </a>
          </li>
        </ul>

        <div className="pt-8">
          <img 
            src="/my-art/vision.png" 
            alt="Vision247 Artwork" 
            className="w-full rounded-md shadow-lg"
          />
        </div>
      </div>
    </main>
  );
}

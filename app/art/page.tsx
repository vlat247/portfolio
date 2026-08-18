import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Art",
  description: "A collection of my artwork.",
};

export default function Art() {
  return (
    <>
      <div 
        className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/my-art/bg.png')" }}
      />
      <main className="min-h-screen p-8 md:p-12 max-w-2xl mx-auto pt-16 md:pt-24 pb-32 relative">
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

        <div className="pt-12 w-full max-w-lg mx-auto">
          <div className="relative bg-[#f9f8f6] p-2 pb-10 md:p-3 md:pb-14 shadow-2xl border border-gray-200 rounded-[2px] transform -rotate-1 hover:rotate-1 transition-transform duration-500 origin-bottom">
            {/* Paper Texture */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.04] rounded-[2px]"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3CfeColorMatrix type=%22saturate%22 values=%220%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E")' }}
            />
            
            <div className="relative w-full overflow-hidden border border-gray-300 shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]">
              <img 
                src="/my-art/vision.png" 
                alt="Vision247 Artwork" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}

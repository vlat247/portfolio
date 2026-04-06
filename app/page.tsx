"use client";

import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#qwertyuiopasdfghjklzxcvbnm";

function ScrambleText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Faster interval for jittery smooth scramble, locking letters left-to-right
    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < Math.floor(iteration)) {
              return char;
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iteration += 1 / 3; // Controls speed: 3 ticks (90ms) per letter

      if (iteration >= text.length) {
        clearInterval(intervalRef.current!);
        setDisplayText(text);
      }
    }, 30);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span onMouseEnter={startScramble} className="cursor-default inline-block">
      {displayText}
    </span>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-between p-12 sm:p-24 pb-4 sm:pb-6">
      <main className="flex flex-col gap-6 items-start max-w-2xl mt-20">
        <h1 className="text-8xl sm:text-9xl font-black tracking-tighter text-white">
          <ScrambleText text="vlat" /> 
        </h1>
        <div className="space-y-4 text-zinc-300 text-xl sm:text-2xl max-w-lg">
          <p>
            Creative Developer & Digital Artist.
          </p>
          <p className="text-base sm:text-lg text-zinc-400">
            Iqanat alumni
            <br />
            Nazarabayev University student
            <br />
            Web Developer
            <br />
            CEO of quuint.com
          </p>

        </div>

        {/* Projects Section */}
        <div className="mt-12 md:mt-16 w-full">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white border-b border-zinc-800 pb-2">Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="https://quuint.com" target="_blank" className="flex flex-col p-5 border border-zinc-800 rounded-xl hover:bg-zinc-900 hover:border-zinc-700 transition-all">
              <h3 className="font-bold text-xl text-white mb-2">quuint.com</h3>
              <p className="text-sm text-zinc-400 flex-grow">A brief description of Quuint and your role as CEO.</p>
              <span className="text-xs text-zinc-500 mt-4 uppercase tracking-wider font-semibold">Visit Site →</span>
            </Link>
            <div className="flex flex-col p-5 border border-zinc-800 rounded-xl border-dashed hover:bg-zinc-900 transition-all cursor-pointer">
              <h3 className="font-bold text-xl text-white mb-2">Your Next Project</h3>
              <p className="text-sm text-zinc-400 flex-grow">Showcase another amazing piece of work you have built here.</p>
              <span className="text-xs text-zinc-500 mt-4 uppercase tracking-wider font-semibold">Coming Soon</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 text-zinc-500 mt-16 sm:mt-24">
        <Link 
          href="mailto:voddooo247@gmail.com" 
          className="flex items-center gap-2 w-fit hover:text-white transition-colors"
        >
          <Mail size={24} />
          <span>Email</span>
        </Link>
        <Link 
          href="https://www.instagram.com/vlat247/" 
          target="_blank" 
          className="flex items-center gap-2 w-fit hover:text-white transition-colors"
        >
          <Instagram size={24} />
          <span>Instagram</span>
        </Link>
        <Link 
          href="https://github.com/vlat247" 
          target="_blank"
          className="flex items-center gap-2 w-fit hover:text-white transition-colors"
        >
          <Github size={24} />
          <span>GitHub</span>
        </Link>
        <Link 
          href="https://www.linkedin.com/in/vladislav-solomonov-8052823a7/" 
          target="_blank"
          className="flex items-center gap-2 w-fit hover:text-white transition-colors"
        >
          <Linkedin size={24} />
          <span>LinkedIn</span>
        </Link>
      </footer>
    </div>
  );
}

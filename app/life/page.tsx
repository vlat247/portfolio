import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Life in 5 Minutes",
  description: "A brief look at my journey from a rural village in eastern Kazakhstan to studying Mathematics at Nazarbayev University and coding.",
};

export default function Life() {
  return (
    <main className="min-h-screen p-8 md:p-12 max-w-2xl mx-auto pt-16 md:pt-24 pb-32">
      <h1 className="text-xl md:text-2xl font-normal tracking-wide text-[var(--color-text)] mb-4">
        My life in 5 minutes be like:
      </h1>
      
      <div className="space-y-4 text-lg leading-snug text-[var(--color-text)]">
        <h2 className="font-medium mb-4">
          <Link href="/" className="hover:opacity-70 transition-opacity italic">
            Vladislav Solomonov
          </Link>
        </h2>
        
        <p>
          I grew up in a small village in eastern Kazakhstan, Ust-Talovka. No big plans, no ambitions — just a regular rural kid who somehow won some Olympiads.
        </p>
        
        <p>
          In 8th grade that got me into IQHSB, a private school in Burabay. That place changed everything. New people, new standards, new hunger. I applied to universities across the world. Got into one — Nazarbayev University. Turned out to be the right one.
        </p>
        
        <p>
          In school I met Zhansar. The hardest working person I've ever known. He pulled me into Hack Club's Neighborhood program and said — just build something. So I did. A Pomodoro timer where you grow a garden. My first project ever.
        </p>
        
        <p>
          He died in January this year. Car accident. I keep building.
        </p>
        
        <p>
          Before code there was drawing school — 8 years of it.
        </p>
        
        <p>
          Now I'm 18, studying Mathematics, shipping code, and trying to experience as much of this world as possible.
        </p>

        <div className="pt-8 space-y-4">
          <p>
            Currently wearing — <a href="https://www.fragrantica.com/perfume/Essential-Parfums/Bois-Imperial-64338.html" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400 decoration-1 underline-offset-3 hover:decoration-gray-500 transition-opacity">Bois Impérial, Essential Parfums</a>
          </p>
        </div>
      </div>
    </main>
  );
}

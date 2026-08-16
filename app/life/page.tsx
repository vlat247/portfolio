import type { Metadata } from "next";
import Link from "next/link";
import FirstProjectGallery from "./FirstProjectGallery";
import IqanatGallery from "./IqanatGallery";

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
          I grew up in a small village in East Kazakhstan, Ust-Talovka. It was a quiet place, and for a long time, I didn’t really think about what I wanted to do with my life. I was just a regular kid growing up there.
        </p>
        
        <div>
          In 8th grade, I got into <IqanatGallery />. That place changed a lot for me. New people, new standards, new motivation. I grew a lot academically and eventually got into Nazarbayev University.
        </div>
        
        <div>
          At school, I met Zhansar — the hardest-working person I’ve ever known. He pulled me into coding and Hack Club’s Neighborhood program and told me: just ship something. So I did. A Pomodoro timer where you grow a garden. Haha, <FirstProjectGallery />.
        </div>
        
        <p>
          Zhansar is no longer with us, but I still keep building, carrying a little bit of what he gave me along the way.
        </p>
        
        <p>
          Now I’m 18, studying Mathematics, shipping code, and trying to experience as much of this world as I can.
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

export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-12 max-w-2xl mx-auto pt-16 md:pt-24 pb-32">
      <h1 className="text-xl md:text-2xl font-normal tracking-wide text-[var(--color-text)] mb-8">
        Vladislav Solomonov
      </h1>
      
      <div className="space-y-4 text-lg leading-snug text-[var(--color-text)]">
        <p>
          I'm <a href="https://github.com/vlat247" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400 decoration-1 underline-offset-3 hover:decoration-gray-500 transition-opacity">developer</a> and <a href="" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-400 decoration-1 underline-offset-3 hover:decoration-gray-500 transition-opacity">student at Nazarbayev University</a>, majoring in Mathematics. I'm 18 years old and started coding in summer '25.
        </p>

        <p>
          My life's goal is simple: experience and learn as much as possible.
        </p>

        <p>Some of interesing things</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>My life in 5 minutes</li>
          <li>Things I believe in</li>
        </ul>

        <p>
          You can read my writing or check out my projects, or follow me online. Reach out if interested.
        </p>
      </div>
    </main>
  );
}

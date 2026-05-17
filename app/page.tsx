export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-12 max-w-2xl mx-auto pt-16 md:pt-24 pb-32">
      <h1 className="text-xl md:text-2xl font-normal tracking-wide text-[var(--color-text)] mb-8">
        Vladislav Solomonov
      </h1>
      
      <div className="space-y-4 text-lg leading-snug text-[var(--color-text)]">
        <p>
          I’m a developer and writer. I study at Nazarbayev University.  I’ve been coding for 2 years and teaching for the second half.
        </p>

        <p>
          My life’s work is to make technology easy to understand and interesting to learn about. I’m a husband, father, and a massive music fan. I last listened to Ran To Atlanta (feat. Future & Molly Santana) by Drake, Future, Molly Santana.
        </p>

        <p>Some of my favorite writing includes:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Things I Believe</li>
          <li>Coding Agents & Complexity Budgets</li>
          <li>Building Low-Level Software with Only Coding Agents</li>
          <li>How Does Image Compression Work?</li>
          <li>Developer Marketing</li>
          <li>Understanding AI</li>
        </ul>

        <p>
          You can read my writing or code, or follow me online. I also make videos, advise companies, and do angel investing. Reach out if interested.
        </p>
      </div>
    </main>
  );
}

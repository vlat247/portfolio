"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SpotifyTrack } from "@/lib/spotify";

interface SpotifyStatsResponse {
  isDemo: boolean;
  currentlyPlaying: SpotifyTrack | null;
  topTracks: SpotifyTrack[];
}

export default function MusicTaste() {
  const [data, setData] = useState<SpotifyStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch Spotify Stats from our API
  const fetchStats = async () => {
    try {
      const res = await fetch("/api/spotify/stats");
      if (res.ok) {
        const stats = await res.json();
        setData(stats);
      }
    } catch (error) {
      console.error("Error fetching Spotify stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Poll currently playing track every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const currentlyPlaying = data?.currentlyPlaying;

  return (
    <main className="min-h-screen p-8 md:p-12 max-w-2xl mx-auto pt-16 md:pt-24 pb-32 selection:bg-emerald-500/10 selection:text-emerald-300">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          href="/"
          className="hover:opacity-75 transition-opacity text-sm text-gray-400 italic"
        >
          ← Vladislav Solomonov
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-xl md:text-2xl font-normal tracking-wide text-[var(--color-text)] mb-8">
        Music taste
      </h1>

      {loading ? (
        <div className="space-y-4 font-normal text-lg text-gray-400 italic">
          <p>Loading tracks...</p>
        </div>
      ) : (
        <div className="space-y-8 text-lg leading-snug text-[var(--color-text)]">
          {/* Currently Playing (Simple Minimalist text line) */}
          {currentlyPlaying && currentlyPlaying.isPlaying && (
            <p className="text-sm text-emerald-400/90 tracking-wide font-normal flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Listening to:{" "}
              <a
                href={currentlyPlaying.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-emerald-500/30 hover:decoration-emerald-400 transition-all font-medium"
              >
                {currentlyPlaying.title}
              </a>{" "}
              by {currentlyPlaying.artist}
            </p>
          )}

          {/* Simple Tracks List */}
          <div>
            <p className="mb-4 text-gray-400 text-base italic">
              Some of my favorite tracks recently:
            </p>

            <ul className="space-y-3">
              {data?.topTracks && data.topTracks.length > 0 ? (
                data.topTracks.map((track, index) => (
                  <li key={track.title + index} className="flex items-baseline gap-2">
                    <span className="text-sm font-mono text-gray-500 w-6 shrink-0">
                      {index + 1}.
                    </span>
                    <span className="truncate">
                      <a
                        href={track.songUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-gray-400 decoration-1 underline-offset-3 hover:decoration-gray-500 transition-opacity"
                      >
                        {track.title}
                      </a>{" "}
                      <span className="text-gray-400 font-light text-base">
                        — {track.artist}
                      </span>
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 italic">No tracks found.</li>
              )}
            </ul>
          </div>

          {/* Minimalist Demo Banner inside local environment at bottom */}
          {data?.isDemo && (
            <div className="pt-16 border-t border-transparent text-xs text-gray-500 font-light leading-relaxed">
              <p>
                * Demo mode active. To show your live Spotify stats, add your Spotify credentials in{" "}
                <code>.env.local</code>. Click{" "}
                <a
                  href="/api/spotify/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 underline font-medium"
                >
                  here to authorize
                </a>
                .
              </p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

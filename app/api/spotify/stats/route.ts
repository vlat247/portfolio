import { NextResponse } from "next/server";
import {
  getCurrentlyPlaying,
  getRecentlyPlayed,
  getTopTracks,
  getTopArtists,
  SpotifyTrack,
  SpotifyArtist,
} from "@/lib/spotify";

export async function GET() {
  const isConfigured = !!(
    process.env.SPOTIFY_CLIENT_ID &&
    process.env.SPOTIFY_CLIENT_SECRET &&
    process.env.SPOTIFY_REFRESH_TOKEN
  );

  if (!isConfigured) {
    // Return mock data for Demo Mode when keys are not configured yet
    const mockCurrentlyPlaying: SpotifyTrack = {
      isPlaying: true,
      title: "Bois Impérial",
      artist: "Essential Parfums",
      album: "Scent & Code",
      albumImageUrl: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=300&h=300&q=80",
      songUrl: "https://www.fragrantica.com/perfume/Essential-Parfums/Bois-Imperial-64338.html",
      previewUrl: null,
      durationMs: 240000,
      progressMs: 98000,
    };

    const mockRecentlyPlayed: SpotifyTrack[] = [
      {
        title: "Let It Happen",
        artist: "Tame Impala",
        album: "Currents",
        albumImageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=150&h=150&q=80",
        songUrl: "https://spotify.com",
        previewUrl: null,
      },
      {
        title: "Weird Fishes/Arpeggi",
        artist: "Radiohead",
        album: "In Rainbows",
        albumImageUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=150&h=150&q=80",
        songUrl: "https://spotify.com",
        previewUrl: null,
      },
    ];

    const mockTopTracks: SpotifyTrack[] = [
      {
        title: "Let It Happen",
        artist: "Tame Impala",
        album: "Currents",
        albumImageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&h=300&q=80",
        songUrl: "https://spotify.com",
        previewUrl: null,
      },
      {
        title: "Weird Fishes/Arpeggi",
        artist: "Radiohead",
        album: "In Rainbows",
        albumImageUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=300&h=300&q=80",
        songUrl: "https://spotify.com",
        previewUrl: null,
      },
      {
        title: "Intro",
        artist: "The xx",
        album: "xx",
        albumImageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&h=300&q=80",
        songUrl: "https://spotify.com",
        previewUrl: null,
      },
      {
        title: "Starboy",
        artist: "The Weeknd",
        album: "Starboy",
        albumImageUrl: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=300&h=300&q=80",
        songUrl: "https://spotify.com",
        previewUrl: null,
      },
      {
        title: "Pyramids",
        artist: "Frank Ocean",
        album: "Channel Orange",
        albumImageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&h=300&q=80",
        songUrl: "https://spotify.com",
        previewUrl: null,
      },
    ];

    const mockTopArtists: SpotifyArtist[] = [
      {
        name: "Radiohead",
        genres: ["art rock", "alternative rock", "melancholia"],
        images: [
          { url: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?auto=format&fit=crop&w=300&h=300&q=80" },
        ],
        external_urls: { spotify: "https://spotify.com" },
        followers: { total: 8500000 },
      },
      {
        name: "Tame Impala",
        genres: ["psychedelic pop", "neo-psychedelia", "indie"],
        images: [
          { url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&h=300&q=80" },
        ],
        external_urls: { spotify: "https://spotify.com" },
        followers: { total: 7200000 },
      },
      {
        name: "The xx",
        genres: ["indie pop", "dream pop", "minimalism"],
        images: [
          { url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=300&h=300&q=80" },
        ],
        external_urls: { spotify: "https://spotify.com" },
        followers: { total: 3100000 },
      },
    ];

    return NextResponse.json({
      isDemo: true,
      currentlyPlaying: mockCurrentlyPlaying,
      recentlyPlayed: mockRecentlyPlayed,
      topTracks: mockTopTracks,
      topArtists: mockTopArtists,
    });
  }

  // Fetch real data in parallel
  try {
    const [currentlyPlaying, recentlyPlayed, topTracks, topArtists] = await Promise.all([
      getCurrentlyPlaying(),
      getRecentlyPlayed(5),
      getTopTracks(10, "short_term"),
      getTopArtists(10, "short_term"),
    ]);

    return NextResponse.json({
      isDemo: false,
      currentlyPlaying,
      recentlyPlayed,
      topTracks,
      topArtists,
    });
  } catch (error: any) {
    console.error("Failed to fetch Spotify stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch Spotify statistics from API." },
      { status: 500 }
    );
  }
}

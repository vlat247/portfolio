const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOP_ARTISTS_ENDPOINT = `https://api.spotify.com/v1/me/top/artists`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export interface SpotifyTrack {
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  previewUrl: string | null;
  isPlaying?: boolean;
  durationMs?: number;
  progressMs?: number;
}

export interface SpotifyArtist {
  name: string;
  images: { url: string }[];
  external_urls: { spotify: string };
  genres: string[];
  followers: { total: number };
}

async function getAccessToken() {
  if (!client_id || !client_secret || !refresh_token) {
    throw new Error("Spotify credentials are not configured.");
  }

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }).toString(),
    next: {
      revalidate: 0, // don't cache access token fetches
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to get access token: ${response.status} ${errorText}`);
  }

  return response.json();
}

export async function getCurrentlyPlaying(): Promise<SpotifyTrack | null> {
  try {
    const { access_token } = await getAccessToken();

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      next: {
        revalidate: 0,
      },
    });

    if (response.status === 204 || response.status > 400) {
      return null;
    }

    const song = await response.json();
    if (!song.item) {
      return null;
    }

    return {
      isPlaying: song.is_playing,
      title: song.item.name,
      artist: song.item.artists.map((_artist: any) => _artist.name).join(", "),
      album: song.item.album.name,
      albumImageUrl: song.item.album.images[0]?.url || "",
      songUrl: song.item.external_urls.spotify,
      previewUrl: song.item.preview_url || null,
      durationMs: song.item.duration_ms,
      progressMs: song.progress_ms,
    };
  } catch (error) {
    console.error("Error in getCurrentlyPlaying:", error);
    return null;
  }
}

export async function getRecentlyPlayed(limit = 5): Promise<SpotifyTrack[]> {
  try {
    const { access_token } = await getAccessToken();

    const response = await fetch(`${RECENTLY_PLAYED_ENDPOINT}?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      next: {
        revalidate: 60, // Cache for 1 minute
      },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.items.map((item: any) => ({
      title: item.track.name,
      artist: item.track.artists.map((_artist: any) => _artist.name).join(", "),
      album: item.track.album.name,
      albumImageUrl: item.track.album.images[0]?.url || "",
      songUrl: item.track.external_urls.spotify,
      previewUrl: item.track.preview_url || null,
    }));
  } catch (error) {
    console.error("Error in getRecentlyPlayed:", error);
    return [];
  }
}

export async function getTopTracks(limit = 10, timeRange = "short_term"): Promise<SpotifyTrack[]> {
  try {
    const { access_token } = await getAccessToken();

    const response = await fetch(`${TOP_TRACKS_ENDPOINT}?limit=${limit}&time_range=${timeRange}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      next: {
        revalidate: 3600, // Cache for 1 hour
      },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.items.map((track: any) => ({
      title: track.name,
      artist: track.artists.map((_artist: any) => _artist.name).join(", "),
      album: track.album.name,
      albumImageUrl: track.album.images[0]?.url || "",
      songUrl: track.external_urls.spotify,
      previewUrl: track.preview_url || null,
    }));
  } catch (error) {
    console.error("Error in getTopTracks:", error);
    return [];
  }
}

export async function getTopArtists(limit = 10, timeRange = "short_term"): Promise<SpotifyArtist[]> {
  try {
    const { access_token } = await getAccessToken();

    const response = await fetch(`${TOP_ARTISTS_ENDPOINT}?limit=${limit}&time_range=${timeRange}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      next: {
        revalidate: 3600, // Cache for 1 hour
      },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.items.map((artist: any) => ({
      name: artist.name,
      images: artist.images,
      external_urls: artist.external_urls,
      genres: artist.genres,
      followers: artist.followers,
    }));
  } catch (error) {
    console.error("Error in getTopArtists:", error);
    return [];
  }
}

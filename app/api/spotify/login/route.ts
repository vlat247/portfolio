import { NextResponse } from "next/server";

export async function GET() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;

  if (!client_id) {
    return NextResponse.json(
      {
        error: "SPOTIFY_CLIENT_ID is not configured in your environment. Please add it to your .env.local file.",
      },
      { status: 500 }
    );
  }

  const scopes = [
    "user-top-read",
    "user-read-currently-playing",
    "user-read-recently-played",
  ].join(" ");

  const redirect_uri = "http://localhost:3000/api/spotify/callback";

  const spotifyAuthUrl = new URL("https://accounts.spotify.com/authorize");
  spotifyAuthUrl.searchParams.append("response_type", "code");
  spotifyAuthUrl.searchParams.append("client_id", client_id);
  spotifyAuthUrl.searchParams.append("scope", scopes);
  spotifyAuthUrl.searchParams.append("redirect_uri", redirect_uri);

  return NextResponse.redirect(spotifyAuthUrl.toString());
}

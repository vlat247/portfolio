import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return new NextResponse(
      `
      <html>
        <head>
          <title>Spotify Auth Error</title>
          <style>
            body { background: #1c1c1c; color: #E8E5DF; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .card { background: #2a2a2a; padding: 2.5rem; border-radius: 12px; max-width: 500px; text-align: center; border: 1px solid #444; }
            h1 { color: #ff5555; margin-bottom: 1rem; }
            p { opacity: 0.8; line-height: 1.5; }
            a { color: #1db954; text-decoration: none; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Authentication Failed</h1>
            <p>Spotify returned an error: <strong>${error}</strong></p>
            <p><a href="/api/spotify/login">Try again</a></p>
          </div>
        </body>
      </html>
      `,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  if (!code) {
    return new NextResponse(
      `
      <html>
        <head>
          <title>Spotify Auth Invalid Code</title>
          <style>
            body { background: #1c1c1c; color: #E8E5DF; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .card { background: #2a2a2a; padding: 2.5rem; border-radius: 12px; max-width: 500px; text-align: center; border: 1px solid #444; }
            h1 { color: #f1c40f; margin-bottom: 1rem; }
            p { opacity: 0.8; line-height: 1.5; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Invalid Request</h1>
            <p>No authorization code found in the query parameters.</p>
          </div>
        </body>
      </html>
      `,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!client_id || !client_secret) {
    return new NextResponse(
      `
      <html>
        <head>
          <title>Spotify Config Missing</title>
          <style>
            body { background: #1c1c1c; color: #E8E5DF; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .card { background: #2a2a2a; padding: 2.5rem; border-radius: 12px; max-width: 500px; text-align: center; border: 1px solid #444; }
            h1 { color: #ff5555; margin-bottom: 1rem; }
            p { opacity: 0.8; line-height: 1.5; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Configuration Missing</h1>
            <p>Make sure you have added <strong>SPOTIFY_CLIENT_ID</strong> and <strong>SPOTIFY_CLIENT_SECRET</strong> to your <code>.env.local</code> before authenticating.</p>
          </div>
        </body>
      </html>
      `,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  try {
    const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
    const redirect_uri = "http://localhost:3000/api/spotify/callback";

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri,
      }).toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Spotify token exchange failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const refresh_token = data.refresh_token;

    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Spotify Connection Success</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              background: #1c1c1c;
              color: #E8E5DF;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              padding: 1rem;
              box-sizing: border-box;
            }
            .card {
              background: #232323;
              border: 1px solid #333;
              padding: 2.5rem;
              border-radius: 16px;
              max-width: 600px;
              width: 100%;
              box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            }
            h1 {
              color: #1DB954;
              margin-top: 0;
              font-size: 1.8rem;
              font-weight: 600;
              margin-bottom: 0.5rem;
            }
            p {
              color: #a0a0a0;
              font-size: 1rem;
              line-height: 1.6;
              margin-bottom: 1.5rem;
            }
            .token-container {
              background: #121212;
              border: 1px solid #444;
              border-radius: 8px;
              padding: 1rem;
              position: relative;
              margin-bottom: 1.5rem;
            }
            .token-label {
              font-size: 0.75rem;
              color: #888;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              margin-bottom: 0.5rem;
            }
            .token-value {
              font-family: monospace;
              color: #1DB954;
              font-size: 0.95rem;
              word-break: break-all;
              user-select: all;
            }
            .copy-btn {
              background: #1DB954;
              color: #000;
              border: none;
              padding: 0.6rem 1.2rem;
              border-radius: 50px;
              font-weight: bold;
              cursor: pointer;
              transition: transform 0.2s, background 0.2s;
              margin-top: 1rem;
            }
            .copy-btn:hover {
              background: #1ed760;
              transform: scale(1.02);
            }
            .instructions {
              background: #2c2c2c;
              border-left: 4px solid #1DB954;
              padding: 1rem;
              border-radius: 0 8px 8px 0;
              font-size: 0.9rem;
            }
            .instructions ol {
              margin: 0;
              padding-left: 1.2rem;
            }
            .instructions li {
              color: #ccc;
              margin-bottom: 0.5rem;
            }
            .instructions li code {
              background: #1c1c1c;
              padding: 0.2rem 0.4rem;
              border-radius: 4px;
              color: #E8E5DF;
              font-family: monospace;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Connected Successfully! 🎉</h1>
            <p>You have authorized your portfolio app with Spotify. Here is your permanent refresh token. Copy the configuration block below and append it directly to your <code>.env.local</code> file in your project.</p>
            
            <div class="token-container">
              <div class="token-label">Configuration for .env.local</div>
              <div class="token-value" id="tokenBlock">SPOTIFY_REFRESH_TOKEN=${refresh_token}</div>
            </div>

            <button class="copy-btn" onclick="copyToken()">Copy Configuration</button>

            <div style="margin-top: 2rem;">
              <div class="instructions">
                <strong>Next Steps:</strong>
                <ol style="margin-top: 0.5rem;">
                  <li>Click the "Copy Configuration" button above.</li>
                  <li>Open or create <code>.env.local</code> in your project root folder (<code>portfolio-vlat</code>).</li>
                  <li>Paste the copied line at the end of the file.</li>
                  <li>Restart your local server (<code>npm run dev</code>).</li>
                  <li>Go to <a href="/music" style="color: #1DB954; text-decoration: underline;">/music</a> to view your live stats!</li>
                </ol>
              </div>
            </div>
          </div>

          <script>
            function copyToken() {
              const tokenText = document.getElementById('tokenBlock').innerText;
              navigator.clipboard.writeText(tokenText).then(() => {
                const btn = document.querySelector('.copy-btn');
                btn.innerText = 'Copied! ✅';
                btn.style.background = '#e8e5df';
                btn.style.color = '#000';
                setTimeout(() => {
                  btn.innerText = 'Copy Configuration';
                  btn.style.background = '#1DB954';
                  btn.style.color = '#000';
                }, 3000);
              });
            }
          </script>
        </body>
      </html>
      `,
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (err: any) {
    return new NextResponse(
      `
      <html>
        <head>
          <title>Spotify Token Exchange Error</title>
          <style>
            body { background: #1c1c1c; color: #E8E5DF; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .card { background: #2a2a2a; padding: 2.5rem; border-radius: 12px; max-width: 500px; text-align: center; border: 1px solid #444; }
            h1 { color: #ff5555; margin-bottom: 1rem; }
            p { opacity: 0.8; line-height: 1.5; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Token Exchange Failed</h1>
            <p>${err.message}</p>
          </div>
        </body>
      </html>
      `,
      { headers: { "Content-Type": "text/html" } }
    );
  }
}

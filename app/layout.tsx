import type { Metadata } from "next";
import "./globals.css";
import PixelSnow from "@/components/PixelSnow";

export const metadata: Metadata = {
  title: "vlat24/7",
  description: "Portfolio of vlat247",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased relative bg-black text-white font-google-code`}
      >
        <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
          <PixelSnow
            color="#ffffff"
            flakeSize={0.011}
            minFlakeSize={1.5}
            pixelResolution={200}
            speed={1.25}
            depthFade={8}
            farPlane={20}
            brightness={1}
            gamma={0.4545}
            density={0.3}
            variant="square"
            direction={65}
          />
        </div>
        {children}
      </body>
    </html>
  );
}

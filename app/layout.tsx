import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers/Providers";

export const metadata: Metadata = {
  title: "TYK",
  description: "Give exam to test you knowledge",
};

const poppins = Poppins({
  weight: ["400", "500", "700", "900"],
  style: ["italic", "normal"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${poppins.className} overscroll-none antialiased min-h-screen bg-gradient-to-b from-[#0b1220] via-[#0b1220] to-[#0f172a] text-slate-200`}
      >
        {/* Ambient gradient blobs */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-600/30 to-purple-600/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 blur-3xl" />
        </div>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

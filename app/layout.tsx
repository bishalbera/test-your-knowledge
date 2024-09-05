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
    <html lang="en">
      <body className={`${poppins.className} overscroll-none antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

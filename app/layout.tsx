import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "./context/query.provider";
import { Wagmi } from "./context/wagmi.provider";
import { Navbar } from "@/components/Navbar";
import { Magic } from "./context/magic.provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Curate AI : Next generation content sharing platform",
  description: "Curate AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Magic>
          <Wagmi>
            <QueryProvider>
              <Navbar />
              {children}
            </QueryProvider>
          </Wagmi>
        </Magic>
      </body>
    </html>
  );
}

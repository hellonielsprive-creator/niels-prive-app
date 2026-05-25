import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MobileBottomNav from "./components/MobileBottomNav";
import { Toaster } from "react-hot-toast";
import AiAssistantProvider from "./components/ai/AiAssistantProvider";
import AiAssistantButton from "./components/ai/AiAssistantButton";
import AiChatPanel from "./components/ai/AiChatPanel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Niels Privé — Luxury Hospitality Reimagined",
    template: "%s | Niels Privé"
  },
  description: "AI-native luxury travel experiences, curated for the modern explorer. Discover cinematic escapes at Niels Privé.",
  keywords: ["luxury hotels", "premium travel", "hospitality", "boutique stays", "Niels Privé"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nielsprive.com",
    siteName: "Niels Privé",
    title: "Niels Privé — Luxury Hospitality Reimagined",
    description: "AI-native luxury travel experiences, curated for the modern explorer.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Niels Privé — Luxury Hospitality Reimagined",
    description: "AI-native luxury travel experiences, curated for the modern explorer.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AiAssistantProvider>
          {children}

          <Toaster
  position="top-right"
  toastOptions={{
    style: {
      background: "#111111",
      color: "#ffffff",
      border: "1px solid rgba(255,255,255,0.08)",
    },
  }}
/>

          <AiAssistantButton />
          <AiChatPanel />

          <MobileBottomNav />
        </AiAssistantProvider>
      </body>
    </html>
  );
}
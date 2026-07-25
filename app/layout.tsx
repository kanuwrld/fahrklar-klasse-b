import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

function originFromHeaders(headerStore: Awaited<ReturnType<typeof headers>>) {
  const host =
    headerStore.get("x-forwarded-host") ??
    headerStore.get("host") ??
    "localhost:3000";
  const protocol =
    headerStore.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");

  try {
    return new URL(`${protocol}://${host}`);
  } catch {
    return new URL("http://localhost:3000");
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const headerStore = await headers();
  const metadataBase = originFromHeaders(headerStore);
  const socialImage = new URL("/og.png", metadataBase).toString();

  return {
    metadataBase,
    title: "Fahrklar — подготовка к Fahrprüfung Klasse B",
    description:
      "Интерактивный тренажёр практической Fahrprüfung в Германии: дорожные ситуации, технические вопросы, команды Prüfer и пробный экзамен.",
    applicationName: "Fahrklar",
    authors: [{ name: "Fahrklar" }],
    category: "education",
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
      apple: "/favicon.png",
    },
    openGraph: {
      type: "website",
      locale: "de_DE",
      title: "FAHRKLAR — Klasse B · 07.08.2026",
      description: "Sehen. Entscheiden. Bestehen.",
      siteName: "Fahrklar",
      images: [
        {
          url: socialImage,
          width: 1672,
          height: 941,
          alt: "Fahrklar — Klasse B driving exam trainer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "FAHRKLAR — Klasse B · 07.08.2026",
      description: "Sehen. Entscheiden. Bestehen.",
      images: [socialImage],
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0c0f0d",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

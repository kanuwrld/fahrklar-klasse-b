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
    title: "Fahrklar — German Practical Driving Test Trainer",
    description:
      "Interactive DE/RU trainer for the German Klasse B practical driving test: road situations, vehicle checks, examiner commands and mock exams.",
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
      locale: "en_GB",
      alternateLocale: ["de_DE", "ru_RU"],
      title: "Fahrklar — German Klasse B Driving Test Trainer",
      description:
        "German exam content with Russian explanations, 20 visual road situations and 36 vehicle-check questions.",
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
      title: "Fahrklar — German Klasse B Driving Test Trainer",
      description:
        "German exam content with Russian explanations, visual road situations and vehicle-check questions.",
      images: [socialImage],
    },
    robots: {
      index: true,
      follow: true,
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

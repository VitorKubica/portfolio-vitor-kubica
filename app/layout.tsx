import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { SectionProvider } from "@/components/SectionContext";
import Header from "@/components/Header";
import SectionNav from "@/components/SectionNav";
import MotionProvider from "@/components/MotionProvider";

const geistSans = localFont({
  src: [
    { path: "./fonts/geist-latin.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/geist-latin-ext.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-geist-sans",
  display: "swap",
});

const fluid = localFont({
  src: "./fonts/fluid.ttf",
  variable: "--font-fluid",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800"],
  style: ["italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#044d35",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export const metadata: Metadata = {
  title: "Vitor Kubica — FullStack Developer",
  description:
    "Portfolio of Vitor Kubica. FullStack Developer crafting solid, scalable products with great user experiences.",
  keywords: [
    "Vitor Kubica",
    "FullStack Developer",
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Portfolio",
    "São Paulo",
  ],
  authors: [{ name: "Vitor K. Silveira" }],
  creator: "Vitor K. Silveira",
  metadataBase: new URL("https://vitorkubica.dev"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Vitor Kubica — FullStack Developer",
    description:
      "FullStack Developer crafting solid, scalable products with great user experiences.",
    siteName: "Vitor Kubica Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitor Kubica — FullStack Developer",
    description:
      "FullStack Developer crafting solid, scalable products with great user experiences.",
    creator: "@vitorkubica",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${playfair.variable} ${fluid.variable} antialiased`}
    >
      <body className="min-h-dvh bg-bg text-accent">
        <MotionProvider>
          <SectionProvider>
            <div id="app-root" data-current-section="une">
              <Header />
              <SectionNav />
              {children}
            </div>
          </SectionProvider>
        </MotionProvider>
      </body>
    </html>
  );
}

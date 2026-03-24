import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SectionProvider } from "@/components/SectionContext";
import Header from "@/components/Header";
import SectionNav from "@/components/SectionNav";

const geistSans = localFont({
  src: [
    { path: "./fonts/geist-latin.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/geist-latin-ext.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Vitor Kubica — Frontend Developer",
  description:
    "Portfolio of Vitor Kubica. Frontend Developer crafting solid, scalable products with great user experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} antialiased`}
    >
      <body className="min-h-dvh bg-bg text-accent">
        <SectionProvider>
          <div id="app-root" data-current-section="une">
            <Header />
            <SectionNav />
            {children}
          </div>
        </SectionProvider>
      </body>
    </html>
  );
}

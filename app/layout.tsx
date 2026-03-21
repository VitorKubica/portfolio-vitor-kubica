import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SectionProvider } from "@/components/SectionContext";
import Header from "@/components/Header";
import SectionNav from "@/components/SectionNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-dvh">
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

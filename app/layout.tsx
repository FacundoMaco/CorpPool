import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthGuard from "@/components/AuthGuard";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CorpPool - Viajes compartidos corporativos",
  description: "Comparte viajes al trabajo con tus compañeros",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CorpPool",
  },
  themeColor: "#121212",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#121212" />
      </head>
      <body className={`${inter.variable} antialiased text-[#d1d5db]`} style={{ background: "radial-gradient(ellipse at center, #1a1a1a 0%, #0f0f0f 100%)" }}>
        <div className="min-h-screen flex justify-center items-start sm:p-4 sm:p-6">
          <div className="w-full max-w-[420px] bg-[#121212]/80 backdrop-blur-sm shadow-2xl sm:rounded-3xl overflow-hidden min-h-screen sm:min-h-0 sm:h-auto">
            <AuthGuard>{children}</AuthGuard>
          </div>
        </div>
      </body>
    </html>
  );
}

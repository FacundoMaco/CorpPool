import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthGuard from "@/components/AuthGuard";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CorpPool - Viajes compartidos corporativos",
  description: "Comparte viajes al trabajo con tus compañeros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.variable} antialiased bg-[#121212] text-[#f5f5f5]`}>
        <div className="min-h-screen flex justify-center">
          <div className="w-full max-w-[420px] bg-[#121212]">
            <AuthGuard>{children}</AuthGuard>
          </div>
        </div>
      </body>
    </html>
  );
}

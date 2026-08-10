import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { MusicProvider } from "@/lib/MusicContext";
import { AuthProvider } from "@/context/AuthContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Duta Pariwisata Indonesia",
  description: "Temukan dan pilih Duta Pariwisata favoritmu untuk Festival Duta Indonesia 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable}  antialiased`}>
        <AuthProvider>
          <MusicProvider>{children}</MusicProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

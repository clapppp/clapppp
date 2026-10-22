import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./ui/navbar";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "Park Suhyeon",
  description: "Park Suhyeon Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;//children은 같은디렉토리의 page파일
}>) {
  return (
    <html lang="ko">
      <body className={`${GeistSans.className} antialiased`}>
        <NavBar />
        <main className="mx-auto w-full max-w-3xl px-5 pt-28 pb-24">{children}</main>
        <footer className="mx-auto max-w-3xl px-5 pb-10 text-sm text-[var(--muted)]">
          © {new Date().getFullYear()} Park Suhyeon
        </footer>
      </body>
    </html>
  );
}

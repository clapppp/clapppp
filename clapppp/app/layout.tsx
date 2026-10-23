import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./ui/navbar";
import { GeistSans } from "geist/font/sans";
import { FaGithub } from "react-icons/fa";

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
        <div className="mx-auto w-full max-w-xl px-6 py-12">
          <NavBar />
          <main className="mt-14 min-h-[50vh]">{children}</main>
          <footer className="mt-16 flex gap-4 text-sm text-[var(--muted)]">
            <a href="https://github.com/clapppp" className="flex items-center gap-1.5 hover:text-[var(--text)]">
              <FaGithub size={14} /> github
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}

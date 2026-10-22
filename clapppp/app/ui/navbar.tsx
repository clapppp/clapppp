import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/papers", label: "Papers" },
];

export default function NavBar() {
  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur px-2 py-1.5 shadow-lg">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full px-4 py-1.5 text-sm text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] duration-150"
          >
            {link.label}
          </Link>
        ))}
        <span className="mx-1 h-4 w-px bg-[var(--border)]" />
        <a
          href="https://github.com/clapppp"
          aria-label="GitHub"
          className="rounded-full p-2 text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] duration-150"
        >
          <FaGithub size={16} />
        </a>
      </nav>
    </header>
  );
}

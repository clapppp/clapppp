import Link from "next/link";

const links = [
  { href: "/", label: "home" },
  { href: "/projects", label: "projects" },
  { href: "/papers", label: "papers" },
];

export default function NavBar() {
  return (
    <nav className="flex gap-4 text-sm">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="hover:underline">
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

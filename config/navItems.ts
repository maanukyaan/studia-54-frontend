interface INavItem {
  href: string;
  label: string;
}

export const navItems: INavItem[] = [
  { href: "/projects", label: "Projects" },
  { href: "/news", label: "News" },
  { href: "/blog", label: "Blog" },
  { href: "/contacts", label: "Contacts" },
];

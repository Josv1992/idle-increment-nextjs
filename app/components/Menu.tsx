"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Menu() {
  const pathname = usePathname() || "/";

  const menuItems = [
    { id: 1, label: "Home", icon: "🏠", href: "/" },
    { id: 2, label: "Mining", icon: "⛏️", href: "/mining" },
    { id: 3, label: "Woodcutting", icon: "🪓", href: "/woodcutting" },
    { id: 4, label: "Settings", icon: "⚙️", href: "/settings" },
    { id: 5, label: "Profile", icon: "👤", href: "/profile" },
    { id: 6, label: "Help", icon: "❓", href: "/help" },
  ];

  return (
    <nav className="bg-slate-900 text-white h-full p-6 shadow-lg flex flex-col gap-2">
      <h2 className="text-2xl font-bold mb-6 text-blue-300">Menu</h2>
      {menuItems.map((item) => {
        const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.id}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left w-full ${
              active ? "bg-slate-700 ring-2 ring-inset ring-blue-400" : "hover:bg-slate-700"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

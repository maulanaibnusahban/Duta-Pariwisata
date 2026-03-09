"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarItem } from "@/lib/content";

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div
      className={`fixed inset-y-0 left-0 w-full max-w-1/3 lg:max-w-1/5 bg-[#35322F] pt-12 text-white p-3 shadow-xl md:flex flex-col md:inset-auto md:h-screen md:sticky md:top-0 hidden z-10`}
    >
      <div className="flex items-center space-x-3 mb-10 md:mt-0 mt-16">
        <h1 className="text-xl font-bold tracking-wider ml-2">DUTA PARIWISATA INDONESIA</h1>
      </div>

      <nav className="space-y-2">
        {NavbarItem.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-2 px-3 py-2 rounded-sm transition-all ${
              isActive(item.href)
                ? "bg-white/10 text-gold-400"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <item.icon />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

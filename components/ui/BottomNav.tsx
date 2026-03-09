"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarItem } from "@/lib/content";

const BottomNav = () => {
  const pathname = usePathname();

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#35322F] text-gray-400 py-3 flex justify-evenly items-center rounded-t-2xl shadow-2xl z-40 md:hidden">
      {NavbarItem.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex flex-col items-center space-y-1 transition-all ${
            isActive(item.href) ? "text-gold-400" : "hover:text-white"
          }`}
        >
          <item.icon />
          <span className="text-[10px]">{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNav;

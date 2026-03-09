"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogIn } from "lucide-react";
import { NavbarItem } from "@/lib/content";
import { useUser } from "@/lib/useAuth";
import { loginWithGoogle } from "@/lib/auth";

const Sidebar = () => {
  const pathname = usePathname();
  const user = useUser();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div
      className={`fixed inset-y-0 left-0 w-full max-w-1/3 lg:max-w-1/5 bg-[#35322F] pt-12 text-white p-3 shadow-xl md:flex flex-col md:inset-auto md:h-screen md:sticky md:top-0 hidden z-10`}
    >
      <div className="flex items-center space-x-3 mb-10 md:mt-0 mt-16">
        <h1 className="text-xl font-bold tracking-wider ml-2">DUTA PARIWISATA INDONESIA</h1>
      </div>

      <nav className="space-y-2 flex-1">
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

      {/* ── Profile section ── */}
      <div className="mt-auto pt-3 border-t border-white/10">
        {user ? (
          <Link
            href="/profile"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all ${
              isActive("/profile") ? "bg-white/10 text-gold-400" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 ring-1 ring-gold-400/50">
              <Image src={user.avatar} alt={user.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate leading-tight">{user.name}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          </Link>
        ) : (
          <button
            onClick={() => loginWithGoogle()}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <LogIn className="w-5 h-5 shrink-0" />
            <span className="font-medium text-sm">Masuk</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

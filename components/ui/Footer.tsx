import Link from "next/link";
import { Crown, Instagram, Youtube, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { NavbarItem } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-[#35322F] text-white font-plus-jakarta block pb-16 md:pb-0">
      <div className="max-w-7xl mx-auto px-8 pt-12 pb-6">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gold-400/20 flex items-center justify-center">
                <Crown className="w-4 h-4 text-gold-400" />
              </div>
              <h2 className="font-bold text-base tracking-wider text-white">DUTA PARIWISATA</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Platform voting resmi Duta Pariwisata Indonesia. Dukung kandidat favoritmu dan jadikan pariwisata
              Indonesia semakin bersinar di mata dunia.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 pt-1">
              {[
                { icon: Instagram, label: "Instagram", href: "#" },
                { icon: Youtube, label: "YouTube", href: "#" },
                { icon: Twitter, label: "Twitter / X", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-gold-400/20 flex items-center justify-center transition-colors group"
                >
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-gold-400 transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">Navigasi</h3>
            <ul className="space-y-2.5">
              {NavbarItem.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-gold-400 transition-colors group"
                  >
                    <item.icon className="w-3.5 h-3.5 group-hover:text-gold-400 shrink-0" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">Kontak</h3>
            <ul className="space-y-3">
              {[
                { icon: MapPin, text: "Jakarta, Indonesia" },
                { icon: Phone, text: "+62 21 1234 5678" },
                { icon: Mail, text: "info@dutapariwisata.id" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-2.5 text-sm text-gray-400">
                  <Icon className="w-4 h-4 text-gold-400/60 shrink-0 mt-0.5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Duta Pariwisata Indonesia. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-4">
            {["Kebijakan Privasi", "Syarat & Ketentuan"].map((item) => (
              <Link key={item} href="#" className="text-xs text-gray-500 hover:text-gold-400 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

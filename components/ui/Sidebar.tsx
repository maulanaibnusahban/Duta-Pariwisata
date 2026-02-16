import { NavbarItem } from "@/lib/content";

const Sidebar = ({ setPage, page }: { setPage: (nav: string) => void; page: string }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 w-full max-w-1/3 lg:max-w-1/5 bg-[#35322F] pt-12 text-white p-3 shadow-xl md:flex flex-col md:inset-auto md:h-screen md:sticky md:top-0 hidden z-10`}
    >
      <div className="flex items-center space-x-3 mb-10 md:mt-0 mt-16">
        <h1 className="text-xl font-bold tracking-wider ml-2">DUTA PARIWISATA</h1>
      </div>

      <nav className="space-y-2">
        {NavbarItem.map((item) => (
          <div
            key={item.page}
            className={`flex items-center space-x-2 px-3 py-2 rounded-sm cursor-pointer transition-all ${page === item.page ? "bg-white/10 text-gold-400" : "text-gray-400 hover:text-white hover:bg-white/5 "}`}
            onClick={() => setPage(item.page)}
          >
            <item.icon />
            <span className="font-medium">{item.name}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

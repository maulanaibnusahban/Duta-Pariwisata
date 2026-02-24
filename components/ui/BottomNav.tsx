import { NavbarItem } from "@/lib/content";

const BottomNav = ({ setPage, page }: { setPage: (nav: string) => void; page: string }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#35322F] text-gray-400 py-3 px-8 flex justify-between items-center rounded-t-2xl shadow-2xl z-40 md:hidden">
      {NavbarItem.map((item) => (
        <div
          key={item.page}
          className={`flex flex-col items-center space-y-1 transition-all cursor-pointer ${page === item.page ? "text-gold-400" : "hover:text-white"}`}
          onClick={() => setPage(item.page)}
        >
          <item.icon />
          <span className="text-[10px]">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default BottomNav;

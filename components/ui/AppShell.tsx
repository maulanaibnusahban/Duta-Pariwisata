import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white min-h-screen max-w-full flex relative font-plus-jakarta">
      <Sidebar />
      {children}
      <BottomNav />
    </div>
  );
}

import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import MusicPlayer from "./MusicPlayer";

export default function AppShell({
  children,
  showBottomBar = true,
}: {
  children: React.ReactNode;
  showBottomBar?: boolean;
}) {
  return (
    <div className="bg-white min-h-screen max-w-full flex relative font-plus-jakarta">
      <Sidebar />

      {children}
      {showBottomBar && <MusicPlayer />}
      {showBottomBar && <BottomNav />}
    </div>
  );
}

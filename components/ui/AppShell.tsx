import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import MusicPlayer from "./MusicPlayer";
import Footer from "./Footer";

export default function AppShell({
  children,
  showBottomBar = true,
  showMusicPlayer = true,
}: {
  children: React.ReactNode;
  showBottomBar?: boolean;
  showMusicPlayer?: boolean;
}) {
  return (
    <div className="bg-white min-h-screen max-w-full flex relative font-plus-jakarta">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        {children}
        <Footer />
      </div>
      {showMusicPlayer && <MusicPlayer />}
      {showBottomBar && <BottomNav />}
    </div>
  );
}

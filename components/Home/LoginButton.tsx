import { LogIn } from "lucide-react";
import Link from "next/link";

export default function LoginButton() {
  return (
    <Link href="/auth/login">
      <button className="px-5 py-2 bg-white text-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center gap-2 border border-gray-300 mx-auto">
        <LogIn className="w-4 h-4 text-gray-500" />
        Masuk Sekarang
      </button>
    </Link>
  );
}

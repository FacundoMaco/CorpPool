"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const showBack = pathname !== "/" && pathname !== "/splash" && pathname !== "/role" && pathname !== "/login";

  return (
    <nav className="w-full bg-[#1a1a1a] border-b border-[#2a2a2a] px-4 py-4">
      <div className="flex justify-between items-center">
        {showBack ? (
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        ) : (
          <div></div>
        )}
        <Link href="/role" className="text-xl font-bold text-white hover:text-[#3B82F6] transition-colors">
          CorpPool
        </Link>
        <div className="w-10"></div>
      </div>
    </nav>
  );
}

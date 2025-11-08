"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const loggedIn = localStorage.getItem("loggedIn");
      if (loggedIn === "true") {
        router.push("/role");
      } else {
        router.push("/login");
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center animate-fade-in">
      <div className="text-center">
        <div className="w-24 h-24 bg-[#3B82F6]/20 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-scale-in">
          <svg className="w-14 h-14 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </div>
        <h1 className="text-5xl font-bold text-white mb-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>CorpPool</h1>
        <p className="text-gray-400 text-lg animate-fade-in" style={{ animationDelay: "0.4s" }}>Movilidad corporativa peruana más eficiente</p>
      </div>
    </div>
  );
}


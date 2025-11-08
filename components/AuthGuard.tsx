"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const publicPaths = ["/splash", "/login"];
    const isPublicPath = publicPaths.includes(pathname);

    if (!isPublicPath && pathname !== "/") {
      const loggedIn = localStorage.getItem("loggedIn");
      if (loggedIn !== "true") {
        router.push("/login");
      }
    }
  }, [pathname, mounted, router]);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}

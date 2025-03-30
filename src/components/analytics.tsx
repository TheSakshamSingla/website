"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Path changed, track page view
    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    
    // Here you would typically call your analytics service
    // For example: 
    // window.gtag("config", "GA-MEASUREMENT-ID", { page_path: url });
    console.log(`Page view: ${url}`);
  }, [pathname, searchParams]);

  return null;
}

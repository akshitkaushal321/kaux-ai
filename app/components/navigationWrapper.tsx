"use client";

import { usePathname } from "next/navigation";
import Navigation from "./navigation";

export default function NavigationWrapper() {

  const pathname = usePathname();

  if (pathname.startsWith("/try-kaux")) {
    return null;
  }

  return <Navigation />;
}
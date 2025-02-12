import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

export function useDeviceType() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = useMediaQuery({ maxWidth: 1028 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1025 });

  if (!mounted) {
    // Avoid hydration error by returning a default value before mount
    return { isMobile: false, isTablet: false, isDesktop: true };
  }

  return { isMobile, isTablet, isDesktop };
}

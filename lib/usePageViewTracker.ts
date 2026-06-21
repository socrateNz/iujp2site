"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SESSION_KEY = "uijp2_visit_tracked";

export function usePageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Ne pas tracker les routes admin
    if (pathname?.startsWith("/admin")) return;

    // Une seule visite par session navigateur (sessionStorage vidé à la fermeture du tab)
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const trackVisit = async () => {
      try {
        const res = await fetch("/api/admin/visits", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            page: pathname,
            userAgent: navigator.userAgent,
            referrer: document.referrer,
          }),
        });

        if (res.ok) {
          // Marquer la session comme déjà comptée
          sessionStorage.setItem(SESSION_KEY, "1");
        }
      } catch {
        // Silently fail - tracking is not critical
      }
    };

    trackVisit();
    // On ne dépend PAS de pathname ici volontairement :
    // on veut déclencher le check uniquement au premier montage du composant.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

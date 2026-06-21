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

    // Marquer la session comme déjà comptée immédiatement pour éviter le double-déclenchement (StrictMode, navigation rapide)
    sessionStorage.setItem(SESSION_KEY, "1");

    const trackVisit = async () => {
      try {
        await fetch("/api/admin/visits", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            page: pathname,
            userAgent: navigator.userAgent,
            referrer: document.referrer,
          }),
        });
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

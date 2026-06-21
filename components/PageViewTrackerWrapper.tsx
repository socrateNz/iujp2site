"use client";

import { usePageViewTracker } from "@/lib/usePageViewTracker";

export default function PageViewTrackerWrapper() {
  usePageViewTracker();
  return null;
}

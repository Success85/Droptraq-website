"use client";
import { useSyncExternalStore } from "react";

const BUILD_YEAR = 2026;
const subscribe = () => () => {};

/**
 * The static shell is prerendered with BUILD_YEAR; the browser swaps in the
 * real current year after hydration, so the footer never goes stale.
 */
export function CurrentYear() {
  const year = useSyncExternalStore(subscribe, () => new Date().getFullYear(), () => BUILD_YEAR);
  return <>{year}</>;
}

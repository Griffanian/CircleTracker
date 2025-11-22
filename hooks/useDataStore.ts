import { useSyncExternalStore } from "react";
import { dataStore, CircleType, Behavior } from "@/stores/DataStore";

export function useDataStore() {
  // Subscribe to global store changes; we don't actually care about the version
  useSyncExternalStore(
    (callback) => dataStore.subscribe(callback),
    () => dataStore.getVersion(),
    () => dataStore.getVersion(),
  );

  // Just return the store API so callers can call store.addBehavior(), etc.
  return dataStore;
}

export function useBehaviors(circleType?: CircleType): Behavior[] {
  // Re-run this hook whenever the store version changes
  useSyncExternalStore(
    (callback) => dataStore.subscribe(callback),
    () => dataStore.getVersion(),
    () => dataStore.getVersion(),
  );

  // Read the current behaviors from the store.
  // Spread into a new array to avoid accidental external mutation.
  return [...dataStore.getBehaviors(circleType)];
}

export function useTodayEventCounts(): {
  inner: number;
  middle: number;
  outer: number;
} {
  useSyncExternalStore(
    (callback) => dataStore.subscribe(callback),
    () => dataStore.getVersion(),
    () => dataStore.getVersion(),
  );

  return dataStore.getTodayEventCounts();
}

export function useLastInnerEvent() {
  useSyncExternalStore(
    (callback) => dataStore.subscribe(callback),
    () => dataStore.getVersion(),
    () => dataStore.getVersion(),
  );

  return dataStore.getLastInnerEvent();
}

export function useEventCountsForPeriod(days: number): {
  inner: number;
  middle: number;
  outer: number;
} {
  useSyncExternalStore(
    (callback) => dataStore.subscribe(callback),
    () => dataStore.getVersion(),
    () => dataStore.getVersion(),
  );

  return dataStore.getEventCountsForPeriod(days);
}

export function usePreferences() {
  useSyncExternalStore(
    (callback) => dataStore.subscribe(callback),
    () => dataStore.getVersion(),
    () => dataStore.getVersion(),
  );

  return dataStore.getPreferences();
}

export function useEvents() {
  useSyncExternalStore(
    (callback) => dataStore.subscribe(callback),
    () => dataStore.getVersion(),
    () => dataStore.getVersion(),
  );

  return dataStore.getEvents();
}

import { useSyncExternalStore } from "react";
import { dataStore, CircleType, Behavior } from "@/stores/DataStore";

export function useDataStore() {
  // Use useSyncExternalStore to reliably subscribe to store changes
  const version = useSyncExternalStore(
    (callback) => dataStore.subscribe(callback),
    () => dataStore.getVersion(),
    () => dataStore.getVersion()
  );

  return dataStore;
}

export function useBehaviors(circleType?: CircleType): Behavior[] {
  const version = useSyncExternalStore(
    (callback) => dataStore.subscribe(callback),
    () => dataStore.getVersion(),
    () => dataStore.getVersion()
  );

  return dataStore.getBehaviors(circleType);
}

export function useTodayEventCounts(): { inner: number; middle: number; outer: number } {
  const version = useSyncExternalStore(
    (callback) => dataStore.subscribe(callback),
    () => dataStore.getVersion(),
    () => dataStore.getVersion()
  );

  return dataStore.getTodayEventCounts();
}

export function useLastInnerEvent() {
  const version = useSyncExternalStore(
    (callback) => dataStore.subscribe(callback),
    () => dataStore.getVersion(),
    () => dataStore.getVersion()
  );

  return dataStore.getLastInnerEvent();
}

export function useEventCountsForPeriod(days: number): { inner: number; middle: number; outer: number } {
  const version = useSyncExternalStore(
    (callback) => dataStore.subscribe(callback),
    () => dataStore.getVersion(),
    () => dataStore.getVersion()
  );

  return dataStore.getEventCountsForPeriod(days);
}

export function usePreferences() {
  const version = useSyncExternalStore(
    (callback) => dataStore.subscribe(callback),
    () => dataStore.getVersion(),
    () => dataStore.getVersion()
  );

  return dataStore.getPreferences();
}

export function useEvents() {
  const version = useSyncExternalStore(
    (callback) => dataStore.subscribe(callback),
    () => dataStore.getVersion(),
    () => dataStore.getVersion()
  );

  return dataStore.getEvents();
}

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
<<<<<<< HEAD
  const version = useSyncExternalStore(
    (callback) => dataStore.subscribe(callback),
    () => dataStore.getVersion(),
    () => dataStore.getVersion()
  );

  return dataStore.getBehaviors(circleType);
=======
  const [behaviors, setBehaviors] = useState<Behavior[]>(() => 
    [...dataStore.getBehaviors(circleType)] 
  );

  useEffect(() => {
    setBehaviors([...dataStore.getBehaviors(circleType)]);
    
    const unsubscribe = dataStore.subscribe(() => {
      setBehaviors([...dataStore.getBehaviors(circleType)]);
    });
    
    return () => {
      unsubscribe();
    };
  }, [circleType]);

  return behaviors;
>>>>>>> 9ea1f163898ec650616cb96381de1c6590e2d83b
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

import { useEffect, useState, useRef, useSyncExternalStore } from "react";
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
  const [behaviors, setBehaviors] = useState<Behavior[]>(() => 
    dataStore.getBehaviors(circleType)
  );

  useEffect(() => {
    setBehaviors(dataStore.getBehaviors(circleType));
    
    const unsubscribe = dataStore.subscribe(() => {
      setBehaviors(dataStore.getBehaviors(circleType));
    });
    
    return () => {
      unsubscribe();
    };
  }, [circleType]);

  return behaviors;
}

export function useTodayEventCounts(): { inner: number; middle: number; outer: number } {
  const [counts, setCounts] = useState(() => dataStore.getTodayEventCounts());

  useEffect(() => {
    setCounts(dataStore.getTodayEventCounts());
    
    const unsubscribe = dataStore.subscribe(() => {
      setCounts(dataStore.getTodayEventCounts());
    });
    
    return () => {
      unsubscribe();
    };
  }, []);

  return counts;
}

export function useLastInnerEvent() {
  const [lastEvent, setLastEvent] = useState(() => dataStore.getLastInnerEvent());

  useEffect(() => {
    setLastEvent(dataStore.getLastInnerEvent());
    
    const unsubscribe = dataStore.subscribe(() => {
      setLastEvent(dataStore.getLastInnerEvent());
    });
    
    return () => {
      unsubscribe();
    };
  }, []);

  return lastEvent;
}

export function useEventCountsForPeriod(days: number): { inner: number; middle: number; outer: number } {
  const [counts, setCounts] = useState(() => dataStore.getEventCountsForPeriod(days));
  const daysRef = useRef(days);

  useEffect(() => {
    daysRef.current = days;
    setCounts(dataStore.getEventCountsForPeriod(days));
    
    const unsubscribe = dataStore.subscribe(() => {
      setCounts(dataStore.getEventCountsForPeriod(daysRef.current));
    });
    
    return () => {
      unsubscribe();
    };
  }, [days]);

  return counts;
}

export function usePreferences() {
  const [preferences, setPreferences] = useState(() => dataStore.getPreferences());

  useEffect(() => {
    setPreferences(dataStore.getPreferences());
    
    const unsubscribe = dataStore.subscribe(() => {
      setPreferences(dataStore.getPreferences());
    });
    
    return () => {
      unsubscribe();
    };
  }, []);

  return preferences;
}

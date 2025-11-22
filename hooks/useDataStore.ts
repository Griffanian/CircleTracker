import { useEffect, useState } from "react";
import { dataStore, CircleType, Behavior } from "@/stores/DataStore";

export function useDataStore() {
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    const unsubscribe = dataStore.subscribe(() => {
      setUpdateCount((prev) => prev + 1);
    });
    return () => {
      unsubscribe();
    };
  }, []);

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

  useEffect(() => {
    setCounts(dataStore.getEventCountsForPeriod(days));
    
    const unsubscribe = dataStore.subscribe(() => {
      setCounts(dataStore.getEventCountsForPeriod(days));
    });
    
    return () => {
      unsubscribe();
    };
  }, [days]);

  return counts;
}

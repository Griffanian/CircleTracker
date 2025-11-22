import { useEffect, useState } from "react";
import { dataStore, CircleType, Behavior } from "@/stores/DataStore";

export function useDataStore() {
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    console.log("[useDataStore] Component subscribing to store");
    const unsubscribe = dataStore.subscribe(() => {
      console.log("[useDataStore] Store changed, forcing update");
      setUpdateCount((prev) => {
        const newCount = prev + 1;
        console.log("[useDataStore] Update count:", newCount);
        return newCount;
      });
    });
    return () => {
      console.log("[useDataStore] Component unsubscribing from store");
      unsubscribe();
    };
  }, []);

  // Force re-evaluation by referencing updateCount
  console.log("[useDataStore] Returning store, update count:", updateCount);
  return dataStore;
}

export function useBehaviors(circleType?: CircleType): Behavior[] {
  const [behaviors, setBehaviors] = useState<Behavior[]>(() => 
    dataStore.getBehaviors(circleType)
  );

  useEffect(() => {
    const unsubscribe = dataStore.subscribe(() => {
      setBehaviors(dataStore.getBehaviors(circleType));
    });
    return () => {
      unsubscribe();
    };
  }, [circleType]);

  return behaviors;
}

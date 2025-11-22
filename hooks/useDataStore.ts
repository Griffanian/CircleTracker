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

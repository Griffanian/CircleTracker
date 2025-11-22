import { useEffect, useState } from "react";
import { dataStore } from "@/stores/DataStore";

export function useDataStore() {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    console.log("[useDataStore] Component subscribing to store");
    const unsubscribe = dataStore.subscribe(() => {
      console.log("[useDataStore] Store changed, forcing update");
      forceUpdate({});
    });
    return () => {
      console.log("[useDataStore] Component unsubscribing from store");
      unsubscribe();
    };
  }, []);

  return dataStore;
}

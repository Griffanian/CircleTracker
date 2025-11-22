import { useEffect, useState } from "react";
import { dataStore } from "@/stores/DataStore";

export function useDataStore() {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = dataStore.subscribe(() => {
      forceUpdate({});
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return dataStore;
}

import { useCallback, useEffect, useRef } from "react";

const usePersistentCache = (storageKey, maxEntries = 30) => {
  const cacheRef = useRef(new Map());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;

      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed?.entries)) {
        cacheRef.current = new Map(parsed.entries);
      }
    } catch (_) {
      cacheRef.current = new Map();
    }
  }, [storageKey]);

  const persist = useCallback(() => {
    try {
      const entries = Array.from(cacheRef.current.entries());
      const prunedEntries = entries.slice(-maxEntries);

      if (prunedEntries.length !== entries.length) {
        cacheRef.current = new Map(prunedEntries);
      }

      localStorage.setItem(
        storageKey,
        JSON.stringify({
          entries: Array.from(cacheRef.current.entries()),
        }),
      );
    } catch (_) {
      // Ignore storage quota and serialization errors.
    }
  }, [maxEntries, storageKey]);

  const get = useCallback((key) => cacheRef.current.get(key), []);

  const has = useCallback((key) => cacheRef.current.has(key), []);

  const set = useCallback(
    (key, value) => {
      cacheRef.current.set(key, value);
      persist();
    },
    [persist],
  );

  return {
    get,
    has,
    set,
  };
};

export default usePersistentCache;

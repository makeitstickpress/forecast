import { createContext, useContext, useState } from "react";

// Chapter 15: shared state lives in a provider so the header badge,
// the cards, and the watchlist all read the same list.
const WatchContext = createContext(null);

export function WatchProvider({ children }) {
  const [watchedIds, setWatchedIds] = useState(["mars-orbit"]);

  function toggleWatch(id) {
    setWatchedIds((current) =>
      current.includes(id)
        ? current.filter((watchedId) => watchedId !== id)
        : [...current, id]
    );
  }

  return (
    <WatchContext.Provider value={{ watchedIds, toggleWatch }}>
      {children}
    </WatchContext.Provider>
  );
}

export function useWatch() {
  const value = useContext(WatchContext);
  if (value === null) {
    throw new Error("useWatch must be used inside a WatchProvider");
  }
  return value;
}

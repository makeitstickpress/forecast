import { useWatch } from "../WatchContext";

export default function WatchButton({ forecastId }) {
  const { watchedIds, toggleWatch } = useWatch();
  const isWatching = watchedIds.includes(forecastId);

  return (
    <button
      type="button"
      className={isWatching ? "watch watching" : "watch"}
      aria-pressed={isWatching}
      onClick={() => toggleWatch(forecastId)}
    >
      {isWatching ? "Watching" : "Watch"}
    </button>
  );
}

import { Link } from "react-router-dom";
import { useForecasts } from "../hooks";
import { useWatch } from "../WatchContext";
import ForecastCard from "../components/ForecastCard";

export default function WatchlistPage() {
  const { forecasts, status } = useForecasts();
  const { watchedIds } = useWatch();

  const watched = forecasts.filter((forecast) =>
    watchedIds.includes(forecast.id)
  );

  return (
    <>
      <div className="page-intro">
        <h1>Watchlist</h1>
        <p>The forecasts you are keeping an eye on.</p>
      </div>

      {status === "loading" && (
        <div className="skeleton-list" aria-label="Loading watchlist">
          <div className="skeleton-card" />
        </div>
      )}

      {status === "error" && (
        <div className="error-panel" role="alert">
          <p className="error-title">The watchlist could not be loaded.</p>
          <p>Check that the development server is running, then reload.</p>
        </div>
      )}

      {status === "ready" && watched.length === 0 && (
        <div className="empty-note">
          <p>
            Nothing here yet. Press <strong>Watch</strong> on any forecast on
            the <Link to="/">home page</Link> and it will appear here.
          </p>
        </div>
      )}

      {status === "ready" && watched.length > 0 && (
        <ul className="forecast-list">
          {watched.map((forecast) => (
            <li key={forecast.id}>
              <ForecastCard forecast={forecast} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

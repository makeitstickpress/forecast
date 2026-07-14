import { Link, useParams } from "react-router-dom";
import { useForecast, useCountdown } from "../hooks";
import WatchButton from "../components/WatchButton";
import PredictionTicket from "../components/PredictionTicket";

export default function ForecastPage() {
  const { forecastId } = useParams();
  const { forecast, status } = useForecast(forecastId);

  if (status === "loading") {
    return (
      <div className="skeleton-list" aria-label="Loading forecast">
        <div className="skeleton-card tall" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="error-panel" role="alert">
        <p className="error-title">This forecast could not be found.</p>
        <p>
          It may have been removed. <Link to="/">Back to all forecasts</Link>.
        </p>
      </div>
    );
  }

  return <ForecastDetail forecast={forecast} />;
}

function ForecastDetail({ forecast }) {
  const open = forecast.status === "open";

  return (
    <article className="detail">
      <p className="crumbs">
        <Link to="/">All forecasts</Link> / {forecast.category}
      </p>
      <div className="forecast-topline">
        <p className="forecast-category">{forecast.category}</p>
        {open ? (
          <ClosingClock closesAt={forecast.closesAt} />
        ) : (
          <span className="badge resolved">Resolved</span>
        )}
      </div>
      <h1>{forecast.question}</h1>
      <p className="forecast-odds detail-odds">
        <span className="yes">{forecast.yes}% Yes</span>
        <span className="no">{forecast.no}% No</span>
      </p>
      <div className="forecast-foot">
        <p className="forecast-meta">{forecast.predictions} predictions</p>
        <WatchButton forecastId={forecast.id} />
      </div>

      {open ? (
        <PredictionTicket forecast={forecast} />
      ) : (
        <div className="ticket saved-note">
          <p className="ticket-title">This forecast has resolved</p>
          <p>
            The crowd finished at <strong>{forecast.yes}% Yes</strong>. New
            predictions are closed.
          </p>
        </div>
      )}
    </article>
  );
}

function ClosingClock({ closesAt }) {
  const secondsAtStart = Math.max(
    0,
    Math.floor((closesAt - Date.now()) / 1000)
  );
  const { secondsLeft, finished } = useCountdown(secondsAtStart);

  if (finished) return <span className="badge closing">Closed</span>;

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;
  const clock =
    hours > 0
      ? `${hours}h ${String(minutes).padStart(2, "0")}m`
      : `${minutes}m ${String(seconds).padStart(2, "0")}s`;

  return <span className="badge closing">Closes in {clock}</span>;
}

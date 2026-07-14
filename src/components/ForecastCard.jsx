import { Link } from "react-router-dom";
import WatchButton from "./WatchButton";

export default function ForecastCard({ forecast }) {
  return (
    <article className="forecast-card">
      <div className="forecast-topline">
        <p className="forecast-category">{forecast.category}</p>
        {forecast.status === "resolved" && (
          <span className="badge resolved">Resolved</span>
        )}
      </div>
      <h2>
        <Link to={`/forecast/${forecast.id}`}>{forecast.question}</Link>
      </h2>
      <p className="forecast-odds">
        <span className="yes">{forecast.yes}% Yes</span>
        <span className="no">{forecast.no}% No</span>
      </p>
      <div className="forecast-foot">
        <p className="forecast-meta">{forecast.predictions} predictions</p>
        <WatchButton forecastId={forecast.id} />
      </div>
    </article>
  );
}

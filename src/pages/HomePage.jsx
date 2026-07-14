import { useForecasts } from "../hooks";
import ForecastCard from "../components/ForecastCard";

export default function HomePage() {
  const { forecasts, status } = useForecasts();

  if (status === "loading") {
    return (
      <>
        <PageIntro />
        <div className="skeleton-list" aria-label="Loading forecasts">
          <div className="skeleton-card" />
          <div className="skeleton-card" />
          <div className="skeleton-card" />
        </div>
      </>
    );
  }

  if (status === "error") {
    return (
      <>
        <PageIntro />
        <div className="error-panel" role="alert">
          <p className="error-title">The forecasts could not be loaded.</p>
          <p>Check that the development server is running, then reload.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <PageIntro />
      <ul className="forecast-list">
        {forecasts.map((forecast) => (
          <li key={forecast.id}>
            <ForecastCard forecast={forecast} />
          </li>
        ))}
      </ul>
    </>
  );
}

function PageIntro() {
  return (
    <div className="page-intro">
      <h1>Forecast</h1>
      <p>What happens next? Ask the crowd.</p>
    </div>
  );
}

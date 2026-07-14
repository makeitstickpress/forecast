import { useEffect, useState } from "react";

// Chapter 14: the whole loading pattern, wrapped in a custom Hook.
export function useForecasts() {
  const [forecasts, setForecasts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const response = await fetch("/api/forecasts");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!ignore) {
          setForecasts(data);
          setStatus("ready");
        }
      } catch {
        if (!ignore) setStatus("error");
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  return { forecasts, status };
}

export function useForecast(forecastId) {
  const [forecast, setForecast] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let ignore = false;
    setStatus("loading");
    setForecast(null);

    async function load() {
      try {
        const response = await fetch(`/api/forecast/${forecastId}`);
        if (response.status === 404) throw new Error("missing");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!ignore) {
          setForecast(data);
          setStatus("ready");
        }
      } catch {
        if (!ignore) setStatus("error");
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [forecastId]);

  return { forecast, status };
}

// Chapter 14 again: useCountdown, driving the closing clock on a detail page.
export function useCountdown(secondsAtStart) {
  const [secondsLeft, setSecondsLeft] = useState(secondsAtStart);
  const finished = secondsLeft <= 0;

  useEffect(() => {
    if (finished) return;

    const intervalId = setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [finished]);

  return { secondsLeft, finished };
}

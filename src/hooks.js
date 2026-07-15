import { useEffect, useState } from "react";

// Chapter 14: the whole loading pattern from Chapters 11 and 12, wrapped in a
// custom Hook. It returns [status, data], the same shape as useState's pair.
export function useForecasts() {
  const [status, setStatus] = useState("loading");
  const [forecasts, setForecasts] = useState(null);

  useEffect(() => {
    let ignore = false;

    fetch("/api/forecasts")
      .then((res) => {
        if (!res.ok) throw new Error("Load failed");
        return res.json();
      })
      .then((data) => {
        if (!ignore) {
          setForecasts(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!ignore) {
          setStatus("error");
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  return [status, forecasts];
}

export function useForecast(forecastId) {
  const [status, setStatus] = useState("loading");
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    let ignore = false;
    setStatus("loading");

    fetch("/api/forecast/" + forecastId)
      .then((res) => {
        if (!res.ok) throw new Error("Load failed");
        return res.json();
      })
      .then((data) => {
        if (!ignore) {
          setDetail(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!ignore) {
          setStatus("error");
        }
      });

    return () => {
      ignore = true;
    };
  }, [forecastId]);

  return [status, detail];
}

// Chapter 14 again: useCountdown, driving the closing clock on a detail page.
export function useCountdown(start) {
  const [secondsLeft, setSecondsLeft] = useState(start);
  const finished = secondsLeft === 0;

  useEffect(() => {
    if (finished) {
      return;
    }

    const intervalId = setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [finished]);

  return secondsLeft;
}

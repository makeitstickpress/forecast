# Forecast — the assembled app from *React That Sticks*

This is the Forecast app from [React That Sticks](https://makeitstickpress.com),
fully assembled. The book teaches each piece as a small, self-contained
example; this repo is those pieces composed into one working application.
If you have read the book, you will recognize every line.

**Run it in your browser, nothing to install:**
[stackblitz.com/github/makeitstickpress/forecast](https://stackblitz.com/github/makeitstickpress/forecast)
(if it stalls while loading, allow StackBlitz through your ad blocker — its in-browser runtime is often mistaken for a tracker)

**Run it locally:**

```
npm install
npm run dev
```

**Run the tests:**

```
npm test
```

## Where each part comes from

| Part | Chapter |
|---|---|
| `ForecastCard`, components and props | 1–4 |
| Rendering the list with keys | 5 |
| `WatchButton` state and events | 6–7 |
| The prediction ticket form | 8 |
| Loading / error / empty states | 9, 12 |
| The closing-clock Effect | 10 |
| Fetching from `/api/forecasts` | 11 |
| `useForecasts`, `useForecast`, `useCountdown` | 14 |
| `WatchContext` shared state | 15 |
| `predictionReducer` | 16 |
| `ErrorBoundary` | 18 |
| The test suite | 19 |
| Routes, `Link`, `NavLink`, `useParams` | 20 |
| Strict Mode and the production build | 22 |

The mock data server lives in `vite.config.js`, exactly as the book sets it
up in *Running the code*, extended with closing times and a predictions
endpoint.

---

Questions, feedback, corrections: [hello@makeitstickpress.com](mailto:hello@makeitstickpress.com)

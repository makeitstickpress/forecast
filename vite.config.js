import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The same local data server the book sets up in "Running the code",
// extended with closing times and a POST endpoint for predictions.
const HOUR = 60 * 60 * 1000;

function makeForecasts() {
  const now = Date.now();
  return [
    { id: "mars-orbit", category: "Space",
      question: "Will a crewed mission orbit Mars before 2035?",
      yes: 42, no: 58,
      predictions: "12,405", status: "open",
      closesAt: now + 26 * HOUR },
    { id: "battery-tech", category: "Technology",
      question: "Will a new battery chemistry reach mass production this year?",
      yes: 28, no: 72,
      predictions: "8,120", status: "open",
      closesAt: now + 3 * HOUR },
    { id: "heat-record", category: "Climate",
      question: "Will this summer break last year's temperature record?",
      yes: 61, no: 39,
      predictions: "9,540", status: "open",
      closesAt: now + 72 * HOUR },
    { id: "fusion-gain", category: "Science",
      question: "Will a fusion reactor sustain net gain for a full minute?",
      yes: 17, no: 83,
      predictions: "4,872", status: "open",
      closesAt: now + 140 * HOUR },
    { id: "transfer-record", category: "Sport",
      question: "Will the football transfer record be broken this window?",
      yes: 54, no: 46,
      predictions: "22,391", status: "open",
      closesAt: now + 9 * HOUR },
    { id: "eurovision-upset", category: "Culture",
      question: "Did last year's Eurovision winner come from the bottom half of the odds?",
      yes: 100, no: 0,
      predictions: "18,077", status: "resolved",
      closesAt: now - 30 * 24 * HOUR },
  ];
}

function mockApi() {
  const forecasts = makeForecasts();
  return {
    name: "forecast-mock-api",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url.startsWith("/api/")) return next();
        res.setHeader("Content-Type", "application/json");
        const json = (data, code = 200) => {
          res.statusCode = code;
          res.end(JSON.stringify(data));
        };
        if (req.url === "/api/forecasts") return json(forecasts);
        if (req.url.startsWith("/api/forecast/")) {
          const id = req.url.replace("/api/forecast/", "");
          const one = forecasts.find((f) => f.id === id);
          return one ? json(one) : json({ error: "missing" }, 404);
        }
        if (req.url === "/api/predict" && req.method === "POST") {
          return json({ ok: true });
        }
        return json({ ok: true });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), mockApi()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
  },
});

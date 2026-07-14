import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WatchProvider } from "./WatchContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import WatchlistPage from "./pages/WatchlistPage";
import ForecastPage from "./pages/ForecastPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <WatchProvider>
      <BrowserRouter>
        <Header />
        <main>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/watchlist" element={<WatchlistPage />} />
              <Route path="/forecast/:forecastId" element={<ForecastPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <footer className="site-foot">
          <p>
            The Forecast app from{" "}
            <a href="https://makeitstickpress.com">React That Sticks</a> — every
            piece of it is built in the book.
          </p>
        </footer>
      </BrowserRouter>
    </WatchProvider>
  );
}

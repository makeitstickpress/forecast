import { NavLink } from "react-router-dom";
import { useWatch } from "../WatchContext";

export default function Header() {
  const { watchedIds } = useWatch();

  return (
    <header className="site-head">
      <div className="site-head-inner">
        <NavLink to="/" className="brand">
          Forecast
        </NavLink>
        <nav>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/watchlist">
            Watchlist
            {watchedIds.length > 0 && (
              <span className="count">{watchedIds.length}</span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

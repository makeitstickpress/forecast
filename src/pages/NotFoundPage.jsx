import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="error-panel">
      <p className="error-title">There is nothing at this address.</p>
      <p>
        Try the <Link to="/">home page</Link> or your{" "}
        <Link to="/watchlist">watchlist</Link>.
      </p>
    </div>
  );
}

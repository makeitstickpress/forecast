import { Component } from "react";

// Chapter 18: a reusable boundary so one broken section cannot blank the app.
export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-panel" role="alert">
          <p className="error-title">Something went wrong in this section.</p>
          <p>Reload the page to try again.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

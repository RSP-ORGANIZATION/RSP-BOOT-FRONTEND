import { Component } from "react";
import ErrorComponent from "./error-component";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught in error boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorComponent />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

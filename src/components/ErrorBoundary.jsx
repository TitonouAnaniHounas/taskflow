import { Component } from "react";
import ErrorState from "./ui/ErrorState";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-paper">
          <ErrorState
            message="Something went wrong. Please try again."
            onRetry={this.handleReset}
          />
        </div>
      );
    }
    return this.props.children;
  }
}
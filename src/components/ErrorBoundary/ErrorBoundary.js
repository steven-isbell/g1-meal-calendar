import React, { Component } from "react";
import ErrorBoundaryFallbackComponent from "./Error";

class ErrorBoundary extends Component {
  static defaultProps = {
    FallbackComponent: ErrorBoundaryFallbackComponent
  };

  state = {
    error: null,
    info: null
  };

  componentDidCatch(error, info) {
    const { onError } = this.props;

    if (typeof onError === "function") {
      try {
        onError.call(this, error, info ? info.componentStack : "");
      } catch (ignoredError) {}
    }

    this.setState({ error, info });
  }

  render() {
    const { children, FallbackComponent } = this.props;
    const { error, info } = this.state;

    if (error !== null) {
      return (
        <FallbackComponent
          componentStack={info ? info.componentStack : ""}
          error={error}
        />
      );
    }

    return children;
  }
}

export default ErrorBoundary;

import React from "react";
import PropTypes from "prop-types";

import hotdog from "../../assets/running_hotdog.gif";

const ErrorBoundaryFallbackComponent = ({ componentStack, error }) => (
  <div>
    <img
      src={hotdog}
      style={{ height: "100vh", width: "100vw" }}
      alt="running hotdog gif"
    />
    <div
      style={{
        width: "250px",
        position: "absolute",
        top: "30vh",
        left: "15vw"
      }}
    >
      <p>
        We ran into an error, please refresh the page or click{" "}
        <a href="http://localhost:3000/">here</a>
      </p>
    </div>
  </div>
);

ErrorBoundaryFallbackComponent.propTypes = {
  componentStack: PropTypes.object,
  error: PropTypes.object
};

export default ErrorBoundaryFallbackComponent;

import React from "react";
import PropTypes from "prop-types";

import ImageLoader from "../ImageLoader/ImageLoader";
import hotdog from "../../assets/running_hotdog.gif";
import preload from "../../assets/preload.png";

const ErrorBoundaryFallbackComponent = ({ componentStack, error }) => (
  <div>
    <ImageLoader
      srcPreload={preload}
      srcLoaded={hotdog}
      style={{ height: "100vh", width: "100vw" }}
    />
    <div
      style={{
        width: "250px",
        position: "absolute",
        top: "30vh",
        left: "15vw",
        zIndex: "10"
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

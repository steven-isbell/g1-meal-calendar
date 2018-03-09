import React from "react";

const ErrorBoundaryFallbackComponent = ({ componentStack, error }) => (
  <div>
    <img
      src={
        "https://cdn.dribbble.com/users/102974/screenshots/2077946/running_hotdog.gif"
      }
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

export default ErrorBoundaryFallbackComponent;

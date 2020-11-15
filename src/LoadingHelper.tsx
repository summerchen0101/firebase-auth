import React from "react";
import { Spinner } from "react-bootstrap";

function LoadingHelper() {
  return (
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
  );
}

export default LoadingHelper;

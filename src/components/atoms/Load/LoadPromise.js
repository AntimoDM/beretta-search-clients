import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Load from "./Load";

const LoadingIndicator = ({ row, area }) => {
  const { promiseInProgress } = usePromiseTracker({ area: area || null });
  if (promiseInProgress) {
    return <Load />;
  } else return false;
};
export default LoadingIndicator;

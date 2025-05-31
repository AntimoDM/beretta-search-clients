import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import "./loader.scss";

const Loader = ({ area }) => {
  const { promiseInProgress } = usePromiseTracker({ area: area || null });
  if (promiseInProgress) {
    return (
      <div
        style={{ zIndex: "10" }}
        className="loader_outer h-100 w-100 d-flex justify-content-center align-items-center"
      >
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
  return <></>;
};
export default Loader;

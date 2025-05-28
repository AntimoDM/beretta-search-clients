import React from "react";

const Load = ({}) => {
  return (
    <div
      style={{ zIndex: "999999" }}
      className="loader_outer h-100 w-100 d-flex justify-content-center align-items-center"
    >
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Load;

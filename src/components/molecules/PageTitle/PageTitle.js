import React from "react";
import style from "./pagetitle.module.scss";

const PageTitle = ({ children, right, className }) => {
  return (
    <div
      style={{ alignItems: "center", maxHeight: "48px", marginBottom: "24px" }}
      className={"row px-0" + className}
    >
      <div className="col-6 pl-0 pr-0">{children}</div>
      {right && <div className="col-6 text-end pr-0 pl-0">{right}</div>}
    </div>
  );
};

export default PageTitle;

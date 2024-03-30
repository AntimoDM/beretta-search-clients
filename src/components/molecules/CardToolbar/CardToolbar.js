import React from "react";
import commonstyle from "../../../../styles/common.module.scss";
const CardToolbar = ({ children, className, style }) => {
  return (
    <div
      style={style || {}}
      className={
        commonstyle.card_toolbar +
        " row cardtoolbar_support " +
        (className || "")
      }
    >
      {children}
    </div>
  );
};
export default CardToolbar;

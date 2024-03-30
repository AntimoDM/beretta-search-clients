import React from "react";
import styles from "../../../../styles/common.module.scss";

const HeaderTab = ({ children, className, className_li }) => {
  return (
    <ul
      style={!children ? { borderBottom: "none" } : {}}
      className={"nav nav-tabs " + (className || "")}
    >
      {children &&
        (children.length > 0 ? (
          children.map((element, key) => {
            return (
              <li
                key={"nav-item-tabs" + key}
                className={
                  "nav-item " +
                  (className_li || "") +
                  ((element.props && element.props.liclass) || "")
                }
              >
                {element}
              </li>
            );
          })
        ) : (
          <li className="nav-item">{children}</li>
        ))}
    </ul>
  );
};

export default HeaderTab;

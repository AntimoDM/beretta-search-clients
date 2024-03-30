import stylecard from "../../../../styles/common.module.scss";
import React from "react";
const Card = ({
  children,
  className,
  right,
  key,
  style,
  id,
  rightclassName,
  contentClassName,
  rightStyle,
  onClickLeft,
}) => {
  return (
    <div
      style={style ? style : {}}
      id={id}
      className={stylecard.card + " card_support " + (className || "")}
    >
      {right ? (
        <div className="row h-100 cardright_support ">
          <div
            style={rightStyle || {}}
            onClick={onClickLeft}
            className={rightclassName || "col-4"}
          >
            {children}
          </div>

          <div
            style={{ borderRadius: "0px 12px 12px 0px" }}
            className={" col p-0"}
          >
            <div
              className={stylecard.content + "  " + (contentClassName || "")}
            >
              {right}
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Card;

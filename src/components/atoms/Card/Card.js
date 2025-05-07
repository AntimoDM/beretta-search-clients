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
      style={style ? style : { border: "1px solid #CED4DA " }}
      id={id}
      className={stylecard.card + " card_support " + (className || "")}
    >
      {children}
    </div>
  );
};

export default Card;

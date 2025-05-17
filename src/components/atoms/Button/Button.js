import React, { useEffect, useState } from "react";
import "./button.scss";

const Button = ({
  children,
  data_dismiss,
  onClick,
  modal_target,
  disabled = false,
  style,
  className,
  color,
}) => {
  return (
    <button
      className={`btn ${className} ${color}`}
      onClick={onClick}
      data-dismiss={data_dismiss || "modal"}
      data-toggle={modal_target && "modal"}
      data-target={"#" + (modal_target || "")}
      disabled={disabled}
      style={style || {}}
    >
      {children}
    </button>
  );
};

export default Button;

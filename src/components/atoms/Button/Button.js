import React, { useEffect, useState } from "react";

const Button = ({
  children,
  color,
  data_dismiss,
  onClick,
  className,
  modal_target,
  type = "",
  border_gray,
  border_gray_soft,
  disabled,
  id,
  style,
}) => {
  const [background, setBackground] = useState();
  useEffect(() => {
    switch (color) {
      case "red":
        setBackground("btn-danger");
        break;

      case "green":
        setBackground("btn-success");
        break;

      case "blue":
        setBackground("btn-primary");
        break;

      case "orange":
        setBackground("btn-warning");
        break;

      case "light":
        setBackground("btn-outline-light light-text");
        break;

      case "black":
        setBackground("btn btn-dark");
        break;

      case "lightblue":
        setBackground("btn-info");
        break;

      default:
        setBackground("btn-primary-outline");
        break;
    }
  }, []);
  if (!id) {
    return (
      <button
        className={
          "btn  " +
          (border_gray ? " border_gray " : "") +
          (border_gray_soft ? " border_gray_soft " : "") +
          (background || "") +
          " " +
          (className || "")
        }
        type={type}
        onClick={
          onClick ||
          function () {
            return null;
          }
        }
        data-dismiss={data_dismiss || "modal"}
        data-toggle={modal_target && "modal"}
        data-target={"#" + (modal_target || "")}
        disabled={disabled}
        style={style || {}}
      >
        {children}
      </button>
    );
  } else
    return (
      <button
        id={id}
        className={
          "btn px-1 " +
          (border_gray ? " border_gray " : "") +
          (border_gray_soft ? " border_gray_soft " : "") +
          (background || "") +
          " " +
          (className || "")
        }
        onClick={
          onClick ||
          function () {
            return null;
          }
        }
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

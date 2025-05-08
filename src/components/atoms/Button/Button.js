import React, { useEffect, useState } from "react";

const Button = ({
  children,
  color,
  data_dismiss,
  onClick,
  className,
  modal_target,
  type = "",
  disabled,
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

  return (
    <button
      className={"btn  " + (background || "") + " " + (className || "")}
      type={type}
      onClick={onClick}
      data-dismiss={data_dismiss || "modal"}
      data-toggle={modal_target && "modal"}
      data-target={"#" + (modal_target || "")}
      disabled={disabled}
      style={
        style || {
          background: "#AEC60D",
          border: "1px solid #3A3A3A",
          fontSize: "16px",
          color: "#2E2E2E",
        }
      }
    >
      {children}
    </button>
  );
};

export default Button;

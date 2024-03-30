import React from "react";
import { useRouter } from "next/router";
import { default as Linka } from "next/link";
function Link(
  {
    children,
    isDisabled,
    href,
    label,
    className,
    onClick,
    id,
    style,
    data_toggle,
    data_target,
    target,
    title,
  },
  props
) {
  const router = useRouter();

  const redirect = (e) => {
    e.preventDefault();
    router.push(href);
  };
  const handleClick = (e) => {
    e.preventDefault();
    onClick;
  };
  if (isDisabled)
    return (
      <span className={(className || "") + " a"} style={{ color: "gray" }}>
        {children}
      </span>
    );
  else if (!href)
    return (
      <span
        title={title || ""}
        style={style || {}}
        id={id || ""}
        data-toggle={data_toggle || ""}
        data-target={data_target || ""}
        className={(className || "") + " a"}
        onClick={
          onClick ||
          (() => {
            return null;
          })
        }
      >
        {children}
      </span>
    );
  else
    return (
      <Linka href={href || ""}>
        <p
          target={target}
          style={style || {}}
          {...props}
          id={id || ""}
          data-toggle={data_toggle}
          data-target={data_target}
          className={className || ""}
          onClick={href ? redirect : onClick}
        >
          {label || ""}
          {children}
        </a>
      </Linka>
    );
}

export default Link;

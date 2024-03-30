import React from "react";
const Modal = ({
  id,
  children,
  inner_className,
  title,
  footer,
  style,
  body_className,
  onClick,
  contentStyle,
}) => {
  if (onClick && onClick !== undefined)
    return (
      <div
        className="modal fade"
        id={id}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.keyCode === 27 && onClick) {
            onClick();
          }
        }}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          style={style || {}}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={
            "modal-dialog modal-dialog-centered " + (body_className || "")
          }
          role="document"
        >
          <div style={contentStyle || {}} className="modal-content">
            {title && (
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {title}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            )}
            <div
              style={style || {}}
              className={
                "modal-body p-0 " +
                (body_className || "") +
                " " +
                (inner_className || "")
              }
            >
              {children}
            </div>
            {footer && (
              <div className="modal-footer">
                {footer}
                {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button> */}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  else
    return (
      <div
        className="modal fade"
        id={id}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          style={style || {}}
          className={
            "modal-dialog modal-dialog-centered " + (body_className || "")
          }
          role="document"
        >
          <div style={contentStyle || {}} className="modal-content">
            {title && (
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {title}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            )}
            <div
              style={style || {}}
              className={
                "modal-body p-0 " +
                (body_className || "") +
                " " +
                (inner_className || "")
              }
            >
              {children}
            </div>
            {footer && (
              <div className="modal-footer">
                {footer}
                {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
    <button type="button" className="btn btn-primary">Save changes</button> */}
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export const ModalButton = ({ target, children }) => {
  return (
    <button
      type="button"
      className="btn btn-primary"
      data-toggle="modal"
      data-target={"#" + target}
    >
      {children}
    </button>
  );
};
export default Modal;

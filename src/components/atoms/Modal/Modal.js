import React from "react";
import "./modal.scss";
const Modal = ({ id, children }) => {
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body p-0">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

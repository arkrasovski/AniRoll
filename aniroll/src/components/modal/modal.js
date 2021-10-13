import React from "react";
import "./modal.sass";

const Modal = ({ active, setActive, content }) => {
  return (
    <div className={active ? "modal active" : "modal"} onClick={setActive}>
      <div
        className={active ? "modal_content active" : "modal_content"}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <span>{content}</span>
        <button onClick={setActive}>Ок</button>
      </div>
    </div>
  );
};

export default Modal;

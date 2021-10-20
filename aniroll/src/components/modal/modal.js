import React from "react";
import "./modal.sass";
import megumin from "../../images/megumin.png";

const Modal = ({ active, setActive, content }) => {
  return (
    <div className={active ? "modal active" : "modal"} onClick={setActive}>
      <div
        className={active ? "modal_content active" : "modal_content"}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img src={megumin} alt="" />
        <span>{content}</span>
        <button onClick={setActive}>Ок</button>
      </div>
    </div>
  );
};

export default Modal;

import React from "react";
import "./modal.sass";
import megumin from "../../images/megumin.png";

const Modal = ({ active, setActive, content }) => {
  if (active && document.body.style.overflow !== "hidden") {
    document.body.style.overflow = "hidden";
  }
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => {
        document.body.style.overflow = "";
        setActive();
      }}
    >
      <div
        className={active ? "modal_content active" : "modal_content"}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img src={megumin} alt="" />
        <span>{content}</span>
        <button
          onClick={() => {
            document.body.style.overflow = "";
            setActive();
          }}
        >
          Ок
        </button>
      </div>
    </div>
  );
};

export default Modal;

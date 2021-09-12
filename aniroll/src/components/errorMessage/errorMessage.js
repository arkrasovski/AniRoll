import React from "react";
import errorImg from "../../images/errorImage.png";
import "./errorMessage.sass";

const ErrorMessage = () => {
  return (
    <div className="errorBox">
      <img src={errorImg} alt="Бессмер из аниме бессмертный " />
      <span className="errorText">Извините, что-то пошло не так</span>
    </div>
  );
};
export default ErrorMessage;

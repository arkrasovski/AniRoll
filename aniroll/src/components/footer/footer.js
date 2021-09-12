import React from "react";
import "./footer.sass";
import footerImg from "../../images/footer.png";
import { MdHeadsetMic } from "react-icons/md";
import { ImTruck, ImPhone } from "react-icons/im";

const Footer = () => {
  return (
    <footer>
      <div className="workTime">
        <ul>
          <li>
            <MdHeadsetMic color={"rgb(127, 0, 0)"} />
            <div className="workTimeInfo">
              <span>Приём заказов:</span>
              <span>10:00 - 23:00</span>
            </div>
          </li>
          <li>
            <ImTruck color={"rgb(127, 0, 0)"} />
            <div className="workTimeInfo">
              <span>Доставка заказов:</span>
              <span>11:00 - 00:00</span>
            </div>
          </li>
        </ul>
      </div>

      <div className="telNumber">
        <ImPhone color={"rgb(127, 0, 0)"} />
        <span>+375</span>
        <div className="telNumbers">
          <span>(29) 536-23-43</span>
          <span>(25) 578-23-43</span>
          <span>(44) 512-23-43</span>
        </div>
      </div>

      <div className="footerImg">
        <img
          src={footerImg}
          alt="Изображение Юкихиры Сомы из аниме Повар-боец сома"
        ></img>
      </div>
    </footer>
  );
};

export default Footer;

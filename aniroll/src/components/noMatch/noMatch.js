import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import rem from "../../images/rem.png";
import "./noMatch.sass";

const NoMatch = () => {
  let location = useLocation();
  return (
    <section className="main">
      <div className="noMatchBox">
        <img src={rem} alt="Рэм из аниме Re:zero " />
        <span className="noMatchText">
          Не найдено ничего <code>{location.pathname}</code> <br />
          <Link to="/">На главную</Link>
        </span>
      </div>
    </section>
  );
};
export default NoMatch;

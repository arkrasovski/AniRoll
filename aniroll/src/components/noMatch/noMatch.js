import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import rem from "../../images/rem.png";
import "./noMatch.sass";

const NoMatch = () => {
  let location = useLocation();
  return (
    <section className="mainNoMatch">
      <img src={rem} alt="Рэм из аниме Re:zero " />
      <div className="noMatchBox">
        <span className="noMatchText">
          Не найдено ничего по адресу{" "}
          <code>{"localhost:3000" + location.pathname}</code> <br />
        </span>
        <Link to="/">
          <button>На главную</button>
        </Link>
      </div>
    </section>
  );
};
export default NoMatch;

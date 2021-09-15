import React from "react";
import { Link } from "react-router-dom";
import "./header.sass";
import logo from "../../images/yatologo.png";
import { FaShoppingBasket, FaUserNinja } from "react-icons/fa";

const Header = ({ links }) => {
  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Логотип компании aniroll"></img>
        </Link>
        <span>AniRoll</span>
      </div>
      <div className="links">
        <ul>
          {links.map((value, key) => {
            return (
              <li key={key}>
                <Link to={value}>{value}</Link>
              </li>
            );
          })}
          <li>
            <Link to="/basket">
              <FaShoppingBasket color={"rgb(127, 0, 0)"} size={"40px"} />
            </Link>
          </li>
          <li>
            <FaUserNinja color={"rgb(127, 0, 0)"} size={"40px"} />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;

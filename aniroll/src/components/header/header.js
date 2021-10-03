import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.sass";
import logo from "../../images/yatologo.png";
import { FaShoppingBasket, FaUserNinja } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import Menu from "../menu";

const Header = ({ links, updateOrders, names }) => {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <header>
      <Link to="/">
        <div className="logo">
          <img src={logo} alt="Логотип компании aniroll"></img>

          <span>AniRoll</span>
        </div>
      </Link>
      <div className="links">
        <ul>
          {links.map((value, key) => {
            return (
              <li key={key} className="route">
                <Link to={"/" + value}>{names[key]}</Link>
              </li>
            );
          })}
          <li>
            <Link to="/basket">
              <FaShoppingBasket
                onClick={updateOrders}
                color={"rgb(127, 0, 0)"}
                size={"40px"}
              />
            </Link>
          </li>
          <li>
            <FaUserNinja color={"rgb(127, 0, 0)"} size={"40px"} />
          </li>
          <li>
            <FiMenu
              onClick={() => {
                console.log("click");
                setMenuActive(!menuActive);
              }}
            />
          </li>
        </ul>
      </div>
      <Menu
        links={links}
        names={names}
        active={menuActive}
        setActive={setMenuActive}
      />
    </header>
  );
};

export default Header;

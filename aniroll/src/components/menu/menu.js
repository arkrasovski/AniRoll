import React from "react";
import { Link } from "react-router-dom";

const Menu = ({ links, names, active, setActive }) => {
  return (
    <div
      className={active === true ? "adaptive_menu active" : "adaptive_menu"}
      onClick={() => setActive(false)}
    >
      <div
        className={active === true ? "am_links active" : "am_links"}
        onClick={(e) => e.stopPropagation()}
      >
        <ul>
          {links.map((value, key) => {
            return (
              <li key={key} className="route">
                <Link to={"/" + value} onClick={() => setActive(false)}>
                  {names[key]}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default Menu;

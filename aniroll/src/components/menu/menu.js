import React from "react";
import { Link } from "react-router-dom";

const Menu = ({ links, names, active, setActive }) => {
  if (active && document.body.style.overflow !== "hidden") {
    document.body.style.overflow = "hidden";
  }
  return (
    <div
      className={active === true ? "adaptive_menu active" : "adaptive_menu"}
      onClick={() => {
        const modal = document.querySelector(".modal.active");
        if (!modal) {
          document.body.style.overflow = "";
        }

        setActive(false);
      }}
    >
      <div
        className={active === true ? "am_links active" : "am_links"}
        onClick={(e) => e.stopPropagation()}
      >
        <ul>
          {links.map((value, key) => {
            return (
              <li key={key} className="route">
                <Link
                  to={"/" + (value === "rolls" ? "" : value)}
                  onClick={() => {
                    const modal = document.querySelector(".modal.active");
                    if (!modal) {
                      document.body.style.overflow = "";
                    }
                    setActive(false);
                  }}
                >
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

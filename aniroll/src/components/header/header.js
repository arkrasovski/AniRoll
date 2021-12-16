import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.sass";
import logo from "../../images/yatologo.png";
import { FaShoppingBasket } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

import { FaUserNinja } from "react-icons/fa";
import Menu from "../menu";

export default class Header extends Component {
  state = {
    menuActive: false,
  };

  setMenuActive = (cond) => {
    this.setState({ menuActive: cond });
  };

  componentDidMount() {
    window.addEventListener("resize", this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHandler);
  }

  resizeHandler = (e) => {
    if (e.target.innerWidth > 800) {
      if (this.state.menuActive && document.body.style.overflow === "hidden") {
        document.body.style.overflow = "";
      }
      this.setMenuActive(false);
    }
  };

  render() {
    const { links, names } = this.props;
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
                  <Link to={"/" + (value === "rolls" ? "" : value)}>
                    {names[key]}
                  </Link>
                </li>
              );
            })}
            <li className="icon">
              <Link to="/basket">
                <FaShoppingBasket  />
              </Link>
            </li>
            {/* <li>
              <Link to="/gallery">
                <RiGalleryFill color={"rgb(127, 0, 0)"} size={"40px"} />{" "}
              </Link>
            </li> */}
            <li className="icon">
              <Link to="/adminlogin">
                <FaUserNinja  />
              </Link>
            </li>
            <li className="icon">
              <FiMenu
                onClick={() => {
                  this.setMenuActive(!this.state.menuActive);
                }}
                 />
            </li>
          </ul>
        </div>
        <Menu
          links={links}
          names={names}
          active={this.state.menuActive}
          setActive={this.setMenuActive}
        />
      </header>
    );
  }
}
// const Header = ({ links, updateOrders, names }) => {
//   const [menuActive, setMenuActive] = useState(false);
//   console.log("1", menuActive);
//   useEffect(() => {
//     window.addEventListener("resize", (e) => {
//       console.log("okno > 800", menuActive);
//       if (e.target.innerWidth > 800) {
//         console.log("okno > 800", menuActive);
//         if (document.body.style.overflow === "hidden") {
//           document.body.style.overflow = "";
//           console.log("ya tutu");
//         }
//         //setMenuActive(false);
//       }
//     });
//     return () =>
//       window.removeEventListener("resize", (e) => {
//         if (e.target.innerWidth > 800) {
//           setMenuActive(false);
//         }
//       });
//   }, []);

//   return (
//     <header>
//       <Link to="/">
//         <div className="logo">
//           <img src={logo} alt="Логотип компании aniroll"></img>

//           <span>AniRoll</span>
//         </div>
//       </Link>
//       <div className="links">
//         <ul>
//           {links.map((value, key) => {
//             return (
//               <li key={key} className="route">
//                 <Link to={"/" + value}>{names[key]}</Link>
//               </li>
//             );
//           })}
//           <li>
//             <Link to="/basket">
//               <FaShoppingBasket
//                 onClick={updateOrders}
//                 color={"rgb(127, 0, 0)"}
//                 size={"40px"}
//               />
//             </Link>
//           </li>
//           <li>
//             <Link to="/gallery">
//               <RiGalleryFill color={"rgb(127, 0, 0)"} size={"40px"} />{" "}
//             </Link>
//           </li>
//           <li>
//             <FiMenu
//               onClick={() => {
//                 setMenuActive(!menuActive);
//               }}
//             />
//           </li>
//         </ul>
//       </div>
//       <Menu
//         links={links}
//         names={names}
//         active={menuActive}
//         setActive={setMenuActive}
//       />
//     </header>
//   );
// };

// export default Header;

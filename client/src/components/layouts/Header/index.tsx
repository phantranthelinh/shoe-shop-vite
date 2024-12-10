import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import Banner from "../../Banner";

const Header = () => {
  const [menuHeight, setMenuHeight] = useState("0px");

  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const toggleMenu = () => {
    if (menuHeight === "0px") {
      setMenuHeight("200px");
    } else {
      setMenuHeight("0px");
    }
  };
  return (
    <div className="header">
      <div className="container">
        <div className="navbar">
          <div className="logo">
            <Link href="/">
              <img src="images/logo.png" width="125px" />
            </Link>
          </div>
          <nav>
            <ul id="MenuItems">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/products">Products</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/login">Account</Link>
              </li>
            </ul>
          </nav>
          <Link href="/cart">
            <img src="images/cart.png" width="30px" height="30px" />
          </Link>
          <img
            src="images/menu.png"
            className="menu-icon"
            onClick={toggleMenu}
          />
        </div>
        {isHomePage && <Banner />}
      </div>
    </div>
  );
};

export default Header;

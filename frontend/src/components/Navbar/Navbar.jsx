import React, { useState } from "react";
import "./Navbar.css";
import search from "../../assets/search_icon.png";
import basket from "../../assets/basket_icon.png";

const Navbar = () => {
  const [menu, setMenu] = useState("home");

  return (
    <div className="navbar">
      <h1 className="logo">Civilization</h1>
      <ul className="navbar-menu">
        <li
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </li>
        <li
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </li>
        <li
          onClick={() => setMenu("mobile")}
          className={menu === "mobile" ? "active" : ""}
        >
          Mobile app
        </li>
        <li
          onClick={() => setMenu("contact")}
          className={menu === "contact" ? "active" : ""}
        >
          Contact Us
        </li>
      </ul>
      <div className="navbar-right">
        <img src={search} alt="" />
        <div className="navbar-search-icon">
          <img src={basket} alt="" />
          <div className="dot"></div>
        </div>
        <button>sign in</button>
      </div>
    </div>
  );
};

export default Navbar;

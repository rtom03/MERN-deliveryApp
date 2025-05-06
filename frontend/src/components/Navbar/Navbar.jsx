import React, { useContext, useState } from "react";
import "./Navbar.css";
import basket from "../../assets/basket_icon.png";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { token, logout, getSearch, getTotalCartAmount } =
    useContext(StoreContext);
  const [searchs, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSearch((search) => ({ ...search, [name]: value }));
  };

  const onSearch = async (event) => {
    event.preventDefault();
    const data = getSearch(searchs);
    setResults(data);
    console.log(data);
  };
  return (
    <div className="navbar">
      <Link to={"/"}>
        <h1 className="logo">Civilization</h1>
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile")}
          className={menu === "mobile" ? "active" : ""}
        >
          Mobile app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact")}
          className={menu === "contact" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <form action="" className="search-form" onSubmit={onSearch}>
          <img src={assets.search_icon} alt="" />
          <div className="search-dropdown">
            <input
              type="text"
              name="search"
              placeholder="search..."
              onChange={handleChange}
            />
          </div>
        </form>
        <Link className="navbar-search-icon" to={"/cart"}>
          <img src={basket} alt="" />
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </Link>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="navbar-profile-dropdown">
              <li>
                <img src={assets.bag_icon} alt="" />
                Orders
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
      <div>
        {results.map((item, index) => {
          <div id={index}>
            <h2>{item.name}</h2>
          </div>;
        })}
      </div>
    </div>
  );
};

export default Navbar;

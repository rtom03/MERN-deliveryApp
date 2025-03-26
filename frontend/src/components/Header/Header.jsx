import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favorite meal here</h2>
        <p>
          Craving something delicious? Explore our menu and order your favorite
          meal with ease. Fresh, tasty, and delivered straight to you!
        </p>
        <button> View Menu</button>
      </div>
    </div>
  );
};

export default Header;

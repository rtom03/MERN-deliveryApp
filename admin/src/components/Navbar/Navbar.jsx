import React from "react";
import "./Navbar.css";
import profile_image from "../../assets/profile_image.png";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <h1 className="logo">Civilization</h1>
        <p>admin panel</p>
      </div>
      <img src={profile_image} alt="" className="profile" />
    </div>
  );
};

export default Navbar;

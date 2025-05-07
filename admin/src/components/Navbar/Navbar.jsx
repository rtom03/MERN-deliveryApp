import React from "react";
import "./Navbar.css";
import profile_image from "../../assets/profile_image.png";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  // const navigate = useNavigation();
  return (
    <div className="navbar">
      <div className="logo">
        <NavLink to={"/"}>
          <h1 className="logo">Civilization</h1>
        </NavLink>
        <p>admin panel</p>
      </div>
      <img src={profile_image} alt="" className="profile" />
    </div>
  );
};

export default Navbar;

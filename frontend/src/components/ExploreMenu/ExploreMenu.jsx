import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h2>Explore our menu</h2>
      <p className="explore-menu-text">
        Discover a variety of mouthwatering dishes made just for you. Browse our
        menu and find your next favorite meal today!
      </p>
      <div className="explore-menu-list">
        {menu_list.map((menu, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === menu.menu_name ? "All" : menu.menu_name
                )
              }
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === menu.menu_name ? "active" : ""}
                src={menu.menu_image}
                alt="img"
              />
              <p>{menu.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;

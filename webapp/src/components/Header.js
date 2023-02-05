import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes.links}>
        <NavLink
          to="/overview"
          style={{
            textDecoration: "none",
            color: "inherit",
            marginRight: "1rem",
          }}
          className={(navData) => (navData.isActive ? classes.active : "")}
        >
          Overview
        </NavLink>
        <NavLink
          to="/orders"
          style={{
            textDecoration: "none",
            color: "inherit",
            marginRight: "1rem",
          }}
          className={(navData) => (navData.isActive ? classes.active : "")}
        >
          Orders
        </NavLink>
      </div>
      <div className={classes.profileImg}>
        <img
          className={classes.img}
          src="https://wallpapers.com/images/featured/4co57dtwk64fb7lv.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;

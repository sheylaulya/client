import React from "react";
import "../style/style.css";
import { Icon } from "@iconify/react";
import { Link, NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div
      className="nav-bar"
      style={{
        position: "fixed",
        bottom: 40,
        left: 90,
        backgroundColor: "#36394C",
        borderRadius: "2rem",
      }}
    >
      <NavLink
        to="/home"
        className={({ isActive }) => (isActive ? "link-active" : "link")}
        style={{ backgroundColor: "transparent", textDecoration: "none" }}
      >
        <div className="nav-comp" style={{ backgroundColor: "transparent" }}>
          <Icon
            className="icon-nav"
            style={{ backgroundColor: "transparent", color: "white" }}
            icon="akar-icons:home"
          />
          <p>Home</p>
        </div>
      </NavLink>

      <div className="nav-comp" style={{ backgroundColor: "transparent" }}>
        <Icon
          className="icon-nav"
          style={{ backgroundColor: "transparent", color: "white" }}
          icon="tabler:search"
        />
        <p>Explore</p>
      </div>

      <Link to="/add-post" style={{ backgroundColor: "transparent" }}>
        <div
          className=""
          style={{
            width: 45,
            aspectRatio: 1,
            borderRadius: "50%",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            className="icon-nav"
            style={{ backgroundColor: "transparent", color: "black" }}
            icon="mingcute:add-fill"
          />
        </div>
      </Link>

      <NavLink
        to="/save"
        className={({ isActive }) => (isActive ? "link-active" : "link")}
        style={{ backgroundColor: "transparent", textDecoration: "none" }}
      >
      <div className="nav-comp" style={{ backgroundColor: "transparent" }}>
        <Icon
          className="icon-nav"
          style={{ backgroundColor: "transparent", color: "white" }}
          icon="material-symbols:bookmark-outline"
        />
        <p>Saved</p>
      </div>
      </NavLink>
      <NavLink
        to="/album/1"
        className={({ isActive }) => (isActive ? "link-active" : "link")}
        style={{ backgroundColor: "transparent", textDecoration: "none" }}
      >
        <div className="nav-comp" style={{ backgroundColor: "transparent" }}>
          <Icon
            className="icon-nav"
            style={{ backgroundColor: "transparent", color: "white" }}
            icon="solar:album-bold-duotone"
          />
          <p>Album</p>
        </div>
      </NavLink>
    </div>
  );
};

export default Nav;

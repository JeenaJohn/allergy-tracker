import { slide as Menu } from "react-burger-menu";
import React from "react";
import logo from "./resources/images/sidebar_logo.svg";

function Sidebar() {
  return (
    <Menu width={"30%"} >
      <div className="sidebar-logo-box">
        <img src={logo} alt="Logo" className="sidebar-logo" />
      </div>

      <a id="home" className="menu-item" href="/">
        Home
      </a>
      <a id="kid" className="menu-item" href="/kid">
        Add Kid
      </a>
      <a id="diary" className="menu-item" href="/diary">
        Daily Log
      </a>
      <a id="report" className="menu-item" href="/report">
        Report
      </a>
    </Menu>
  );
}

export default Sidebar;

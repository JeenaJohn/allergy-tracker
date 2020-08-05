import { slide as Menu } from 'react-burger-menu';
import React from "react";



function Sidebar(){
  return(
    <Menu>
      
    <a id="home" className="menu-item" href="/">Home</a>
    <a id="kid" className="menu-item" href="/kid">Add Kid</a>
    <a id="diary" className="menu-item" href="/diary">Diary</a>
    <a id="report" className="menu-item" href="/report">Report</a>
   
  </Menu>
  );

}

export default Sidebar;
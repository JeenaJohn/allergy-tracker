import React, { useState, useEffect } from "react";

import logo from "./logo.svg";
import Sidebar from "./Sidebar";

import firebase, { auth, provider } from "./firebase.js";

function Layout(props) {
  useEffect(() => {
    props.stateChanged();
  });

  return (
    <div>
      <header className="all-pages">
        <nav>
          {/*} <div className="header__logo-box">
            <img src={logo} alt="Logo" className="header__logo" />
  </div> */}
          <div className="header__userinfo">
            {props.user ? (
              <div>
                <p className="paragraph">
                  Welcome <b>{props.user.displayName}</b>
                </p>

                <span>
                  <button className="btn btn-small" onClick={props.logout}>
                    Logout
                  </button>
                </span>
              </div>
            ) : (
              <div className="login_button">
                <button className="btn btn-medium" onClick={props.login}>
                  LogIn with Google
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>

      <Sidebar />
      <div>{props.children}</div>

      <footer>
        <div className="u-center-text">
          <p className="paragraph">
            Copyright &copy; 2020 by ThinkLambda. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;

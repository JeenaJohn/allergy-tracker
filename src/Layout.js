import React, { useState, useEffect } from "react";

import logo from "./logo.svg";

import firebase, { auth, provider } from "./firebase.js";

function Layout(props) {
  useEffect(() => {
    props.stateChanged();
  });

  return (
    <div>
      <header className="all-pages">
        <nav>
          <div className="header__logo-box">
            <img src={logo} alt="Logo" className="header__logo" />
          </div>
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
              <button className="btn btn-small" onClick={props.login}>
                LogIn with Google
              </button>
            )}
          </div>
        </nav>
      </header>

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

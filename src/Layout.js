import React, { useState, useEffect } from "react";

import logo from "./logo.svg";

import firebase, { auth, provider } from "./firebase.js";

function Layout(props) {
  



  useEffect(() => {
    props.stateChanged();
  });

  return (
    <div>
      <header className="not-home-page">
        <nav>
          <div className="row">
            <div className="header__logo-box">
              <img src={logo} alt="Logo" className="header__logo" />
            </div>
            <div className="header__userinfo">
              {props.user ? (
                <span>
                  <h4>Welcome {props.user.displayName}</h4>
                  <button className="btn btn-medium-ghost" onClick={props.logout}>
                    Logout
                  </button>
                </span>
              ) : (
                <button className="btn btn-medium" onClick={props.login}>
                  LogIn with Google
                </button>
              )}
            </div>
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

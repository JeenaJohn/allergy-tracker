import React, { useState, useEffect } from "react";

import logo from "./logo.svg";

import firebase, { auth, provider } from "./firebase.js";

import MyAllergy from "./MyAllergy";

function Home() {
  const [kid, setKidProfile] = useState({});

  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);

  const logout = () => {
    auth.signOut().then(() => {
      setUser(null);
      setUserID(null);
    });
  };

  const login = () => {
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      setUser(user);
      setUserID(user.uid);
    });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setUserID(user.uid);
      }
    });
  });

  return (
    <div className="home">
      <header>
        <nav>
          <div className="row">
            <div className="header__logo-box">
              <img src={logo} alt="Logo" className="header__logo" />
            </div>
            <div className="header__userinfo">
              {user ? (
                <span>
                  <h4>Welcome {user.displayName}</h4>
                  <button className="btn btn-medium-ghost" onClick={logout}>
                    Logout
                  </button>
                </span>
              ) : (
                <button className="btn btn-medium" onClick={login}>
                  LogIn with Google
                </button>
              )}
            </div>
          </div>
        </nav>
        <div className="header__text-box">
          <h1 className="heading-primary">
            <span className="heading-primary--main">Allergy Tracker</span>
          </h1>

          <a href="#section-list-data" className="btn btn-header">
            Show my Allergies
          </a>
        </div>
      </header>

      <section id="section-list-data" className="section-list-data">
        {userID != null ? (
          <ul>
            <MyAllergy userID={userID} />
          </ul>
        ) : (
          <p className="paragraph u-text-left">
            You have to login first to use the tracker
          </p>
        )}
      </section>

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

export default Home;

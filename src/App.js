import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";


import { auth, provider } from "./firebase.js";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import {Layout} from "./Layout";
import Home from "./Home";
import AddKid from "./AddKid";
import MyAllergy from "./MyAllergy";
import Report from "./Report";

function App() {
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

  const stateChanged = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setUserID(user.uid);
      }
    });
  };

  return (
    <Router>
      <div className="main-layout">
        <ToastContainer />
        <Layout
          user={user}
          userID={userID}
          login={login}
          logout={logout}
          stateChanged={stateChanged}
        >
          <Switch>
            <Route path="/" exact component={() => <Home userID={userID} />} />
            <Route path="/kid" component={() => <AddKid userID={userID} />} />
            <Route
              path="/diary"
              component={() => <MyAllergy userID={userID} />}
            />
            <Route
              path="/report"
              component={() => <Report userID={userID} />}
            />
          </Switch>
        </Layout>
      </div>
    </Router>
  );
}

export default App;

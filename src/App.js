import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch, useParams } 
from "react-router-dom";

import firebase, { auth, provider } from "./firebase.js";

import "./App.css";
import Layout from "./Layout";
import Home from "./Home";
import AddKid from "./AddKid";
import Sidebar from "./Sidebar";
import MyAllergy from "./MyAllergy";
import Report from "./Report";


let userID ="jjj";

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
  }

  return (
    <Router>
      <div className="sidebar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/kid">Add Kid</Link>
          </li>
          <li>
            <Link to="/diary">Diary</Link>
          </li>
          <li>
            <Link to="/report">Report</Link>
          </li>
        </ul>
      </div>
      <div className="main-layout">
        <Layout user={user}
                userID={userID}
                login={login}
                logout={logout}
                stateChanged={stateChanged}>
          <Switch>
            <Route path="/" exact component={MyAllergy} />
            <Route path="/kid" 
            component={()=> <AddKid userID={userID} /> } />
            <Route path="/diary" 
            component={()=> <MyAllergy userID={userID} /> } />
             <Route path="/report" 
            component={()=> <Report userID={userID} /> } />
          </Switch>
        </Layout>
      </div>
    </Router>
  );
}

export default App;

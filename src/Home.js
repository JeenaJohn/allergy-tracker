import React, { useState, useEffect } from "react";

function Home(props) {
  return (
    <div>

      {/* header nav bar and footer are in Layout.js */}
      <header className="home-page">
        <div className="header__text-box">
          <h1 className="heading-primary">
            <span className="heading-primary--main">Track My Rash</span>
          </h1>

          <a
            href="#section-list-data"
            className="btn btn-header u-margin-right"
          >
            Start Tracking
          </a>
          <a href="#section-list-data" className="btn btn-header btn-ghost">
            Tell me more
          </a>
        </div>
      </header>

      <section id="section-list-data" className="section-list-data">
        {props.userID != null ? (
          <p className="paragraph u-text-left">an awesome tracker for you</p>
        ) : (
          <p className="paragraph u-text-left">
            You have to login first to use the tracker
          </p>
        )}
      </section>
    </div>
  );
}

export default Home;

import React, { useState, useEffect } from "react";
import home_page from "./resources/images/home_pg_img.svg";
import MyAllergy from './MyAllergy';


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
            href="#section-diary"
            className="btn btn-header u-margin-right"
          >
            Start Tracking
          </a>
          <a href="#section-about" className="btn btn-header btn-ghost">
            Tell me more
          </a>
        </div>
      </header>

      <section id="section-diary" className="section-list-data">
        {props.userID == null ? (
          <p className="paragraph u-text-left">
            You have to login to use this app.
          </p>
        ) : (
          <MyAllergy userID={props.userID }/>
        )}
      </section>

      <section className="section-about">
        <div className="u-center-text u-margin-bottom-big">
          <h2 className="heading-secondary bg-color-blue">
            What is my pattern!!?
          </h2>
        </div>

        <div className="row ">
          <div className="col span-1-of-2 ">
          <h3 className="heading-tertiary u-margin-bottom-small">
            Keep track of all your Allergy triggers
          </h3>
          <p className="paragraph u-margin-bottom-medium">
            Knowing what triggers your allergies is the most important step
            towards preventing flareups. 'Track My Rash' app helps in daily tracking
            of the allergy triggers. Symptoms, food intake and additional
            factors like weather and activities can be tracked. Reports help you
            in identifying a pattern.
          </p>
          <p className="paragraph">
            You can save upto five kid's profiles and track the allergies for
            each of them.
          </p>
        </div>
        <div className="col span-1-of-2 ">
        <p className="paragraph">
        <img src={home_page} alt="Track My Rash" className="home-page-img" />
          </p>
        </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

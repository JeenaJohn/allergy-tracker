import React from "react";
import home_page from "./resources/images/home_pg_img.svg";

function Home(props) {
  return (
    <div>
      {/* header nav bar and footer are in Layout.js */}
      <header className="home-page">
        <div className="header__text-box">
          <h1 className="heading-primary">
            <span className="heading-primary--main">Track My Allergy</span>
          </h1>

          <a href="/diary" className="btn btn-header header-main-button ">
            Start Tracking
          </a>
          <a href="#section-about" className="btn btn-header btn-ghost">
            Tell me more
          </a>
        </div>
      </header>

      <section id="section-about" className="section-about">
        <div className="u-center-text u-margin-bottom-big">
          <h2 className="heading-secondary bg-color-blue">
            What is the pattern?
          </h2>
        </div>

        <div className="row u-margin-left">
          <div className="col span-1-of-2 ">
            <h3 className="heading-tertiary u-margin-bottom-small ">
              Keep track of all the Allergy triggers of your kids
            </h3>
            <p className="paragraph u-margin-bottom-small ">
              Knowing the allergy triggers is the most important step towards
              preventing flareups. 'Track My Allergy' app helps you to track
              flareups as well as the possible triggers.
            </p>
            <ul className="list u-margin-bottom-small u-margin-left">
              <li> Track Symptoms.</li>
              <li>Track food, weather, etc.</li>
              <li>Track any activity, like soccer, swimming, painting, etc. </li>
              <li>Get reports that help you in identifying a pattern.</li>
            </ul>
     

            <p className="paragraph">
              Add a profile for your kid and start tracking their allergy
              triggers!! You can add upto five kid's profiles and track the
              allergies separately for each of them.
            </p>
          </div>
          <div className="col span-1-of-2 ">
            <p className="paragraph">
              <img
                src={home_page}
                alt="Track My Rash"
                className="home-page-img"
              />
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

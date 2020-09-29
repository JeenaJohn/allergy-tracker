import React from "react";
import home_page from "./resources/images/home_pg_img.svg";
import visual_data from "./resources/images/visual_data.svg";

function Home(props) {
  return (
    <div>
      {/* header nav bar and footer are in Layout.js */}

      <section id="section-home" className="section-home">
        <div className="row u-margin-left u-margin-top-huge u-margin-bottom-medium">
          <div className="col span-1-of-2 u-text-left">
            <h1 className="heading-primary ">
              <span className="heading-primary--main">Track My Allergy</span>
            </h1>

            <h2 className="heading-secondary">
              Track the Allergy Symptoms and Allergy Triggers of your Kids
            </h2>

            <a
              href="/diary"
              className="btn btn-header u-margin-top-very-small "
            >
              Start Tracking
            </a>
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
        <div className="box-app-details">
          <p className="paragraph u-margin-bottom-medium">
            Knowing the allergy triggers is the most important step towards
            preventing flareups. 'Track My Allergy' app helps you to track
            symptoms as well as the possible triggers.
          </p>
          <ul className="list u-margin-bottom-medium u-margin-left">
            <li> Track Symptoms.</li>
            <li>Track food, weather, etc.</li>
            <li>Track any activity, like soccer, swimming, painting, etc. </li>
            <li>Get reports that help you in identifying a pattern.</li>
          </ul>

          <p className="paragraph u-margin-bottom-medium">
            <img
              src={visual_data}
              alt="Visual Data"
              className="visual-data-img"
            />
          </p>

          <p className="paragraph">
            Add a profile for your kid and start tracking their allergy
            triggers!! You can add upto five kid's profiles and track the
            allergies separately for each of them.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;

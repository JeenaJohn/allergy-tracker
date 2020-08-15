import React, { useState, useEffect } from "react";
import firebase from "./firebase.js";
import ReportListView from "./ReportListView";

function Report(props) {
  const [kids, setKids] = useState([]);

  const [selectedKid, setSelectedKid] = useState(null);
  const [selectedKidId, setSelectedKidId] = useState("");

  const [entryMonth, setEntryMonth] = useState("");

  const kidsRef = firebase.database().ref(props.userID + "/kids");

  useEffect(() => {
    kidsRef.on("value", (snapshot) => {
      let items = snapshot.val();

      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          kidName: items[item].kidName,
        });
        if (newState.length === 1) {
          setSelectedKidId(item);
          setSelectedKid(items[item].kidName);
        }
      }

      setKids(newState);
    });

    formatDate();
  }, [props]);

  const formatDate = () => {
    let today = new Date();

    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (mm < 10) {
      mm = "0" + mm;
    }
    today = yyyy + "-" + mm;

    setEntryMonth(today);
  };

  const handleKidSelection = (e) => {
    setSelectedKid(e.target.value);
    setSelectedKidId(e.target.id);
  };

  const handleEntryMonth = (e) => {
    setEntryMonth(e.target.value);
  };

  return (
    <div>
      <div className="u-center-text u-padding-top-big  u-margin-bottom-medium">
        <h2 className="heading-secondary bg-color-blue ">
          Report
          {selectedKid != null ? (
            <span className="u-capitalize"> - {selectedKid} </span>
          ) : null}
        </h2>
      </div>
      
      {props.userID === null ? (
        <p
          className="paragraph u-center-text u-text-color-red 
      u-margin-bottom-small"
        >
          <i>You have to first login to use this app.</i>
        </p>
      ) : null}
      <div className="box-questions">
        <h3
          className="heading-tertiary 
          u-text-left u-margin-bottom-small"
        >
          Choose Kid Profile
        </h3>
        <div className="u-margin-bottom-small">
          {kids.map((kid, index) => (
            <div
              className="list-kids u-capitalize"
              onChange={(e) => handleKidSelection(e)}
            >
              <label for={kid.id}>
                <input
                  type="radio"
                  id={kid.id}
                  name="kid"
                  value={kid.kidName}
                  className="radio-btn"
                  checked={selectedKidId === kid.id}
                />
                {kid.kidName}
              </label>
            </div>
          ))}

          {
            /* If there are no existing kid profiles */
            kids.length === 0 ? (
              <p className="paragraph u-margin-left">
                <i>No kid profiles exist. To add one, click here</i>
                <a href="/kid" className="btn btn-medium u-margin-left ">
                  Add Kid
                </a>
              </p>
            ) : null
          }
        </div>
        <div className="u-text-left">
          <h3
            className="heading-tertiary 
          u-margin-bottom-small"
          >
            Choose Month
          </h3>

          <input
            type="month"
            name="entryMonth"
            value={entryMonth}
            onChange={(e) => handleEntryMonth(e)}
            required
          />
        </div>
      </div>

      {selectedKid != null ? (
        <ReportListView
          userID={props.userID}
          kidId={selectedKidId}
          date_yyyy_mm={entryMonth}
        />
      ) : null}
    </div>
  );
}

export default Report;

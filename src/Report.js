import React, { useState, useEffect } from "react";
import firebase from "./firebase.js";
import ReportListView from "./ReportListView";

function Report(props) {
  const [kids, setKids] = useState([]);

  const [selectedKid, setSelectedKid] = useState("");
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
      <div className="u-center-text u-margin-top-big  u-margin-bottom-medium">
        <h2 className="heading-secondary bg-color-blue ">
          Report <span className="u-capitalize"> - {selectedKid} </span>
        </h2>
      </div>
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
              <label>
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

      <ReportListView
        userID={props.userID}
        kid={selectedKid}
        kidId={selectedKidId}
        date_yyyy_mm={entryMonth}
      />
    </div>
  );
}

export default Report;

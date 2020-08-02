import React, { useState, useEffect } from "react";

import Symptoms from "./Symptoms";
import Food from "./Food";
import AdditionalData from "./AdditionalData";
import firebase from "./firebase.js";

function MyAllergy(props) {
  const [kids, setKids] = useState([]);

  const [selectedKid, setSelectedKid] = useState("");
  const [selectedKidId, setSelectedKidId] = useState("");

  const [entryDate, setEntryDate] = useState("");
  const [entryMonth, setEntryMonth] = useState("");

  let today = new Date();

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
    formatDate(today);
  }, [props]);

  const formatDate = (date_input) => {
    let date_output;
    let date_output_yyyy_mm;
    let dd = date_input.getDate();

    let mm = date_input.getMonth() + 1;
    let yyyy = date_input.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    date_output = yyyy + "-" + mm + "-" + dd;
    date_output_yyyy_mm = yyyy + "-" + mm;
    setEntryDate(date_output);
    setEntryMonth(date_output_yyyy_mm);
  };

  const handleKidSelection = (e) => {
    setSelectedKid(e.target.value);
    setSelectedKidId(e.target.id);
  };

  const handleEntryDate = (e) => {
    //sets entry date and entry month
    setEntryDate(e.target.value);
    setEntryMonth(e.target.value.substring(0, 7));
  };

  return (
    <div >
    
      <div className="u-center-text  u-margin-top-big u-margin-bottom-medium">
        <h2 className="heading-secondary bg-color-blue ">
          Daily Log <span className="u-capitalize"> - {selectedKid} </span>
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
        </div>
        <div className="u-text-left">
          <h3
            className="heading-tertiary 
          u-margin-bottom-small"
          >
            Date
          </h3>

          <input
            type="date"
            name="entryDate"
            value={entryDate}
            onChange={(e) => handleEntryDate(e)}
            required
          />
        </div>
      </div>

      <Symptoms
        userID={props.userID}
        kid={selectedKid}
        kidId={selectedKidId}
        date={entryDate}
        date_yyyy_mm={entryMonth}
      />

      <Food
        userID={props.userID}
        kid={selectedKid}
        kidId={selectedKidId}
        date={entryDate}
        date_yyyy_mm={entryMonth}
      />

      <AdditionalData
        userID={props.userID}
        kid={selectedKid}
        kidId={selectedKidId}
        date={entryDate}
        date_yyyy_mm={entryMonth}
      />
   
    </div>
  );
}

export default MyAllergy;

import React, { useState, useEffect } from "react";
import firebase from "./firebase.js";

function Symptoms(props) {
  const [rash, setRash] = useState(false);
  const [itchy, setItchy] = useState(false);
  const [itchLevel, setItchLevel] = useState(0);
  const [firebaseID, setFirebaseID] = useState("");

  let saveBtnDisabled = props.userID == null ? true : false;

  const symptomsRef = firebase
    .database()
    .ref(
      props.userID +
        "/" +
        props.kidId +
        "/" +
        props.date_yyyy_mm +
        "/" +
        props.date +
        "/symptoms"
    );

  useEffect(() => {
    //initialize the questionaire values
    setRash(false);
    setItchy(false);
    setItchLevel(0);

    symptomsRef.on("value", (snapshot) => {
      let items = snapshot.val();

      console.log(items);
      for (let item in items) {
        setFirebaseID(item);
        setRash(items[item].rash);
        setItchy(items[item].itchy);
        setItchLevel(items[item].itchLevel);
      }
    });
  }, [symptomsRef]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    switch (name) {
      case "rash":
        setRash(checked);
        break;
      case "itchy":
        setItchy(checked);
        break;
      case "itchLevel":
        setItchLevel(value);
        break;
      default:
    }
  };

  const saveSymptoms = (e, rash, itchy, itchLevel) => {
    e.preventDefault();

    if (firebaseID === "") {
      /* adding data */
      symptomsRef.push({ rash, itchy, itchLevel });

    } else {
      /* update data */

      let editedData = {
        rash: rash,
        itchy: itchy,
        itchLevel: itchLevel
      };
      let updates = {};
      updates["/" + firebaseID] = editedData;
      symptomsRef.update(updates);
    }
  };

  return (
    <div>
      <div className="box-questions">
        <h3
          className="heading-tertiary 
          u-text-left u-margin-bottom-small"
        >
          Let's track Symptoms through out the day
        </h3>
        <div>
          <div className="question">
            <label for="rash">Are there Rashes?</label>
            <input
              type="checkbox"
              name="rash"
              checked={rash}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="question">
            <label for="itchy">Is it Itchy?</label>
            <input
              type="checkbox"
              name="itchy"
              checked={itchy}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="question">
            <label for="itchLevel">Itch Level (scale of 0 - 10)</label>
            <input
              type="number"
              name="itchLevel"
              min="0"
              max="10"
              value={itchLevel}
              onChange={(e) => handleChange(e)}
            />
            <span className="itch-level"><i>(0 is no itch and 10 is severe itching)</i> </span>
          </div>
          <div className="u-text-left">
            <button
              className="btn btn-medium "
              type="submit"
              onClick={(e) => saveSymptoms(e, rash, itchy, itchLevel)}
              disabled={saveBtnDisabled}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Symptoms;

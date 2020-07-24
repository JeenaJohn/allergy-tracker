import React, { useState, useEffect } from "react";
import firebase from "./firebase.js";

function Symptoms(props) {
  const [rash, setRash] = useState(false);
  const [itchy, setItchy] = useState(false);
  const [itchLevel, setItchLevel] = useState(0);

  const symptomsRef = firebase
    .database()
    .ref(props.userID + "/" + props.kidId + "/" + props.date_yyyy_mm + 
    "/" + props.date + "/symptoms");

  useEffect(() => {
    //initialize the questionaire values
    setRash(false);
    setItchy(false);
    setItchLevel(0);

    symptomsRef.on("value", (snapshot) => {
      let items = snapshot.val();
      console.log(items);

      for (let item in items) {
        setRash(items[item].rash);
        setItchy(items[item].itchy);
        setItchLevel(items[item].itchLevel);
      }
    });
  }, [props]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    console.log(checked);
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

    symptomsRef.push({ rash, itchy, itchLevel });
  };

  return (
    <div>
      <div className="box-questions">
        <h3
          className="heading-tertiary 
          u-text-left u-margin-bottom-small"
        >
          Symptoms
        </h3>
        <div>
          <div className="question">
            <label for="rash">Rashes?</label>
            <input
              type="checkbox"
              name="rash"
              checked={rash}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="question">
            <label for="itchy">Itchy?</label>
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
              value={itchLevel}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="u-text-left">
            <button
              className="btn btn-medium "
              type="submit"
              onClick={(e) => saveSymptoms(e, rash, itchy, itchLevel)}
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

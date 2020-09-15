import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ListSymptoms from "./ListSymptoms";
import firebase from "./firebase.js";

function Symptoms(props) {
  const [rash, setRash] = useState(false);
  const [itchTime, setItchTime] = useState("");
  const [itchLevel, setItchLevel] = useState(0);
  const [notes, setNotes] = useState("");

  const [existingSymptoms, setExistingSymptoms] = useState([]);

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
    setItchLevel(0);
    setItchTime("");
    setNotes("");

    symptomsRef.on("value", (snapshot) => {
      let items = snapshot.val();

      let existingData = [];
      for (let item in items) {
        existingData.push({
          id: item,
          rash: items[item].rash,
          itchLevel: items[item].itchLevel,
          itchTime: items[item].itchTime,
          notes: items[item].notes,
        });
      }

      setExistingSymptoms(existingData);
    });
  }, [props]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    switch (name) {
      case "rash":
        setRash(checked);
        break;
      case "itchTime":
        setItchTime(value);
        break;
      case "itchLevel":
        setItchLevel(value);
        break;
      case "notes":
        setNotes(value);
        break;
      default:
    }
  };

  const saveSymptoms = (e, rash, itchLevel, itchTime, notes) => {
    e.preventDefault();

    /* adding data */
    symptomsRef.push({ rash, itchLevel, itchTime, notes });
    toast.success("Symptoms saved successfully");

    //initialize the questionaire values after save
    setRash(false);
    setItchLevel(0);
    setItchTime("");
    setNotes("");
  };

  return (
    
      <div className="box-questions">
        <h3
          className="heading-tertiary 
          u-text-left u-margin-bottom-small"
        >
          Let's track Symptoms through out the day
        </h3>
        <div>
          <div className="question">
            <label htmlFor="rash">Are there any rashes?</label>
            <input
              type="checkbox"
              name="rash"
              id="rash"
              checked={rash}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="question">
            <label htmlFor="itchLevel">Itch Level (scale of 0 - 10)</label>
            <input
              type="number"
              name="itchLevel"
              id="itchLevel"
              min="0"
              max="10"
              value={itchLevel}
              onChange={(e) => handleChange(e)}
            />
            <span className="itch-level">
              <i className="italics-text">(Note: 0 is for no itching and 10 is for severe itching)</i>{" "}
            </span>
          </div>

          <div className="question">
            <label htmlFor="itchTime">
              What was the time when it was itchy?
            </label>
            <input
              type="time"
              name="itchTime"
              value={itchTime}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="question">
            <label htmlFor="notes">Notes</label>
            <textarea
              name="notes"
              rows="3"
              maxLength="200"
              className="notes"
              value={notes}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="u-text-left">
            <button
              className={`btn btn-medium ${
                saveBtnDisabled ? "btn-disabled" : ""
              } `}
              type="submit"
              onClick={(e) => saveSymptoms(e, rash, itchLevel, itchTime, notes)}
              disabled={saveBtnDisabled}
            >
              Save
            </button>
          </div>
        </div>
        
        <h3
          className="heading-tertiary 
          u-text-left  u-margin-top-medium u-margin-bottom-small"
        >
          Symptoms already added for the day
        </h3>
        <div>
          {existingSymptoms.length > 0 ? (
            existingSymptoms.map((symptom, index) => (
              <div className="box-existing-symptoms u-text-left">
                <ListSymptoms index={index} symptom={symptom} />
              </div>
            ))
          ) : (
            <h4 className="u-text-left">
              <i>No symptoms added yet</i>
            </h4>
          )}
        </div>
      </div>
    
  );
}

export default Symptoms;

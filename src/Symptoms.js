import React, { useState, useEffect } from "react";
import ListSymptoms from "./ListSymptoms";
import firebase from "./firebase.js";

function Symptoms(props) {
  const [rash, setRash] = useState(false);
  const [itchTime, setItchTime] = useState("");
  const [itchLevel, setItchLevel] = useState(0);
  const [firebaseID, setFirebaseID] = useState("");

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

    symptomsRef.on("value", (snapshot) => {
      let items = snapshot.val();

      let existingData = [];
      for (let item in items) {
        existingData.push({
          id: item,
          rash: items[item].rash,
          itchLevel: items[item].itchLevel,
          itchTime: items[item].itchTime,
        });
      }

      setExistingSymptoms(existingData);
    });
  }, [props]);

  {
    /*}    console.log(items);
      for (let item in items) {
        setFirebaseID(item);
        setRash(items[item].rash);
     //   setItchy(items[item].itchy);
        setItchLevel(items[item].itchLevel);
      }
    });
  }, [props]); */
  }

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
      default:
    }
  };

  const saveSymptoms = (e, rash, itchLevel, itchTime) => {
    e.preventDefault();

    if (firebaseID === "") {
      /* adding data */
      symptomsRef.push({ rash, itchLevel, itchTime });
    } else {
      /* update data */

      let editedData = {
        rash: rash,
        itchLevel: itchLevel,
        itchTime: itchTime,
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
            <label for="rash">Are there any rashes?</label>
            <input
              type="checkbox"
              name="rash"
              checked={rash}
              onChange={(e) => handleChange(e)}
            />
          </div>
            <div className="question">
            <label for="itchy">Time</label>
  <time>20:05</time>
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
            <span className="itch-level">
              <i>(Note: 0 is for no itching and 10 is for severe itching)</i>{" "}
            </span>
          </div>

          <div className="question">
            <label for="rash">What was the time when it was itchy?</label>
            <input
              type="time"
              name="itchTime"
              checked={itchTime}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="u-text-left">
            <button
              className="btn btn-medium "
              type="submit"
              onClick={(e) => saveSymptoms(e, rash, itchLevel, itchTime)}
              disabled={saveBtnDisabled}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="box-questions">
        <h3
          className="heading-tertiary 
          u-text-left u-margin-bottom-small"
        >
          Symptoms already added for the day
        </h3>
        <div>
      {existingSymptoms.map((symptom, index) => (
        <ListSymptoms
          index={index}
          symptom={symptom}
        />
      ))}
    </div>
      </div>
    </div>
  );
}

export default Symptoms;

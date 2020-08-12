import React, { useState, useEffect } from "react";

function ListSymptoms(props) {
  //const [editMode, setEditMode] = useState(false);

  const [rash, setRash] = useState(props.symptom.rash);

  const [itchLevel, setItchLevel] = useState(props.symptom.itchLevel);
  const [itchTime, setItchTime] = useState(props.symptom.itchTime);

  useEffect(() => {
    props.symptom.itchTime = '11:45 AM';
    console.log(props.symptom.itchTime);
    // setEditMode(false);
    setRash(props.symptom.rash);
    setItchLevel(props.symptom.itchLevel);
    setItchTime(props.symptom.itchTime);
  }, [props]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    switch (name) {
      case "rash":
        setRash(value);
        break;
      case "itchLevel":
        setItchLevel(value);
        break;
      case "itchTime":
        setItchTime(value);
        break;
      default:
    }
  };

  const discardChanges = () => {
    // setEditMode(false);
    setRash(props.symptom.rash);
    setItchLevel(props.symptom.itchLevel);
    setItchTime(props.symptom.itchTime);
  };

  return (
    <div>
      <div className="report-item">
        <label for="rash">Rashes?</label>
        <input
          className="u-display-mode"
          type="checkbox"
          name="rash"
          checked={rash}
          readOnly
        />
      </div>
  
      <div className="report-item">
       
            <label for="itchLevel">Itch Level (scale of 0 - 10):</label>
            <input
              className="u-display-mode"
              type="number"
              name="itchLevel"
              value={itchLevel}
              readOnly
            />
      </div>

      <div className="report-item">
            <label for="itchTime">What was the time when it was itchy?</label>
            <input
              type="time"
              name="itchTime"
              checked={itchTime}
              onChange={(e) => handleChange(e)}
           
            />
          </div>
    </div>
  );
}

export default ListSymptoms;

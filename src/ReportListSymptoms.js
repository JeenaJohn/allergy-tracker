import React, { useState, useEffect } from "react";

function ReportListSymptoms(props) {
  //const [editMode, setEditMode] = useState(false);

  const [rash, setRash] = useState(props.symptom.rash);

  const [itchLevel, setItchLevel] = useState(props.symptom.itchLevel);
  const [itchTime, setItchTime] = useState(props.symptom.itchTime);
  const [notes, setNotes] = useState(props.symptom.notes);

  useEffect(() => {
    console.log(props.symptom.notes);
    // setEditMode(false);
    setRash(props.symptom.rash);
    setItchLevel(props.symptom.itchLevel);
    setItchTime(props.symptom.itchTime);
    setNotes(props.symptom.notes);
  }, [props]);


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
      {itchLevel > 5 ? (
              <mark>
                <label for="itchLevel">Itch Level (scale of 0 - 10):</label>
                <input
                  className="u-display-mode"
                  type="number"
                  name="itchLevel"
                  value={itchLevel}
                  readOnly
                />
              </mark>
            ) : (
              <div>
                <label for="itchLevel">Itch Level (scale of 0 - 10):</label>
                <input
                  className="u-display-mode"
                  type="number"
                  name="itchLevel"
                  value={itchLevel}
                  readOnly
                />
              </div>
            )}
            </div>

      <div className="report-item">
        <label for="itchTime">Time when it was itchy?</label>
        <input
          className="u-display-mode"
          type="time"
          name="itchTime"
          value={itchTime}
          readOnly
        />
      </div>
      {notes.trim().length !== 0 ? (
        <div className="report-item">
          <label for="notes">Notes</label>
          <textarea
            name="notes"
            rows="3"
            maxLength="200"
            className="u-display-mode notes"
            value={notes}
            readOnly
          />
        </div>) : null }
    
    </div>
  );
}

export default ReportListSymptoms;

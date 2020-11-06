import React, { useState, useEffect } from "react";

type ListSymptomsProps = {
  index:number,
  symptom: {
    id: string;
    rash: boolean;
    itchLevel: number;
    itchTime: string;
    notes: string;
  };
};

export const ListSymptoms: React.FC<ListSymptomsProps> = (props) => {
  //const [editMode, setEditMode] = useState(false);

  const [rash, setRash] = useState(props.symptom.rash);

  const [itchLevel, setItchLevel] = useState(props.symptom.itchLevel);
  const [itchTime, setItchTime] = useState(props.symptom.itchTime);
  const [notes, setNotes] = useState(props.symptom.notes);

  useEffect(() => {
    // setEditMode(false);
    setRash(props.symptom.rash);
    setItchLevel(props.symptom.itchLevel);
    setItchTime(props.symptom.itchTime);
    setNotes(props.symptom.notes);
  }, [props]);

  /* const discardChanges = () => {
    // setEditMode(false);
    setRash(props.symptom.rash);
    setItchLevel(props.symptom.itchLevel);
    setItchTime(props.symptom.itchTime);
    setNotes(props.symptom.notes);
  }; */

  return (
    <div>
      <div className="report-item">
        <label htmlFor="rash">Rashes?</label>
        <input
          className="u-display-mode"
          type="checkbox"
          name="rash"
          checked={rash}
          readOnly
        />
      </div>

      <div className="report-item">
        <label htmlFor="itchLevel">Itch Level:</label>
        <input
          className="u-display-mode"
          type="number"
          name="itchLevel"
          value={itchLevel}
          readOnly
        />
      </div>

      <div className="report-item">
        <label htmlFor="itchTime">Time when it was itchy?</label>
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
          <label htmlFor="notes">Notes</label>
          <textarea
            name="notes"
            rows={3}
            maxLength={200}
            className="u-display-mode notes"
            value={notes}
            readOnly
          />
        </div>
      ) : null}
    </div>
  );
};

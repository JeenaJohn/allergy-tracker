import React, { useState, useEffect } from "react";

type TSymptoms = {
  rash: boolean;
  itchLevel: number;
  itchTime: string;
  notes: string;
};

type ReportListSymptomsProps = {
  index:number,
  symptom: TSymptoms;
};

export const ReportListSymptoms: React.FC<ReportListSymptomsProps> = (props) => {
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

  return (
    <div>
      <div className="report-item">
        Rashes?
        <span className="report-item-text">{rash ? "Yes" : "No"}</span>
      </div>
      <div className="report-item">
        {itchLevel > 5 ? (
          <mark>
            Itch Level:
            <span className="report-item-text">{itchLevel}</span>
          </mark>
        ) : (
          <div>
         Itch Level:
            <span className="report-item-text">{itchLevel}</span>
          </div>
        )}
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
           Notes
            <span className="report-item-text">{notes}</span>
        </div>
      ) : null}
    </div>
  );
}



import React, { useState, useEffect } from 'react';

type TSymptoms = {
  id: string;
  rash: boolean;
  itchLevel: number;
  itchTime: string;
  notes: string;
};

type ListSymptomsProps = {
  key: string;
  symptom: TSymptoms;
};

const ListSymptoms: React.FC<ListSymptomsProps> = (props) => {
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
      <div className='report-item'>
        Rashes?
        <span className='report-item-text'>{rash ? 'Yes' : 'No'}</span>
      </div>

      <div className='report-item'>
        Itch Level:
        <span className='report-item-text'>{itchLevel}</span>
      </div>

      <div className='report-item'>
        Time when it was itchy?
        <input
          className='u-display-mode report-item-text'
          type='time'
          name='itchTime'
          value={itchTime}
          readOnly
        />
      </div>
      {notes.trim().length !== 0 ? (
        <div className='report-item'>
          Notes:
          <span className='report-item-text'>{notes}</span>
        </div>
      ) : null}
    </div>
  );
};

export default ListSymptoms;

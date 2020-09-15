import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import firebase from "./firebase.js";

function AdditionalData(props) {
  const [additionalData, setAdditionalData] = useState({
    outdoor: "",
    notes: "",
    ac: false,
    nails: false,
  });
  const [firebaseID, setFirebaseID] = useState("");

  let saveBtnDisabled = props.userID == null ? true : false;

  const additionalDataRef = firebase
    .database()
    .ref(
      props.userID +
        "/" +
        props.kidId +
        "/" +
        props.date_yyyy_mm +
        "/" +
        props.date +
        "/additionalData"
    );

  useEffect(() => {
    //initialize the questionaire values
    setAdditionalData({ outdoor: "", notes: "", ac: false, nails: false });

    additionalDataRef.on("value", (snapshot) => {
      let items = snapshot.val();

      for (let item in items) {
        setFirebaseID(item);
        setAdditionalData({
          outdoor: items[item].outdoor,
          notes: items[item].notes,
          ac: items[item].ac,
          nails: items[item].nails,
        });
      }
    });
  }, [props]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    type === "checkbox"
      ? setAdditionalData({ ...additionalData, [name]: checked })
      : setAdditionalData({ ...additionalData, [name]: value });
  };

  const saveAdditionalData = (e, additionalData) => {
    e.preventDefault();

    if (firebaseID === "") {
      /* adding data */
      additionalDataRef.push(additionalData);
      toast.success("Saved successfully");
    } else {
      /* update data */

      let updates = {};
      updates["/" + firebaseID] = additionalData;
      additionalDataRef.update(updates);
    }
  };

  return (
    <div className="box-questions">
      <h3
        className="heading-tertiary 
          u-text-left u-margin-bottom-small"
      >
        Some more data to track
      </h3>
      <form onSubmit={(e) => saveAdditionalData(e, additionalData)}>
        <div>
          <div className="question">
            <label htmlFor="ac">Was A/C On?</label>
            <input
              type="checkbox"
              name="ac"
              checked={additionalData.ac}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="question">
            <label htmlFor="nails">Kid's nails are trimmed?</label>
            <input
              type="checkbox"
              name="nails"
              checked={additionalData.nails}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="question">
            <label htmlFor="outdoor">Outdoor Activities?</label>
            <input
              type="text"
              name="outdoor"
              maxLength="100"
              value={additionalData.outdoor}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="question">
            <label htmlFor="notes">Additional notes</label>
            <textarea
              name="notes"
              rows="4"
              maxLength="200"
              className="notes"
              value={additionalData.notes}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="u-text-left">
          <button
            className={`btn btn-medium ${
              saveBtnDisabled ? "btn-disabled" : ""
            } `}
            type="submit"
            disabled={saveBtnDisabled}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdditionalData;

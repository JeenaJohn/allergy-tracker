import React, { useState, useEffect } from "react";
import firebase from "./firebase.js";

function AdditionalData(props) {
  const [additionalData, setAdditionalData] = useState({
    outdoor: "",
    weather: "",
    ac: false,
    nails: false,
  });

  const additionalDataRef = firebase
    .database()
    .ref(
      props.userID + "/" + props.kidId + "/" + props.date_yyyy_mm
       + "/" + props.date + "/additionalData"
    );

  useEffect(() => {
    //initialize the questionaire values
    setAdditionalData({ outdoor: "", weather: "", ac: false, nails: false });

    additionalDataRef.on("value", (snapshot) => {
      let items = snapshot.val();
      

      for (let item in items) {
        setAdditionalData({
          outdoor: items[item].outdoor,
          weather: items[item].weather,
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
    console.log(additionalData);
    additionalDataRef.push(additionalData);
  };

  return (
    <div>
      <div className="box-questions">
        <h3
          className="heading-tertiary 
          u-text-left u-margin-bottom-small"
        >
          Additional Data
        </h3>
        <div>
          <div className="question">
            <label for="outdoor">Outdoor Activity</label>
            <input
              type="text"
              name="outdoor"
              value={additionalData.outdoor}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="question">
            <label for="weather">Weather</label>
            <input
              type="text"
              name="weather"
              value={additionalData.weather}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="question">
            <label for="ac">A/C On?</label>
            <input
              type="checkbox"
              name="ac"
              checked={additionalData.ac}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="question">
            <label for="nails">Nails Trimmed?</label>
            <input
              type="checkbox"
              name="nails"
              checked={additionalData.nails}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="u-text-left">
          <button
            className="btn btn-medium "
            type="submit"
            onClick={(e) => saveAdditionalData(e, additionalData)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdditionalData;

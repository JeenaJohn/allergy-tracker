import React, { useState, useEffect } from "react";
import firebase from "./firebase.js";
import ReportListItem from "./ReportListItem";

function ReportListView(props) {
  const [allergies, setAllergies] = useState([]);
  const dbRef = firebase
    .database()
    .ref(props.userID + "/" + props.kidId + "/" + props.date_yyyy_mm);

  useEffect(() => {
    dbRef.on("value", (snapshot) => {
      let items = {};
      items = snapshot.val();

      let newState = [];
      for (let date in items) {
        newState.push({
          date: date,
          symptoms: items[date].symptoms,
          food: items[date].food,
          additionalData: items[date].additionalData,
        });
      }
      setAllergies(newState);
    });
  }, [props]);

  return (
    <div>
       {/* If there is no data for the selected criteria, display "no data reported"*/}
       {allergies.length !== 0 ? (
      allergies.map((allergy, index) => (
        <ReportListItem
          date={allergy.date}
          symptoms={allergy.symptoms}
          food={allergy.food}
          additionalData={allergy.additionalData}
        />
      ))) : (
        <div className="box-report">
        <h4 className="u-text-left">
          <i>No data reported for the selected month</i>
        </h4>
        </div>
      )}
    </div>
  );
}

export default ReportListView;

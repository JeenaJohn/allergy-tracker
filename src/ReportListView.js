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
      let items = {} ;
      items = snapshot.val();
      console.log(items);

      let newState = [];
      for (let date in items) {
        newState.push({
          date: date,
          symptoms: items[date].symptoms,
          food: items[date].food,
          additionalData: items[date].additionalData
        });
      }
      setAllergies(newState);
      console.log(newState);
    });
  }, [props]);

  return (
    <div>
      {allergies.map((allergy, index) => (
        <ReportListItem
          date={allergy.date}
          symptoms={allergy.symptoms}
          food={allergy.food}
          additionalData={allergy.additionalData}
        />
      ))}
    </div>
  );
}

export default ReportListView;

import React, { useState, useEffect } from "react";
import firebase from "./firebase.js";
import ReportListItem from "./ReportListItem";
import BarChart from "./BarChart";

function ReportListView(props) {
  const [allergies, setAllergies] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const dbRef = firebase
    .database()
    .ref(props.userID + "/" + props.kidId + "/" + props.date_yyyy_mm);

  useEffect(() => {
    dbRef.on("value", (snapshot) => {
      let items = {};
      items = snapshot.val();

      let newState = [];
      /* initialize data for D3 bar chart*/
      let newGraphData = [];

      for (let date in items) {
        newState.push({
          date: date,
          symptoms: items[date].symptoms,
          food: items[date].food,
          additionalData: items[date].additionalData,
        });

        /* compute data for D3 bar chart. For a day, if there are a list of symptoms
        then find the maximum value for ItchLevel to display on the bar chart. */
        if (items[date].symptoms != null) {
          let symptomsArray = Object.entries(items[date].symptoms);

          let maxItch = Math.max(
            ...symptomsArray.map((entry) => {
              return entry[1].itchLevel;
            })
          );

          newGraphData.push({ date: date, itchLevel: maxItch });
        }
      }
      setAllergies(newState);
      setGraphData(newGraphData);
      console.log(props.date_yyyy_mm);
      console.log(newState);
      console.log(newGraphData);
    });
  }, [props]);

  return (
    <div>
      <div className="box-report">
        {/* Bar Chart for the report data */}
        <BarChart date_yyyy_mm={props.date_yyyy_mm} graphData={graphData} />
      </div>

      {/* If there is no data for the selected criteria, display "no data reported"*/}
      {allergies.length !== 0 ? (
        allergies.map((allergy, index) => (
          <ReportListItem
            date={allergy.date}
            symptoms={allergy.symptoms}
            food={allergy.food}
            additionalData={allergy.additionalData}
          />
        ))
      ) : (
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

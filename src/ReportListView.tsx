import React, { useState, useEffect } from "react";
import firebase from "./firebase.js";
import ReportListItem from "./ReportListItem";
import { BarChart } from "./BarChart";

type ReportViewProps = {
  userID: string | null;
  kidId: string | null;
  date_yyyy_mm: string;
};

type TSymptoms = {
  id: string;
  rash: boolean;
  itchLevel: number;
  itchTime: string;
  notes: string;
};

type TAdditionalData = {
  outdoor: string;
  notes: string;
  ac: boolean;
  nails: boolean;
};

type TFood = {
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
};

type TAllergies = {
  date: string;
  symptoms: TSymptoms[];
  food: TFood;
  additionalData: TAdditionalData;
};

type TGraphData = {
  date: string;
  itchLevel: number;
};

export const ReportListView: React.FC<ReportViewProps> = (props) => {
  const [allergies, setAllergies] = useState<TAllergies[]>([]);
  const [graphData, setGraphData] = useState<TGraphData[]>([]);
  const dbRef = firebase
    .database()
    .ref(props.userID + "/" + props.kidId + "/" + props.date_yyyy_mm);

  useEffect(() => {
    dbRef.on("value", (snapshot) => {
      let items:any = {};
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
            ...symptomsArray.map((entry:any) => {
              return entry[1].itchLevel;
            })
          );

          newGraphData.push({ date: date, itchLevel: maxItch });
        }
      }
      setAllergies(newState);
      setGraphData(newGraphData);
    });
  }, [props]);

  return (
    <div>
      {/* Display bar chart - if there is data*/}
      {graphData.length !== 0 ? (
        <div className="box-report-chart">
          <BarChart date_yyyy_mm={props.date_yyyy_mm} graphData={graphData} />
        </div>
      ) : null}

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
};

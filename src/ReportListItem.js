import React, { useState, useEffect } from "react";
import ReportListSymptoms from "./ReportListSymptoms";

function ReportListItem(props) {
  const [symptoms, setSymptoms] = useState([]);
  const [food, setFood] = useState({});
  const [additionalData, setAdditionalData] = useState({});
  const [date, setDate] = useState("");

  function convertDate(date) {
    let datearray = date.split("-");
    let newdate = datearray[1] + "-" + datearray[2] + "-" + datearray[0];
    setDate(newdate);
  }

  useEffect(() => {
    convertDate(props.date);

    /* Symptoms - There can be multiple entries for symptoms for the day*/
    /* component ReportListSymptoms will be used to list the symptoms*/

    let existingData = [];
    for (let key in props.symptoms) {
      existingData.push({
        id: key,
        rash: props.symptoms[key].rash,
        itchLevel: props.symptoms[key].itchLevel,
        itchTime: props.symptoms[key].itchTime,
        notes: props.symptoms[key].notes,
      });
    }

    setSymptoms(existingData);

    /* Food */
    let newStateFood = {};
    for (let key in props.food) {
      newStateFood = {
        breakfast: props.food[key].breakfast,
        lunch: props.food[key].lunch,
        dinner: props.food[key].dinner,
        snacks: props.food[key].snacks,
      };
    }
    setFood(newStateFood);

    /* AdditionalData */
    let newStateAdditionalData = {};
    for (let key in props.additionalData) {
      newStateAdditionalData = {
        outdoor: props.additionalData[key].outdoor,
        notes: props.additionalData[key].notes,
        ac: props.additionalData[key].ac,
        nails: props.additionalData[key].nails,
      };
    }
    setAdditionalData(newStateAdditionalData);
  }, [props]);

  return (
    <div>
      {/* Display Symptoms*/}
      <div className="box-report">
        <h3
          className="heading-report-item 
          u-text-left u-margin-bottom-very-small u-bg-color-blue report-date"
        >
          Date: {date}
        </h3>
        <h3
          className="heading-report-item 
          u-text-left u-margin-bottom-very-small u-text-underline"
        >
          Symptoms
        </h3>
        <div>
          {/* If there are no symptoms saved for that date, display "no data reported"*/}
          {symptoms.length !== 0 ? (
            symptoms.map((symptom, index) => (
              <div className="box-existing-symptoms">
                <ReportListSymptoms index={index} symptom={symptom} />
              </div>
            ))
          ) : (
            <h4 className="u-text-left">
              <i>No data reported</i>
            </h4>
          )}
        </div>

        {/* Display Food*/}

        <h3
          className="heading-report-item 
          u-text-left u-margin-bottom-very-small u-text-underline"
        >
          Food
        </h3>
        <div>
          {/* If there is no data for food saved for that date, display "no data reported"*/}
          {Object.keys(food).length !== 0 ? (
            <div>
              <div
                className={`${
                  food.breakfast.length === 0 ? "u-display-none" : "report-item"
                }`}
              >
                <label for="breakfast">Breakfast:</label>
                <input
                  type="text"
                  className="u-display-mode"
                  name="breakfast"
                  maxLength="80"
                  value={food.breakfast}
                />
              </div>

              <div
                className={`${
                  food.lunch.length === 0 ? "u-display-none" : "report-item"
                }`}
              >
                <label for="lunch">Lunch:</label>
                <input
                  type="text"
                  className="u-display-mode"
                  name="lunch"
                  maxLength="80"
                  value={food.lunch}
                />
              </div>
              <div
                className={`${
                  food.dinner.length === 0 ? "u-display-none" : "report-item"
                }`}
              >
                <label for="dinner">Dinner:</label>
                <input
                  type="text"
                  className="u-display-mode"
                  name="dinner"
                  maxLength="80"
                  value={food.dinner}
                />
              </div>

              <div
                className={`${
                  food.snacks.length === 0 ? "u-display-none" : "report-item"
                }`}
              >
                <label for="snacks">Snacks:</label>
                <input
                  type="text"
                  className="u-display-mode"
                  name="snacks"
                  maxLength="80"
                  value={food.snacks}
                />
              </div>
            </div>
          ) : (
            <h4 className="u-text-left">
              <i>No data reported</i>
            </h4>
          )}
        </div>

        {/* Display Additional Data*/}

        <h3
          className="heading-report-item 
          u-text-left u-margin-top-small u-margin-bottom-small u-text-underline"
        >
          Additional Data
        </h3>
        <div>
          {/* If there is no Additional Data saved for that date, display "no data reported"*/}
          {Object.keys(additionalData).length !== 0 ? (
            <div>
              <div className={`${
                  additionalData.ac ? "report-item" : "u-display-none" 
                }`}>
                <label for="ac">A/C On?</label>
                <input
                  type="checkbox"
                  className="u-display-mode"
                  name="ac"
                  checked={additionalData.ac}
                  readOnly
                />
              </div>
              <div className={`${
                  additionalData.nails ? "report-item" : "u-display-none" 
                }`}>
                <label for="nails">Nails Trimmed?</label>
                <input
                  type="checkbox"
                  className="u-display-mode"
                  name="nails"
                  checked={additionalData.nails}
                  readOnly
                />
              </div>
              <div className={`${
                  additionalData.outdoor.length === 0 ? "u-display-none" : "report-item"
                }`}>
                <label for="outdoor">Outdoor Activity:</label>
                <input
                  type="text"
                  className="u-display-mode"
                  name="outdoor"
                  value={additionalData.outdoor}
                />
              </div>
              <div className={`${
                  additionalData.notes.length === 0 ? "u-display-none" : "report-item"
                }`}>
                <label for="notes">Additional Notes:</label>
                <input
                  type="text"
                  className="u-display-mode"
                  name="notes"
                  value={additionalData.notes}
                />
              </div>
            </div>
          ) : (
            <h4 className="u-text-left">
              <i>No data reported</i>
            </h4>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportListItem;

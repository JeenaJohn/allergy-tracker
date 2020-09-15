import React, { useState, useEffect } from "react";
import ReportListSymptoms from "./ReportListSymptoms";

function ReportListItem(props) {
  const [symptoms, setSymptoms] = useState([]);
  const [food, setFood] = useState({});
  const [additionalData, setAdditionalData] = useState({});
  const [date, setDate] = useState("");
  const [noSymptoms, setNoSymptoms] = useState("");
  const [noFood, setNoFood] = useState("");
  const [noAdditionalData, setNoAdditionalData] = useState("");

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

    /* for readability of report, display 'No data reported' along with the 'Symptoms' heading */
    existingData.length === 0
      ? setNoSymptoms("- No data reported")
      : setNoSymptoms("");

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
    /* for readability of report, display 'No data reported' along with the 'Food' heading */
    Object.keys(newStateFood).length === 0
      ? setNoFood("- No data reported")
      : setNoFood("");

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
    /* for readability of report, display 'No data reported' along with the 'Additional Data' heading */
    Object.keys(newStateAdditionalData).length === 0
      ? setNoAdditionalData("- No data reported")
      : setNoAdditionalData("");
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
          u-text-left u-margin-bottom-very-small"
        >
          Symptoms {"  "}
          <span className="italics-text">
            <i>{noSymptoms}</i>
          </span>
        </h3>

        {symptoms.map((symptom, index) => (
          <div className="box-existing-symptoms">
            <ReportListSymptoms index={index} symptom={symptom} />
          </div>
        ))}

        {/* Display Food*/}

        <h3
          className="heading-report-item 
          u-text-left u-margin-bottom-very-small"
        >
          Food {"  "}
          <span className="italics-text">
            <i>{noFood}</i>
          </span>
        </h3>

        {Object.keys(food).length !== 0 ? (
          <div className="report-align-text">
            <div
              className={`${
                food.breakfast.length === 0 ? "u-display-none" : "report-item "
              }`}
            >
              Breakfast:
              <span className="report-item-text">{food.breakfast}</span>
            </div>

            <div
              className={`${
                food.lunch.length === 0 ? "u-display-none" : "report-item "
              }`}
            >
              Lunch:
              <span className="report-item-text">{food.lunch}</span>
            </div>
            <div
              className={`${
                food.dinner.length === 0 ? "u-display-none" : "report-item"
              }`}
            >
              Dinner:
              <span className="report-item-text">{food.dinner}</span>
            </div>

            <div
              className={`${
                food.snacks.length === 0 ? "u-display-none" : "report-item"
              }`}
            >
              Snacks:
              <span className="report-item-text">{food.snacks}</span>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {/* Display Additional Data*/}

        <h3
          className="heading-report-item 
          u-text-left u-margin-top-very-small u-margin-bottom-very-small"
        >
          Additional Data {"  "}
          <span className="italics-text">
            <i>{noAdditionalData}</i>
          </span>
        </h3>
        {Object.keys(additionalData).length !== 0 ? (
          <div className="report-align-text">
            <div
              className={`${
                additionalData.ac ? "report-item" : "u-display-none"
              }`}
            >
              A/C On?
              <span className="report-item-text">
                {additionalData.ac ? "Yes" : "No"}
              </span>
            </div>
            <div
              className={`${
                additionalData.nails ? "report-item" : "u-display-none"
              }`}
            >
              Nails Trimmed?
              <span className="report-item-text">
                {additionalData.nails ? "Yes" : "No"}
              </span>
            </div>
            <div
              className={`${
                additionalData.outdoor.length === 0
                  ? "u-display-none"
                  : "report-item"
              }`}
            >
              Outdoor Activity:
              <span className="report-item-text">{additionalData.outdoor}</span>
            </div>
            <div
              className={`${
                additionalData.notes.length === 0
                  ? "u-display-none"
                  : "report-item"
              }`}
            >
              Additional Notes:
              <span className="report-item-text">{additionalData.notes}</span>
            </div>
          </div>
        ) : (
          null
        )}
      </div>
    </div>
  );
}

export default ReportListItem;

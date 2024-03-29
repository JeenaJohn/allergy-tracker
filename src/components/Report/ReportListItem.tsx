import React, { useState, useEffect } from "react";
import ReportListSymptoms from "./ReportListSymptoms";

type TSymptoms = {
  id: string;
  rash: boolean;
  itchLevel: number;
  itchTime: string;
  notes: string;
};

type TFood = {
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
};

type TFoodDB = {
  [key: string]: TFood;
};

type TAdditionalData = {
  outdoor: string;
  notes: string;
  ac: boolean;
  nails: boolean;
};

type TAdditionalDataDB = {
  [key: string]: TAdditionalData;
};

type ReportItemProps = {
  date: string;
  symptoms: TSymptoms[];
  food: TFoodDB;
  additionalData: TAdditionalDataDB;
};

const ReportListItem: React.FC<ReportItemProps> = (props) => {
  const [symptoms, setSymptoms] = useState<TSymptoms[]>([]);
  const [food, setFood] = useState<TFood>({
    breakfast: "",
    lunch: "",
    dinner: "",
    snacks: "",
  });
  const [additionalData, setAdditionalData] = useState<TAdditionalData>({
    outdoor: "",
    notes: "",
    ac: false,
    nails: false,
  });
  const [date, setDate] = useState("");

  function formatDate(date: string) {
    let datearray = date.split("-");
    let newdate = datearray[1] + "-" + datearray[2] + "-" + datearray[0];
    setDate(newdate);
  }

  useEffect(() => {
    formatDate(props.date);

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
    let newStateFood: TFood = {
      breakfast: "",
      lunch: "",
      dinner: "",
      snacks: "",
    };
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
    let newStateAdditionalData: TAdditionalData = {
      outdoor: "",
      notes: "",
      ac: false,
      nails: false,
    };

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
      <div className="box-report ">
        <h3
          className="heading-report-item 
          u-margin-bottom-very-small u-bg-color-blue report-date"
        >
          Date: {date}
        </h3>

        {symptoms.map((symptom, index) => (
          <div className="box-existing-symptoms" key={symptom.id}>
            <ReportListSymptoms key={symptom.id} symptom={symptom} />
          </div>
        ))}

        {/* Display Food*/}

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

        {/* Display Additional Data*/}

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
      </div>
    </div>
  );
};

export default ReportListItem;

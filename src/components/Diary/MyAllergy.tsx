import React, { useState, useEffect } from "react";

import Symptoms from "./Symptoms";
import Food from "./Food";
import AdditionalData from "./AdditionalData";
import firebase from "../../firebase.js";
import { Calendar, CalendarChangeParams } from "primereact/calendar";

type MyAllergyProps = {
  userID: string | null;
};

type TKids = {
  id: string;
  kidName: string;
};

const MyAllergy: React.FC<MyAllergyProps> = (props) => {
  const [kids, setKids] = useState<TKids[]>([]);

  const [selectedKid, setSelectedKid] = useState<string>("");
  const [selectedKidId, setSelectedKidId] = useState<string>("");

  const [entryDate, setEntryDate] = useState<string>("");
  const [entryMonth, setEntryMonth] = useState<string>("");
  const [calDate, setCalDate] = useState<Date>();

  let today = new Date();

  const kidsRef = firebase.database().ref(props.userID + "/kids");
  const defaultKidRef = firebase.database().ref(props.userID + "/defaultKid");

  useEffect(() => {
    var defaultKid: string | null = null;
    setCalDate(today);

    /*  check if a default kid is already set */
    defaultKidRef.on("value", (snapshot) => {
      let item = snapshot.val();

      if (item != null) {
        setSelectedKidId(item.defaultKid);
        defaultKid = item.defaultKid;
      }
    });

    /*  get list of existing kids */
    kidsRef.on("value", (snapshot) => {
      let items = snapshot.val();

      let newState: any[] = [];
      for (let item in items) {
        newState.push({
          id: item,
          kidName: items[item].kidName,
        });

        /* if default selection exists, get the kid name as well for displaying in heading */
        if (defaultKid === item) {
          setSelectedKid(items[item].kidName);
        }
        /* no default selection exists, make the first kid in the list as default kid*/
        if (defaultKid === null && newState.length === 1) {
          setSelectedKidId(item);
          setSelectedKid(items[item].kidName);
        }
      }

      setKids(newState);
    });

    formatDate(today);
  }, [props]);

  const formatDate = (date_input: any) => {
    let date_output;
    let date_output_yyyy_mm, dd_str, mm_str;
    let dd = date_input.getDate();

    let mm = date_input.getMonth() + 1;
    let yyyy = date_input.getFullYear();

    mm_str = mm;
    dd_str = dd;

    if (dd < 10) {
      dd_str = "0" + dd;
    }
    if (mm < 10) {
      mm_str = "0" + mm;
    }
    date_output = yyyy + "-" + mm_str + "-" + dd_str;
    date_output_yyyy_mm = yyyy + "-" + mm_str;
    setEntryDate(date_output);
    setEntryMonth(date_output_yyyy_mm);
  };

  const handleKidSelection = (e: React.ChangeEvent<any>) => {
    setSelectedKid(e.target.value);
    setSelectedKidId(e.target.id);
  };

  const setDiaryDate = (e: CalendarChangeParams) => {
    e.value && formatDate(e.value);
  };

  return (
    <div>
      <div className="u-center-text  u-padding-top-big u-margin-bottom-medium">
        <h2
          data-testid="diary-header"
          className="heading-secondary bg-color-blue "
        >
          Diary
          {selectedKid !== "" ? (
            <span className="u-capitalize"> - {selectedKid} </span>
          ) : null}
        </h2>
      </div>
      {props.userID === null ? (
        <p
          className="paragraph u-center-text u-text-color-red 
      u-margin-bottom-small"
        >
          <i>You have to first login to use this app.</i>
        </p>
      ) : null}
      <div className="box-questions">
        <div className="u-text-left u-margin-bottom-small">
          <label htmlFor="entryDate" className="heading-tertiary">
            Date
          </label>
          <Calendar
            value={today}
            onChange={(e) => setDiaryDate(e)}
            showIcon
            className="p-inputtext-lg u-text-color-dark"
          ></Calendar>
        </div>
        <h3
          className="heading-tertiary 
          u-text-left u-margin-bottom-very-small"
        >
          Kid Profile
        </h3>
        <div className="u-margin-bottom-small">
          {kids.map((kid, index) => (
            <div className="list-kids u-capitalize" key={kid.id}>
              <label htmlFor={kid.id}>
                <input
                  type="radio"
                  id={kid.id}
                  name="kid"
                  value={kid.kidName}
                  className="radio-btn"
                  checked={selectedKidId === kid.id}
                  onChange={(e) => handleKidSelection(e)}
                />
                {kid.kidName}
              </label>
            </div>
          ))}

          {
            /* If there are no existing kid profiles */
            kids.length === 0 ? (
              <p className="paragraph u-text-left">
                <i>No kid profiles exist. To add one, click here</i>
                <a href="/kid" className="btn btn-medium u-margin-left ">
                  Add Kid
                </a>
              </p>
            ) : null
          }
        </div>
      </div>

      <Symptoms
        userID={props.userID}
        kidId={selectedKidId}
        date={entryDate}
        date_yyyy_mm={entryMonth}
      />

      <Food
        userID={props.userID}
        kidId={selectedKidId}
        date={entryDate}
        date_yyyy_mm={entryMonth}
      />

      <AdditionalData
        userID={props.userID}
        kidId={selectedKidId}
        date={entryDate}
        date_yyyy_mm={entryMonth}
      />
    </div>
  );
};

export default MyAllergy;

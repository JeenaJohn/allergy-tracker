import React, { useState, useEffect } from "react";
import firebase from "../../firebase.js";
import { ReportListView } from "./ReportListView";
import { Calendar, CalendarChangeParams } from "primereact/calendar";

type ReportProps = {
  userID: string | null;
};

type TKids = {
  id: string;
  kidName: string;
};

const Report: React.FC<ReportProps> = (props) => {
  const [kids, setKids] = useState<TKids[]>([]);

  const [selectedKid, setSelectedKid] = useState<string>("");
  const [selectedKidId, setSelectedKidId] = useState<string>("");

  const [entryMonth, setEntryMonth] = useState<string>("");

  const kidsRef = firebase.database().ref(props.userID + "/kids");
  const defaultKidRef = firebase.database().ref(props.userID + "/defaultKid");
  let today = new Date();

  useEffect(() => {
    var defaultKid: string | null = null;

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

      let newState = [];
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

  const formatDate = (inputDate: any) => {
    let mm_str;

    let mm = inputDate.getMonth() + 1;
    let yyyy = inputDate.getFullYear();

    mm_str = mm;

    if (mm < 10) {
      mm_str = "0" + mm;
    }
    let today_month = yyyy + "-" + mm_str;

    setEntryMonth(today_month);
  };

  const handleKidSelection = (e: React.ChangeEvent<any>) => {
    setSelectedKid(e.target.value);
    setSelectedKidId(e.target.id);
  };

  const setReportDate = (e: CalendarChangeParams) => {
    e.value && formatDate(e.value);
  };

  return (
    <div>
      <div className="u-center-text u-padding-top-big  u-margin-bottom-medium">
        <h2
          data-testid="report-header"
          className="heading-secondary bg-color-blue "
        >
          Report
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
          <label htmlFor="entryMonth" className="heading-tertiary">
            Month
          </label>

          <Calendar
            id="monthpicker"
            value={today}
            onChange={(e) => setReportDate(e)}
            view="month"
            dateFormat="mm/yy"
            yearNavigator
            yearRange="2010:2030"
            showIcon
            className="p-inputtext-lg"
          />
        </div>

        <h3
          className="heading-tertiary 
          u-text-left u-margin-bottom-very-small"
        >
          Kid Profile
        </h3>
        <div className="u-margin-bottom-small">
          {kids.map((kid, index) => (
            <div key={kid.id} className="list-kids u-capitalize">
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

      {selectedKid != null ? (
        <ReportListView
          userID={props.userID}
          kidId={selectedKidId}
          date_yyyy_mm={entryMonth}
        />
      ) : null}
    </div>
  );
};

export default Report;

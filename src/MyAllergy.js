import React, { useState, useEffect } from "react";
import AddKid from "./AddKid";
import ListKid from "./ListKid";
import Symptoms from "./Symptoms";
import Food from "./Food";
import AdditionalData from "./AdditionalData";
import firebase, { auth, provider } from "./firebase.js";

function MyAllergy(props) {
  const [kids, setKids] = useState([]);
  const [userMsg, setUserMsg] = useState("");
  const [selectedKid, setSelectedKid] = useState("");
  const [selectedKidId, setSelectedKidId] = useState("");

  const [entryDate, setEntryDate] = useState("");

  const kidsRef = firebase.database().ref(props.userID + "/kids");

  useEffect(() => {
    console.log(kidsRef);
    console.log(props.userID);
    kidsRef.on("value", (snapshot) => {
      let items = snapshot.val();
      console.log(items);

      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          kidName: items[item].kidName,
        });
      }

      console.log(`in useEffect ${newState}`);
      console.log(newState);
      setKids(newState);
    });
    formatDate();
  }, []);

  const validateData = (kidName) => {
    let error = " ";
    if (kidName.length === 0) {
      error = "Enter kid's name";
    }
    setUserMsg(error);
  };

  const saveNewKidProfile = (e, kidName) => {
    e.preventDefault();

    console.log(kidName);

    kidsRef.push({ kidName });
  };

  const formatDate = () => {
    let today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;

    setEntryDate(today);
  };

  const handleKidSelection = (e) => {
    setSelectedKid(e.target.value);
    setSelectedKidId(e.target.id);
  };

  const handleEntryDate = (e) => {
    setEntryDate(e.target.value);
  };

  return (
    <div>
      
        <div className="u-center-text u-margin-top-big  u-margin-bottom-medium">
          <h2
            className="heading-secondary bg-color-blue "
         
          >
            Add Allergy Details - {selectedKid}
          </h2>
          </div>
          <div className="box-questions">
            <h3
              className="heading-tertiary 
          u-text-left u-margin-bottom-small"
            >
              Choose Kid Profile
            </h3>
            <div className="list-kids u-margin-bottom-small">
              {kids.map((kid, index) => (
                <div onChange={(e) => handleKidSelection(e)}>
                  <input
                    type="radio"
                    id={kid.id}
                    name="kid"
                    value={kid.kidName}
                    className="radio-btn"
                  />
                  {kid.kidName}
                </div>
              ))}
            </div>
            <div className="u-text-left">
            <h3
              className="heading-tertiary 
          u-margin-bottom-small"
            >
              Date
            </h3>

            <input
              type="date"
              name="entryDate"
              value={entryDate}
              onChange={(e) => handleEntryDate(e)}
              required
            />
          </div>

          </div>

 
        
        <Symptoms
          userID={props.userID}
          kid={selectedKid}
          kidId={selectedKidId}
          date={entryDate}
        />

        <Food
          userID={props.userID}
          kid={selectedKid}
          kidId={selectedKidId}
          date={entryDate}
        />

        <AdditionalData
          userID={props.userID}
          kid={selectedKid}
          kidId={selectedKidId}
          date={entryDate}
        />
      </div>
    
  );
}

export default MyAllergy;

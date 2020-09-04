import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import firebase from "./firebase.js";

function AddKid(props) {
  const [newKidName, setNewKidName] = useState("");
  const [defaultChecked, setDefaultChecked] = useState(false);
  const [firebaseID, setFirebaseID] = useState("");
 // const [defaultKidID, setDefaultKidID] = useState("");
  // const [userMsg, setUserMsg] = useState("");
  //const [loginMsg, setLoginMsg] = useState("");
  const [kids, setKids] = useState([]);

  let saveBtnDisabled = props.userID == null ? true : false;

  const kidsRef = firebase.database().ref(props.userID + "/kids");
  const defaultKidRef = firebase.database().ref(props.userID+ "/defaultKid");

  useEffect(() => {
    /*  get list of existing kids */

    kidsRef.on("value", (snapshot) => {
      let items = snapshot.val();

      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          kidName: items[item].kidName,
        });
      }

      setKids(newState);
    });
    

  }, [props]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    switch (name) {
      case "kidName":
        setNewKidName(value);
        break;
  //    case "defaultKid":
   //     setDefaultChecked(checked);
  //      break;
      default:
    }
  };

  /*const validateData = (kidName) => {
    let msg = "";
    console.log(kidName.trim());
    if (kidName.length === 0) {
      msg = "Enter kid's name";
    }
    setUserMsg(msg);
    console.log(msg);
  };*/

  const save = (e, kidName, defaultChecked) => {
    e.preventDefault();

    /* validateData(kidName); 
    console.log(userMsg); */

    /* save to DB only if no errors*/
    /* check to see if user entered a value */
    if (kidName.trim().length !== 0) {
      var kidID = kidsRef.push({ kidName }).key;
  //    if (defaultChecked) {
  //      defaultKidRef.set({defaultKid : kidID});
   //   }
      
      /* clear kid name field and userMsg after save*/
      setNewKidName("");
   //   setDefaultChecked(false);
      toast.success("Kid profile saved successfully");
    } else {
      toast.error("Kid's name is empty.");
    }
  };

  return (
    <div>
      <div className="u-center-text u-padding-top-big  u-margin-bottom-medium">
        <h2 className="heading-secondary bg-color-blue ">Add Kid Profile</h2>
      </div>
      <div>
        {props.userID === null ? (
          <p
            className="paragraph u-center-text u-text-color-red 
    u-margin-bottom-small"
          >
            You have to first login to use this app.
          </p>
        ) : null}
      </div>

      <div className="box-questions">
        <div className="question">
          <label htmlFor="kidName">Kid's Name</label>

          <input
            type="text"
            name="kidName"
            className="kid-name-input"
            value={newKidName}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        {/*
        <div className="question">
          <label htmlFor="defaultChecked" className="italics-text">
            <i>Make this my default selection</i>
          </label>
          <input
            type="checkbox"
            name="defaultChecked"
            id="defaultChecked"
            checked={defaultChecked}
            onChange={(e) => handleChange(e)}
          />
        </div>
        */}
        <div className="u-text-left">
          <button
            className={`btn btn-medium ${
              saveBtnDisabled ? "btn-disabled" : ""
            } `}
            type="submit"
            onClick={(e) => save(e, newKidName, defaultChecked)}
            disabled={saveBtnDisabled}
          >
            Save
          </button>
        </div>

        {/*userMsg.length !== 0 ? (
          <p
            className="paragraph u-text-left u-text-color-red 
      u-margin-bottom-small"
          >
            <i>Enter Kid's name</i>
          </p>
        ) : null*/}
      </div>
      <div className="box-questions">
        <h3
          className="heading-tertiary 
          u-text-left u-margin-bottom-small"
        >
          Below is the list of kids already added
        </h3>
        {kids.length > 0 ? (
          <ol className="list-kids u-text-left u-capitalize u-margin-bottom-small">
            {kids.map((kid, index) => (
              <li>{kid.kidName}</li>
            ))}
          </ol>
        ) : (
          <h4>
            <i>Your list is empty. Please add kid.</i>
          </h4>
        )}
      </div>
    </div>
  );
}

export default AddKid;

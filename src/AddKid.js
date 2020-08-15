import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import firebase from "./firebase.js";

function AddKid(props) {
  const [newKidName, setNewKidName] = useState("");
  // const [userMsg, setUserMsg] = useState("");
  //const [loginMsg, setLoginMsg] = useState("");
  const [kids, setKids] = useState([]);

  let saveBtnDisabled = props.userID == null ? true : false;

  const kidsRef = firebase.database().ref(props.userID + "/kids");

  useEffect(() => {
    /*  check if user is logged in */

   console.log(props.userID);

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
    const { name, value } = e.target;

    switch (name) {
      case "kidName":
        setNewKidName(value);
        break;
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

  const save = (e, kidName) => {
    e.preventDefault();

    /* validateData(kidName); 
    console.log(userMsg); */

    /* save to DB only if no errors*/
    /* check to see if user entered a value */
    if (kidName.trim().length !== 0) {
      kidsRef.push({ kidName });
      /* clear kid name field and userMsg after save*/
      setNewKidName("");
      toast.success("Kid profile saved successfully");
    } else {
      toast.error("Kid's name is empty");
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
          <label for="kidName" className="kid-name-label">
            Kid's Name
          </label>

          <input
            type="text"
            name="kidName"
            className="kid-name-input"
            value={newKidName}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="u-text-left">
          <button
            className={`btn btn-medium ${saveBtnDisabled ? "btn-disabled" : ""} `}
            type="submit"
            onClick={(e) => save(e, newKidName)}
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
          <ol className="list-kids u-capitalize u-margin-bottom-small">
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

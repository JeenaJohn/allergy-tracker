import React, { useState } from "react";
import { useParams } from "react-router-dom";

import firebase from "./firebase.js";

function AddKid(props) {
  const [newKidName, setNewKidName] = useState("");
  const [userMsg, setUserMsg] = useState("");

  const kidsRef = firebase.database().ref(props.userID + "/kids");

  console.log(props.userID);
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "kidName":
        setNewKidName(value);
        break;
      default:
    }
  };

  const validateData = (kidName) => {
    let error = " ";
    if (kidName.length === 0) {
      error = "Enter kid's name";
    }
    setUserMsg(error);
  };

  const save = (e, kidName) => {
    e.preventDefault();

    console.log(kidName);

    kidsRef.push({ kidName });
  };

  return (
    <div>
      <div className="u-center-text u-margin-top-big  u-margin-bottom-medium">
        <h2 className="heading-secondary bg-color-blue ">Add Kid Profile</h2>
      </div>
      <div className="box-questions">
        <div className="u-text-left u-margin-bottom-small">
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

        <div className="u-center-text">
          <button
            className="btn btn-medium "
            type="submit"
            onClick={(e) => save(e, newKidName)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddKid;

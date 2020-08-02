import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import firebase from "./firebase.js";

function AddKid(props) {
  const [newKidName, setNewKidName] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [kids, setKids] = useState([]);

  const kidsRef = firebase.database().ref(props.userID + "/kids");

  console.log(props.userID);

  useEffect(() => {
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

    /* clear kid name field after save*/
    setNewKidName("");
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
          <span className="u-margin-left">
            <button
              className="btn btn-medium "
              type="submit"
              onClick={(e) => save(e, newKidName)}
            >
              Save
            </button>
          </span>
        </div>

        <div className="u-center-text bg-color-black"></div>
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
          <h4><i>Your list is empty. Please add.</i></h4>
        )}
      </div>
    </div>
  );
}

export default AddKid;

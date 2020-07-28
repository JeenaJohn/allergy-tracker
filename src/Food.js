import React, { useState, useEffect } from "react";
import firebase from "./firebase.js";

function Food(props) {
  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");
  const [snacks, setSnacks] = useState("");
  const [allFood, setAllFood] = useState([]);

  const foodRef = firebase
    .database()
    .ref(props.userID + "/" + props.kidId + "/" + props.date_yyyy_mm
    + "/" + props.date + "/food" );

  useEffect(() => {
    //initialize the questionaire values
    setBreakfast("");
    setLunch('');
    setSnacks('');
    setDinner('');

    foodRef.on("value", (snapshot) => {
      let items = snapshot.val();

      for (let item in items) {
        setBreakfast(items[item].breakfast);
        setLunch(items[item].lunch);
        setDinner(items[item].dinner);
        setSnacks(items[item].snacks);
      }
    });
  }, [props]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    

    switch (name) {
      case "breakfast":
        setBreakfast(value);
        break;

      case "lunch":
        setLunch(value);
        break;

      case "dinner":
        setDinner(value);
        break;

      case "snacks":
        setSnacks(value);
        break;

      default:
    }
  };

  const saveFood = (e, breakfast, lunch, dinner, snacks) => {
    e.preventDefault();

    foodRef.push({ breakfast, lunch, dinner, snacks });
  };

  return (
    <div className="box-questions">
      <h3
        className="heading-tertiary
          u-text-left u-margin-bottom-medium"
      >
        Food
      </h3>

      <div className="question">
        <label for="breakfast">Breakfast</label>
        <input
          type="text"
          name="breakfast"
          maxLength="80"
          value={breakfast}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className="question">
        <label for="lunch">Lunch</label>
        <input
          type="text"
          name="lunch"
          maxLength="80"
          value={lunch}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="question">
        <label for="dinner">Dinner</label>
        <input
          type="text"
          name="dinner"
          maxLength="80"
          value={dinner}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className="question">
        <label for="snacks">Snacks</label>
        <input
          type="text"
          name="snacks"
          maxLength="80"
          value={snacks}
          onChange={(e) => handleChange(e)}
        />
      </div>

      {allFood.map((food1) => (
        <div className="question">
          <label for="food">Food</label>
          <input type="text" name="food" maxLength="60" value={food1.food} />
        </div>
      ))}

      <div className="u-text-left">
        <button
          className="btn btn-medium "
          type="submit"
          onClick={(e) => saveFood(e, breakfast, lunch, dinner, snacks)}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Food;

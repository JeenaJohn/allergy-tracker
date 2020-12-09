import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import firebase from "./firebase.js";

type FoodProps = {
  userID: string | null;
  kidId: string | null;
  date: string | null;
  date_yyyy_mm: string | null;
};

export const Food: React.FC<FoodProps> = (props) => {
  const [breakfast, setBreakfast] = useState<string>("");
  const [lunch, setLunch] = useState<string>("");
  const [dinner, setDinner] = useState<string>("");
  const [snacks, setSnacks] = useState<string>("");
  const [firebaseID, setFirebaseID] = useState<string>("");

  let saveBtnDisabled =
    props.userID == null || props.kidId == null ? true : false;

  const foodRef = firebase
    .database()
    .ref(
      props.userID +
        "/" +
        props.kidId +
        "/" +
        props.date_yyyy_mm +
        "/" +
        props.date +
        "/food"
    );

  useEffect(() => {
    //initialize the questionaire values
    setBreakfast("");
    setLunch("");
    setSnacks("");
    setDinner("");

    foodRef.on("value", (snapshot) => {
      let items = snapshot.val();

      for (let item in items) {
        setFirebaseID(item);
        setBreakfast(items[item].breakfast);
        setLunch(items[item].lunch);
        setDinner(items[item].dinner);
        setSnacks(items[item].snacks);
      }
    });
  }, [props]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const saveFood = (
    e: React.FormEvent<HTMLFormElement>,
    breakfast: string,
    lunch: string,
    dinner: string,
    snacks: string
  ) => {
    e.preventDefault();

    if (firebaseID === "") {
      /* adding data */
      foodRef.push({ breakfast, lunch, dinner, snacks });
      toast.success("Saved successfully");
    } else {
      /* update data */

      let editedData = {
        breakfast: breakfast,
        lunch: lunch,
        dinner: dinner,
        snacks: snacks,
      };
      let updates: any = {};
      updates["/" + firebaseID] = editedData;
      foodRef.update(updates);
    }
  };

  return (
    <div className="box-questions">
      <h3
        className="heading-tertiary
          u-text-left u-margin-bottom-small"
      >
        Let's track Food
      </h3>
      <form onSubmit={(e) => saveFood(e, breakfast, lunch, dinner, snacks)}>
        <table className="table">
          <tr>
            <td>
              <label htmlFor="breakfast" className="td-label">
                Breakfast
              </label>
            </td>
            <td className="td-input-col">
              <input
                type="text"
                name="breakfast"
                maxLength={80}
                value={breakfast}
                className="td-input"
                onChange={(e) => handleChange(e)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="lunch" className="td-label">
                Lunch
              </label>
            </td>
            <td className="td-input-col">
              <input
                type="text"
                name="lunch"
                maxLength={80}
                value={lunch}
                className="td-input"
                onChange={(e) => handleChange(e)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="dinner" className="td-label">
                Dinner
              </label>
            </td>
            <td className="td-input-col">
              <input
                type="text"
                name="dinner"
                maxLength={80}
                value={dinner}
                className="td-input"
                onChange={(e) => handleChange(e)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="snacks" className="td-label">
                Snacks
              </label>
            </td>
            <td className="td-input-col">
              <input
                type="text"
                name="snacks"
                maxLength={80}
                value={snacks}
                className="td-input"
                onChange={(e) => handleChange(e)}
              />
            </td>
          </tr>
        </table>

        <div className="u-text-left">
          <button
            className={`btn btn-medium ${
              saveBtnDisabled ? "btn-disabled" : ""
            } `}
            type="submit"
            disabled={saveBtnDisabled}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

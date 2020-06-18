import React, { useState } from "react";

function AddAllergy() {
  let itchy = true;
  let itchLevel = 0;
  let food, activity;
  let eatTime, activityTime;
  return (
    <div>
      <h2>Add Allergy Details</h2>
      <h3>Symptoms</h3>
      <div>
        <div>
          <label for="rash">Rashes?</label>
          <input type="checkbox" name="rash" value={itchy} />
        </div>
        <div>
          <label for="itchy">Itchy?</label>
          <input type="checkbox" name="itchy" value={itchy} />
        </div>
        <div>
          <label for="itchLevel">Itch Level (scale of 0 - 10)</label>
          <input type="number" name="itchLevel" value={itchLevel} />
        </div>
      </div>

      <div>
        <h3>Food</h3>

        <div>
          <label for="food">Food</label>
          <input type="text" name="food" value={food} />
        </div>
        <div>
          <label for="time">Time</label>
          <input type="time" name="time" value={eatTime} />
        </div>

      </div>

      <div>
        <h3>Activity</h3>

        <div>
          <label for="activity">Activity</label>
          <input type="text" name="activity" value={activity} />
        </div>
        <div>
          <label for="time">Time</label>
          <input type="time" name="time" value={activityTime} />
        </div>

      </div>

      
    </div>
  );
}

export default AddAllergy;

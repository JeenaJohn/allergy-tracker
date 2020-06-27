import React, { useState } from "react";

function AddKid(props) {
  const [newKidName, setNewKidName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "kidName":
        setNewKidName(value);
        break;
      default:
    }
  };

  return (
    <div className="new-kid">
      <div>
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
          onClick={(e) => props.save(e, newKidName)}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default AddKid;

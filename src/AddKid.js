import React, {useState} from "react";

function AddKid() {

    const [newKidName, setNewKidName] = useState('');
    const [newKidAge, setNewKidAge] = useState('');
    return (
    <div>
      <div>
        <label for="kidName">Child's Name</label>
        <input type="text" name="kidName" value={newKidName} />
      </div>
      <div>
        <label for="kidAge">Child's Age</label>
        <input type="number" name="kidage" value={newKidAge} />
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </div>
  );
}

export default AddKid;

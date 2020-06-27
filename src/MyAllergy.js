import React, { useState, useEffect } from "react";
import AddKid from "./AddKid";
import ListKid from "./ListKid";
import AddAllergy from "./AddAllergy";
import firebase, { auth, provider } from "./firebase.js";

function MyAllergy(props) {
  const [kids, setKids] = useState([]);
  const [userMsg, setUserMsg] = useState("");
  const [selectedKid, setSelectedKid] = useState('');

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

  const handleKidSelection = (e) => {
    setSelectedKid(e.target.value);
  
  };

  return (
    <div>
      <ul>
        {kids.map((kid, index) => (
         <div onChange={(e) => handleKidSelection(e)}>
            <input type="radio" id={kid.id} name="kid" value={kid.kidName} />
            {kid.kidName}
        </div> 
      
        ))}
      </ul> 

      <div>
        <AddAllergy selectedKid={selectedKid} />
      </div>
    </div>
  );
}

export default MyAllergy;

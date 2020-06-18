import React, { useState } from "react";
import AddKid from "./AddKid";
import AddAllergy from "./AddAllergy";

function MyAllergy() {
  return (
    <div>
      <div>
        <AddKid />
      </div>
      <div>
        <AddAllergy />
      </div>
    </div>
  );
}

export default MyAllergy;

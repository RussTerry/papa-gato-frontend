// RoleMenu.js

import { useState } from "react";
import "./RoleMenu.css";

function RoleMenu({ onSelectionChange = () => {} }) {
  const [selectedRole, setSelectedRole] = useState("");
  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedRole(value);
    onSelectionChange(value); // Send role to App
  };

  return (
    <div>
      <button
        className={`rolebutton ${selectedRole === "Animal" ? "selected" : ""}`}
        name="role"
        value="Animal"
        onClick={handleOptionChange}
      >
        Animal
      </button>

      <button
        className={`rolebutton ${selectedRole === "Clinic" ? "selected" : ""}`}
        name="role"
        value="Clinic"
        onClick={handleOptionChange}
      >
        Clinic
      </button>
      <button
        className={`rolebutton ${selectedRole === "Inventory" ? "selected" : ""}`}
        name="role"
        value="Inventory"
        onClick={handleOptionChange}
      >
        Inventory
      </button>
      <button
        className={`rolebutton ${selectedRole === "Location" ? "selected" : ""}`}
        name="role"
        value="Location"
        onClick={handleOptionChange}
      >
        Location
      </button>
      <button
        className={`rolebutton ${selectedRole === "O" ? "selected" : ""}`}
        name="role"
        value="Owner"
        onClick={handleOptionChange}
      >
        Owner
      </button>

      <button
        className={`rolebutton ${selectedRole === "Species" ? "selected" : ""}`}
        name="role"
        value="Species"
        onClick={handleOptionChange}
      >
        Species
      </button>
    </div>
  );
}

export default RoleMenu;

// RoleMenu.js

import { useState } from 'react';
import './RoleMenu.css';


function RoleMenu({ onSelectionChange = () => {} }) {
  const [selectedRole, setSelectedRole] = useState('');
  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedRole(value);
    onSelectionChange(value); // Send role to App
  };

  return (
    <div>
      <button
        className={`rolebutton ${selectedRole === 'Location' ? 'selected' : ''}`}
        name="role"
        value="Location"
        onClick={handleOptionChange}
      >
        Location
      </button>

      <button
        className={`rolebutton ${selectedRole === 'Inventory' ? 'selected' : ''}`}
        name="role"
        value="Inventory"
        onClick={handleOptionChange}
      >
        Inventory
      </button>


    </div>
  );
}

export default RoleMenu;

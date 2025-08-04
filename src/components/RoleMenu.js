import React, { useState } from 'react';

function RoleMenu({ onSelectionChange = () => {} }) {
  const [selectedRole, setSelectedRole] = useState('');
  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedRole(value);
    onSelectionChange(value); // Send role to App
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          name="role"
          value="Location"
          checked={selectedRole === 'Location'}
          onChange={handleOptionChange}
        />
        Location
      </label>

      <label>
        <input
          type="radio"
          name="role"
          value="Foster"
          checked={selectedRole === 'Foster'}
          onChange={handleOptionChange}
        />
        Foster
      </label>
      <label>
        <input
          type="radio"
          name="role"
          value="Owner"
          checked={selectedRole === 'Owner'}
          onChange={handleOptionChange}
        />
        Owner
      </label>

      <label>
        <input
          type="radio"
          name="role"
          value="Staff"
          checked={selectedRole === 'Staff'}
          onChange={handleOptionChange}
        />
        Staff
      </label>

      <label>
        <input
          type="radio"
          name="role"
          value="Vet"
          checked={selectedRole === 'Vet'}
          onChange={handleOptionChange}
        />
        Vet
      </label>
      <label>
        <input
          type="radio"
          name="role"
          value="Inventory"
          checked={selectedRole === 'Inventory'}
          onChange={handleOptionChange}
        />
        Inventory
      </label>
      <label>
        <input
          type="radio"
          name="role"
          value="Clinic"
          checked={selectedRole === 'Clinic'}
          onChange={handleOptionChange}
        />
        Clinic
      </label>

      <label>
        <input
          type="radio"
          name="role"
          value="Species"
          checked={selectedRole === 'Species'}
          onChange={handleOptionChange}
        />
        Species
      </label>


    </div>
  );
}

export default RoleMenu;

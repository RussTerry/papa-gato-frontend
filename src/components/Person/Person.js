import React from 'react';

const Person = {
  firstName: '',
  lastName: '',
  address: '',
  email: '',
  phone: '',
  notes: '',
};
export default Person;

function PersonModule({ role, action }) {
  if (!role) return null;


  const renderMessage = () => {
    switch (action) {
      case 'create':
        return `Add new ${role.toLowerCase()}`;
      case 'read':
        return `View ${role.toLowerCase()} records`;
      case 'update':
        return `Update selected ${role.toLowerCase()}`;
      case 'delete':
        return `Delete selected ${role.toLowerCase()}`;
      default:
        return 'Please select an action';
    }
  };

  return (
    <div>
      <h2>{role} Module</h2>
      <p>{renderMessage()}</p>

      {/* Show the form as soon as a role is selected */}
      <form>
        <label>
          First Name:
          <input type="text" name="firstName" />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="lastName" />
        </label>
        <br />
        <label>
          Address:
          <input type="text" name="address" />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <br />
        <label>
          Phone:
          <input type="tel" name="phone" />
        </label>
        <br />
        <label>
          Notes:
          <textarea name="notes" />
        </label>
        <br />
        {action === 'create' && <button type="submit">Submit</button>}
        {action === 'update' && <button type="submit">Update</button>}
        {action === 'delete' && <button type="submit">Confirm Delete</button>}
      </form>
    </div>
  );
}

export { default as PersonModule } from './Person';


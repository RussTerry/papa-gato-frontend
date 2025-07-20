import React, { useState, useEffect, useRef } from 'react';
import Person from './Person'; // Assumes Person is a JS object with default field values

const Owner = ({ action }) => {
  const [owners, setOwners] = useState([]);
  const [formData, setFormData] = useState({ ...Person });
  const [selectedOwnerId, setSelectedOwnerId] = useState(null);

  const firstNameRef = useRef(null);

  // Focus first field on create
  useEffect(() => {
    if (action === 'create') {
      setFormData({ ...Person });
      firstNameRef.current?.focus();
      setSelectedOwnerId(null); // Clear any selected ID
    }
  }, [action]);

  // Load form data when updating or deleting
  useEffect(() => {
    if ((action === 'update' || action === 'delete') && selectedOwnerId !== null) {
      const selectedOwner = owners.find(o => o.id === selectedOwnerId);
      if (selectedOwner) {
        setFormData({ ...selectedOwner });
      }
    }
  }, [selectedOwnerId, action, owners]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (formData.firstName.trim()) {
      setOwners(prev => [...prev, { ...formData, id: Date.now() }]);
      setFormData({ ...Person });
      firstNameRef.current?.focus();
    }
  };

  const handleUpdate = () => {
    if (!selectedOwnerId) return;
    setOwners(prev =>
      prev.map(owner =>
        owner.id === selectedOwnerId ? { ...formData, id: selectedOwnerId } : owner
      )
    );
    setSelectedOwnerId(null);
    setFormData({ ...Person });
  };

  const handleDeleteConfirm = () => {
    if (!selectedOwnerId) return;
    setOwners(prev => prev.filter(owner => owner.id !== selectedOwnerId));
    setSelectedOwnerId(null);
    setFormData({ ...Person });
  };

  return (
    <div style={{ padding: '1em', maxWidth: '600px', margin: 'auto' }}>
      <h2>Owner Entry</h2>

      {/* CREATE */}
      {action === 'create' && (
        <form onSubmit={(e) => e.preventDefault()}>
          {['firstName', 'lastName', 'address', 'email', 'phone', 'notes'].map((field) => (
            <div key={field} style={{ margin: '0.5em 0' }}>
              <label>
                {field.charAt(0).toUpperCase() + field.slice(1)}: <br />
                <input
                  type={field === 'notes' ? 'textarea' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  ref={field === 'firstName' ? firstNameRef : null}
                  style={{ width: '100%' }}
                />
              </label>
            </div>
          ))}
          <button type="button" onClick={handleAdd}>Add Owner</button>
        </form>
      )}

      {/* UPDATE - SELECT */}
      {action === 'update' && selectedOwnerId === null && (
        <div>
          <h3>Select an Owner to Update</h3>
          {owners.length === 0 ? (
            <p>No owners available.</p>
          ) : (
            <ul>
              {owners.map(owner => (
                <li key={owner.id}>
                  {owner.firstName} {owner.lastName} - {owner.email}
                  <button onClick={() => setSelectedOwnerId(owner.id)}>Select</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* UPDATE - FORM */}
      {action === 'update' && selectedOwnerId !== null && (
        <form onSubmit={(e) => e.preventDefault()}>
          <h3>Update Owner</h3>
          {['firstName', 'lastName', 'address', 'email', 'phone', 'notes'].map((field) => (
            <div key={field} style={{ margin: '0.5em 0' }}>
              <label>
                {field.charAt(0).toUpperCase() + field.slice(1)}: <br />
                <input
                  type={field === 'notes' ? 'textarea' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </label>
            </div>
          ))}
          <button type="button" onClick={handleUpdate}>Update Owner</button>
        </form>
      )}

      {/* DELETE - SELECT */}
      {action === 'delete' && selectedOwnerId === null && (
        <div>
          <h3>Select an Owner to Delete</h3>
          {owners.length === 0 ? (
            <p>No owners available.</p>
          ) : (
            <ul>
              {owners.map(owner => (
                <li key={owner.id}>
                  {owner.firstName} {owner.lastName} - {owner.email}
                  <button onClick={() => setSelectedOwnerId(owner.id)}>Select</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

    {/* DELETE - CONFIRM */}
    {action === 'delete' && selectedOwnerId !== null && (
      <form onSubmit={(e) => e.preventDefault()}>
        {/* <h3>Are you sure you want to delete this owner?</h3> */}
        {['firstName', 'lastName', 'address', 'email', 'phone', 'notes'].map((field) => (
          <div key={field} style={{ margin: '0.5em 0' }}>
            <label>
              {field.charAt(0).toUpperCase() + field.slice(1)}: <br />
              <input
                type={field === 'notes' ? 'textarea' : 'text'}
                name={field}
                value={formData[field]}
                readOnly
                style={{ width: '100%', backgroundColor: '#f8f8f8' }}
              />
            </label>
          </div>
        ))}
    <h3>Are you sure you want to delete this owner?</h3>
    <button onClick={handleDeleteConfirm}>Yes, Delete</button>
    <button onClick={() => setSelectedOwnerId(null)}>Cancel</button>
  </form>
)}

      {/* READ */}
      {action === 'read' && (
        <div>
          <h3>Owner List</h3>
          {owners.length === 0 ? (
            <p>No owners added yet.</p>
          ) : (
            <ul>
              {owners.map(owner => (
                <li key={owner.id}>
                  {owner.firstName} {owner.lastName}-{owner.address}
                  {/* -{owner.email}-{owner.phone}-{owner.note} */}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Owner;

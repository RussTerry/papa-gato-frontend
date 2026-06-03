// Foster.js - CRUD module for managing fosters

import { useState, useEffect, useRef } from 'react';
import Person from '../../components/Person/Person';
import PersonForm from '../../components/Person/PersonForm';
import SelectList from '../../components/SelectList';

const Foster = ({ action }) => {
  const [fosters, setFosters] = useState([]);
  const [formData, setFormData] = useState({ ...Person });
  const [selectedFosterId, setSelectedFosterId] = useState(null);
  const firstNameRef = useRef(null);

  const selectedFoster = fosters.find((o) => o.id === selectedFosterId) || null;

  useEffect(() => {
  if (action === 'create') {
    setFormData({ ...Person });
    setSelectedFosterId(null);
    firstNameRef.current?.focus();
  } else if ((action === 'update' || action === 'delete') && selectedFoster) {
    setFormData({ ...selectedFoster });
  }
}, [action, selectedFosterId, selectedFoster]);

useEffect(() => {
  setFormData({ ...Person });         // Clear the form
  setSelectedFosterId(null);           // Clear selected row
  firstNameRef.current?.focus();      // Set focus to first field (create only)
}, [action]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleAdd = () => {
    if (formData.firstName.trim()) {
      setFosters((prev) => [...prev, { ...formData, id: Date.now() }]);
      setFormData({ ...Person });
      firstNameRef.current?.focus();
    }
  };

  const handleUpdate = () => {
    if (!selectedFosterId) return;
    setFosters((prev) =>
      prev.map((foster) =>
        foster.id === selectedFosterId ? { ...formData, id: selectedFosterId } : foster
      )
    );
    setSelectedFosterId(null);
    setFormData({ ...Person });
  };

  const handleDelete = () => {
    if (!selectedFosterId) return;
    setFosters((prev) => prev.filter((foster) => foster.id !== selectedFosterId));
    setSelectedFosterId(null);
    setFormData({ ...Person });
  };


  return (
    <div style={{ padding: '1em', maxWidth: '600px', margin: 'auto' }}>
      <h2>Foster Module</h2>

      {/* CREATE */}
      {action === 'create' && (
        <PersonForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleAdd}
          firstFieldRef={firstNameRef}
          action="Add"
        />
      )}

      {/* READ */}
      {action === 'read' && (
        <div>
          <h3>Foster List</h3>
            <SelectList 
              items={fosters}
              labelFn={(foster) => `${foster.firstName} ${foster.lastName} - ${foster.address}, ${foster.email}, ${foster.phone}, ${foster.notes}`}
              action={action}
            />
        </div>
      )}

      {/* UPDATE - List to select from */}
      {action === 'update' && !selectedFosterId && (
        <div>
          <h3>Select an Foster to Update</h3>
            <SelectList 
              items={fosters}
              onSelect={(id) => setSelectedFosterId(id)}
              labelFn={(foster) => `${foster.firstName} ${foster.lastName} - ${foster.address}, ${foster.email}, ${foster.phone}, ${foster.notes}`}
              action={action}
            />
        </div>
      )}

      {/* UPDATE - Form to update selected */}
      {action === 'update' && selectedFosterId && (
        <PersonForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleUpdate}
          firstFieldRef={firstNameRef}
          action="Update"
          role="Fostere"
        />
      )}

      {/* DELETE - Select and Confirm */}
      {action === 'delete' && !selectedFosterId && (
        <div>
          <h3>Select an Foster to Delete</h3>
            <SelectList 
              items={fosters}
              onSelect={(id) => setSelectedFosterId(id)}
              labelFn={(foster) => `${foster.firstName} ${foster.lastName} - ${foster.address}, ${foster.email}, ${foster.phone}, ${foster.notes}`}
              action={action}
            />
       </div>
      )}

      {action === 'delete' && selectedFosterId && (
        <div>
          <PersonForm
            formData={formData}
            handleChange={() => {}}
            handleSubmit={handleDelete}
            firstFieldRef={firstNameRef}
            action="Confirm Delete"
            readOnly={true}
          />
          <p>Are you sure you want to delete this foster?</p>
          <button onClick={() => handleDelete()}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Foster;

import React, { useState, useEffect, useRef } from 'react';
import Person from './Person';
import PersonForm from './PersonForm';
import SelectList from './SelectList';

const Vet = ({ action }) => {
  const [vets, setVets] = useState([]);
  const [formData, setFormData] = useState({ ...Person });
  const [selectedVetId, setSelectedVetId] = useState(null);
  const firstNameRef = useRef(null);

  const selectedVet = vets.find((o) => o.id === selectedVetId) || null;

  useEffect(() => {
  if (action === 'create') {
    setFormData({ ...Person });
    setSelectedVetId(null);
    firstNameRef.current?.focus();
  } else if ((action === 'update' || action === 'delete') && selectedVet) {
    setFormData({ ...selectedVet });
  }
}, [action, selectedVetId, selectedVet]);

useEffect(() => {
  setFormData({ ...Person });         // Clear the form
  setSelectedVetId(null);           // Clear selected row
  firstNameRef.current?.focus();      // Set focus to first field (create only)
}, [action]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleAdd = () => {
    if (formData.firstName.trim()) {
      setVets((prev) => [...prev, { ...formData, id: Date.now() }]);
      setFormData({ ...Person });
      firstNameRef.current?.focus();
    }
  };

  const handleUpdate = () => {
    if (!selectedVetId) return;
    setVets((prev) =>
      prev.map((vet) =>
        vet.id === selectedVetId ? { ...formData, id: selectedVetId } : vet
      )
    );
    setSelectedVetId(null);
    setFormData({ ...Person });
  };

  const handleDelete = () => {
    if (!selectedVetId) return;
    setVets((prev) => prev.filter((vet) => vet.id !== selectedVetId));
    setSelectedVetId(null);
    setFormData({ ...Person });
  };


  return (
    <div style={{ padding: '1em', maxWidth: '600px', margin: 'auto' }}>
      <h2>Vet Module</h2>

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
          <h3>Vet List</h3>
            <SelectList 
              items={vets}
              labelFn={(vet) => `${vet.firstName} ${vet.lastName} - ${vet.address}, ${vet.email}, ${vet.phone}, ${vet.notes}`}
              action={action}
            />
        </div>
      )}

      {/* UPDATE - List to select from */}
      {action === 'update' && !selectedVetId && (
        <div>
          <h3>Select an Vet to Update</h3>
            <SelectList 
              items={vets}
              onSelect={(id) => setSelectedVetId(id)}
              labelFn={(vet) => `${vet.firstName} ${vet.lastName} - ${vet.address}, ${vet.email}, ${vet.phone}, ${vet.notes}`}
              action={action}
            />
        </div>
      )}

      {/* UPDATE - Form to update selected */}
      {action === 'update' && selectedVetId && (
        <PersonForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleUpdate}
          firstFieldRef={firstNameRef}
          action="Update"
          role="Vete"
        />
      )}

      {/* DELETE - Select and Confirm */}
      {action === 'delete' && !selectedVetId && (
        <div>
          <h3>Select an Vet to Delete</h3>
            <SelectList 
              items={vets}
              onSelect={(id) => setSelectedVetId(id)}
              labelFn={(vet) => `${vet.firstName} ${vet.lastName} - ${vet.address}, ${vet.email}, ${vet.phone}, ${vet.notes}`}
              action={action}
            />
       </div>
      )}

      {action === 'delete' && selectedVetId && (
        <div>
          <PersonForm
            formData={formData}
            handleChange={() => {}}
            handleSubmit={handleDelete}
            firstFieldRef={firstNameRef}
            action="Confirm Delete"
            readOnly={true}
          />
          <p>Are you sure you want to delete this vet?</p>
          <button onClick={() => handleDelete()}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Vet;

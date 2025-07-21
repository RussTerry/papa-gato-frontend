import React, { useState, useEffect, useRef } from 'react';
import Person from './Person';
import PersonForm from './PersonForm';
import SelectList from './SelectList';

const Donor = ({ action }) => {
  const [donors, setDonors] = useState([]);
  const [formData, setFormData] = useState({ ...Person });
  const [selectedDonorId, setSelectedDonorId] = useState(null);
  const firstNameRef = useRef(null);

  const selectedDonor = donors.find((o) => o.id === selectedDonorId) || null;

  useEffect(() => {
  if (action === 'create') {
    setFormData({ ...Person });
    setSelectedDonorId(null);
    firstNameRef.current?.focus();
  } else if ((action === 'update' || action === 'delete') && selectedDonor) {
    setFormData({ ...selectedDonor });
  }
}, [action, selectedDonorId, selectedDonor]);

useEffect(() => {
  setFormData({ ...Person });         // Clear the form
  setSelectedDonorId(null);           // Clear selected row
  firstNameRef.current?.focus();      // Set focus to first field (create only)
}, [action]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleAdd = () => {
    if (formData.firstName.trim()) {
      setDonors((prev) => [...prev, { ...formData, id: Date.now() }]);
      setFormData({ ...Person });
      firstNameRef.current?.focus();
    }
  };

  const handleUpdate = () => {
    if (!selectedDonorId) return;
    setDonors((prev) =>
      prev.map((donor) =>
        donor.id === selectedDonorId ? { ...formData, id: selectedDonorId } : donor
      )
    );
    setSelectedDonorId(null);
    setFormData({ ...Person });
  };

  const handleDelete = () => {
    if (!selectedDonorId) return;
    setDonors((prev) => prev.filter((donor) => donor.id !== selectedDonorId));
    setSelectedDonorId(null);
    setFormData({ ...Person });
  };


  return (
    <div style={{ padding: '1em', maxWidth: '600px', margin: 'auto' }}>
      <h2>Donor Module</h2>

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
          <h3>Donor List</h3>
            <SelectList 
              items={donors}
              labelFn={(donor) => `${donor.firstName} ${donor.lastName} - ${donor.address}, ${donor.email}, ${donor.phone}, ${donor.notes}`}
              action={action}
            />
        </div>
      )}

      {/* UPDATE - List to select from */}
      {action === 'update' && !selectedDonorId && (
        <div>
          <h3>Select an Donor to Update</h3>
            <SelectList 
              items={donors}
              onSelect={(id) => setSelectedDonorId(id)}
              labelFn={(donor) => `${donor.firstName} ${donor.lastName} - ${donor.address}, ${donor.email}, ${donor.phone}, ${donor.notes}`}
              action={action}
            />
        </div>
      )}

      {/* UPDATE - Form to update selected */}
      {action === 'update' && selectedDonorId && (
        <PersonForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleUpdate}
          firstFieldRef={firstNameRef}
          action="Update"
          role="Donore"
        />
      )}

      {/* DELETE - Select and Confirm */}
      {action === 'delete' && !selectedDonorId && (
        <div>
          <h3>Select an Donor to Delete</h3>
            <SelectList 
              items={donors}
              onSelect={(id) => setSelectedDonorId(id)}
              labelFn={(donor) => `${donor.firstName} ${donor.lastName} - ${donor.address}, ${donor.email}, ${donor.phone}, ${donor.notes}`}
              action={action}
            />
       </div>
      )}

      {action === 'delete' && selectedDonorId && (
        <div>
          <PersonForm
            formData={formData}
            handleChange={() => {}}
            handleSubmit={handleDelete}
            firstFieldRef={firstNameRef}
            action="Confirm Delete"
            readOnly={true}
          />
          <p>Are you sure you want to delete this donor?</p>
          <button onClick={() => handleDelete()}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Donor;

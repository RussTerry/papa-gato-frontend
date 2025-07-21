import React, { useState, useEffect, useRef } from 'react';
import Person from './Person';
import PersonForm from './PersonForm';
import SelectList from './SelectList';

const Staff = ({ action }) => {
  const [staffs, setStaffs] = useState([]);
  const [formData, setFormData] = useState({ ...Person });
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const firstNameRef = useRef(null);

  const selectedStaff = staffs.find((o) => o.id === selectedStaffId) || null;

  useEffect(() => {
  if (action === 'create') {
    setFormData({ ...Person });
    setSelectedStaffId(null);
    firstNameRef.current?.focus();
  } else if ((action === 'update' || action === 'delete') && selectedStaff) {
    setFormData({ ...selectedStaff });
  }
}, [action, selectedStaffId, selectedStaff]);

useEffect(() => {
  setFormData({ ...Person });         // Clear the form
  setSelectedStaffId(null);           // Clear selected row
  firstNameRef.current?.focus();      // Set focus to first field (create only)
}, [action]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleAdd = () => {
    if (formData.firstName.trim()) {
      setStaffs((prev) => [...prev, { ...formData, id: Date.now() }]);
      setFormData({ ...Person });
      firstNameRef.current?.focus();
    }
  };

  const handleUpdate = () => {
    if (!selectedStaffId) return;
    setStaffs((prev) =>
      prev.map((staff) =>
        staff.id === selectedStaffId ? { ...formData, id: selectedStaffId } : staff
      )
    );
    setSelectedStaffId(null);
    setFormData({ ...Person });
  };

  const handleDelete = () => {
    if (!selectedStaffId) return;
    setStaffs((prev) => prev.filter((staff) => staff.id !== selectedStaffId));
    setSelectedStaffId(null);
    setFormData({ ...Person });
  };


  return (
    <div style={{ padding: '1em', maxWidth: '600px', margin: 'auto' }}>
      <h2>Staff Module</h2>

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
          <h3>Staff List</h3>
            <SelectList 
              items={staffs}
              labelFn={(staff) => `${staff.firstName} ${staff.lastName} - ${staff.address}, ${staff.email}, ${staff.phone}, ${staff.notes}`}
              action={action}
            />
        </div>
      )}

      {/* UPDATE - List to select from */}
      {action === 'update' && !selectedStaffId && (
        <div>
          <h3>Select an Staff to Update</h3>
            <SelectList 
              items={staffs}
              onSelect={(id) => setSelectedStaffId(id)}
              labelFn={(staff) => `${staff.firstName} ${staff.lastName} - ${staff.address}, ${staff.email}, ${staff.phone}, ${staff.notes}`}
              action={action}
            />
        </div>
      )}

      {/* UPDATE - Form to update selected */}
      {action === 'update' && selectedStaffId && (
        <PersonForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleUpdate}
          firstFieldRef={firstNameRef}
          action="Update"
          role="Staffe"
        />
      )}

      {/* DELETE - Select and Confirm */}
      {action === 'delete' && !selectedStaffId && (
        <div>
          <h3>Select an Staff to Delete</h3>
            <SelectList 
              items={staffs}
              onSelect={(id) => setSelectedStaffId(id)}
              labelFn={(staff) => `${staff.firstName} ${staff.lastName} - ${staff.address}, ${staff.email}, ${staff.phone}, ${staff.notes}`}
              action={action}
            />
       </div>
      )}

      {action === 'delete' && selectedStaffId && (
        <div>
          <PersonForm
            formData={formData}
            handleChange={() => {}}
            handleSubmit={handleDelete}
            firstFieldRef={firstNameRef}
            action="Confirm Delete"
            readOnly={true}
          />
          <p>Are you sure you want to delete this staff?</p>
          <button onClick={() => handleDelete()}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Staff;

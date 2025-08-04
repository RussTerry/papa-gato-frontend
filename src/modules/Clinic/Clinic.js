// Clinic.js

import React, { useState, useEffect, useRef } from 'react';
import SelectList from '../../components/SelectList';
import ClinicForm from '../../modules/Clinic/ClinicForm';
import ClinicModel from '../../modules/Clinic/ClinicModel';
import { formatDate } from '../../utils/formatters';

const Clinic = ({ action }) => {
  const [clinics, setClinics] = useState([]);
  const [formData, setFormData] = useState({ ...ClinicModel });
  const [selectedClinicId, setSelectedClinicId] = useState(null);
  const clinicRef = useRef(null);

  const selectedClinic = clinics.find((o) => o.id === selectedClinicId) || null;

  useEffect(() => {
    if (action === 'create') {
      setFormData({ ...ClinicModel });
      setSelectedClinicId(null);
      clinicRef.current?.focus();
    } else if ((action === 'update' || action === 'delete') && selectedClinic) {
      setFormData({ ...selectedClinic });
    }
  }, [action, selectedClinicId, selectedClinic]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (formData.date && formData.location) {
      setClinics((prev) => [...prev, { ...formData, id: Date.now() }]);
      setFormData({ ...ClinicModel });
      clinicRef.current?.focus();
    }
  };

  const handleUpdate = () => {
    if (!selectedClinicId) return;
    setClinics((prev) =>
      prev.map((clinic) =>
        clinic.id === selectedClinicId ? { ...formData, id: selectedClinicId } : clinic
      )
    );
    setSelectedClinicId(null);
    setFormData({ ...ClinicModel });
  };

  const handleDelete = () => {
    if (!selectedClinicId) return;
    setClinics((prev) => prev.filter((clinic) => clinic.id !== selectedClinicId));
    setSelectedClinicId(null);
    setFormData({ ...ClinicModel });
  };

  return (
    <div style={{ padding: '1em', maxWidth: '600px', margin: 'auto' }}>
      <h2>Clinic Module</h2>

      {action === 'create' && (
        <ClinicForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleAdd}
          firstFieldRef={clinicRef}
          action="Add"
          role="clinic"
        />
      )}

      {action === 'read' && (
        <div>
          <h3>Clinic List</h3>
          <SelectList
      items={clinics}
      labelFn={(clinic) => {
        return `${formatDate(clinic.date)} ${clinic.location} ${clinic.notes}`;
      }}
      action={action}
    />
  </div>
)}
      {action === 'update' && !selectedClinicId && (
        <div>
          <h3>Select a Clinic to Update</h3>
          <SelectList
            items={clinics}
            onSelect={(id) => setSelectedClinicId(id)}
            labelFn={(clinic) => `${formatDate(clinic.date)} ${clinic.location}`}
            action={action}
          />
        </div>
      )}

      {action === 'update' && selectedClinicId && (
        <ClinicForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleUpdate}
          firstFieldRef={clinicRef}
          action="Update"
          role="clinic"
        />
      )}

      {action === 'delete' && !selectedClinicId && (
        <div>
          <h3>Select a Clinic to Delete</h3>
          <SelectList
            items={clinics}
            onSelect={(id) => setSelectedClinicId(id)}
            labelFn={(clinic) => `${formatDate(clinic.date)} ${clinic.location}`}
            action={action}
          />
        </div>
      )}

      {action === 'delete' && selectedClinicId && (
        <div>
          <ClinicForm
            formData={formData}
            handleChange={() => {}}
            handleSubmit={handleDelete}
            firstFieldRef={clinicRef}
            action="Confirm Delete"
            readOnly={true}
            role="clinic"
          />
          <p>Are you sure you want to delete this clinic?</p>
          <button onClick={() => handleDelete()}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Clinic;

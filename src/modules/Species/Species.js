// Species,js

import React, { useState, useEffect, useRef } from 'react';
import SelectList from '../../components/SelectList';
import SpeciesForm from '../../modules/Species/SpeciesForm';
import SpeciesModel from '../../modules/Species/SpeciesModel';

const Species = ({ action }) => {
  const [speciess, setSpeciess] = useState([]);
  const [formData, setFormData] = useState({ ...SpeciesModel });
  const [selectedSpeciesId, setSelectedSpeciesId] = useState(null);
  const speciesRef = useRef(null);

  const selectedSpecies = speciess.find((o) => o.id === selectedSpeciesId) || null;

  // Keep formData synced when selecting an item (for update/delete)
useEffect(() => {
  if (action === 'create') {
    setFormData({ ...SpeciesModel });  // Clear form
    setSelectedSpeciesId(null);        // Clear selection
    speciesRef.current?.focus();       // Set focus
  } else if ((action === 'update' || action === 'delete') && selectedSpecies) {
    setFormData({ ...selectedSpecies }); // Fill form with selected data
  }
}, [action, selectedSpecies]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleAdd = () => {
  if (formData.name.trim()) {
    setSpeciess((prev) => [...prev, { ...formData, id: Date.now() }]);
    setFormData({ ...SpeciesModel });
    setSelectedSpeciesId(null);
    speciesRef.current?.focus();
  }
};

  const handleUpdate = () => {
    if (!selectedSpeciesId) return;
    setSpeciess((prev) =>
      prev.map((species) =>
        species.id === selectedSpeciesId ? { ...formData, id: selectedSpeciesId } : species
      )
    );
    setSelectedSpeciesId(null);
    setFormData({ ...SpeciesModel });
  };

  const handleDelete = () => {
    if (!selectedSpeciesId) return;
    setSpeciess((prev) => prev.filter((species) => species.id !== selectedSpeciesId));
    setSelectedSpeciesId(null);
    setFormData({ ...SpeciesModel });
  };

  return (
    <div style={{ padding: '1em', maxWidth: '600px', margin: 'auto' }}>
      <h2>Species Module</h2>

      {/* CREATE */}
      {action === 'create' && (
        <SpeciesForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleAdd}
          firstFieldRef={speciesRef}
          action="Add"
        />
      )}

      {/* READ */}
      {action === 'read' && (
        <div>
          <h3>Species List</h3>
          <SelectList
            items={speciess}
            labelFn={(species) => `${species.name} ${species.notes}`}
            action={action}
          />
        </div>
      )}

      {/* UPDATE - Select a Species */}
      {action === 'update' && !selectedSpeciesId && (
        <div>
          <h3>Select a Species to Update</h3>
          <SelectList
            items={speciess}
            onSelect={(id) => setSelectedSpeciesId(id)}
            labelFn={(species) => `${species.name} ${species.notes}`}
            action={action}
          />
        </div>
      )}

      {/* UPDATE - Form */}
      {action === 'update' && selectedSpeciesId && (
        <SpeciesForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleUpdate}
          firstFieldRef={speciesRef}
          action="Update"
          role="speciess"
        />
      )}

      {/* DELETE - Select a Species */}
      {action === 'delete' && !selectedSpeciesId && (
        <div>
          <h3>Select a Species to Delete</h3>
          <SelectList
            items={speciess}
            onSelect={(id) => setSelectedSpeciesId(id)}
            labelFn={(species) => `${species.name} ${species.notes}`}
            action={action}
          />
        </div>
      )}

      {/* DELETE - Confirm */}
      {action === 'delete' && selectedSpeciesId && (
        <div>
          <SpeciesForm
            formData={formData}
            handleChange={() => {}}
            handleSubmit={handleDelete}
            firstFieldRef={speciesRef}
            action="Confirm Delete"
            readOnly={true}
          />
          <p>Are you sure you want to delete this species?</p>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Species;

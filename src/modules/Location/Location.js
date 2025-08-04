import React, { useState, useEffect, useRef } from 'react';
import SelectList from '../../components/SelectList';
import LocationForm from '../../modules/Location/LocationForm';
import LocationModel from '../../modules/Location/LocationModel';

const Location = ({ action }) => {
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({ ...LocationModel });
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const locationRef = useRef(null);

  const selectedLocation = locations.find((o) => o.id === selectedLocationId) || null;

  // Keep formData synced when selecting an item (for update/delete)
useEffect(() => {
  if (action === 'create') {
    setFormData({ ...LocationModel });  // Clear form
    setSelectedLocationId(null);        // Clear selection
    locationRef.current?.focus();       // Set focus
  } else if ((action === 'update' || action === 'delete') && selectedLocation) {
    setFormData({ ...selectedLocation }); // Fill form with selected data
  }
}, [action, selectedLocation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleAdd = () => {
  if (formData.location.trim()) {
    setLocations((prev) => [...prev, { ...formData, id: Date.now() }]);
    setFormData({ ...LocationModel });
    setSelectedLocationId(null);
    locationRef.current?.focus();
  }
};

  const handleUpdate = () => {
    if (!selectedLocationId) return;
    setLocations((prev) =>
      prev.map((location) =>
        location.id === selectedLocationId ? { ...formData, id: selectedLocationId } : location
      )
    );
    setSelectedLocationId(null);
    setFormData({ ...LocationModel });
  };

  const handleDelete = () => {
    if (!selectedLocationId) return;
    setLocations((prev) => prev.filter((location) => location.id !== selectedLocationId));
    setSelectedLocationId(null);
    setFormData({ ...LocationModel });
  };

  return (
    <div style={{ padding: '1em', maxWidth: '600px', margin: 'auto' }}>
      <h2>Location Module</h2>

      {/* CREATE */}
      {action === 'create' && (
        <LocationForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleAdd}
          firstFieldRef={locationRef}
          action="Add"
        />
      )}

      {/* READ */}
      {action === 'read' && (
        <div>
          <h3>Location List</h3>
          <SelectList
            items={locations}
            labelFn={(location) => `${location.location} ${location.notes}`}
            action={action}
          />
        </div>
      )}

      {/* UPDATE - Select a Location */}
      {action === 'update' && !selectedLocationId && (
        <div>
          <h3>Select a Location to Update</h3>
          <SelectList
            items={locations}
            onSelect={(id) => setSelectedLocationId(id)}
            labelFn={(location) => `${location.location} ${location.notes}`}
            action={action}
          />
        </div>
      )}

      {/* UPDATE - Form */}
      {action === 'update' && selectedLocationId && (
        <LocationForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleUpdate}
          firstFieldRef={locationRef}
          action="Update"
          role="locations"
        />
      )}

      {/* DELETE - Select a Location */}
      {action === 'delete' && !selectedLocationId && (
        <div>
          <h3>Select a Location to Delete</h3>
          <SelectList
            items={locations}
            onSelect={(id) => setSelectedLocationId(id)}
            labelFn={(location) => `${location.location} ${location.notes}`}
            action={action}
          />
        </div>
      )}

      {/* DELETE - Confirm */}
      {action === 'delete' && selectedLocationId && (
        <div>
          <LocationForm
            formData={formData}
            handleChange={() => {}}
            handleSubmit={handleDelete}
            firstFieldRef={locationRef}
            action="Confirm Delete"
            readOnly={true}
          />
          <p>Are you sure you want to delete this location?</p>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Location;

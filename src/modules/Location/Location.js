// Location.js - Main component for managing locations, including CRUD operations and UI rendering.

import { useState, useEffect } from "react";
import LocationModel from "../../modules/Location/LocationModel";
import LocationForm from "../../modules/Location/LocationForm";
import SelectList from "../../components/SelectList";
import './Location.css';

const Location = ({ locations, setLocations, handleActionChange, selectedAction, setSelectedAction }) => {
  useEffect(() => {
  setFormData(LocationModel);
  setSelectedLocation(null);
}, [selectedAction, setSelectedAction]);

  const [formData, setFormData] = useState(LocationModel);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelect = (id) => {
    const loc = locations.find((l) => Number(l.id) === Number(id));
    if (loc) {
      setSelectedLocation(loc);
      setFormData(loc); 
    }
  };

  const handleSubmit = (data) => {
    if (selectedAction === "create") {
      const newLocation = {
        id: Date.now(), 
        name: data.name || "",
        notes: data.notes || ""
      };
      setLocations([...locations, newLocation]);

    } else if (selectedAction === "update" && selectedLocation) {
      const updatedLocation = {
        id: selectedLocation.id,
        name: data.name || "",
        notes: data.notes || ""
      };
      setLocations(
        locations.map((l) => Number(l.id) === Number(selectedLocation.id) ? updatedLocation : l)
      );

    } else if (selectedAction === "delete" && selectedLocation) {
      setLocations(locations.filter((l) => Number(l.id) !== Number(selectedLocation.id)));
    }
    
    // Reset workspace frame back to baseline state
    setSelectedAction("");
    setFormData(LocationModel);
    setSelectedLocation(null);
  };

return (
  <div className="location-management-container">
    <h2>Location Management</h2>
    <hr />
    
    {/* Selection Area Grid */}
    {(selectedAction === "read" || selectedAction === "update" || selectedAction === "delete") && ! selectedLocation && (
      <div className="select-list-wrapper">
        <SelectList
          items={locations}
          onSelect={handleSelect} 
          labelFn={(loc) => `${loc.name} (${loc.notes || "no notes"})`}
          selectedAction={selectedAction}
          role="locations"
        />
      </div>
    )}

    {/* Controlled Module Input View Frame */}
    {/* Controlled Module Input View Frame */}
    {(selectedAction === "create" || 
      ((selectedAction === "update" || selectedAction === "delete") && selectedLocation)) && (
      <div className="location-form-card">
        <h3 className="location-form-title">
          {selectedAction.toUpperCase()} FORM
        </h3>
        
        <LocationForm
          formData={formData}
          handleChange={handleChange}
          onSubmit={() => handleSubmit(formData)}
          action={selectedAction}
          readOnly={selectedAction === "delete"}
        />
      </div>
    )}
  </div> // Closes the main outer container div
)}; // Closes the return statement cleanly


export default Location;

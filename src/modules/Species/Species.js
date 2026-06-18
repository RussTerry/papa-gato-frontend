// Species,js

import { useState, useEffect} from 'react';
import SelectList from '../../components/SelectList';
import SpeciesForm from '../../modules/Species/SpeciesForm';
import SpeciesModel from '../../modules/Species/SpeciesModel';
import './Species.css';

const Species = ({
          speciesItems,
          setSpeciesItems,
          selectedAction,
          setSelectedAction,
          handleActionChange,
          
       }) => {
          useEffect(() => {
            setFormData(SpeciesModel);
            setSelectedSpecies(null);
          }, [selectedAction, setSelectedAction]);

  const [formData, setFormData] = useState(SpeciesModel);
  const [selectedSpecies, setSelectedSpecies] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev, [name]: value
    }));
  };

  const handleSelect = (id) => {
    const species = speciesItems.find((s) => Number(s.id) === Number(id));
    if (species) {
      setSelectedSpecies(species);
      setFormData(species);
    }
  };

  const handleSubmit = (data) => {
    if (selectedAction === "create") {
      const newSpecies = {
        id: Date.now(),
        name: data.name || "",
        notes: data.notes || ""
      };
      setSpeciesItems([...speciesItems, newSpecies]);

    } else if (selectedAction === "update" && selectedSpecies) {
      const updatedSpecies = {
        id: selectedSpecies.id,
        name: data.name || "",
        notes: data.notes || ""
      };
      setSpeciesItems(
        speciesItems.map((s) => Number(s.id) === Number(selectedSpecies.id) ? updatedSpecies : s)
      );

    } else if (selectedAction === "delete" && selectedSpecies) {
      setSpeciesItems(speciesItems.filter((s) => Number(s.id) !== Number(selectedSpecies.id)));
    };

    // Reset workspace frame back to baseline state
    setSelectedAction("");
    setFormData(SpeciesModel);
    setSelectedSpecies(null);
  };

  return (
    <div className="species-management-container">
      <h2>Species Management</h2>
      <hr />

      {/* Selection Area Grid */}
      {(selectedAction === 'read' || selectedAction === 'update' || selectedAction === 'delete') && !selectedSpecies &&  (
        <div className="select-list-wrapper">
          <SelectList
            items={speciesItems}
            onSelect= {handleSelect}
            labelFn={(species) => `${species.name} (${species.notes || "no notes"})`}
            selectedAction={selectedAction}
            role="species"
          />
        </div>
      )}

      {/* Controlled Module Input View Frame */}
      {(selectedAction === 'create' ||
        ((selectedAction === 'update' ||  selectedAction === "delete")  && selectedSpecies)) && (
        <div className= "location-form-card">
          <h3 className="location-form-title">
            {selectedAction.toUpperCase()} FORM
          </h3>

        <SpeciesForm
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

export default Species;

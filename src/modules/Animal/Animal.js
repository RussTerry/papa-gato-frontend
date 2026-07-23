// Animal.js - Main component for managing animal items, including CRUD operations and UI rendering.

import { useState, useEffect } from "react";
import SelectList from "../../components/SelectList";
import AnimalForm from "../../modules/Animal/AnimalForm";
import AnimalModel from "../../modules/Animal/AnimalModel";
//import './Animal.css';

const Animal = ({
  animalItems,
  setAnimalItems,
  ownerItems,
  speciesItems,
  handleActionChange,
  selectedAction,
  setSelectedAction,
}) => {
  const [formData, setFormData] = useState(AnimalModel);
  const [selectedItem, setSelectedItem] = useState(null);

  // Automatically clears the active selection when the top action menu shifts
  useEffect(() => {
    // If a user clicks a new action menu option, clear out any half-filled forms
    setFormData(AnimalModel);
    setSelectedItem(null);
  }, [selectedAction, setSelectedAction]); // Listens for menu toggle changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelect = (id) => {
    const foundItem = animalItems.find((a) => Number(a.id) === Number(id));
    if (foundItem) {
      setSelectedItem(foundItem);
      setFormData(foundItem);
    }
  };

  // Inside Animal.js (Your Controller Component)
  const handleSubmit = (data) => {
    console.log("Animal handleSubmit fired! Action:", selectedAction);

    // 1. CLEAN THE DATA: Convert dropdown string IDs back into standard numbers
    const cleanedData = {
      ...data,
      ownerId: data.ownerId ? Number(data.ownerId) : null,
      speciesId: data.speciesId ? Number(data.speciesId) : null,
    };

    // 2. Use 'cleanedData' instead of raw 'data' for your array state updates
    if (selectedAction === "create") {
      const newAnimalItem = { ...cleanedData, id: Date.now() };
      setAnimalItems([...animalItems, newAnimalItem]);
    } else if (selectedAction === "update" && cleanedData?.id) {
      setAnimalItems(
        animalItems.map((item) =>
          String(item?.id) === String(cleanedData.id)
            ? { ...cleanedData }
            : item,
        ),
      );
    } else if (selectedAction === "delete" && cleanedData?.id) {
      setAnimalItems(
        animalItems.filter(
          (item) => String(item?.id) !== String(cleanedData.id),
        ),
      );
    }

    // 3. UI clean up resets
    setSelectedAction("");
    setFormData({ ...AnimalModel }); // Reset to empty animal blueprint template
    setSelectedItem(null);
  };

  return (
    <div className="module-management-container">
      <h2>Animal Management</h2>
      <hr />

      {(selectedAction === "read" ||
        selectedAction === "update" ||
        selectedAction === "delete") &&
        !selectedItem && (
          <div className="select-list-wrapper">
            <SelectList
              items={animalItems}
              onSelect={handleSelect}
              labelFn={(animal) => {
                // 1. DYNAMICALLY LOOK UP THE SPECIES NAME
                const matchedSpecies = speciesItems.find(
                  (s) => String(s.id) === String(animal.speciesId),
                );
                const speciesName = matchedSpecies
                  ? matchedSpecies.name
                  : "Unknown Species";

                // 2. DYNAMICALLY LOOK UP AND CONCATENATE THE OWNER NAME
                const matchedOwner = ownerItems.find(
                  (o) => String(o.id) === String(animal.ownerId),
                );
                const ownerFullName = matchedOwner
                  ? `${matchedOwner.firstName} ${matchedOwner.lastName}`
                  : "No Owner Assigned";

                // 3. RETURN THE CONCATENATED ROW LAYOUT FOR THE SCREEN
                return `${animal.name} (${speciesName}) — Breed: ${animal.breed} | Owner: ${ownerFullName}`;
              }}
              selectedAction={selectedAction}
              role="animals"
            />
          </div>
        )}

      {(selectedAction === "create" ||
        ((selectedAction === "update" || selectedAction === "delete") &&
          selectedItem)) && (
        <div className="module-form-card">
          <h3 className="module-form-title">
            {selectedAction.toUpperCase()} ANIMAL ITEM
          </h3>

          <AnimalForm
            formData={formData}
            handleChange={handleChange}
            onSubmit={() => handleSubmit(formData)}
            firstFieldRef={null} // Placeholder for potential future focus management
            action={selectedAction}
            readOnly={selectedAction === "delete"}
            ownerItems={ownerItems} // ◄ Make sure this is forwarded!
            speciesItems={speciesItems} // ◄ Make sure this is forwarded!
          />
        </div>
      )}
    </div>
  );
};

export default Animal;

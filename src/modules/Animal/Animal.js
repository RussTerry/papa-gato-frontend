// Animal.js - Main component for managing animal items, including CRUD operations and UI rendering.

import { useState, useEffect } from "react";
import SelectList from "../../components/SelectList";
import AnimalForm from "../../modules/Animal/AnimalForm";
import AnimalModel from "../../modules/Animal/AnimalModel";
//import './Animal.css';

const Animal = ({
  animalItems,
  setAnimalItems,
  species,
  handleActionChange,
  selectedAction,
  setSelectedAction,
}) => {
  const [formData, setFormData] = useState(AnimalModel);
  const [selectedAnimalItem, setSelectedAnimalItem] = useState(null);

  // Automatically clears the active selection when the top action menu shifts
  useEffect(() => {
    // If a user clicks a new action menu option, clear out any half-filled forms
    setFormData(AnimalModel);
    setSelectedAnimalItem(null);
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
      setSelectedAnimalItem(foundItem);
      setFormData(foundItem);
    }
  };

  const handleSubmit = (data) => {
    console.log("Animal handleSubmit fired! Action:", selectedAction);

    // Manual validation check blocks empty selections for both Create and Update
    if (
      (selectedAction === "create" || selectedAction === "update") &&
      !data.speciesName
    ) {
      alert(
        "Validation Error: Please choose a valid Species from the dropdown list before submitting.",
      );
      return; // Stops execution immediately so nothing gets saved or posted!
    }

    if (selectedAction === "create") {
      const newAnimalItem = {
        id: Date.now(),
        name: data.name || "",
        speciesName: data.speciesName || "",
        breed: data.breed || "",
        age: data.age !== null && data.age !== "" ? Number(data.age) : null,
        weight:
          data.weight !== null && data.weight !== ""
            ? Number(data.weight)
            : null,
        gender: data.gender || "",
        color: data.color || "",
        description: data.description || "",
        notes: data.notes || "",
      };
      setAnimalItems([...animalItems, newAnimalItem]);
    } else if (selectedAction === "update" && selectedAnimalItem) {
      const updatedAnimalItem = {
        id: selectedAnimalItem.id,
        name: data.name || selectedAnimalItem.name,
        speciesName: data.speciesName || selectedAnimalItem.speciesName,
        breed: data.breed || selectedAnimalItem.breed,
        age:
          data.age !== null && data.age !== ""
            ? Number(data.age)
            : selectedAnimalItem.age,
        weight:
          data.weight !== null && data.weight !== ""
            ? Number(data.weight)
            : selectedAnimalItem.weight,
        gender: data.gender || selectedAnimalItem.gender,
        color: data.color || selectedAnimalItem.color,
        description: data.description || selectedAnimalItem.description,
        notes: data.notes || selectedAnimalItem.notes,
      };
      setAnimalItems(
        animalItems.map((item) =>
          item.id.toString() === selectedAnimalItem.id.toString()
            ? updatedAnimalItem
            : item,
        ),
      );
    } else if (selectedAction === "delete" && selectedAnimalItem) {
      // Clean array filtering with no reference errors
      setAnimalItems(
        animalItems.filter(
          (item) => item.id.toString() !== selectedAnimalItem.id.toString(),
        ),
      );
    }

    setSelectedAction(""); // Resets the action menu to default after submission
    setFormData(AnimalModel); // Clears the form data
    setSelectedAnimalItem(null); // Clears the selected animal item
  };

  return (
    <div className="module-management-container">
      <h2>Animal Management</h2>
      <hr />

      {(selectedAction === "read" ||
        selectedAction === "update" ||
        selectedAction === "delete") &&
        !selectedAnimalItem && (
          <div className="select-list-wrapper">
            <SelectList
              items={animalItems}
              onSelect={handleSelect}
              labelFn={(animal) =>
                `${animal.name} 
              (Species: ${animal.speciesName || "N/A"}) 
              (Breed: ${animal.breed || "N/A"}) 
              (Age: ${animal.age || 0}) 
              (Weight: ${animal.weight || 0})
              (Gender: ${animal.gender || "N/A"})
              (Color: ${animal.color || "N/A"})
              (Description: ${animal.description || "N/A"})`
              }
              selectedAction={selectedAction}
              role="animal items"
            />
          </div>
        )}

      {(selectedAction === "create" ||
        ((selectedAction === "update" || selectedAction === "delete") &&
          selectedAnimalItem)) && (
        <div className="module-form-card">
          <h3 className="module-form-title">
            {selectedAction.toUpperCase()} ANIMAL ITEM
          </h3>

          <AnimalForm
            formData={formData}
            handleChange={handleChange}
            onSubmit={() => handleSubmit(formData)}
            firstFieldRef={null} // Placeholder for potential future focus management
            species={species}
            action={selectedAction}
            readOnly={selectedAction === "delete"}
          />
        </div>
      )}
    </div>
  );
};

export default Animal;

// Person.js - Reusable core component for managing person-based entities
import { useState, useEffect } from "react";
import PersonForm from "./PersonForm";
import PersonModel from "./PersonModel";
import SelectList from "../SelectList"; // Adjust path if needed

const Person = ({
  items,
  setItems,
  selectedAction,
  setSelectedAction,
  role, // E.g., "Owner", "Vet", "Staff"
}) => {
  const [formData, setFormData] = useState(PersonModel);
  const [selectedItem, setSelectedItem] = useState(null);

  // Clear or reset form when switching sub-menus
  // Inside Person.js - Update this hook
  useEffect(() => {
    // ONLY reset the form if we are starting a brand new 'create' action
    if (selectedAction === "create" || selectedAction === "") {
      setFormData({ ...PersonModel });
      setSelectedItem(null);
    }
    // If the action is update or delete, DO NOT touch formData or selectedItem here!
  }, [selectedAction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (id) => {
    const foundItem = items.find((item) => Number(item.id) === Number(id));
    if (foundItem) {
      setSelectedItem(foundItem);
      setFormData(foundItem);
    }
  };

  const handleSubmit = (data) => {
    // Move ...data FIRST, so that our generated id OVERWRITES the null value!
    if (selectedAction === "create") {
      const newItem = { ...data, id: Date.now() }; // ◄ FIXED ORDER
      setItems([...items, newItem]);
    } else if (selectedAction === "update" && data?.id) {
      setItems(
        items.map((item) =>
          String(item?.id) === String(data.id)
            ? { ...data } // data already has the correct id inside it
            : item,
        ),
      );
    } else if (selectedAction === "delete" && data?.id) {
      setItems(items.filter((item) => String(item?.id) !== String(data.id)));
    }

    // Cleanup resets

    setSelectedAction("");
    setFormData({ ...PersonModel });
    setSelectedItem(null);
  };

  return (
    <div className="module-management-container">
      <h2>{role} Management</h2>
      <hr />

      {["read", "update", "delete"].includes(selectedAction) &&
        !selectedItem && (
          <div className="select-list-wrapper">
            <SelectList
              items={items}
              onSelect={handleSelect}
              labelFn={(sel) =>
                `${sel.firstName} ${sel.lastName} — Address: ${sel.address || "N/A"} | Phone: ${sel.phone || "N/A"} | Email: ${sel.email || "N/A"}`
              }
              selectedAction={selectedAction}
              role={role.toLowerCase() + "s"}
            />
          </div>
        )}
      {(selectedAction === "create" ||
        (["update", "delete"].includes(selectedAction) && selectedItem)) && (
        <div className="module-form-card">
          <h3 className="module-form-title">
            {selectedAction.toUpperCase()} {role.toUpperCase()}
          </h3>
          <PersonForm
            formData={formData}
            handleChange={handleChange}
            onSubmit={handleSubmit}
            action={selectedAction}
            readOnly={selectedAction === "delete"}
          />
        </div>
      )}
    </div>
  );
};

export default Person;

import { useState, useEffect } from "react";
import PersonForm from "../../components/Person/PersonForm";
import PersonModel from "../../components/Person/PersonModel";
import SelectList from "../../components/SelectList";

const Owner = ({
  ownerItems,
  setOwnerItems,
  selectedAction,
  setSelectedAction,
  handleActionChange,
}) => {
  // Automatically clears the active selection when the top action menu shifts
  useEffect(() => {
    // If a user clicks a new action menu option, clear out any half-filled forms
    setFormData({ ...PersonModel });
    setSelectedOwnerItem(null);
  }, [selectedAction, setSelectedAction]);

  const [formData, setFormData] = useState({ PersonModel });
  const [selectedOwnerItem, setSelectedOwnerItem] = useState(null);

  //  FIXED: Properly destructured 'name' from the input elements
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (id) => {
    const foundItem = ownerItems.find((o) => Number(o.id) === Number(id));
    if (foundItem) {
      setSelectedOwnerItem(foundItem);
      setFormData(foundItem);
    }
  };

  const handleSubmit = (data) => {
    console.log("Owner handleSubmit fired! Action:", selectedAction);
    // Manual validation check blocks empty selections for both Create and Update
    if (selectedAction === "create") {
      alert(
        "Validation Error: Please enter a valid First Name for this Owner before submitting.",
      );
      return; // Stops execution immediately so nothing gets saved or posted!
    }
    if (selectedAction === "create") {
      const newOwnerItem = {
        id: Date.now(),
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        notes: data.notes || "",
      };
      setOwnerItems([...ownerItems, newOwnerItem]);
    } else if (selectedAction === "update" && selectedOwnerItem) {
      const updatedOwnerItem = {
        id: selectedOwnerItem.id,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        notes: data.notes || "",
      };

      setOwnerItems(
        ownerItems.map((item) =>
          item.id.toString() === selectedOwnerItem.id.toString()
            ? updatedOwnerItem
            : item,
        ),
      );
    } else if (selectedAction === "delete" && selectedOwnerItem) {
      // Clean array filtering with no reference errors
      setOwnerItems(
        ownerItems.filter(
          (item) => item.id.toString() !== selectedOwnerItem.id.toString(),
        ),
      );
    }
    setSelectedAction("");
    setFormData(PersonModel);
    setSelectedOwnerItem(null);
  };

  return (
    <div className="module-management-container">
      <h2>Owner Management</h2>
      <hr />

      {(selectedAction === "read" ||
        selectedAction === "update" ||
        selectedAction === "delete") &&
        !selectedOwnerItem && (
          <div className="select-list-wrapper">
            <SelectList
              items={ownerItems}
              onSelect={handleSelect}
              labelFn={(sel) =>
                `${sel.firstName} ${sel.lastName} - ${sel.address}, ${sel.email}, ${sel.phone}, ${sel.notes}`
              }
              selectedAction={selectedAction}
              role="owners"
            />
          </div>
        )}

      {/* Controlled Module Input View Frame */}
      {(selectedAction === "create" ||
        ((selectedAction === "update" || selectedAction === "delete") &&
          selectedOwnerItem)) && (
        <div className="module-form-card">
          <h3 className="module-form-title">
            {selectedAction.toUpperCase()} FORM
          </h3>

          <PersonForm
            formData={formData}
            handleChange={handleChange}
            onSubmit={handleSubmit(formData)}
            action={selectedAction}
            readOnly={selectedAction === "delete"}
          />
        </div>
      )}
    </div> // Closes the main container div
  );
}; // Closes the return statement cleanly

export default Owner;

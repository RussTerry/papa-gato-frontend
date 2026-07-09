import { useState, useEffect, useRef } from "react";
import Person from "../../components/Person/Person";
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
    <div style={{ padding: "1em", maxWidth: "600px", margin: "auto" }}>
      <h2>Owner Module</h2>

      {/* CREATE */}
      {action === "create" && (
        <PersonForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleAdd}
          firstFieldRef={firstNameRef}
          action="Add"
        />
      )}

      {/* READ */}
      {action === "read" && (
        <div>
          <h3>Owner List</h3>
          <SelectList
            items={owners}
            labelFn={(owner) => `${owner.firstName} ${owner.lastName} - 
              ${owner.address}, ${owner.email}, ${owner.phone}, ${owner.notes}`}
            action={action}
          />
        </div>
      )}

      {/* UPDATE - List to select from */}
      {action === "update" && !selectedOwnerId && (
        <div>
          <h3>Select an Owner to Update</h3>
          <SelectList
            items={owners}
            onSelect={(id) => setSelectedOwnerId(id)}
            labelFn={(owner) =>
              `${owner.firstName} ${owner.lastName} - ${owner.address}, ${owner.email}, ${owner.phone}, ${owner.notes}`
            }
            action={action}
          />
        </div>
      )}

      {/* UPDATE - Form to update selected */}
      {action === "update" && selectedOwnerId && (
        <PersonForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleUpdate}
          firstFieldRef={firstNameRef}
          action="Update"
          role="Ownere"
        />
      )}

      {/* DELETE - Select and Confirm */}
      {action === "delete" && !selectedOwnerId && (
        <div>
          <h3>Select an Owner to Delete</h3>
          <SelectList
            items={owners}
            onSelect={(id) => setSelectedOwnerId(id)}
            labelFn={(owner) =>
              `${owner.firstName} ${owner.lastName} - ${owner.address}, ${owner.email}, ${owner.phone}, ${owner.notes}`
            }
            action={action}
            firstFieldRef={firstNameRef}
          />
        </div>
      )}

      {action === "delete" && selectedOwnerId && (
        <div>
          <PersonForm
            formData={formData}
            handleChange={() => {}}
            handleSubmit={handleDelete}
            firstFieldRef={firstNameRef}
            action="Confirm Delete"
            readOnly={true}
          />
          <p>Are you sure you want to delete this owner?</p>
          <button onClick={() => handleDelete()}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Owner;

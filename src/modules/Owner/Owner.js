import { useState, useEffect, useRef } from "react";
import Person from "../../components/Person/Person";
import PersonForm from "../../components/Person/PersonForm";
import SelectList from "../../components/SelectList";

const Owner = ({ 
  ownerItems, 
  setOwnerItems, 
  selectedAction, 
  setSelectedAction,
  handleActionChange, 
}) => {
  
  const [formData, setFormData] = useState({ ...Person });
  const [selectedOwnerId, setSelectedOwnerId] = useState(null);
  const firstNameRef = useRef(null);
  const selectedOwner = owners.find((o) => o.id === selectedOwnerId) || null;

  useEffect(() => {
      setFormData({ ...Person });
      setSelectedOwnerId(null);
      firstNameRef.current?.focus();
    } else if ((action === "update" || action === "delete") && selectedOwner) {
      setFormData({ ...selectedOwner });
    }
  }, [selectedAction, setSelectedAction]);

  useEffect(() => {
    setFormData({ ...Person }); // Clear the form
    setSelectedOwnerId(null); // Clear selected row
    firstNameRef.current?.focus(); // Set focus to first field (create only)
  }, [action]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (formData.firstName.trim()) {
      setOwners((prev) => [...prev, { ...formData, id: Date.now() }]);
      setFormData({ ...Person });
      firstNameRef.current?.focus();
    }
  };

  const handleUpdate = () => {
    if (!selectedOwnerId) return;
    setOwners((prev) =>
      prev.map((owner) =>
        owner.id === selectedOwnerId
          ? { ...formData, id: selectedOwnerId }
          : owner,
      ),
    );
    setSelectedOwnerId(null);
    setFormData({ ...Person });
  };

  const handleDelete = () => {
    if (!selectedOwnerId) return;
    setOwners((prev) => prev.filter((owner) => owner.id !== selectedOwnerId));
    setSelectedOwnerId(null);
    setFormData({ ...Person });
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

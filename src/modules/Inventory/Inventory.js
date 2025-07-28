import React, { useState, useEffect, useRef } from 'react';
import InventoryForm from '../../modules/Inventory/InventoryForm';
import SelectList from '../../components/SelectList';
import inventoryModel from '../../modules/Inventory/InventoryModel';

const Inventory = ({ action }) => {
  const [inventorys, setInventorys] = useState([]);
  const [formData, setFormData] = useState({ ...inventorys });
  const [selectedInventoryId, setSelectedInventoryId] = useState(null);
  const firstItemRef = useRef(null);

  const selectedInventory = inventorys.find((o) => o.id === selectedInventoryId) || null;

  useEffect(() => {
    if (action === 'create') {
      setFormData({ ...inventoryModel });
      setSelectedInventoryId(null);
      firstItemRef.current?.focus();
  } else if ((action === 'update' || action === 'delete') && selectedInventory) {
    setFormData({ ...selectedInventory });
  }
  }, [action, selectedInventoryId, selectedInventory]);

  useEffect(() => {
    setFormData({ ...Inventory });         // Clear the form
    setSelectedInventoryId(null);           // Clear selected row
    firstItemRef.current?.focus();      // Set focus to first field (create only)
  }, [action]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleAdd = () => {
    console.log('handleAdd');
    if (formData.item.trim()) {
      setInventorys((prev) => [...prev, { ...formData, id: Date.now() }]);
      setFormData({ ...Inventory });
      firstItemRef.current?.focus();
    }
  };

  const handleUpdate = () => {
    console.log('handleUpdate');
    if (!selectedInventoryId) return;
    setInventorys((prev) =>
      prev.map((inventory) =>
        inventory.id === selectedInventoryId ? { ...formData, id: selectedInventoryId } : inventory
      )
    );
    setSelectedInventoryId(null);
    setFormData({ ...Inventory });
  };

  const handleDelete = () => {
    console.log('handleDelete');
    if (!selectedInventoryId) return;
    setInventorys((prev) => prev.filter((inventory) => inventory.id !== selectedInventoryId));
    setSelectedInventoryId(null);
    setFormData({ ...Inventory });
  };

  return (
    <div style={{ padding: '1em', maxWidth: '600px', margin: 'auto' }}>
      <h2>Inventory Module</h2>

      {/* CREATE */}
      {action === 'create' && (
        <InventoryForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleAdd}
          firstFieldRef={firstItemRef}
          setFormData={setFormData}
          action="Add"
        />
      )}

      {/* READ */}
      {action === 'read' && (
        <div>
          <h3>Inventory List</h3>
            <SelectList
              items={inventorys}
              labelFn={(inventory) =>  `${inventory.item}, ${inventory.quantity}, 
              ${inventory.locationName}, ${inventory.purchaseDate},
              ${inventory.expirationDate}, ${inventory.updateDate}, ${inventory.notes}`}
              action={action}
            />
        </div>
      )}

      {/* UPDATE - List to select from */}
      {action === 'update' && !selectedInventoryId && (
        <div>
          <h3>Select an Inventory to Update</h3>
            <SelectList 
              items={inventorys}
              onSelect={(id) => setSelectedInventoryId(id)}
              labelFn={(inventory) =>  `${inventory.item}, ${inventory.quantity}, 
              ${inventory.locationName}, ${inventory.purchaseDate},
              ${inventory.expirationDate}, ${inventory.updateDate}, ${inventory.notes}`}
              action={action}
            />
        </div>
      )}

      {/* UPDATE - Form to update selected */}
      {action === 'update' && selectedInventoryId && (
        <InventoryForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleUpdate}
          firstFieldRef={firstItemRef}
          setFormData={setFormData}
          action="Update"
          role="Inventory"
        />
      )}

      {/* DELETE - Select and Confirm */}
      {action === 'delete' && !selectedInventoryId && (
        <div>
          <h3>Select an Inventory to Delete</h3>
            <SelectList 
              items={inventorys}
              onSelect={(id) => setSelectedInventoryId(id)}
              labelFn={(inventory) =>  `${inventory.item}, ${inventory.quantity}, 
              ${inventory.locationName}, ${inventory.purchaseDate},
              ${inventory.expirationDate}, ${inventory.updateDate}, ${inventory.notes}`}
              action={action}firstFieldRef={firstItemRef}
            />
       </div>
      )}

      {action === 'delete' && selectedInventoryId && (
        <div>
          <InventoryForm
            formData={formData}
            handleChange={() => {}}
            handleSubmit={handleDelete}
            firstFieldRef={firstItemRef}
            action="Confirm Delete"
            readOnly={true}
          />
          <p>Are you sure you want to delete this inventory item?</p>
          <button onClick={() => handleDelete()}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Inventory;

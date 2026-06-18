// Inventory.js - Main component for managing inventory items, including CRUD operations and UI rendering.

import { useState, useEffect } from "react";
import InventoryModel from "./InventoryModel";
import InventoryForm from "./InventoryForm";
import SelectList from "../../components/SelectList";
import './Inventory.css'; 

const Inventory = ({ 
  inventoryItems,
  setInventoryItems,
  locations,
  handleActionChange, 
  selectedAction, 
  setSelectedAction 
}) => {
  const [formData, setFormData] = useState(InventoryModel);
  const [selectedInventoryItem, setSelectedInventoryItem] = useState(null);

  // Automatically clears the active selection when the top action menu shifts
  useEffect(() => {
  // If a user clicks a new action menu option, clear out any half-filled forms
  setFormData(InventoryModel);
  setSelectedInventoryItem(null);
  }, [selectedAction, setSelectedAction]); // Listens for menu toggle changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelect = (id) => {
    const foundItem = inventoryItems.find((item) => item.id.toString() === id.toString());
    if (foundItem) {
      setSelectedInventoryItem(foundItem);
      setFormData(foundItem); 
    }
  };

  const handleSubmit = (data) => {
    console.log("Inventory handleSubmit fired! Action:", selectedAction);

    // FIXED: Manual validation check blocks empty selections for both Create and Update
  if ((selectedAction === "create" || selectedAction === "update") && !data.locationName) {
    alert("Validation Error: Please choose a valid Location from the dropdown list before submitting.");
    return; // Stops execution immediately so nothing gets saved or posted!
  }
    const todayStr = new Date().toISOString().split('T')[0];

    if (selectedAction === "create") {
      const newInventoryItem = {
        id: Date.now(), 
        item: data.item || "",
        quantity: data.quantity !== null && data.quantity !== "" ? Number(data.quantity) : 0,
        locationName: data.locationName || "",
        purchaseDate: data.purchaseDate || "",
        expirationDate: data.expirationDate || "",
        updateDate: todayStr, 
        notes: data.notes || ""
      };
      setInventoryItems([...inventoryItems, newInventoryItem]);

    } else if (selectedAction === "update" && selectedInventoryItem) {
      const updatedInventoryItem = {
        id: selectedInventoryItem.id, 
        item: data.item || "",
        quantity: data.quantity !== null && data.quantity !== "" ? Number(data.quantity) : 0,
        locationName: data.locationName || "",
        purchaseDate: data.purchaseDate || "",
        expirationDate: data.expirationDate || "",
        updateDate: todayStr, 
        notes: data.notes || ""
      };

      setInventoryItems(
        inventoryItems.map((item) =>
          item.id.toString() === selectedInventoryItem.id.toString() ? updatedInventoryItem : item
        )
      );

    } else if (selectedAction === "delete" && selectedInventoryItem) {
      // FIXED: Clean array filtering with no reference errors
      setInventoryItems(
        inventoryItems.filter((item) => item.id.toString() !== selectedInventoryItem.id.toString())
      );
    }
    
    setSelectedAction("");
    setFormData(InventoryModel);
    setSelectedInventoryItem(null);
  };

  return (
    <div className='inventory-management-container'>
      <h2>Inventory Management</h2>
      <hr />
      
      {(selectedAction === "read" || selectedAction === "update" || selectedAction === "delete") && !selectedInventoryItem && (
        <div className="select-list-wrapper">
          <SelectList
            items={inventoryItems}
            onSelect={handleSelect} 
            labelFn={(inv) => 
              `${inv.item} 
              (Qty: ${inv.quantity || 0}) - 
              (Loc:${inv.locationName || "No Location Assigned"}) - 
              (Purchased: ${inv.purchaseDate || "N/A"}) - 
              (Expires: ${inv.expirationDate || "N/A"}) - 
              (Updated: ${inv.updateDate || "N/A"})`}
            
            selectedAction={selectedAction}
            role="inventory items"
          />
        </div>
      )}

      {(selectedAction === "create" || 
        ((selectedAction === "update" || selectedAction === "delete") && selectedInventoryItem)) && (
        <div className="inventory-form-card">
          <h3 className="inventory-form-title">
            {selectedAction.toUpperCase()} INVENTORY ITEM
          </h3>
          
          <InventoryForm
            formData={formData}
            handleChange={handleChange}
            onSubmit={() => handleSubmit(formData)}
            locations={locations}
            action={selectedAction}
            readOnly={selectedAction === "delete"}
          />
        </div>
      )}
    </div>
  );
};

export default Inventory;

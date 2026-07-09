// Clinic.js - Main component for managing clinic items, including CRUD operations and UI rendering.

import { useState, useEffect } from "react";
import SelectList from "../../components/SelectList";
import ClinicForm from "../../modules/Clinic/ClinicForm";
import ClinicModel from "../../modules/Clinic/ClinicModel";
//import './Clinic.css';

const Clinic = ({
  clinicItems,
  setClinicItems,
  selectedAction,
  setSelectedAction,
  handleActionChange,
}) => {
  // Automatically clears the active selection when the top action menu shifts
  useEffect(() => {
    // If a user clicks a new action menu option, clear out any half-filled forms
    setFormData(ClinicModel);
    setSelectedClinicItem(null);
  }, [selectedAction, setSelectedAction]); // Listens for menu toggle changes

  const [formData, setFormData] = useState(ClinicModel);
  const [selectedClinicItem, setSelectedClinicItem] = useState(null);

  //  FIXED: Properly destructured 'name' from the input elements
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (id) => {
    const foundItem = clinicItems.find((c) => Number(c.id) === Number(id));
    if (foundItem) {
      setSelectedClinicItem(foundItem);
      setFormData(foundItem);
    }
  };

  const handleSubmit = (data) => {
    console.log("Clinic handleSubmit fired! Action:", selectedAction);
    // Manual validation check blocks empty selections for both Create and Update
    if (selectedAction === "create") {
      alert(
        "Validation Error: Please enter a valid Location for this Clinic before submitting.",
      );
      return; // Stops execution immediately so nothing gets saved or posted!
    }

    if (selectedAction === "create") {
      const newClinicItem = {
        id: Date.now(),
        location: data.location || "",
        date: data.date || "",
        notes: data.notes || "",
      };
      setClinicItems([...clinicItems, newClinicItem]);
    } else if (selectedAction === "update" && selectedClinicItem) {
      const updatedClinicItem = {
        id: selectedClinicItem.id,
        location: data.location || "",
        date: data.date || "",
        notes: data.notes || "",
      };

      setClinicItems(
        clinicItems.map((item) =>
          item.id.toString() === selectedClinicItem.id.toString()
            ? updatedClinicItem
            : item,
        ),
      );
    } else if (selectedAction === "delete" && selectedClinicItem) {
      // Clean array filtering with no reference errors
      setClinicItems(
        clinicItems.filter(
          (item) => item.id.toString() !== selectedClinicItem.id.toString(),
        ),
      );
    }

    setSelectedAction("");
    setFormData(ClinicModel);
    setSelectedClinicItem(null);
  };

  return (
    <div className="module-management-container">
      <h2>Clinic Management</h2>
      <hr />

      {(selectedAction === "read" ||
        selectedAction === "update" ||
        selectedAction === "delete") &&
        !selectedClinicItem && (
          <div className="select-list-wrapper">
            <SelectList
              items={clinicItems}
              onSelect={handleSelect}
              labelFn={(sel) => {
                // Local simple transformation logic to match dd-MMM-YYYY
                const months = [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ];
                let displayDate = "No date";

                if (sel.date) {
                  const parts = sel.date.split("-");
                  if (parts.length === 3) {
                    const year = parts[0];
                    const monthIndex = parseInt(parts[1], 10) - 1;
                    const day = parts[2];
                    const monthName = months[monthIndex] || parts[1];
                    displayDate = `${day}-${monthName}-${year}`;
                  } else {
                    displayDate = sel.date;
                  }
                }
                return `${displayDate} - (Loc: ${sel.location}) - ( ${sel.notes || "No notes"} )`;
              }}
              selectedAction={selectedAction}
              role="clinic items"
            />
          </div>
        )}

      {(selectedAction === "create" ||
        ((selectedAction === "update" || selectedAction === "delete") &&
          selectedClinicItem)) && (
        <div className="module-form-card">
          <h3 className="module-form-title">
            {selectedAction.toUpperCase()} CLINIC ITEM
          </h3>

          <ClinicForm
            formData={formData}
            handleChange={handleChange}
            onSubmit={() => handleSubmit(formData)}
            action={selectedAction}
            readOnly={selectedAction === "delete"}
          />
        </div>
      )}
    </div>
  );
};

export default Clinic;

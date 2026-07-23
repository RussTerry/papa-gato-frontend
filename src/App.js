// App.js

import { useState } from "react";
import Header from "./components/Header";
import CrudMenu from "./components/CrudMenu";
import RoleMenu from "./components/RoleMenu";
import Animal from "./modules/Animal/Animal";
import Clinic from "./modules/Clinic/Clinic";
import Donor from "./modules/Donor/Donor";
import Foster from "./modules/Foster/Foster";
import Inventory from "./modules/Inventory/Inventory";
import Location from "./modules/Location/Location";
import Owner from "./modules/Owner/Owner";
import Species from "./modules/Species/Species";
import Staff from "./modules/Staff/Staff";
import Vet from "./modules/Vet/Vet";
import "./App.css";

function App() {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedAction, setSelectedAction] = useState("");

  // GLOBAL STATE: Lifted here so it never wipes out on render cycles

  // Global Clinic State with standard YYYY-MM-DD dummy dates
  const [animalItems, setAnimalItems] = useState([
    {
      id: 101,
      ownerId: 1,
      name: "Luna",
      speciesId: 1,
      breed: "Siamese",
      age: 3,
      weight: 9,
      gender: "F",
      color: "Seal Point",
      description: "Very vocal and friendly, loves shoulder rides.",
      notes: "Requires a wet-food-only diet due to hydration issues.",
    },
    {
      id: 102,
      ownerId: 2,
      name: "Rocky",
      speciesId: 2,
      breed: "Boxer",
      age: 5,
      weight: 65,
      gender: "M",
      color: "Fawn/White",
      description: "High energy, loves chew toys, knows basic commands.",
      notes: "Slight skin allergy to low-grade grain kibble.",
    },
    {
      id: 103,
      name: "Oliver",
      ownerId: 3,
      speciesId: 3,
      breed: "Holland Lop",
      age: 1,
      weight: 4,
      gender: "M",
      color: "Grey",
      description: "Calm demeanor, comfortable around gentle children.",
      notes: "Nails were trimmed recently at intake check.",
    },
  ]);

  // Global Clinic State with standard YYYY-MM-DD dummy dates
  const [clinicItems, setClinicItems] = useState([
    {
      id: 1,
      location: "Main Street Clinic",
      date: "2026-01-10",
      notes: "Selected animals by appt only",
    },
    {
      id: 2,
      location: "School",
      date: "2026-03-22",
      notes: "Early setup needed",
    },
  ]);

  // Global Donor State
  const [donorItems, setDonorItems] = useState([
    {
      id: 1,
      firstName: "Fred",
      lastName: "Anderson",
      email: "Fred.Anderson@example.com",
      phone: "555-235-4567",
      address: "365 Main St, Anytown, USA",
      notes: "Prefers email contact.",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Wilson",
      email: "Jane.Wilson@example.com",
      phone: "555-777-6543",
      address: "533 Oak Ave, Somewhere, USA",
      notes: "Prefers phone contact.",
    },
    {
      id: 3,
      firstName: "Emma",
      lastName: "Blaine",
      email: "Emma.Blaine@example.com",
      phone: "2345 8877",
      address: "789 Pine Rd, Anytown, USA",
      notes: "Prefers in-person contact.",
    },
  ]);

  // Global Foster State
  const [fosterItems, setFosterItems] = useState([
    {
      id: 1,
      firstName: "Mary",
      lastName: "Travers",
      email: "Mary.Travers@example.com",
      phone: "3323-5611",
      address: "Bluff",
      notes: "Prefers email contact.",
    },
    {
      id: 2,
      firstName: "Janet",
      lastName: "Martin",
      email: "Janet.Martin@example.com",
      phone: "555-212-5491",
      address: "Red Frog",
      notes: "Prefers phone contact.",
    },
    {
      id: 3,
      firstName: "Mike",
      lastName: "Baker",
      email: "Mike.Baker@example.com",
      phone: "2345 7788",
      address: "Darklands",
      notes: "Prefers in-person contact.",
    },
  ]);

  // Global Inventory State with standard YYYY-MM-DD dummy dates
  const [inventoryItems, setInventoryItems] = useState([
    {
      id: 1,
      item: "Aspirin 500mg",
      quantity: 100,
      locationName: "Cabinet 4",
      purchaseDate: "2026-01-10",
      expirationDate: "2028-06-15",
      updateDate: "2026-05-30",
      notes: "Keep in a cool dry place",
    },
    {
      id: 2,
      item: "Syringes 3ml",
      quantity: 250,
      locationName: "Desk Drawer",
      purchaseDate: "2026-03-22",
      expirationDate: "",
      updateDate: "2026-05-30",
      notes: "Box of 50 packs",
    },
  ]);

  const [locationItems, setLocationItems] = useState([
    { id: 1, name: "Desk Drawer", notes: "Office supplies" },
    { id: 2, name: "Cabinet 4", notes: "Medical stock" },
  ]);

  // Global Owner State
  const [ownerItems, setOwnerItems] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "John.Doe@example.com",
      phone: "555-123-4567",
      address: "123 Main St, Anytown, USA",
      notes: "Prefers email contact.",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "Jane.Smith@example.com",
      phone: "555-987-6543",
      address: "456 Oak Ave, Somewhere, USA",
      notes: "Prefers phone contact.",
    },
    {
      id: 3,
      firstName: "Alice",
      lastName: "Johnson",
      email: "Alice.Johnson@example.com",
      phone: "555-555-5555",
      address: "789 Pine Rd, Anytown, USA",
      notes: "Prefers in-person contact.",
    },
  ]);

  // Global Species State
  const [speciesItems, setSpeciesItems] = useState([
    { id: 1, name: "Cat", notes: "Common household cat" },
    { id: 2, name: "Dog", notes: "Common household dog" },
    { id: 3, name: "Rabbit", notes: "Small domestic lagomorphs" },
  ]);

  // Global Staff State
  const [staffItems, setStaffItems] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "John.Doe@example.com",
      phone: "555-123-4567",
      address: "123 Main St, Anytown, USA",
      notes: "Prefers email contact.",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "Jane.Smith@example.com",
      phone: "555-987-6543",
      address: "456 Oak Ave, Somewhere, USA",
      notes: "Prefers phone contact.",
    },
    {
      id: 3,
      firstName: "Alice",
      lastName: "Johnson",
      email: "Alice.Johnson@example.com",
      phone: "555-555-5555",
      address: "789 Pine Rd, Anytown, USA",
      notes: "Prefers in-person contact.",
    },
  ]);

  // Global Vet State
  const [vetItems, setVetItems] = useState([
    {
      id: 1,
      firstName: "Fred",
      lastName: "Anderson",
      email: "Fred.Anderson@example.com",
      phone: "555-235-4567",
      address: "365 Main St, Anytown, USA",
      notes: "Prefers email contact.",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Wilson",
      email: "Jane.Wilson@example.com",
      phone: "555-777-6543",
      address: "533 Oak Ave, Somewhere, USA",
      notes: "Prefers phone contact.",
    },
    {
      id: 3,
      firstName: "Emma",
      lastName: "Blaine",
      email: "Emma.Blaine@example.com",
      phone: "2345 8877",
      address: "789 Pine Rd, Anytown, USA",
      notes: "Prefers in-person contact.",
    },
  ]);

  const handleActionChange = (newAction) => {
    setSelectedAction(newAction);
  };

  return (
    <div className="App">
      <Header />
      <RoleMenu
        onSelectionChange={(value) => {
          setSelectedRole(value);
          setSelectedAction(""); // Clean workspace action frame on role switch
        }}
      />

      {selectedRole && (
        <CrudMenu
          handleActionChange={handleActionChange}
          selectedAction={selectedAction}
        />
      )}
      {/* RENDER HOOK: Animal Module */}
      {selectedRole?.toLowerCase() === "animal" && selectedAction && (
        <Animal
          animalItems={animalItems}
          setAnimalItems={setAnimalItems}
          ownerItems={
            ownerItems
          } /* Maps your owners array down to the module */
          speciesItems={
            speciesItems
          } /* Maps your species array down to the module */
          handleActionChange={handleActionChange}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
        />
      )}
      {/* RENDER HOOK: Clinic Module */}
      {selectedRole?.toLowerCase() === "clinic" && selectedAction && (
        <Clinic
          clinicItems={clinicItems}
          setClinicItems={setClinicItems}
          handleActionChange={handleActionChange}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
        />
      )}

      {/* RENDER HOOK: Donor Module */}
      {selectedRole?.toLowerCase() === "donor" && selectedAction && (
        <Donor
          donorItems={donorItems}
          setDonorItems={setDonorItems}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
        />
      )}

      {/* RENDER HOOK: Foster Module */}
      {selectedRole?.toLowerCase() === "foster" && selectedAction && (
        <Foster
          fosterItems={fosterItems}
          setFosterItems={setFosterItems}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
        />
      )}

      {/* RENDER HOOK: Inventory Module */}
      {selectedRole?.toLowerCase() === "inventory" && selectedAction && (
        <Inventory
          inventoryItems={inventoryItems}
          setInventoryItems={setInventoryItems}
          handleActionChange={handleActionChange}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
          locationItems={locationItems}
        />
      )}

      {/* RENDER HOOK: Location Module */}
      {selectedRole?.toLowerCase() === "location" && selectedAction && (
        <Location
          locationItems={locationItems}
          setLocationItems={setLocationItems}
          handleActionChange={handleActionChange}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
        />
      )}

      {/* RENDER HOOK: Owner Module */}
      {selectedRole?.toLowerCase() === "owner" && selectedAction && (
        <Owner
          ownerItems={ownerItems}
          setOwnerItems={setOwnerItems}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
        />
      )}

      {/* RENDER HOOK: Species Module */}
      {selectedRole?.toLowerCase() === "species" && selectedAction && (
        <Species
          speciesItems={speciesItems}
          setSpeciesItems={setSpeciesItems}
          handleActionChange={handleActionChange}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
        />
      )}

      {/* RENDER HOOK: Staff Module */}
      {selectedRole?.toLowerCase() === "staff" && selectedAction && (
        <Staff
          staffItems={staffItems}
          setStaffItems={setStaffItems}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
        />
      )}

      {/* RENDER HOOK: Vet Module */}
      {selectedRole?.toLowerCase() === "vet" && selectedAction && (
        <Vet
          vetItems={vetItems}
          setVetItems={setVetItems}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
        />
      )}
    </div>
  );
}

export default App;

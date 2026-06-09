// App.js 
  
import { useState } from 'react';
import Header from './components/Header';
import CrudMenu from './components/CrudMenu';
import RoleMenu from './components/RoleMenu';
import Inventory from './modules/Inventory/Inventory'; 
import Location from './modules/Location/Location';
import Clinic from './modules/Clinic/Clinic'; 
import './App.css';

function App() {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  
  // GLOBAL STATE: Lifted here so it never wipes out on render cycles
  const [locations, setLocations] = useState([
    { id: 1, name: "Desk Drawer", notes: "Office supplies" },
    { id: 2, name: "Cabinet 4", notes: "Medical stock" },
  ]);

  // 2. ADDED: Global Inventory State with standard YYYY-MM-DD dummy dates
  const [inventoryItems, setInventoryItems] = useState([
    { 
      id: 1, 
      item: "Aspirin 500mg", 
      quantity: 100, 
      locationName: "Cabinet 4", 
      purchaseDate: "2026-01-10", 
      expirationDate: "2028-06-15", 
      updateDate: "2026-05-30", 
      notes: "Keep in a cool dry place" 
    },
    { 
      id: 2, 
      item: "Syringes 3ml", 
      quantity: 250, 
      locationName: "Desk Drawer", 
      purchaseDate: "2026-03-22", 
      expirationDate: "", 
      updateDate: "2026-05-30", 
      notes: "Box of 50 packs" 
    },
  ]);

    // 3. ADDED: Global  State with standard YYYY-MM-DD dummy dates
   const [clinicItems, setClinicItems] = useState([
    { 
      id: 1, 
      location: "Main Street Clinic", 
      date: "2026-01-10", 
      notes: "Selected animals by appt only" 
    },
    { 
      id: 2, 
      location: "School",
      date: "2026-03-22", 
      notes: "Early setup needed" 
    },
  ]);
 
  const handleActionChange = (newAction) => {
    setSelectedAction(newAction);
  };

  return (
    <div className="App">
      <Header />
      <RoleMenu onSelectionChange={(value) => {
        setSelectedRole(value);
        setSelectedAction(''); // Clean workspace action frame on role switch
      }} />
      
      {selectedRole && <CrudMenu handleActionChange={handleActionChange} />}

      {/* RENDER HOOK: Clinic Module */}
      {selectedRole?.toLowerCase() === 'clinic' && selectedAction && (
        <Clinic 
          clinicItems = {clinicItems}
          setClinicItems = {setClinicItems}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
          handleActionChange={handleActionChange} 
        />
      )}

        {/* ADDED: RENDER HOOK: Inventory Module */}
      {selectedRole?.toLowerCase() === 'inventory' && selectedAction && (
        <Inventory 
          inventoryItems={inventoryItems}
          setInventoryItems={setInventoryItems}
          locations={locations}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
          handleActionChange={handleActionChange} 
        />
      )}

      {/* RENDER HOOK: Location Module */}
      {selectedRole?.toLowerCase() === 'location' && selectedAction && (
        <Location 
          locations={locations}
          setLocations={setLocations}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
          handleActionChange={handleActionChange} 
        />
      )}

    </div>
  );
}

export default App;

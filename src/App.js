// Aoo.js

import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import CrudMenu from './components/CrudMenu';
import RoleMenu from './components/RoleMenu';
import Location from './modules/Location/Location';
// (Keep your other module imports here...)

function App() {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  
  // 1. GLOBAL STATE: Lifted here so it never wipes out on render cycles
  const [locations, setLocations] = useState([
    { id: 1, name: "Desk Drawer", notes: "Office supplies" },
    { id: 2, name: "Cabinet 4", notes: "Medical stock" },
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
      
      {/* 2. RENDER HOOK: Clean static assignment */}
      {selectedRole?.toLowerCase() === 'location' && selectedAction && (
        <Location 
          locations={locations}
          setLocations={setLocations}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
          handleActionChange={handleActionChange} 
        />
      )}
      
      {/* (Add your other explicit module tags here when ready) */}
    </div>
  );
}

export default App;

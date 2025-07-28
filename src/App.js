import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import CrudMenu from './components/CrudMenu';
import RoleMenu from './components/RoleMenu';
import Donor from './modules/Donor/Donor'; 
import Foster from './modules/Foster/Foster'; 
import Owner from './modules/Owner/Owner';
import Staff from './modules/Staff/Staff';
import Vet from './modules/Vet/Vet';
import Location from './modules/Location/Location';
import Inventory from './modules/Inventory/Inventory';
import 'react-datepicker/dist/react-datepicker.css';
const componentMap = {
  donor: Donor,
  foster: Foster,
  owner: Owner,
  staff: Staff,
  vet: Vet,
  location: Location,
  inventory: Inventory, 
};

function App() {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const SelectedComponent = componentMap[selectedRole?.toLowerCase()];

  const handleActionChange = (newAction) => {
    console.log('Clicked:', newAction);
    if (selectedAction === newAction) {
      setSelectedAction('');
      setTimeout(() => setSelectedAction(newAction), 0);
    } else {
      setSelectedAction(newAction);
    }
  };

  return (
    <div className="App">
      <Header />
      <RoleMenu onSelectionChange={(value) => setSelectedRole(value)} />
        {console.log({selectedRole})}
      {selectedRole && <CrudMenu onActionChange={handleActionChange} />}
      {SelectedComponent && selectedAction && <SelectedComponent action={selectedAction} />}
    </div>
  );
}

export default App;

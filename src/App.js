import React, { useState } from 'react';
import './App.css';
import Header from './Header';
// import PersonModule from './Person';
import CrudMenu from './CrudMenu';
import RoleMenu from './RoleMenu';
import Donor from './Donor';
import Foster from './Foster';
import Owner from './Owner';
import Staff from './Staff';
import Vet from './Vet';


const componentMap = {
  donor: Donor,
  foster: Foster,
  owner: Owner,
  staff: Staff,
  vet: Vet,

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
      {selectedRole && <CrudMenu onActionChange={handleActionChange} />}
      {SelectedComponent && selectedAction && <SelectedComponent action={selectedAction} />}
    </div>
  );
}

export default App;

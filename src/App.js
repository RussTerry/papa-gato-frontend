import React, { useState } from 'react';
import './App.css';
import Header from './Header';
// import PersonModule from './Person';
import CrudMenu from './CrudMenu';
import RoleMenu from './RoleMenu';
// import Foster from './Foster';
import Owner from './Owner';
// import Staff from './Staff';
// import Vet from './Vet';


const componentMap = {
  // foster: Foster,
  owner: Owner,
  // staff: Staff,
  // vet: Vet,
  // vet: Vet
};

function App() {
  const [selectedRole, setSelectedRole] = useState('');      // owner, staff, vet
  const [selectedAction, setSelectedAction] = useState('');  // create, read, update, delete
  const SelectedComponent = componentMap[selectedRole?.toLowerCase()];
  
  const handleRoleChange = (role) => {
      setSelectedRole(role);
      setSelectedAction(''); // clear previous action
  };

  
return (
    <div className="App">
      <Header />
      <RoleMenu onSelectionChange={(value) => setSelectedRole(value)} />
      {selectedRole && <CrudMenu onActionChange={setSelectedAction} />}

      {/* Render selected component dynamically */}
      {SelectedComponent && selectedAction && <SelectedComponent action={selectedAction} />}

    </div>
  );
}

export default App;

// CrudMenu.js

import './CrudMenu.css';

function CrudMenu({ handleActionChange }) {
  const actions = ['create', 'read', 'update', 'delete'];

  return (
    <div className = 'crudmenu' >
      {actions.map((action) => (
        <button className='crudbutton' key={action} onClick={() => handleActionChange(action)}>
          {action.charAt(0).toUpperCase() + action.slice(1)}
        </button>
      ))}
      
    </div>
  );
}

export default CrudMenu;

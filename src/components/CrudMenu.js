// CrudMenu.js

import React from 'react';

function CrudMenu({ onActionChange }) {
  const actions = ['create', 'read', 'update', 'delete'];

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '1em', margin: '1em 0' }}>
      {actions.map((action) => (
        <button key={action} onClick={() => onActionChange(action)}>
          {action.charAt(0).toUpperCase() + action.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default CrudMenu;

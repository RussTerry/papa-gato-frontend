import React from 'react';

function CrudMenu({ onActionChange }) {
    const handleChange = (e) => {
    const action = e.target.value;
    onActionChange(action);
    }
  return (
< div style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '1em', margin: '1em 0' }}>
    <label>
      <input type="radio" name="crud" value="create" onChange={(e) => onActionChange(e.target.value)} />
      Create
    </label>
    <label>
      <input type="radio" name="crud" value="read" onChange={(e) => onActionChange(e.target.value)}  />
      Read
    </label>
    <label>
      <input type="radio" name="crud" value="update" onChange={(e) => onActionChange(e.target.value)} />
      Update
    </label>
    <label>
      <input type="radio" name="crud" value="delete" onChange={(e) => onActionChange(e.target.value)} />
      Delete
    </label>
  </div>
  );}


export default CrudMenu;

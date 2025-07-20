import React from 'react';

function CrudButtons({ onCreate, onRead, onUpdate, onDelete }) {
  return (
    <div style={{ margin: '1em' }}>
      <button onClick={onCreate}>Create</button>{' '}
      <button onClick={onRead}>Read</button>{' '}
      <button onClick={onUpdate}>Update</button>{' '}
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default CrudButtons;

import React from 'react';

const SelectList = ({ items, onSelect, labelFn, action, role = "Items" }) => {
  if (!items || items.length === 0) {
    return <p>No {role} available.</p>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {labelFn(item)}
          {(action === 'update' || action === 'delete') && (
            <button onClick={() => onSelect(item.id)} style={{ marginLeft: '1em' }}>
              Select
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default SelectList;

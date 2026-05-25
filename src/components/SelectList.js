// SelectList.js

import React from 'react';

const SelectList = ({ items, onSelect, labelFn, selectedAction, role = "items", onAction }) => {
  if (!items || items.length === 0) {
    return <p>No {role} available.</p>;
  }

  return (
    // ADDED: className to strip default browser dots
    <ul className="custom-select-list">
      {items.map((item) => (
        // ADDED: className to apply alternating background stripes
        <li key={item.id} className="custom-select-list-item">
          <span>{labelFn(item)}</span>
          {(selectedAction === 'update' || selectedAction === 'delete') && (
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

// SelectList.js

const SelectList = ({ items, onSelect, labelFn, selectedAction, role = "items", onAction }) => {
  if (!items || items.length === 0) {
    return <p>No {role} available.</p>;
  }

  return (
    // className to strip default browser dots
    <ul className="custom-select-list">
      {items.map((item) => (
        // className to apply alternating background stripes
        <li key={item.id} className="custom-select-list-item">
          <span>{labelFn(item)}</span>
          {(selectedAction === 'update' || selectedAction === 'delete') && (
             <button className="custom-select-list-button" onClick={() => onSelect(item.id)}>
              {selectedAction}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default SelectList;

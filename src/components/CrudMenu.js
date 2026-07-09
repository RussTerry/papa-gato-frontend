// CrudMenu.js

import "./CrudMenu.css";

function CrudMenu({ handleActionChange, selectedAction }) {
  const actions = ["create", "read", "update", "delete"];

  return (
    <div className="crudmenu">
      {actions.map((action) => {
        // 1. Check if this specific button matches the currently selected state
        const isSelected = selectedAction === action;

        return (
          <button
            key={action}
            /* 2. Dynamically add the 'selected' class based on the state boolean */
            className={`crudbutton ${isSelected ? "selected" : ""}`}
            onClick={() => handleActionChange(action)}
          >
            {action.charAt(0).toUpperCase() + action.slice(1)}
          </button>
        );
      })}
    </div>
  );
}

export default CrudMenu;

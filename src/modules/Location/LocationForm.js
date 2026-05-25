import React from 'react';

const LocationForm = ({
  formData,
  handleChange,
  onSubmit, 
  firstFieldRef,
  action = 'Submit',
  readOnly = false,
}) => {
  return (
    <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
      <div className="form-field-group">
        <label htmlFor="name">Location:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name || ""}
          onChange={handleChange}
          ref={firstFieldRef}
          readOnly={readOnly}
          required
        />
      </div>
      <div className="form-field-group">
        <label htmlFor="notes">Notes:</label>
        <input
          id="notes"
          name="notes"
          type="text"
          value={formData.notes || ""}
          onChange={handleChange}
          readOnly={readOnly}
        />
      </div>
      
      <div className="form-action-button-row">
        <button type="button" onClick={() => onSubmit()} className="form-action-submit-btn">
          {action.toUpperCase()}
        </button>
      </div>
    </form>
  );
};

export default LocationForm;

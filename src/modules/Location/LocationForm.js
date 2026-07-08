// LocationForm.js - A reusable form component for adding/editing locations, with dynamic field generation based on the LocationModel.

const LocationForm = ({
  formData,
  handleChange,
  onSubmit,
  firstFieldRef,
  action = 'Submit',
  readOnly = false,
}) => {
  // 1. Define the fields array to match LocationModel keys
  const fields = ['name', 'notes'];

  // 2. Helper to capitalize labels cleanly on screen
  const formatLabel = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
    {/* DYNAMIC LOOP: Generates inputs automatically */}
      {fields.map((field, index) => (
        <div className="form-field-group" key={field}>
          <label htmlFor={field}>
            {/* Custom display tweak: show 'Location' instead of 'Name' for the first field */}
            {field === 'name' ? 'Location' : formatLabel(field)}:
          </label>
          <input className="form-field-group-input"
            id={field}
            name={field}
            type="text"
            value={formData[field] || ""} // Safe fallback against undefined warnings
            onChange={handleChange}
            readOnly={readOnly}
            ref={index === 0 ? firstFieldRef : null} // Dynamically attaches ref to the first field
            required={field === 'name'} // Makes the location name mandatory
          />
        </div>
      ))}

      {/* Centered Action Button Row */}
      <div className="form-action-button-row">
        <button type="button" onClick={() => onSubmit()} className="form-action-submit-btn">
          {action.toUpperCase()}
        </button>
      </div>
    </form>
  );
};

export default LocationForm;

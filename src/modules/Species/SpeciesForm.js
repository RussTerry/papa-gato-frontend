//SpeciesForm.js

const SpeciesForm = ({
  formData,
  handleChange,
  onSubmit,
  firstFieldRef,
  action = "Submit",
  readOnly = false,
}) => {
  // 1. Define the fields array to match SpeciesModel keys
  const fields = ["name", "notes"];

  // 2. Helper to capitalize labels cleanly on screen
  const formatLabel = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <form handleSubmit={(e) => e.preventDefault()} autoComplete="off">
      {/* DYNAMIC LOOP: Generates inputs automatically */}
      {fields.map((field, index) => (
        <div className="form-field-group" key={field}>
          <label htmlFor={field}>
            {/* Custom display tweak: show 'Species' instead of 'Name' for the first field */}
            {field === "name" ? "Species" : formatLabel(field)};
          </label>
          <input
            className="form-field-group-input"
            id={field}
            name={field}
            type="text"
            value={formData[field] || ""} // Safe fallback against undefined warnings
            onChange={handleChange}
            readOnly={readOnly}
            ref={index === 0 ? firstFieldRef : null} // Dynamically attaches ref to the first field
            required={field === "name"} // Makes the species name mandatory
          />
        </div>
      ))}

      {/* Centered Action Button Row */}
      <div className="form-action-button-row">
        <button
          type="button"
          onClick={() => onSubmit(formData)}
          className="form-action-submit-btn"
        >
          {action.toUpperCase()}
        </button>
      </div>
    </form>
  );
};

export default SpeciesForm;

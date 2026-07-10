// PersonForm.js

const PersonForm = ({
  formData,
  handleChange,
  onSubmit,
  firstFieldRef,
  action = "Submit",
  readOnly = false,
}) => {
  // 1. Define the fields array to match PersonModel keys
  const fields = [
    "firstName",
    "lastName",
    "address",
    "email",
    "phone",
    "notes",
  ];

  // 2. Helper to capitalize labels cleanly on screen
  const formatLabel = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {fields.map((field, index) => (
        <div className="form-field-group" key={field}>
          <label htmlFor={field}>
            {/* Custom display tweak: show 'First Name' and 'Last Name' instead of 'firstName' and 'lastName' */}
            {field === "name" ? "firstName" : formatLabel(field)}
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
            required={field === "firstName" || field === "lastName"} // Makes first and last name mandatory
          />
        </div>
      ))}

      {/* Centered Action Button Row */}
      <div className="form-action-button-row">
        <button
          type="button"
          onClick={() => onSubmit()}
          className="form-action-submit-btn"
        >
          {action.toUpperCase()}
        </button>
      </div>
    </form>
  );
};

export default PersonForm;

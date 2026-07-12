// PersonForm.js
import PersonModel from "./PersonModel"; // Import your source of truth directly

const PersonForm = ({
  formData,
  handleChange,
  onSubmit,
  firstFieldRef,
  action = "Submit",
  readOnly = false,
}) => {
  // 1. DYNAMICALLY pull keys from the model, excluding the internal 'id'
  const fields = Object.keys(PersonModel).filter((key) => key !== "id");

  // 2. Helper to split camelCase keys and capitalize them (e.g., "firstName" becomes "First Name")
  const formatLabel = (text) => {
    const result = text.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {fields.map((field, index) => (
        <div className="form-field-group" key={field}>
          <label htmlFor={field}>{formatLabel(field)}</label>

          {field === "notes" ? (
            <textarea
              className="form-field-group-input"
              id={field}
              name={field}
              value={formData[field] || ""}
              onChange={handleChange}
              readOnly={readOnly}
              rows={3}
            />
          ) : (
            <input
              className="form-field-group-input"
              id={field}
              name={field}
              type={
                field === "email" ? "email" : field === "phone" ? "tel" : "text"
              }
              value={formData[field] || ""}
              onChange={handleChange}
              readOnly={readOnly}
              ref={index === 0 ? firstFieldRef : null}
              required={field === "firstName" || field === "lastName"}
            />
          )}
        </div>
      ))}

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

export default PersonForm;

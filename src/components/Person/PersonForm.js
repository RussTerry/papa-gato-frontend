// PersonForm.js

const PersonForm = ({
  formData,
  handleChange,
  handleSubmit,
  firstFieldRef,
  action = "Submit",
  readOnly = false,
}) => {
  const fields = [
    "firstName",
    "lastName",
    "address",
    "email",
    "phone",
    "notes",
  ];

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {fields.map((field, index) => (
        <div className="form-field-group" key={field}>
          <label>
            {field.charAt(0).toUpperCase() + field.slice(1)}:<br />
            {field === "notes" ? (
              <textarea
                className="form-field-group-textarea"
                name={field}
                value={formData[field]}
                onChange={readOnly ? undefined : handleChange}
                ref={index === 0 ? firstFieldRef : null}
                readOnly={readOnly}
              />
            ) : (
              <input
                className="form-field-group-input"
                type={
                  field === "email"
                    ? "email"
                    : field === "phone"
                      ? "tel"
                      : "text"
                }
                name={field}
                value={formData[field]}
                onChange={readOnly ? undefined : handleChange}
                ref={index === 0 ? firstFieldRef : null}
                readOnly={readOnly}
              />
            )}
          </label>
        </div>
      ))}
      {!readOnly && (
        <button type="button" onClick={handleSubmit}>
          {action}
        </button>
      )}
    </form>
  );
};

export default PersonForm;

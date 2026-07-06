// AnimalForm.js - Component for handling animal form inputs and submission.

const AnimalForm = ({
  formData,
  handleChange,
  onSubmit,
  firstFieldRef,
  species = [], // Defaults to empty array to prevent map errors
  action = 'Submit',
  readOnly = false,
}) => {
  const fields = ['name', 'speciesName', 'breed', 'age', 'weight', 'gender', 'color', 'description', 'notes'];

  const formatLabel = (text) => {
    const result = text.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
      {fields.map((field, index) => {
        return (
          <div className="form-field-group" key={field} style={{ marginBottom: "1em" }}>
            <label htmlFor={field}>
              {field === 'speciesName' ? 'Species Name' : formatLabel(field)}:
            </label>

            {field === 'notes' ? (
              /* Notes textarea field */
              <textarea
                id={field}
                name={field}
                rows="4"
                value={formData[field] || ""}
                onChange={handleChange}
                readOnly={readOnly}
                disabled={readOnly}
                style={{ width: '100%', boxSizing: 'border-box', padding: '0.4em', resize: 'vertical' }}
              />
            ) : field === 'speciesName' ? (
              /* Dropdown Select menu for Species validation */
              <select
                id={field}
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                disabled={readOnly}
                required
                style={{ width: '100%', boxSizing: 'border-box', padding: '0.4em' }}
              >
                <option value="">Select a species</option>
                {species.map((spec) => (
                  <option key={spec.id} value={spec.name}>
                    {spec.name}
                  </option>
                ))}
              </select>
            ) : field === 'gender' ? (
              /* NEW ADDITION: Dropdown Select menu for Gender */
              <select
                id={field}
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                disabled={readOnly}
                required
                style={{ width: '100%', boxSizing: 'border-box', padding: '0.4em' }}
              >
                <option value="">Select gender</option>
                <option value="M">M</option>
                <option value="F">F</option>
              </select>
            ) : (
              /* Standard inputs for all remaining text/number fields */
              <input
                ref={(index === 0 && firstFieldRef) ? firstFieldRef : undefined}
                id={field}
                name={field}
                type={field === 'age' || field === 'weight' ? 'number' : 'text'}
                value={formData[field] || ""}
                onChange={handleChange}
                readOnly={readOnly}
                disabled={readOnly}
                style={{ width: '100%', boxSizing: 'border-box', padding: '0.4em' }}
              />
            )
            }
          </div>
        );
      })}

      {/* Form Submission Button Block */}
      <div className="form-action-button-row" style={{ marginTop: '1.5em' }}>
        <button 
          type="button" 
          onClick={onSubmit} className="form-action-submit-button"
          style={{ padding: '0.6em 2em', cursor: 'pointer' }}>
          {action.toUpperCase()}
        </button>
      </div>
    </form>
  );
};

export default AnimalForm;

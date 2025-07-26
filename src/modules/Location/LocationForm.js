import React from 'react';


const LocationForm = ({ 
  formData,
  handleChange,
  handleSubmit,
  firstFieldRef,
  action = 'Submit',
  readOnly = false,
}) => {
  const fields = ['location', 'notes'];

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {fields.map((field, index) => (
        <div key={field} style={{ margin: '0.5em 0' }}>
          <label>
            {field.charAt(0).toUpperCase() + field.slice(1)}:<br />
            {field === 'notes' ? (
              <textarea
                name={field}
                value={formData[field]}
                onChange={readOnly ? undefined : handleChange}
                ref={index === 0 ? firstFieldRef : null}
                style={{ width: '100%' }}
                readOnly={readOnly}
              />
            ) : (
              <input
                type={field === 'location'}
                name={field}
                value={formData[field]}
                onChange={readOnly ? undefined : handleChange}
                ref={index === 0 ? firstFieldRef : null}
                style={{ width: '100%'}}
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

export default LocationForm;

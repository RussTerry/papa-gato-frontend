import React from 'react';

const PersonForm = ({
  formData,
  handleChange,
  handleSubmit,
  firstFieldRef,
  action = 'Submit',
  readOnly = false,
}) => {
  const fields = ['firstName', 'lastName', 'address', 'email', 'phone', 'notes'];

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
                type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                name={field}
                value={formData[field]}
                onChange={readOnly ? undefined : handleChange}
                ref={index === 0 ? firstFieldRef : null}
                style={{ width: '100%' }}
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

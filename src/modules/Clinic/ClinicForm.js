import React, { useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ClinicForm = ({
  formData,
  handleChange,
  handleSubmit,
  firstFieldRef,
  action = 'Submit',
  readOnly = false,
  rold = 'clinic'
}) => {
  const fields = ['location','date', 'notes'];

  const renderField = (field) => {
    const isDateField = field === 'date';

    const ref = field === 'location' ? firstFieldRef : null;

    if (isDateField) {
      const dateValue = formData[field] ? new Date(formData[field]) : null;
      return (
        <DatePicker
          selected={dateValue}
          onChange={(date) =>
            handleChange({
              target: {
                name: field,
                value: date?.toISOString() || '',
              },
            })
          }
          dateFormat="dd-MMM-yy"
          placeholderText="Select a date"
          className="form-control"
          readOnly={readOnly}
        />
      );
    }

    if (field === 'notes') {
      return (
        <textarea
          name={field}
          value={formData[field]}
          onChange={readOnly ? undefined : handleChange}
          ref={ref}
          style={{ width: '100%' }}
          readOnly={readOnly}
        />
      );
    }

    return (
      <input
        type="text"
        name={field}
        value={formData[field] || ''}
        onChange={readOnly ? undefined : handleChange}
        ref={ref}
        style={{ width: '100%' }}
        readOnly={readOnly}
      />
    );
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {fields.map((field) => (
        <div key={field} style={{ margin: '0.5em 0' }}>
          <label>
            {field.charAt(0).toUpperCase() + field.slice(1)}:<br />
            {renderField(field)}
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

export default ClinicForm;

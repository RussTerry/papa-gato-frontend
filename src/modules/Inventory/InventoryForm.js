import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InventoryForm = ({
  formData,
  handleChange,
  handleSubmit,
  firstFieldRef,
  action = 'Submit',
  readOnly = false,
}) => {
  const fields = ['item', 'quantity', 'locationName', 'purchaseDate', 'expirationDate', 'updateDate', 'notes'];

  const renderField = (field, index) => {
    const isDateField = ['purchaseDate', 'expirationDate', 'updateDate'].includes(field);

    if (isDateField) {
      const dateValue = formData[field] ? new Date(formData[field]) : null;
      return (
        <DatePicker
          selected={dateValue}
          onChange={(date) => handleChange({ target: { name: field, value: date?.toISOString() || '' } })}
          dateFormat="dd-MMM-yy"
          ref={index === 0 ? firstFieldRef : null}
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
          ref={index === 0 ? firstFieldRef : null}
          style={{ width: '100%' }}
          readOnly={readOnly}
        />
      );
    }

    return (
      <input
        type={field === 'quantity' ? 'number' : 'text'}
        name={field}
        value={formData[field]}
        onChange={readOnly ? undefined : handleChange}
        ref={index === 0 ? firstFieldRef : null}
        style={{ width: '100%' }}
        readOnly={readOnly}
      />
    );
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {fields.map((field, index) => (
        <div key={field} style={{ margin: '0.5em 0' }}>
          <label>
            {field.charAt(0).toUpperCase() + field.slice(1)}:<br />
            {renderField(field, index)}
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

export default InventoryForm;

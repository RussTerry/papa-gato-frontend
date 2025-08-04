//SpeciesForm.js

import React from 'react';

const SpeciesForm = ({
  formData,
  handleChange,
  handleSubmit,
  firstFieldRef,
  action = 'Submit',
  readOnly = false,
  role = 'species'
}) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <div style={{ margin: '0.5em 0' }}>
        <label htmlFor="species">Species:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          ref={firstFieldRef}
          readOnly={readOnly}
          required
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ margin: '0.5em 0' }}>
        <label htmlFor="notes">Notes:</label>
        <input
          id="notes"
          name="notes"
          type="text"
          value={formData.notes}
          onChange={handleChange}
          readOnly={readOnly}
          style={{ width: '100%' }}
        />
      </div>
      <button type="submit">{action}</button>
    </form>
  );
};

export default SpeciesForm;

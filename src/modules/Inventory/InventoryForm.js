import React from 'react';

const InventoryForm = ({
  formData,
  handleChange,
  onSubmit,
  firstFieldRef,
  locations = [], 
  action = 'Submit',
  readOnly = false,
}) => {
  const fields = ['item', 'quantity', 'locationName', 'purchaseDate', 'expirationDate', 'updateDate', 'notes'];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const formatDbDateToScreen = (dbDate) => {
    if (!dbDate) return "";
    const parts = dbDate.split('-'); 
    if (parts.length !== 3) return dbDate;
    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const day = parts[2];
    const monthName = months[monthIndex] || parts[1];
    return `${day}-${monthName}-${year}`; 
  };

  const handleDateChangeWrapper = (e) => {
    const { name, value } = e.target;
    const parts = value.split('-');
    if (parts.length === 3) {
      const day = parts[0].padStart(2, '0');
      const monthStr = parts[1];
      const year = parts[2];
      const monthIndex = months.findIndex(m => m.toLowerCase() === monthStr.toLowerCase());
      if (monthIndex !== -1) {
        const monthNum = String(monthIndex + 1).padStart(2, '0');
        const dbFormattedDate = `${year}-${monthNum}-${day}`; 
        handleChange({ target: { name, value: dbFormattedDate } });
        return;
      }
    }
    handleChange(e);
  };

  const formatLabel = (text) => {
    const result = text.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
      {fields.map((field, index) => {
        const isDateField = field.toLowerCase().includes('date');
        
        return (
          <div className="form-field-group" key={field} style={{ marginBottom: "1em" }}>
            <label htmlFor={field}>
              {field === 'locationName' ? 'Location' : formatLabel(field)}:
            </label>
            
            {field === 'notes' ? (
              /* Notes Textarea Field */
              <textarea
                id={field}
                name={field}
                rows="4"
                value={formData[field] || ""}
                onChange={handleChange}
                readOnly={readOnly} // Locks typing
                disabled={readOnly} // FIXED: Grey out/Locks interaction on delete
                style={{ width: '100%', boxSizing: 'border-box', padding: '0.4em', resize: 'vertical' }}
              />
            ) : field === 'locationName' ? (
              /* Dropdown Select Box For Location */
              <select
                id={field}
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                disabled={readOnly} // FIXED: HTML selects require 'disabled' to prevent dropdown opening
                required // FIXED: Prevents the form from submitting if left on the default option
                style={{ width: '100%', boxSizing: 'border-box', padding: '0.4em' }}
              >
              {/* FIXED: Keeping value="" tells the browser this option doesn't count as filled */}
                <option value="">-- Select a Location --</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </select>
            ) : isDateField ? (
              /* Date Fields with Calendar Overlay */
              <div style={{ position: 'relative', display: 'block' }}>
                <input
                  id={field}
                  name={field}
                  type="text"
                  placeholder="e.g. 30-May-2026"
                  value={formatDbDateToScreen(formData[field])}
                  onChange={handleDateChangeWrapper}
                  readOnly={readOnly} // FIXED: Prevents manual typing on text field
                  disabled={readOnly} // FIXED: Completely freezes input frame on delete
                  style={{ width: '100%', boxSizing: 'border-box', padding: '0.4em', paddingRight: '2.5em' }}
                />
                {/* Visual Calendar Icon Overlay is completely hidden when viewing a Delete window */}
                {!readOnly && (
                  <input
                    type="date"
                    value={formData[field] || ""}
                    onChange={(e) => handleChange({ target: { name: field, value: e.target.value } })}
                    style={{
                      position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
                      width: '24px', height: '24px', padding: 0, border: 'none', background: 'transparent', cursor: 'pointer'
                    }}
                  />
                )}
              </div>
            ) : (
              /* Standard Inputs (item, quantity) */
              <input
                id={field}
                name={field}
                type={field === 'quantity' ? 'number' : 'text'}
                value={formData[field] ?? ""}
                onChange={handleChange}
                readOnly={readOnly} // Locks typing
                disabled={readOnly} // FIXED: Completely locks field adjustments on delete
                ref={index === 0 ? firstFieldRef : null}
                required={field === 'item' || field === 'quantity'}
                style={{ width: '100%', boxSizing: 'border-box', padding: '0.4em' }}
              />
            )}
          </div>
        );
      })}

      <div className="form-action-button-row">
        <button type="button" onClick={() => onSubmit()} className="form-action-submit-btn">
          {action.toUpperCase()}
        </button>
      </div>
    </form>
  );
};

export default InventoryForm;

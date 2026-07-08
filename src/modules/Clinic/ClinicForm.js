// ClinicForm.js

const ClinicForm = ({
  formData,
  handleChange,
  onSubmit,
  action = 'Submit',
  readOnly = false,
}) => {
  const fields = ['location','date', 'notes'];
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
    <form onSubmit={(e) => e.preventDefault()} autoComplete="off" className="clinic-crud-form">
      {fields.map((field, index) => {
        const isDateField = field.toLowerCase().includes('date');
        
        return (
          <div className="form-field-group" key={field}>
            <label htmlFor={field}>
              {field === 'location' ? 'Location' : formatLabel(field)}:
            </label>
            
            {field === 'notes' ? (
              <textarea
                id={field}
                name={field}
                rows="4"
                value={formData[field] || ""}
                onChange={handleChange}
                readOnly={readOnly}
                disabled={readOnly}
                className="form-input-textarea"
              />
            ) : isDateField ? (
              <div className="date-input-wrapper">
                <input
                  id={field}
                  name={field}
                  type="text"
                  placeholder="e.g. 30-May-2026"
                  value={formatDbDateToScreen(formData[field])}
                  onChange={handleDateChangeWrapper}
                  readOnly={readOnly}
                  disabled={readOnly}
                  className="form-input-text date-text-overlay"
                />
                {!readOnly && (
                  <input
                    type="date"
                    value={formData[field] || ""}
                    onChange={(e) => handleChange({ target: { name: field, value: e.target.value } })}
                    className="hidden-calendar-picker"
                  />
                )}
              </div>
            ) : (
              <input
                id={field}
                name={field}
                type="text"
                value={formData[field] ?? ""}
                onChange={handleChange}
                readOnly={readOnly}
                disabled={readOnly}
                required={field === 'location'}
                className="form-input-text"
              />
            )}
          </div>
        );
      })}

      <div className="form-action-button-row">
        <button  
          type="button" 
          onClick={() => onSubmit()} className="form-action-submit-btn">
          {action.toUpperCase()}
        </button>
      </div>
    </form>
  );
};

export default ClinicForm;

// InventoryForm.js

const InventoryForm = ({
  formData,
  handleChange,
  onSubmit,
  firstFieldRef,
  locationItems = [],
  action = "Submit",
  readOnly = false,
}) => {
  const fields = [
    "item",
    "quantity",
    "locationName",
    "purchaseDate",
    "expirationDate",
    "updateDate",
    "notes",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formatDbDateToScreen = (dbDate) => {
    if (!dbDate) return "";
    const parts = dbDate.split("-");
    if (parts.length !== 3) return dbDate;
    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const day = parts[2];
    const monthName = months[monthIndex] || parts[1];
    return `${day}-${monthName}-${year}`;
  };

  const handleDateChangeWrapper = (e) => {
    const { name, value } = e.target;
    const parts = value.split("-");
    if (parts.length === 3) {
      const day = parts[0].padStart(2, "0");
      const monthStr = parts[1];
      const year = parts[2];
      const monthIndex = months.findIndex(
        (m) => m.toLowerCase() === monthStr.toLowerCase(),
      );
      if (monthIndex !== -1) {
        const monthNum = String(monthIndex + 1).padStart(2, "0");
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
        const isDateField = field.toLowerCase().includes("date");

        return (
          <div className="form-field-group" key={field}>
            <label htmlFor={field}>
              {field === "locationName" ? "Location" : formatLabel(field)}:
            </label>

            {field === "notes" ? (
              /* Notes Textarea Field */
              <textarea
                className="form-field-group-textarea"
                id={field}
                name={field}
                rows="4"
                value={formData[field] || ""}
                onChange={handleChange}
                readOnly={readOnly} // Locks typing
                disabled={readOnly} // FIXED: Grey out/Locks interaction on delete
              />
            ) : field === "locationName" ? (
              /* Dropdown Select Box For Location */
              <select
                className="form-field-group-select"
                id={field}
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                disabled={readOnly} // FIXED: HTML selects require 'disabled' to prevent dropdown opening
                required // FIXED: Prevents the form from submitting if left on the default option
              >
                {/* FIXED: Keeping value="" tells the browser this option doesn't count as filled */}
                <option value="">-- Select a Location --</option>
                {locationItems.map((loc) => (
                  <option key={loc.id} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </select>
            ) : isDateField ? (
              /* Date Fields with Calendar Overlay */
              <div className="date-input-wrapper">
                <input
                  className="form-field-group-input"
                  id={field}
                  name={field}
                  type="text"
                  placeholder="e.g. 30-May-2026"
                  value={formatDbDateToScreen(formData[field])}
                  onChange={handleDateChangeWrapper}
                  readOnly={readOnly} // FIXED: Prevents manual typing on text field
                  disabled={readOnly} // FIXED: Completely freezes input frame on delete
                />
                {/* Visual Calendar Icon Overlay is completely hidden when viewing a Delete window */}
                {!readOnly && (
                  <input
                    className="hidden-calendar-picker"
                    type="date"
                    value={formData[field] || ""}
                    onChange={(e) =>
                      handleChange({
                        target: { name: field, value: e.target.value },
                      })
                    }
                  />
                )}
              </div>
            ) : (
              /* Standard Inputs (item, quantity) */
              <input
                className="form-field-group-input"
                id={field}
                name={field}
                type={field === "quantity" ? "number" : "text"}
                value={formData[field] ?? ""}
                onChange={handleChange}
                readOnly={readOnly} // Locks typing
                disabled={readOnly} // FIXED: Completely locks field adjustments on delete
                ref={index === 0 ? firstFieldRef : null}
                required={field === "item" || field === "quantity"}
              />
            )}
          </div>
        );
      })}

      <div className="form-action-button-row">
        <button
          type="button"
          onClick={() => onSubmit()}
          className="form-action-submit-btn"
        >
          {action.toUpperCase()}
        </button>
      </div>
    </form>
  );
};

export default InventoryForm;

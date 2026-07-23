// AnimalForm.js
import AnimalModel from "./AnimalModel";

const AnimalForm = ({
  formData,
  handleChange,
  onSubmit,
  firstFieldRef = null, // Placeholder for potential future focus management
  action = "Submit",
  readOnly = false,
  ownerItems = [],
  speciesItems = [],
}) => {
  // Dynamically extract all fields from the model template except internal ID
  const fields = Object.keys(AnimalModel).filter((key) => key !== "id");

  // Helper to split camelCase keys for clean UI display labels
  const formatLabel = (text) => {
    const result = text.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  // Maps relational database keys directly to their live state arrays and label styles
  const dropdownConfigs = {
    ownerId: {
      label: "Assigned Owner",
      items: ownerItems,
      getLabel: (item) =>
        `${item.firstName || ""} ${item.lastName || ""}`.trim() ||
        `Owner #${item.id}`,
    },
    speciesId: {
      label: "Species",
      items: speciesItems,
      getLabel: (item) => item.name || "Unnamed Species",
    },
    gender: {
      label: "Gender",
      items: [
        { id: "M", name: "M" },
        { id: "F", name: "F" },
      ],
      getLabel: (item) => item.name || "Unknown Gender",
    },
  };

  // Validates inputs cleanly BEFORE passing them up to the controller
  // Inside AnimalForm.js -> handleLocalSubmit
  const handleLocalSubmit = () => {
    if (action === "create" || action === "update") {
      // 1. Validate Species Selection
      const isValidSpecies = speciesItems.some(
        (spec) => String(spec.id).trim() === String(formData.speciesId).trim(),
      );

      if (!isValidSpecies) {
        alert(
          "Validation Error: Please choose a valid Species from the dropdown list before submitting.",
        );
        return;
      }

      // 2. Validate Owner Selection
      const isValidOwner = ownerItems.some(
        (owner) => String(owner.id).trim() === String(formData.ownerId).trim(),
      );

      if (!isValidOwner) {
        alert(
          "Validation Error: Please choose a valid Owner from the dropdown list before submitting.",
        );
        return;
      }
    }
    // Both validations passed -> send data up to parent controller
    onSubmit(formData);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {fields.map((field) => {
        const dropdown = dropdownConfigs[field];

        // 1. RELATIONAL DATABASE DROPDOWN RENDERER
        if (dropdown) {
          const hasItems = dropdown.items && dropdown.items.length > 0;

          return (
            <div className="form-field-group" key={field}>
              <label htmlFor={field}>{dropdown.label}</label>
              <select
                className="form-field-group-input"
                id={field}
                name={field}
                value={
                  formData[field] !== null && formData[field] !== undefined
                    ? String(formData[field])
                    : ""
                }
                onChange={handleChange}
                disabled={readOnly}
              >
                <option value="">
                  {hasItems
                    ? `-- Select ${dropdown.label} --`
                    : `⚠️ ERROR: No ${dropdown.label} Loaded`}
                </option>

                {hasItems &&
                  dropdown.items.map((item) => (
                    <option key={String(item.id)} value={String(item.id)}>
                      {dropdown.getLabel(item)}
                    </option>
                  ))}
              </select>
            </div>
          );
        }

        // 2. LARGE TEXT AREA RENDERER FOR DESCRIPTIONS/NOTES
        if (field === "description" || field === "notes") {
          return (
            <div className="form-field-group" key={field}>
              <label htmlFor={field}>{formatLabel(field)}</label>
              <textarea
                className="form-field-group-input"
                id={field}
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                readOnly={readOnly}
                rows={3}
              />
            </div>
          );
        }

        // 3. STANDARD SHORT-TEXT / NUMBER FIELDS RENDERER
        return (
          <div className="form-field-group" key={field}>
            <label htmlFor={field}>{formatLabel(field)}</label>
            <input
              className="form-field-group-input"
              id={field}
              name={field}
              type={field === "age" || field === "weight" ? "number" : "text"}
              value={formData[field] ?? ""}
              onChange={handleChange}
              readOnly={readOnly}
              required={field === "name"}
            />
          </div>
        );
      })}

      <div className="form-action-button-row">
        <button
          type="button"
          onClick={handleLocalSubmit}
          className="form-action-submit-btn"
          disabled={readOnly && action === "delete" ? false : readOnly}
        >
          {action.toUpperCase()}
        </button>
      </div>
    </form>
  );
};

export default AnimalForm;

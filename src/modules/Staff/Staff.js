// Staff.js
import Person from "../../components/Person/Person";

const Staff = ({
  staffItems,
  setStaffItems,
  selectedAction,
  setSelectedAction,
}) => {
  return (
    <Person
      items={staffItems}
      setItems={setStaffItems}
      selectedAction={selectedAction}
      setSelectedAction={setSelectedAction}
      role="Staff"
    />
  );
};
export default Staff;

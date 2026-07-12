// Donor.js
import Person from "../../components/Person/Person";

const Donor = ({
  donorItems,
  setDonorItems,
  selectedAction,
  setSelectedAction,
}) => {
  return (
    <Person
      items={donorItems}
      setItems={setDonorItems}
      selectedAction={selectedAction}
      setSelectedAction={setSelectedAction}
      role="Donor"
    />
  );
};
export default Donor;

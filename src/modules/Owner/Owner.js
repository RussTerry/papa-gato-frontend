// Owner.js
import Person from "../../components/Person/Person";

const Owner = ({
  ownerItems,
  setOwnerItems,
  selectedAction,
  setSelectedAction,
}) => {
  return (
    <Person
      items={ownerItems}
      setItems={setOwnerItems}
      selectedAction={selectedAction}
      setSelectedAction={setSelectedAction}
      role="Owner"
    />
  );
};
export default Owner;

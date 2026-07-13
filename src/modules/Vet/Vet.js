// Vet.js
import Person from "../../components/Person/Person";

const Vet = ({ vetItems, setVetItems, selectedAction, setSelectedAction }) => {
  return (
    <Person
      items={vetItems}
      setItems={setVetItems}
      selectedAction={selectedAction}
      setSelectedAction={setSelectedAction}
      role="Vet"
    />
  );
};
export default Vet;
